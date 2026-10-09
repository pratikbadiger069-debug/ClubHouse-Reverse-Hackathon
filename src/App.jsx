import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeatureCardsSection from './components/FeatureCardsSection';
import SampleRecapCardSection from './components/SampleRecapCardSection';
import StartRoomModal from './components/StartRoomModal';
import Footer from './components/Footer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenStartModal = () => {
    setIsModalOpen(true);
  };

  const handleExploreDemo = () => {
    const el = document.getElementById('sample-recap');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D231E] flex flex-col font-sans selection:bg-[#E05638]/20 selection:text-[#E05638]">
      
      {/* Navbar */}
      <Navbar onOpenStartModal={handleOpenStartModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Section 1: Hero with two CTAs */}
        <HeroSection 
          onOpenStartModal={handleOpenStartModal} 
          onExploreDemo={handleExploreDemo} 
        />

        {/* Section 2: Problem section */}
        <ProblemSection 
          onOpenStartModal={handleOpenStartModal} 
        />

        {/* Section 3: 4-Step How-It-Works */}
        <HowItWorksSection 
          onOpenStartModal={handleOpenStartModal} 
        />

        {/* Section 4: 4 Feature Cards */}
        <FeatureCardsSection />

        {/* Section 5: Sample Recap Card */}
        <SampleRecapCardSection />

      </main>

      {/* Section 6: Footer */}
      <Footer onOpenStartModal={handleOpenStartModal} />

      {/* Interactive Start Room Modal */}
      <StartRoomModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
