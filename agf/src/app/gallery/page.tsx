'use client';

import { useState } from 'react';
import { GALLERY_IMAGES } from '@/data/gallery';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import PageHero from '@/components/shared/PageHero';
import CTASection from '@/components/shared/CTASection';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './gallery.module.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredImages.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < filteredImages.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <>
      <PageHero
        label="FACILITY GALLERY"
        line1="INSIDE ANYTIME"
        line2="GOLDEN FITNESS."
        accentWord="GOLDEN FITNESS."
        description="Take a visual tour of our commercial stations, training zones, and disciplined fitness atmosphere in Rajam, Andhra Pradesh."
        cta={{ label: 'BOOK A VISIT TO SEE IT IN PERSON', href: '/book-a-visit' }}
      />

      <section className={styles.section} aria-label="Gym Image Gallery">
        <div className={styles.container}>
          {/* Category Tabs */}
          <div className={styles.categoryFilters} role="tablist" aria-label="Gallery categories">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.filterBtnActive : ''}`}
            >
              All ({GALLERY_IMAGES.length})
            </button>
            {GALLERY_CATEGORIES.map((cat) => {
              const count = GALLERY_IMAGES.filter((img) => img.category === cat.value).length;
              return (
                <button
                  key={cat.value}
                  role="tab"
                  aria-selected={activeCategory === cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`${styles.filterBtn} ${activeCategory === cat.value ? styles.filterBtnActive : ''}`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className={styles.grid}>
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                className={`${styles.gridItem} ${img.span === 2 ? styles.itemSpan2 : ''}`}
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(idx);
                  }
                }}
                aria-label={`View ${img.alt}`}
              >
                <div className={styles.imagePlaceholder}>
                  <div className={styles.placeholderIconWrap}>
                    <Camera size={28} className={styles.cameraIcon} />
                  </div>
                  <span className={styles.categoryBadge}>{img.category.replace('-', ' ')}</span>
                  <div className={styles.hoverOverlay}>
                    <Maximize2 size={24} className={styles.zoomIcon} />
                    <span className={styles.altText}>{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className={styles.lightbox} onClick={() => setLightboxIndex(null)} role="dialog" aria-modal="true">
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image viewer"
            >
              <X size={24} />
            </button>

            <button
              className={styles.prevBtn}
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <div className={styles.lightboxBody}>
              <div className={styles.lightboxGraphic}>
                <Camera size={64} className={styles.lightboxIcon} />
                <span className={styles.lightboxTitle}>{activeImage.alt}</span>
                <span className={styles.lightboxTag}>Category: {activeImage.category}</span>
              </div>
            </div>

            <button
              className={styles.nextBtn}
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}

      <CTASection
        heading="LIKE WHAT YOU SEE?"
        subtext="Schedule a walk-through at Anytime Golden Fitness in Rajam. We will show you around our training zones in person."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
      />
    </>
  );
}
