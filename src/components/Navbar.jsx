import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Volume2, Sparkles, Menu, X, Radio, Library, Mic } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar({ onOpenStartModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Update top scroll progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] focus-visible:ring-offset-2 rounded-lg px-2 py-1 ${
      isActive
        ? 'text-[#E05638] font-bold'
        : 'text-[#6B5E57] hover:text-[#E05638]'
    }`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-[#F0E5DC] transition-all">
      {/* Top Scroll Progress Indicator Bar */}
      <div className="w-full bg-[#FAF0E8] h-1">
        <div
          className="bg-gradient-to-r from-[#E05638] via-[#FF6B4A] to-[#F59E0B] h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          aria-label="Echo Home - Live Audio Rooms That Leave Something Behind"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] rounded-2xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#E05638] to-[#FF6B4A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Volume2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-2xl tracking-tight text-[#2D231E] flex items-center gap-1.5">
              Echo
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" title="Live audio active" aria-label="Live audio active" />
            </span>
            <span className="text-[11px] font-medium text-[#9E8E85] tracking-wide uppercase">
              Live Audio • Permanent Knowledge
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          
          {/* Explicit Links to /rooms and /library */}
          <NavLink to="/rooms" className={navLinkClass}>
            <Radio className="w-4 h-4 text-[#E05638]" aria-hidden="true" />
            <span>Live Rooms</span>
          </NavLink>
          
          <NavLink to="/library" className={navLinkClass}>
            <Library className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
            <span>Recap Library</span>
          </NavLink>

          {location.pathname === '/' && (
            <>
              <a href="#how-it-works" className="text-sm font-semibold text-[#6B5E57] hover:text-[#E05638] px-2 py-1">
                How It Works
              </a>
              <a href="#features" className="text-sm font-semibold text-[#6B5E57] hover:text-[#E05638] px-2 py-1">
                Features
              </a>
            </>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => {
              const el = document.getElementById('sample-recap');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={Radio}
          >
            Demo Recap
          </Button>
          
          <Button 
            variant="primary" 
            size="sm"
            onClick={onOpenStartModal}
            icon={Sparkles}
          >
            Start a Room
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2.5 rounded-xl text-[#2D231E] hover:bg-[#FAF4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#FFFFFF] border-b border-[#F0E5DC] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <NavLink 
            to="/" 
            end
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            Home
          </NavLink>

          <NavLink 
            to="/rooms" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-base font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#E05638]" aria-hidden="true" />
              Live Rooms
            </span>
            <span className="text-xs bg-[#ECFDF5] text-[#10B981] font-bold px-2 py-0.5 rounded-full border border-[#A7F3D0]">
              LIVE NOW
            </span>
          </NavLink>

          <NavLink 
            to="/library" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-base font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            <span className="flex items-center gap-2">
              <Library className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
              Recap Library
            </span>
            <span className="text-xs text-[#9E8E85]">142 Recaps</span>
          </NavLink>

          <div className="pt-3 flex flex-col gap-3">
            <Button 
              variant="secondary" 
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('sample-recap');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={Radio}
            >
              View Live Demo
            </Button>
            <Button 
              variant="primary" 
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStartModal();
              }}
              icon={Sparkles}
            >
              Start a Room
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
