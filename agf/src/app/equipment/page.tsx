'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Dumbbell, Activity, ChevronRight, Filter } from 'lucide-react';
import { EQUIPMENT } from '@/data/equipment';
import { EQUIPMENT_CATEGORIES } from '@/lib/constants';
import PageHero from '@/components/shared/PageHero';
import CTASection from '@/components/shared/CTASection';
import styles from './equipment.module.css';

export default function EquipmentDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEquipment = useMemo(() => {
    return EQUIPMENT.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.muscles.some((m) => m.label.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <PageHero
        label="EQUIPMENT DIRECTORY"
        line1="COMMERCIAL-GRADE."
        line2="BIOMECHANICALLY ENGINEERED."
        accentWord="ENGINEERED."
        description="Explore our complete equipment inventory across Cardio, Strength, and Free Weights. Biomechanically engineered for optimal resistance curves, joint safety, and progressive overload."
        cta={{ label: 'BOOK A WALKTHROUGH', href: '/book-a-visit' }}
      />

      <section className={styles.section} aria-label="Equipment Catalog">
        <div className={styles.container}>
          {/* Controls Bar: Search & Category Filters */}
          <div className={styles.controls}>
            {/* Search Input */}
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Search machines or target muscles (e.g. chest, lats, quads)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search equipment"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearBtn}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className={styles.categoryFilters} role="tablist" aria-label="Equipment categories">
              <button
                role="tab"
                aria-selected={selectedCategory === 'All'}
                onClick={() => setSelectedCategory('All')}
                className={`${styles.filterBtn} ${selectedCategory === 'All' ? styles.filterBtnActive : ''}`}
              >
                All ({EQUIPMENT.length})
              </button>
              {EQUIPMENT_CATEGORIES.map((cat) => {
                const count = EQUIPMENT.filter((e) => e.category.toLowerCase() === cat.toLowerCase()).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ''}`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count status */}
          <div className={styles.statusBar}>
            <span>
              Showing <strong>{filteredEquipment.length}</strong> of {EQUIPMENT.length} stations
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </span>
          </div>

          {/* Equipment Cards Grid */}
          {filteredEquipment.length > 0 ? (
            <div className={styles.grid}>
              {filteredEquipment.map((item) => {
                const displayImg = item.images.find(img => img.view === 'side') || item.images[0];
                return (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.cardVisual}>
                      <div className={styles.badge}>{item.category}</div>
                      {displayImg ? (
                        <Image
                          src={displayImg.src}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={styles.cardImage}
                        />
                      ) : (
                        <div className={styles.iconCircle}>
                          <Dumbbell size={36} className={styles.icon} />
                        </div>
                      )}
                    </div>

                  <div className={styles.cardBody}>
                    <h2 className={styles.machineName}>{item.name}</h2>
                    <p className={styles.machineDesc}>{item.shortDescription}</p>

                    <div className={styles.musclesWrap}>
                      <Activity size={14} className={styles.muscleIcon} />
                      <span className={styles.musclesText}>
                        {item.muscles
                          .filter((m) => m.isPrimary)
                          .map((m) => m.label)
                          .join(', ')}
                      </span>
                    </div>

                    <div className={styles.cardFooter}>
                      <Link href={`/equipment/${item.slug}`} className={styles.viewLink}>
                        View Machine Guide <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          ) : (
            <div className={styles.noResults}>
              <p>No machines match your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className={styles.resetBtn}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        heading="WANT TO TRY THESE MACHINES IN PERSON?"
        subtext="Book a personalized visit to Anytime Golden Fitness in Rajam. Our trainers can demonstrate proper seat adjustments and form."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
      />
    </>
  );
}
