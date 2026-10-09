import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Volume2, Sparkles, Menu, X, Radio, Library, Users, Zap, Bell, Check, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import DemoBadge from './ui/DemoBadge';
import { initialNotifications } from '../lib/seedData';

/**
 * Navbar — Clubhouse-inspired minimal nav
 *
 * Design principles (from reference screenshots):
 * - Cream background (#F5F0E8) — same as page bg, no shadow by default
 * - Very minimal: logo left, a few links, pill CTA right
 * - On scroll: slim border-bottom appears for separation
 * - Scroll-progress bar: yellow accent (#F5C518) instead of terracotta gradient
 * - Mobile: hamburger drawer, cream background
 * - Logo: Volume2 icon with animate-wave-hand effect + "Echo" wordmark
 * - Nav links: lowercase, tight, no uppercase — matches reference typography
 */
export default function Navbar({ onOpenStartModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      setScrolled(window.scrollY > 12);
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

  /* Nav link style — lowercase, tight, no uppercase */
  const navLinkClass = ({ isActive }) =>
    [
      'text-sm font-bold transition-colors duration-150',
      'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1',
      isActive
        ? 'text-[#1A1A1A] bg-[#E0D8CC]'
        : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-[#EDE8DE]',
    ].join(' ');

  return (
    <header
      className={[
        'sticky top-0 z-40 bg-[#F5F0E8]',
        'transition-shadow duration-200',
        scrolled ? 'shadow-[0_1px_0_0_#E0D8CC]' : '',
      ].join(' ')}
    >
      {/* Scroll progress bar — yellow accent, matches Clubhouse yellow screenshot */}
      <div className="w-full h-0.5 bg-[#E0D8CC]">
        <div
          className="bg-[#F5C518] h-full transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scroll progress"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo — wave-hand animation on Volume2 icon, matches Clubhouse waving hand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="Echo Home"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] rounded-2xl p-1"
          >
            {/* Animated wave icon — animate-wave-hand loops the gentle rotate */}
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-[#F5C518] group-hover:scale-105 transition-transform duration-150">
              <Volume2 className="w-5 h-5 animate-wave-hand" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-xl text-[#1A1A1A] tracking-tight">
                echo
              </span>
              <span className="text-[9px] font-semibold text-[#888888] uppercase tracking-widest">
                live audio
              </span>
            </div>
          </Link>

          {/* Demo badge — hidden on mobile to keep it minimal */}
          <div className="hidden lg:block">
            <DemoBadge />
          </div>
        </div>

        {/* Desktop nav links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>home</NavLink>
          <NavLink to="/home" className={navLinkClass}>
            <Radio className="w-3.5 h-3.5" /> feed
          </NavLink>
          <NavLink to="/rooms" className={navLinkClass}>
            <Radio className="w-3.5 h-3.5 text-[#10B981]" /> rooms
          </NavLink>
          <NavLink to="/library" className={navLinkClass}>
            <Library className="w-3.5 h-3.5" /> library
          </NavLink>
          <NavLink to="/communities" className={navLinkClass}>
            <Users className="w-3.5 h-3.5 text-[#8B5CF6]" /> guilds
          </NavLink>
          <NavLink to="/match" className={navLinkClass}>
            <Zap className="w-3.5 h-3.5 text-[#F5C518]" /> match
          </NavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              aria-label="View notifications"
              className="p-2 rounded-full text-[#555555] hover:bg-[#EDE8DE] hover:text-[#1A1A1A] relative transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#F5C518] text-[#1A1A1A] text-[9px] font-black rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl border border-[#E0D8CC] shadow-[0_12px_32px_-4px_rgba(26,26,26,0.14)] p-4 space-y-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE8DE]">
                  <span className="font-heading font-bold text-sm text-[#1A1A1A]">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs font-bold text-[#555555] hover:text-[#1A1A1A] transition-colors">
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
                      className={[
                        'block p-2.5 rounded-2xl text-xs transition-colors border',
                        n.read
                          ? 'bg-white border-[#E0D8CC] text-[#555555]'
                          : 'bg-[#F5F0E8] border-[#E0D8CC] text-[#1A1A1A] font-semibold',
                      ].join(' ')}
                    >
                      <p>{n.text}</p>
                      <span className="text-[10px] text-[#888888] font-normal mt-1 block">{n.created_at}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA — charcoal pill button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenStartModal}
            icon={Sparkles}
          >
            start a room
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <DemoBadge />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-xl text-[#1A1A1A] hover:bg-[#EDE8DE] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — cream bg, flat border separator */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#F5F0E8] border-t border-[#E0D8CC] px-4 pt-3 pb-6 space-y-1"
          style={{ animation: 'enter-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
        >
          {[
            { to: '/', label: 'home', end: true },
            { to: '/onboarding', label: 'onboarding' },
            { to: '/home', label: 'feed' },
            { to: '/rooms', label: 'live rooms' },
            { to: '/library', label: 'recap library' },
            { to: '/communities', label: 'guilds' },
            { to: '/match', label: '1-on-1 match' },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block text-base font-bold py-2.5 px-3 rounded-xl transition-colors ${
                  isActive
                    ? 'text-[#1A1A1A] bg-[#E0D8CC]'
                    : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-[#EDE8DE]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="pt-3">
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => { setMobileMenuOpen(false); onOpenStartModal(); }}
              icon={Sparkles}
            >
              start a room
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
