import HeroSection from '@/components/home/HeroSection';
import QuickStats from '@/components/home/QuickStats';
import FeaturedEquipment from '@/components/home/FeaturedEquipment';
import WhyAGF from '@/components/home/WhyAGF';
import TrainingPreview from '@/components/home/TrainingPreview';
import LocationSection from '@/components/home/LocationSection';
import CTASection from '@/components/shared/CTASection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Quick Key Stats */}
      <QuickStats />

      {/* 3. Featured Commercial Machines */}
      <FeaturedEquipment />

      {/* 4. Why Anytime Golden Fitness */}
      <WhyAGF />

      {/* 5. Training Programs Preview */}
      <TrainingPreview />

      {/* 6. Gym Location in Rajam */}
      <LocationSection />

      {/* 7. Bottom Call to Action */}
      <CTASection
        heading="READY TO TRANSFORM YOUR STRENGTH?"
        subtext="Experience Anytime Golden Fitness in Rajam. Explore our commercial machines and speak with our training staff."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-visit"
        secondButton={{ label: "View Equipment Directory", href: "/equipment" }}
      />
    </>
  );
}
