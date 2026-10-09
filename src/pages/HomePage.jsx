import React from 'react';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeatureCardsSection from '../components/FeatureCardsSection';
import SampleRecapCardSection from '../components/SampleRecapCardSection';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function HomePage({ onOpenStartModal, onExploreDemo }) {
  return (
    <div className="space-y-0">
      
      {/* Hero Section */}
      <HeroSection 
        onOpenStartModal={onOpenStartModal} 
        onExploreDemo={onExploreDemo} 
      />

      {/* Problem Section */}
      <ScrollReveal animation="fade-up">
        <ProblemSection 
          onOpenStartModal={onOpenStartModal} 
        />
      </ScrollReveal>

      {/* How-It-Works Section */}
      <ScrollReveal animation="fade-up">
        <HowItWorksSection 
          onOpenStartModal={onOpenStartModal} 
        />
      </ScrollReveal>

      {/* Feature Cards Section */}
      <ScrollReveal animation="fade-up">
        <FeatureCardsSection />
      </ScrollReveal>

      {/* Sample Recap Card Section */}
      <ScrollReveal animation="fade-up">
        <SampleRecapCardSection />
      </ScrollReveal>

    </div>
  );
}
