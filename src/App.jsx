import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import FeedPage from './pages/FeedPage';
import RoomsPage from './pages/RoomsPage';
import LiveRoomPage from './pages/LiveRoomPage';
import RecapDetailPage from './pages/RecapDetailPage';
import LibraryPage from './pages/LibraryPage';
import CommunitiesPage from './pages/CommunitiesPage';
import CommunityDetailPage from './pages/CommunityDetailPage';
import MatchPage from './pages/MatchPage';
import NotFoundPage from './pages/NotFoundPage';
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
    <Router>
      <div className="min-h-screen bg-[#FDFBF7] text-[#2D231E] flex flex-col font-sans selection:bg-[#E05638]/20 selection:text-[#E05638]">
        
        {/* Sticky Navbar with Demo Mode Pill & Notifications */}
        <Navbar onOpenStartModal={handleOpenStartModal} />

        {/* Dynamic App Routes */}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onOpenStartModal={handleOpenStartModal} 
                  onExploreDemo={handleExploreDemo} 
                />
              } 
            />
            <Route 
              path="/onboarding" 
              element={<OnboardingPage />} 
            />
            <Route 
              path="/home" 
              element={<FeedPage onOpenStartModal={handleOpenStartModal} />} 
            />
            <Route 
              path="/rooms" 
              element={<RoomsPage onOpenStartModal={handleOpenStartModal} />} 
            />
            <Route 
              path="/room/:id" 
              element={<LiveRoomPage />} 
            />
            <Route 
              path="/recap/:id" 
              element={<RecapDetailPage />} 
            />
            <Route 
              path="/library" 
              element={<LibraryPage />} 
            />
            <Route 
              path="/communities" 
              element={<CommunitiesPage />} 
            />
            <Route 
              path="/community/:id" 
              element={<CommunityDetailPage />} 
            />
            <Route 
              path="/match" 
              element={<MatchPage />} 
            />
            {/* Catch-all 404 Route */}
            <Route 
              path="*" 
              element={<NotFoundPage />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer onOpenStartModal={handleOpenStartModal} />

        {/* Interactive Start Room Modal */}
        <StartRoomModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />

      </div>
    </Router>
  );
}
