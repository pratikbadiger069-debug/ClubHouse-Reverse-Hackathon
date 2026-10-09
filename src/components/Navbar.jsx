import React, { useState } from 'react';
import { Volume2, Sparkles, Menu, X, Radio, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenStartModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDFBF7]/85 border-b border-[#F0E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#E05638] to-[#FF6B4A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Volume2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-2xl tracking-tight text-[#2D231E] flex items-center gap-1.5">
              Echo
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            </span>
            <span className="text-[11px] font-medium text-[#9E8E85] tracking-wide uppercase">
              Live Audio • Permanent Knowledge
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6B5E57]">
          <a href="#problem" className="hover:text-[#E05638] transition-colors">The Problem</a>
          <a href="#how-it-works" className="hover:text-[#E05638] transition-colors">How It Works</a>
          <a href="#features" className="hover:text-[#E05638] transition-colors">Features</a>
          <a href="#sample-recap" className="hover:text-[#E05638] transition-colors">Sample Recap</a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => {
              const el = document.getElementById('sample-recap');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary text-sm px-5 py-2.5"
          >
            <Radio className="w-4 h-4 text-[#E05638]" />
            View Live Demo
          </button>
          
          <button 
            onClick={onOpenStartModal}
            className="btn-primary text-sm px-5 py-2.5"
          >
            <Sparkles className="w-4 h-4" />
            Start a Room
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#2D231E] hover:bg-[#FAF4EE] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#F0E5DC] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <a 
            href="#problem" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            The Problem
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            How It Works
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            Features
          </a>
          <a 
            href="#sample-recap" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2D231E] py-2 border-b border-[#F5ECE5]"
          >
            Sample Recap
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('sample-recap');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary w-full justify-center text-sm py-3"
            >
              <Radio className="w-4 h-4 text-[#E05638]" />
              View Live Demo
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStartModal();
              }}
              className="btn-primary w-full justify-center text-sm py-3"
            >
              <Sparkles className="w-4 h-4" />
              Start a Room
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
