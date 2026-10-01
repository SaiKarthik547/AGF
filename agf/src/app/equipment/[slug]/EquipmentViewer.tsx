'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Equipment, Hotspot } from '@/types';
import { Dumbbell, Eye, Info } from 'lucide-react';
import styles from './equipment-detail.module.css';

interface Props {
  machine: Equipment;
}

export default function EquipmentViewer({ machine }: Props) {
  const [activeView, setActiveView] = useState<string>(
    machine.images[0]?.view || 'front'
  );
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [imgError, setImgError] = useState(false);

  const hasImages = machine.images.length > 0;
  const currentImage = hasImages
    ? machine.images.find((img) => img.view === activeView) || machine.images[0]
    : null;

  // Filter hotspots for current view (with graceful fallback to all hotspots)
  const matchedHotspots = machine.hotspots.filter((h) => h.imageView === activeView);
  const currentHotspots = matchedHotspots.length > 0 ? matchedHotspots : machine.hotspots;

  return (
    <div className={styles.viewerCard}>
      {/* View Angle Switcher Tabs */}
      <div className={styles.viewTabs} role="tablist" aria-label="Machine angles">
        {hasImages ? (
          machine.images.map((img) => (
            <button
              key={img.view}
              role="tab"
              aria-selected={activeView === img.view}
              onClick={() => {
                setActiveView(img.view);
                setActiveHotspot(null);
                setImgError(false);
              }}
              className={`${styles.viewTab} ${activeView === img.view ? styles.viewTabActive : ''}`}
            >
              <Eye size={14} />
              {img.label}
            </button>
          ))
        ) : (
          <div className={`${styles.viewTab} ${styles.viewTabActive}`}>
            <Eye size={14} />
            Biomechanical Station Blueprint
          </div>
        )}
      </div>

      {/* Interactive Display Area */}
      <div className={styles.displayArea}>
        {currentImage && !imgError ? (
          <div className={styles.imageWrap}>
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 60vw"
              className={styles.machineImg}
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className={styles.stationGraphic}>
            <div className={styles.graphicGlow} />
            <Dumbbell size={80} className={styles.graphicIcon} />
            <span className={styles.graphicLabel}>
              {machine.name}
            </span>
            <span className={styles.graphicHint}>
              Interactive Station View & Biomechanical Setup Guide
            </span>
          </div>
        )}

        {/* Hotspot Markers */}
        {currentHotspots.map((spot) => {
          const isActive = activeHotspot?.id === spot.id;
          const isNearTop = spot.y < 35;
          const isNearRight = spot.x > 75;
          const isNearLeft = spot.x < 25;

          return (
            <div
              key={spot.id}
              className={styles.hotspotContainer}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <button
                type="button"
                className={`${styles.hotspotButton} ${isActive ? styles.hotspotButtonActive : ''}`}
                onClick={() => setActiveHotspot(isActive ? null : spot)}
                aria-label={`Hotspot: ${spot.label}`}
                aria-expanded={isActive}
              >
                <span className={styles.hotspotPulse} />
                <span className={styles.hotspotCore}>+</span>
              </button>

              {/* Dynamic Boundary-Aware Tooltip Card */}
              {isActive && (
                <div
                  className={`${styles.hotspotTooltip} ${
                    isNearTop ? styles.tooltipBelow : styles.tooltipAbove
                  } ${
                    isNearRight
                      ? styles.tooltipAnchorRight
                      : isNearLeft
                      ? styles.tooltipAnchorLeft
                      : ''
                  }`}
                >
                  <div className={styles.tooltipHeader}>
                    <Info size={14} className={styles.tooltipIcon} />
                    <strong className={styles.tooltipTitle}>{spot.label}</strong>
                  </div>
                  <p className={styles.tooltipDesc}>{spot.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hotspots Info Strip & Component Detail Card */}
      <div className={styles.hotspotsFooter}>
        {activeHotspot ? (
          <div className={styles.activeHotspotCard}>
            <div className={styles.activeHotspotBadgeRow}>
              <span className={styles.activeHotspotTag}>INSPECTING COMPONENT</span>
              <button
                type="button"
                className={styles.closeHotspotBtn}
                onClick={() => setActiveHotspot(null)}
                aria-label="Deselect hotspot"
              >
                Close ×
              </button>
            </div>
            <h4 className={styles.activeHotspotTitle}>{activeHotspot.label}</h4>
            <p className={styles.activeHotspotDesc}>{activeHotspot.description}</p>
          </div>
        ) : (
          <div className={styles.footerHintWrap}>
            <Info size={16} className={styles.hintIcon} />
            <span className={styles.footerHint}>
              Click any glowing <span className={styles.highlightDot}>+</span> hotspot marker on the machine to reveal biomechanical adjustments, safety protocols, and setup guidance.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
