import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import LibraryPage from './pages/LibraryPage';
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
        
        {/* Sticky Navbar with /rooms and /library links */}
        <Navbar onOpenStartModal={handleOpenStartModal} />

        {/* Dynamic Route Pages */}
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
              path="/rooms" 
              element={
                <RoomsPage 
                  onOpenStartModal={handleOpenStartModal} 
                />
              } 
            />
            <Route 
              path="/library" 
              element={<LibraryPage />} 
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
