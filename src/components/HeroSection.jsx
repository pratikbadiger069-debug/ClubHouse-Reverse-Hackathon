import React, { useState, useEffect } from 'react';
import { Mic, ArrowRight, Radio, CheckCircle2, FileText, Zap, MessageSquare, Sparkles } from 'lucide-react';

/**
 * HeroSection — Clubhouse-inspired full-width hero
 *
 * Design notes (from reference screenshots):
 * - Cream (#F5F0E8) full-width background — same as page
 * - Large, bold, LOWERCASE rounded heading (Nunito Black)
 * - Two pill CTAs: charcoal primary + outline secondary
 * - Floating circular avatar elements scattered around text (Clubhouse signature)
 * - NO gradient blobs — flat, warm, clean
 * - Page-load entrance: heading fades+slides up with spring easing (600ms)
 *   subtitle at 100ms delay, CTAs at 200ms, floating circles independently bob
 * - Scroll reveals triggered by IntersectionObserver downstream
 *
 * Motion:
 * - animate-enter-up on heading/subtitle/ctas (defined in index.css)
 * - animate-float / animate-float-alt / animate-float-3 on avatar circles
 * - Active speaker cycles every 3.5s (existing logic preserved)
 */
export default function HeroSection({ onOpenStartModal, onExploreDemo }) {
  const [activeSpeaker, setActiveSpeaker] = useState(0);

  const speakers = [
    {
      name: 'Elena Vance',
      role: 'Host',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      active: true,
      quotes: 'We should transition our core design system to fluid typography...',
    },
    {
      name: 'Marcus Chen',
      role: 'Speaker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      active: false,
      quotes: 'Agreed! And Echo is taking real-time notes for us right now!',
    },
    {
      name: 'Aria Patel',
      role: 'Speaker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      active: false,
      quotes: 'Can we automatically push the action items directly into Slack?',
    },
  ];

  /* Rotate active speaker simulation */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpeaker(prev => (prev + 1) % speakers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* Floating avatar config — scattered positions matching Clubhouse layout */
  const floatingAvatars = [
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', size: 'w-20 h-20', pos: 'absolute -top-2 left-[5%]',   anim: 'animate-float',     delay: '0s'    },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', size: 'w-16 h-16', pos: 'absolute top-8 left-[15%]',  anim: 'animate-float-alt', delay: '0.5s'  },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',   size: 'w-24 h-24', pos: 'absolute top-24 left-[2%]',   anim: 'animate-float-3',   delay: '1s'    },
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', size: 'w-18 h-18', pos: 'absolute -top-4 right-[8%]',  anim: 'animate-float-alt', delay: '0.3s'  },
    { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', size: 'w-20 h-20', pos: 'absolute top-16 right-[2%]',  anim: 'animate-float',     delay: '0.8s'  },
    { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', size: 'w-16 h-16', pos: 'absolute top-36 right-[14%]', anim: 'animate-float-3',   delay: '1.2s'  },
  ];

  return (
    <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-[#F5F0E8]">

      {/* Floating avatar circles — scattered, Clubhouse signature layout */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        {floatingAvatars.map((av, i) => (
          <div
            key={i}
            className={`${av.pos} ${av.anim}`}
            style={{ animationDelay: av.delay }}
          >
            <img
              src={av.src}
              alt=""
              className={`${av.size} rounded-full object-cover shadow-[0_4px_20px_rgba(26,26,26,0.12)] border-2 border-white`}
              loading="lazy"
            />
          </div>
        ))}

        {/* Yellow accent accent blob — decorative circle, NOT a photo */}
        <div
          className="absolute bottom-16 left-[18%] w-14 h-14 rounded-full bg-[#F5C518] opacity-80 animate-bob shadow-sm"
          style={{ animationDelay: '0.6s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-8">

          {/* Live badge — yellow accent pill, matches Clubhouse's minimal pill badges */}
          <div
            className="animate-enter-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F5C518] text-[#1A1A1A] text-xs font-black uppercase tracking-wider shadow-sm"
            style={{ animationDelay: '0ms' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A1A1A] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1A1A1A]" />
            </span>
            <span>live audio rooms that leave something behind</span>
          </div>

          {/* Main Headline — Nunito Black, lowercase, large — matches reference */}
          <h1
            className="animate-enter-up font-heading font-black text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] tracking-tight leading-[1.1]"
            style={{ animationDelay: '80ms' }}
          >
            voice hangouts that{' '}
            <span className="relative inline-block">
              don't vanish.
              {/* Yellow underline accent — Clubhouse style accent mark */}
              <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#F5C518] rounded-full" aria-hidden="true" />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-enter-up text-lg sm:text-xl text-[#555555] font-medium leading-relaxed max-w-2xl mx-auto"
            style={{ animationDelay: '160ms' }}
          >
            Host spontaneous audio rooms, podcasts, or team huddles. Echo's AI automatically captures rich transcripts, key insights, and shareable recaps.
          </p>

          {/* CTA Row — charcoal primary + outline secondary — Clubhouse button style */}
          <div
            className="animate-enter-up pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: '240ms' }}
          >
            {/* Primary CTA — charcoal pill */}
            <button
              onClick={onOpenStartModal}
              className="btn-primary w-full sm:w-auto text-base py-3.5 px-8 group"
            >
              <Mic className="w-5 h-5 group-hover:rotate-12 transition-transform duration-150" />
              <span>start a free room</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
            </button>

            {/* Secondary CTA — outline style */}
            <button
              onClick={onExploreDemo}
              className="btn-secondary w-full sm:w-auto text-base py-3.5 px-8 group"
            >
              <Radio className="w-5 h-5 group-hover:scale-110 transition-transform duration-150" />
              <span>explore live demo</span>
            </button>
          </div>

          {/* Social proof pills */}
          <div
            className="animate-enter-up pt-2 flex flex-wrap items-center justify-center gap-6 text-sm text-[#888888] font-medium"
            style={{ animationDelay: '320ms' }}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> No app download needed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Instant Notion & Markdown export
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 100% free during beta
            </span>
          </div>
        </div>

        {/* Hero interactive room widget — restyled in cream/charcoal palette */}
        <div
          className="animate-enter-up mt-16 max-w-5xl mx-auto"
          style={{ animationDelay: '400ms' }}
        >
          <div className="relative rounded-3xl bg-white border border-[#E0D8CC] p-4 sm:p-6 shadow-[0_4px_32px_-4px_rgba(26,26,26,0.10)] overflow-hidden">

            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EDE8DE]">
              <div className="flex items-center gap-3">
                {/* LIVE dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-bold text-base text-[#1A1A1A]">
                      Designing the Future of Audio AI
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                      LIVE NOW
                    </span>
                  </div>
                  <p className="text-xs text-[#888888]">Hosted by Product & Engineering Guild · 42 Listeners</p>
                </div>
              </div>

              {/* Echo AI listening indicator — yellow wave bars */}
              <div className="flex items-center gap-2 bg-[#F5C518]/20 px-4 py-2 rounded-full border border-[#F5C518]/40">
                <span className="text-xs font-black text-[#1A1A1A]">Echo AI Listening</span>
                <div className="flex items-end gap-1 h-5">
                  <div className="w-1 bg-[#1A1A1A] rounded-full animate-wave-1" />
                  <div className="w-1 bg-[#1A1A1A] rounded-full animate-wave-2" />
                  <div className="w-1 bg-[#1A1A1A] rounded-full animate-wave-3" />
                  <div className="w-1 bg-[#1A1A1A] rounded-full animate-wave-4" />
                  <div className="w-1 bg-[#1A1A1A] rounded-full animate-wave-5" />
                </div>
              </div>
            </div>

            {/* Main content split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">

              {/* Left: Stage + speakers */}
              <div className="lg:col-span-7 space-y-4">
                {/* Stage art */}
                <div className="relative rounded-2xl overflow-hidden border border-[#E0D8CC] bg-[#EDE8DE] shadow-inner group/img">
                  <img
                    src="/echo_hero.jpg"
                    alt="Echo Live Audio Room"
                    className="w-full h-48 sm:h-60 object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white space-y-1">
                      <p className="text-xs font-black uppercase tracking-wider text-[#F5C518]">Active Audio Stage</p>
                      <p className="text-sm font-medium">Spontaneous banter turned into structured knowledge.</p>
                    </div>
                  </div>
                </div>

                {/* Speaker cards */}
                <div className="grid grid-cols-3 gap-3">
                  {speakers.map((sp, idx) => (
                    <div
                      key={sp.name}
                      onClick={() => setActiveSpeaker(idx)}
                      className={[
                        'p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center',
                        activeSpeaker === idx
                          ? 'bg-[#F5C518]/20 border-[#F5C518] shadow-md ring-2 ring-[#F5C518]/30 scale-[1.02]'
                          : 'bg-[#F5F0E8] border-[#E0D8CC] hover:border-[#F5C518]/50',
                      ].join(' ')}
                    >
                      <div className="relative mb-2">
                        <img
                          src={sp.avatar}
                          alt={sp.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        {activeSpeaker === idx && (
                          <div className="absolute -bottom-1 -right-1 bg-[#1A1A1A] text-[#F5C518] p-1 rounded-full shadow">
                            <Mic className="w-3 h-3 animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-black text-[#1A1A1A] truncate w-full">{sp.name}</span>
                      <span className="text-[10px] text-[#888888] font-semibold">{sp.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Live AI recap stream */}
              <div className="lg:col-span-5 bg-[#EDE8DE] rounded-2xl p-4 sm:p-5 border border-[#E0D8CC] flex flex-col justify-between space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D0C4]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                      Live AI Note-Taker
                    </span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#F5C518] text-[#1A1A1A]">
                    AUTO-COMPOSING
                  </span>
                </div>

                {/* Live speech bubble */}
                <div className="space-y-3 my-auto">
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-[#E0D8CC] shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#1A1A1A]">
                        {speakers[activeSpeaker].name}
                      </span>
                      <span className="text-[10px] text-[#888888]">Just now</span>
                    </div>
                    <p className="text-xs text-[#555555] italic">
                      "{speakers[activeSpeaker].quotes}"
                    </p>
                  </div>

                  {/* AI extracted insight */}
                  <div className="bg-[#F5C518]/20 p-3 rounded-xl border border-[#F5C518]/40 flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider block">
                        Captured Insight
                      </span>
                      <p className="text-xs font-bold text-[#1A1A1A]">
                        Key Decision: Transitioning fluid typography system for Q4 release.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-[#D8D0C4] flex items-center justify-between text-xs text-[#555555]">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    Recap ready instantly on room exit
                  </span>
                  <button
                    onClick={onExploreDemo}
                    className="font-black text-[#1A1A1A] flex items-center gap-1 hover:underline underline-offset-2 transition-all"
                  >
                    Preview <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
