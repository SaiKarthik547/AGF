#!/usr/bin/env node
/**
 * AGF — Real Browser Frontend Check (no mocks, no extra packages)
 *
 * Launches the installed Google Chrome over the DevTools Protocol and, for
 * every key page:
 *   - loads it for real and collects JS console errors / page errors
 *   - verifies entrance animations actually run (animated elements become
 *     visible after scrolling into view — nothing stays stuck at opacity 0)
 *   - verifies prefers-reduced-motion is respected (content visible
 *     immediately, no hidden elements left behind)
 *
 * Usage:
 *   cd agf
 *   npm run dev          # in one terminal
 *   node scripts/browser-check.js
 *
 * Exit 0 = all pages clean.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';
const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/equipment', name: 'equipment' },
  { path: '/book-a-visit', name: 'book-a-visit' },
  { path: '/contact', name: 'contact' },
  { path: '/gallery', name: 'gallery' },
  { path: '/training', name: 'training' },
  { path: '/facilities', name: 'facilities' },
  { path: '/about', name: 'about' },
];

let passed = 0;
let failed = 0;
const failures = [];

function check(name, ok, detail) {
  if (ok) {
    passed += 1;
    console.log(`  PASS  ${name}`);
  } else {
    failed += 1;
    failures.push(name);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/** Minimal CDP client over the /json/list WebSocket endpoint. */
function connectCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const listeners = [];

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) {
      for (const fn of listeners) fn(msg);
    }
  });

  return {
    ready: new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    }),
    send(method, params = {}) {
      const id = nextId++;
      ws.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    on(fn) {
      listeners.push(fn);
    },
    close() {
      ws.close();
    },
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.error('Chrome not found — cannot run browser check.');
    process.exit(2);
  }

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agf-chrome-'));
  const port = 9333;
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--window-size=1440,900',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  // Wait for the DevTools endpoint.
  let target = null;
  for (let i = 0; i < 50; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      target = list.find((t) => t.type === 'page');
      if (target) break;
    } catch {
      /* not up yet */
    }
    await sleep(200);
  }

  if (!target) {
    console.error('Chrome DevTools endpoint never came up.');
    chrome.kill();
    process.exit(2);
  }

  const cdp = connectCdp(target.webSocketDebuggerUrl);
  await cdp.ready;

  const consoleErrors = [];
  cdp.on((msg) => {
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      const text = (msg.params.args || [])
        .map((a) => a.value ?? a.description ?? '')
        .join(' ');
      consoleErrors.push(text);
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      consoleErrors.push(d.exception?.description || d.text || 'exception');
    }
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      // Ignore favicon/network noise from local dev; keep JS errors.
      const entry = msg.params.entry;
      if (entry.source !== 'network') consoleErrors.push(entry.text);
    }
  });

  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  await cdp.send('Page.enable');

  /** Evaluate an expression in the page, returning its JSON value. */
  async function evalExpr(expression) {
    const res = await cdp.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || 'eval failed');
    }
    return res.result.value;
  }

  async function navigate(url) {
    consoleErrors.length = 0;
    await cdp.send('Page.navigate', { url });
    // Wait for load + hydration.
    for (let i = 0; i < 60; i += 1) {
      const ready = await evalExpr('document.readyState').catch(() => 'loading');
      if (ready === 'complete') break;
      await sleep(250);
    }
    await sleep(1200);
  }

  /** Scroll the page to bottom in steps, then back — triggers whileInView. */
  async function scrollThrough() {
    await evalExpr(`
      (async () => {
        const delay = (ms) => new Promise(r => setTimeout(r, ms));
        const step = Math.max(300, window.innerHeight * 0.6);
        for (let y = 0; y < document.body.scrollHeight + step; y += step) {
          window.scrollTo(0, y);
          await delay(180);
        }
        window.scrollTo(0, document.body.scrollHeight);
        await delay(400);
        window.scrollTo(0, 0);
        await delay(300);
        return true;
      })()
    `);
  }

  try {
    console.log(`AGF real-browser frontend check against ${BASE_URL}`);

    // -----------------------------------------------------------------
    console.log('\n=== Pages load cleanly (no JS console errors) ===');
    for (const p of PAGES) {
      await navigate(`${BASE_URL}${p.path}`);
      const jsErrors = consoleErrors.filter(
        (e) => !/favicon|404|Failed to load resource/i.test(e),
      );
      check(`${p.name}: no console/page errors`, jsErrors.length === 0, jsErrors.join(' | ').slice(0, 300));
    }

    // -----------------------------------------------------------------
    console.log('\n=== Entrance animations run and content becomes visible ===');
    await navigate(`${BASE_URL}/`);
    // Home has hero + whileInView sections. Before scrolling, above-fold hero
    // content should already animate in; below-fold sections start hidden.
    const heroVisible = await evalExpr(`
      (() => {
        const h1 = document.querySelector('h1');
        if (!h1) return { found: false };
        const s = getComputedStyle(h1);
        return { found: true, opacity: parseFloat(s.opacity) };
      })()
    `);
    check('Home: hero heading rendered', heroVisible.found === true);
    check(
      'Home: hero heading visible after entrance animation',
      heroVisible.found && heroVisible.opacity > 0.9,
      `opacity=${heroVisible.opacity}`,
    );

    await scrollThrough();
    const hiddenAfterScroll = await evalExpr(`
      (() => {
        // Any element with a whileInView-style entrance that is still fully
        // transparent after a full scroll is stuck (animation broken).
        const els = Array.from(document.querySelectorAll('section > div > div, section div'));
        let stuck = 0;
        for (const el of els.slice(0, 400)) {
          const s = getComputedStyle(el);
          if (parseFloat(s.opacity) === 0 && el.getBoundingClientRect().height > 40) {
            const hasText = (el.textContent || '').trim().length > 20;
            if (hasText) stuck++;
          }
        }
        return stuck;
      })()
    `);
    check(
      'Home: no content stuck at opacity 0 after scrolling',
      hiddenAfterScroll === 0,
      `${hiddenAfterScroll} element(s) invisible`,
    );

    // Filter interactions (equipment) work without errors.
    await navigate(`${BASE_URL}/equipment`);
    await evalExpr(`
      (() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const cardio = btns.find(b => /Cardio/i.test(b.textContent));
        if (cardio) cardio.click();
        return true;
      })()
    `);
    await sleep(500);
    const equipmentFiltered = await evalExpr(`
      (() => ({
        cards: document.querySelectorAll('a[href^="/equipment/"]').length,
        status: (document.querySelector('strong') || {}).textContent || '',
      }))()
    `);
    check(
      'Equipment: category filter click works',
      Number(equipmentFiltered.status) >= 0 && consoleErrors.length === 0,
      `status=${equipmentFiltered.status} errors=${consoleErrors.join('|').slice(0, 200)}`,
    );

    // -----------------------------------------------------------------
    console.log('\n=== prefers-reduced-motion is respected ===');
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
    await navigate(`${BASE_URL}/`);
    await sleep(500); // reduced-motion content should be visible immediately
    const reducedState = await evalExpr(`
      (() => {
        const h1 = document.querySelector('h1');
        const opacity = h1 ? parseFloat(getComputedStyle(h1).opacity) : 0;
        let stuck = 0;
        const els = Array.from(document.querySelectorAll('section div'));
        for (const el of els.slice(0, 300)) {
          const s = getComputedStyle(el);
          const hasText = (el.textContent || '').trim().length > 20;
          if (parseFloat(s.opacity) === 0 && hasText && el.getBoundingClientRect().height > 40) stuck++;
        }
        return { opacity, stuck, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches };
      })()
    `);
    check('Reduced-motion media is active in page', reducedState.reduced === true);
    check(
      'Reduced-motion: hero visible immediately',
      reducedState.opacity > 0.9,
      `opacity=${reducedState.opacity}`,
    );
    check(
      'Reduced-motion: content never left invisible',
      reducedState.stuck === 0,
      `${reducedState.stuck} element(s) invisible`,
    );
    await cdp.send('Emulation.setEmulatedMedia', { features: [] });

    // -----------------------------------------------------------------
    console.log('\n=== Forms render with expected fields ===');
    await navigate(`${BASE_URL}/book-a-visit`);
    const bookingForm = await evalExpr(`
      (() => ({
        name: !!document.getElementById('name'),
        phone: !!document.getElementById('phone'),
        date: !!document.getElementById('date'),
        honeypot: !!document.querySelector('input[name="website_url"]'),
        submit: !!document.querySelector('button[type="submit"]'),
      }))()
    `);
    check('Booking form: all fields present', bookingForm.name && bookingForm.phone && bookingForm.date && bookingForm.submit);
    check('Booking form: honeypot present', bookingForm.honeypot === true);

    await navigate(`${BASE_URL}/contact`);
    const contactForm = await evalExpr(`
      (() => ({
        name: !!document.getElementById('name'),
        message: !!document.getElementById('message'),
        honeypot: !!document.querySelector('input[name="website_url"]'),
        submit: !!document.querySelector('button[type="submit"]'),
      }))()
    `);
    check('Contact form: all fields present', contactForm.name && contactForm.message && contactForm.submit);
    check('Contact form: honeypot present', contactForm.honeypot === true);
  } finally {
    cdp.close();
    chrome.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      /* best effort */
    }
  }

  console.log('\n----------------------------------------');
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('Failures:');
    for (const f of failures) console.log(`  - ${f}`);
  }
  console.log('----------------------------------------');
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Browser check crashed:', error);
  process.exit(1);
});
