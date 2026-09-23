import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Buttons.module.css';

/* --- PrimaryButton --------------------------------------------------
   Solid orange button — the primary CTA throughout the site.
   ------------------------------------------------------------------- */

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'default' | 'lg';
  id?: string;
}

export function PrimaryButton({
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
  icon,
  fullWidth,
  size = 'default',
  id,
}: ButtonProps) {
  const cls = cn(
    styles.btn,
    styles.primary,
    size === 'lg' && styles.btnLg,
    fullWidth && styles.fullWidth,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls} id={id}>
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      disabled={disabled}
      id={id}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

/* --- SecondaryButton ------------------------------------------------
   Outlined/ghost button — secondary CTAs.
   ------------------------------------------------------------------- */

export function SecondaryButton({
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
  icon,
  fullWidth,
  size = 'default',
  id,
}: ButtonProps) {
  const cls = cn(
    styles.btn,
    styles.secondary,
    size === 'lg' && styles.btnLg,
    fullWidth && styles.fullWidth,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls} id={id}>
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      disabled={disabled}
      id={id}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

/* --- TextButton -----------------------------------------------------
   Inline text link button with an arrow — used for "View All →" links.
   ------------------------------------------------------------------- */

export function TextButton({
  href,
  onClick,
  children,
  className,
  id,
}: ButtonProps) {
  const cls = cn(styles.textBtn, className);

  if (href) {
    return (
      <Link href={href} className={cls} id={id}>
        <span>{children}</span>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls} id={id}>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </button>
  );
}
