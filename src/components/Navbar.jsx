import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Volume2, Sparkles, Menu, X, Radio, Library, Users, Zap, Bell, Check, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import DemoBadge from './ui/DemoBadge';
import { initialNotifications } from '../lib/seedData';

export default function Navbar({ onOpenStartModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

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

  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-xs font-bold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] rounded-xl px-2.5 py-1.5 ${
      isActive
        ? 'text-[#E05638] bg-[#FFF0EB]'
        : 'text-[#6B5E57] hover:text-[#E05638] hover:bg-[#FAF4EE]'
    }`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-[#F0E5DC]">
      {/* Top Scroll Progress Bar */}
      <div className="w-full bg-[#FAF0E8] h-1">
        <div
          className="bg-gradient-to-r from-[#E05638] via-[#FF6B4A] to-[#F59E0B] h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scroll progress"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            aria-label="Echo Home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] rounded-2xl p-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E05638] to-[#FF6B4A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Volume2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#2D231E] flex items-center gap-1.5">
                Echo
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              </span>
              <span className="text-[10px] font-medium text-[#9E8E85] uppercase">
                Live Audio • Permanent Knowledge
              </span>
            </div>
          </Link>

          {/* Demo Mode Badge */}
          <div className="hidden lg:block">
            <DemoBadge />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/onboarding" className={navLinkClass}>Onboarding</NavLink>
          <NavLink to="/home" className={navLinkClass}>Feed</NavLink>
          <NavLink to="/rooms" className={navLinkClass}>
            <Radio className="w-3.5 h-3.5 text-[#E05638]" /> Live Rooms
          </NavLink>
          <NavLink to="/library" className={navLinkClass}>
            <Library className="w-3.5 h-3.5 text-[#F59E0B]" /> Recap Library
          </NavLink>
          <NavLink to="/communities" className={navLinkClass}>
            <Users className="w-3.5 h-3.5 text-[#8B5CF6]" /> Guilds
          </NavLink>
          <NavLink to="/match" className={navLinkClass}>
            <Zap className="w-3.5 h-3.5 text-[#E05638]" /> 1-on-1 Match
          </NavLink>
        </nav>

        {/* Desktop Action Buttons & Notification Bell */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Notification Bell Icon */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              aria-label="View notifications"
              className="p-2.5 rounded-full text-[#6B5E57] hover:bg-[#FAF4EE] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E05638] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl border border-[#F0E5DC] shadow-2xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#F5ECE5]">
                  <span className="font-heading font-bold text-xs text-[#2D231E]">In-App Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] font-bold text-[#E05638] hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <Link
                      key={n.id}
                      to={n.link}
                      onClick={() => setNotifDropdownOpen(false)}
                      className={`block p-2.5 rounded-2xl text-xs transition-colors border ${
                        n.read ? 'bg-white border-[#F0E5DC] text-[#6B5E57]' : 'bg-[#FFF0EB] border-[#FCD9CE] text-[#2D231E] font-semibold'
                      }`}
                    >
                      <p>{n.text}</p>
                      <span className="text-[10px] text-[#9E8E85] font-normal mt-1 block">{n.created_at}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button 
            variant="primary" 
            size="sm"
            onClick={onOpenStartModal}
            icon={Sparkles}
          >
            Start a Room
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <DemoBadge />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2.5 rounded-xl text-[#2D231E] hover:bg-[#FAF4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden bg-white border-b border-[#F0E5DC] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2"
        >
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">Home</NavLink>
          <NavLink to="/onboarding" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">Onboarding</NavLink>
          <NavLink to="/home" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">Feed</NavLink>
          <NavLink to="/rooms" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">Live Rooms</NavLink>
          <NavLink to="/library" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">Recap Library</NavLink>
          <NavLink to="/communities" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">Guilds</NavLink>
          <NavLink to="/match" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2D231E] py-2 border-b border-[#F5ECE5]">1-on-1 Match</NavLink>

          <div className="pt-2">
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
