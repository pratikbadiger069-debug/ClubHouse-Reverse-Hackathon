import React, { useState, useEffect } from 'react';
import { Mic, Play, ArrowRight, Sparkles, Radio, Users, CheckCircle2, FileText, Zap, MessageSquare } from 'lucide-react';

export default function HeroSection({ onOpenStartModal, onExploreDemo }) {
  const [activeSpeaker, setActiveSpeaker] = useState(0);

  const speakers = [
    { name: 'Elena Vance', role: 'Host', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', active: true, quotes: 'We should transition our core design system to fluid typography...' },
    { name: 'Marcus Chen', role: 'Speaker', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', active: false, quotes: 'Agreed! And Echo is taking real-time notes for us right now!' },
    { name: 'Aria Patel', role: 'Speaker', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', active: false, quotes: 'Can we automatically push the action items directly into Slack?' }
  ];

  // Rotate active speaker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpeaker((prev) => (prev + 1) % speakers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Warm Ambient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFE4D6] via-[#FFF3EB] to-[#FEF3C7] rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#E05638]/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFF0EB] border border-[#FCD9CE] text-[#E05638] text-xs sm:text-sm font-semibold shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05638] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E05638]"></span>
            </span>
            <span>Live Audio Rooms That Leave Something Behind</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#2D231E] tracking-tight leading-[1.15]">
            Voice hangouts that don’t <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05638] via-[#FF6B4A] to-[#F59E0B]">
              vanish into thin air.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#6B5E57] font-normal leading-relaxed max-w-2xl mx-auto">
            Host spontaneous audio rooms, podcasts, or team huddles. Echo’s warm AI automatically captures rich transcripts, key insights, and shareable audio recaps.
          </p>

          {/* Two CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <button 
              onClick={onOpenStartModal}
              className="btn-primary w-full sm:w-auto text-base py-4 px-8 shadow-lg group"
            >
              <Mic className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Start a Free Room</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button 
              onClick={onExploreDemo}
              className="btn-secondary w-full sm:w-auto text-base py-4 px-8 group"
            >
              <Radio className="w-5 h-5 text-[#E05638] group-hover:scale-110 transition-transform" />
              <span>Explore Live Recap Demo</span>
            </button>
          </div>

          {/* Social Proof Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#9E8E85] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> No app download needed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Instant Markdown & Notion export
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 100% Free during Beta
            </span>
          </div>
        </div>

        {/* Hero Interactive Card & Visual Showcase */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-white border border-[#F0E5DC] p-4 sm:p-6 shadow-2xl overflow-hidden group">
            
            {/* Top Bar of Room Widget */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#FAF0E8]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#E05638] animate-ping" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-base text-[#2D231E]">
                      Designing the Future of Audio AI
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                      LIVE NOW
                    </span>
                  </div>
                  <p className="text-xs text-[#9E8E85]">Hosted by Product & Engineering Guild • 42 Listeners</p>
                </div>
              </div>

              {/* Animated Live Wave Indicator */}
              <div className="flex items-center gap-2 bg-[#FFF3EB] px-4 py-2 rounded-full border border-[#FCD9CE]">
                <span className="text-xs font-semibold text-[#E05638]">Echo AI Listening</span>
                <div className="flex items-end gap-1 h-5">
                  <div className="w-1 bg-[#E05638] rounded-full animate-wave-1"></div>
                  <div className="w-1 bg-[#E05638] rounded-full animate-wave-2"></div>
                  <div className="w-1 bg-[#E05638] rounded-full animate-wave-3"></div>
                  <div className="w-1 bg-[#E05638] rounded-full animate-wave-4"></div>
                  <div className="w-1 bg-[#E05638] rounded-full animate-wave-5"></div>
                </div>
              </div>
            </div>

            {/* Main Content Split: Live Stage + Realtime AI Notes Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
              
              {/* Left Column: Active Stage & Hero Art */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Hero Illustration Graphic */}
                <div className="relative rounded-2xl overflow-hidden border border-[#F0E5DC] bg-[#FAF4EE] shadow-inner group/img">
                  <img 
                    src="/echo_hero.jpg" 
                    alt="Echo Live Audio Room Illustration" 
                    className="w-full h-48 sm:h-60 object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D231E]/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB6A3]">Active Audio Stage</p>
                      <p className="text-sm font-medium">Spontaneous banter turned into structured knowledge.</p>
                    </div>
                  </div>
                </div>

                {/* Speakers Avatars Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {speakers.map((sp, idx) => (
                    <div 
                      key={sp.name}
                      onClick={() => setActiveSpeaker(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                        activeSpeaker === idx 
                          ? 'bg-[#FFF3EB] border-[#E05638] shadow-md ring-2 ring-[#E05638]/20 scale-[1.02]' 
                          : 'bg-[#FAF5F0] border-[#F0E5DC] hover:border-[#E05638]/40'
                      }`}
                    >
                      <div className="relative mb-2">
                        <img 
                          src={sp.avatar} 
                          alt={sp.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                        />
                        {activeSpeaker === idx && (
                          <div className="absolute -bottom-1 -right-1 bg-[#E05638] text-white p-1 rounded-full shadow">
                            <Mic className="w-3 h-3 animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#2D231E] truncate w-full">{sp.name}</span>
                      <span className="text-[10px] text-[#9E8E85] font-medium">{sp.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Realtime Transcript & AI Recap Stream */}
              <div className="lg:col-span-5 bg-[#FAF4EE] rounded-2xl p-4 sm:p-5 border border-[#F0E5DC] flex flex-col justify-between space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D5]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E05638]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2D231E]">
                      Live AI Note-Taker
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E05638]/10 text-[#E05638]">
                    AUTO-COMPOSING
                  </span>
                </div>

                {/* Simulated Live Speech Bubble */}
                <div className="space-y-3 my-auto">
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-[#F0E5DC] shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D231E]">
                        {speakers[activeSpeaker].name}
                      </span>
                      <span className="text-[10px] text-[#9E8E85]">Just now</span>
                    </div>
                    <p className="text-xs text-[#6B5E57] italic">
                      "{speakers[activeSpeaker].quotes}"
                    </p>
                  </div>

                  {/* AI Extracted Bullet */}
                  <div className="bg-[#FFF8F3] p-3 rounded-xl border border-[#FCD9CE] flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-[#E05638] uppercase tracking-wider block">
                        Captured Insight
                      </span>
                      <p className="text-xs font-semibold text-[#2D231E]">
                        Key Decision: Transitioning fluid typography system for Q4 release.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Room Quick Action */}
                <div className="pt-3 border-t border-[#EAE0D5] flex items-center justify-between text-xs text-[#6B5E57]">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#E05638]" />
                    Recap ready instantly on room exit
                  </span>
                  <span className="font-bold text-[#E05638] flex items-center gap-1 cursor-pointer hover:underline" onClick={onExploreDemo}>
                    Preview <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
