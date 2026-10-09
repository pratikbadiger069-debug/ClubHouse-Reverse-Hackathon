import React, { useState } from 'react';
import { HelpCircle, Clock, VolumeX, AlertTriangle, CheckCircle2, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

/**
 * ProblemSection — Clubhouse-inspired warm cream palette
 * Background: surface-soft (#EDE8DE) instead of terracotta-tinted
 * Card borders: charcoal/cream instead of red/orange tints
 * Accent color: yellow (#F5C518) for highlighted badges
 */
export default function ProblemSection({ onOpenStartModal }) {
  const [activeTab, setActiveTab] = useState('problem');

  const painPoints = [
    {
      id: 1,
      icon: VolumeX,
      title: 'The Great Audio Evaporation',
      description: "You host a 90-minute live room packed with brilliant ideas, spontaneous strategies, and hilarious jokes. The moment the room ends... poof. It's gone forever into the void.",
      tag: 'Lost Knowledge',
    },
    {
      id: 2,
      icon: Clock,
      title: 'Timezone & Schedule FOMO',
      description: "Teammates, followers, or podcast listeners who couldn't tune in live miss out completely. Listening to an hour-long unedited raw recording is a chore nobody completes.",
      tag: 'Zero Engagement',
    },
    {
      id: 3,
      icon: AlertTriangle,
      title: 'Manual Note-Taking Kills Flow',
      description: 'Trying to scribble down action items and key takeaways while speaking breaks your natural conversational momentum. You end up managing notes instead of connecting.',
      tag: 'Ruined Spontaneity',
    },
  ];

  return (
    <section id="problem" className="py-20 bg-[#EDE8DE] border-y border-[#E0D8CC] relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5C518] text-[#1A1A1A] text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              The Ephemeral Audio Dilemma
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#1A1A1A] leading-tight">
              Why do the best live voice conversations{' '}
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                leave nothing behind?
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F5C518] rounded-full" aria-hidden="true" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#555555]">
              Voice is the most natural, high-bandwidth way humans communicate — yet standard live audio tools treat your wisdom as disposable.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Pain Points Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={item.id} animation="fade-up" delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 border border-[#E0D8CC] shadow-[0_2px_8px_-1px_rgba(26,26,26,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(26,26,26,0.12)] hover:-translate-y-1 transition-all duration-300 space-y-5 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-[#F5C518] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDE8DE] text-[#555555]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-xl text-[#1A1A1A]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E0D8CC] flex items-center gap-2 text-xs font-bold text-[#555555]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Standard Audio Room Problem</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Before vs After Echo */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-white border border-[#E0D8CC] p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(26,26,26,0.10)]">
            <div className="text-center space-y-2 mb-8">
              <h3 className="font-heading font-black text-2xl text-[#1A1A1A]">
                The Echo Transformation
              </h3>
              <p className="text-sm text-[#555555]">
                Compare standard live audio rooms with Echo's permanent memory layer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old Way */}
              <div className="bg-[#F5F0E8] rounded-2xl p-6 border border-[#E0D8CC] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D8CC]">
                  <span className="font-heading font-black text-base text-[#1A1A1A]">Standard Live Audio</span>
                  <span className="text-xs font-black text-[#888888] bg-[#EDE8DE] px-2.5 py-1 rounded-full">Ephemeral</span>
                </div>
                <ul className="space-y-3 text-sm text-[#555555]">
                  {[
                    'Audio disappears forever when room closes',
                    'No text transcript or searchable history',
                    'Listeners who missed live stream get 0 value',
                    'Speakers must manually record or take notes',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-[#888888] font-black">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Echo Way */}
              <div className="bg-[#F5C518]/15 rounded-2xl p-6 border border-[#F5C518]/40 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5C518]/30">
                  <span className="font-heading font-black text-base text-[#1A1A1A] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
                    Echo Live Rooms
                  </span>
                  <span className="text-xs font-black text-[#1A1A1A] bg-[#F5C518] px-2.5 py-1 rounded-full">
                    Permanent Knowledge
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-[#1A1A1A]">
                  {[
                    'Instant 1-click rich AI recap on exit',
                    'Speaker breakdown & searchable transcript',
                    '15-second viral audio snippets generated',
                    'Auto export action items directly to Notion & Slack',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button onClick={onOpenStartModal} className="btn-primary text-sm px-6 py-3">
                <Sparkles className="w-4 h-4" />
                build memory into your next room
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
