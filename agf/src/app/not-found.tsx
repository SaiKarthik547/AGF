import Link from 'next/link';
import { PrimaryButton, SecondaryButton } from '@/components/shared/Buttons';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.label}>404 — PAGE NOT FOUND</span>
        <h1 className={styles.title}>LOST YOUR WAY?</h1>
        <p className={styles.desc}>
          The page you are looking for does not exist or may have been moved.
          Get back on track with the links below.
        </p>
        <div className={styles.actions}>
          <PrimaryButton href="/">RETURN HOME</PrimaryButton>
          <SecondaryButton href="/equipment">VIEW EQUIPMENT</SecondaryButton>
        </div>
      </div>
    </div>
  );
}
