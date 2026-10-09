import React, { useState } from 'react';
import { Mic, Cpu, FileText, Share2, Sparkles, ArrowRight, Layers } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

/**
 * HowItWorksSection — Clubhouse-inspired cream/charcoal palette
 * Active step: yellow accent instead of terracotta
 * Step tabs: charcoal selected, cream unselected
 * Action banner: charcoal bg + yellow CTA button (inverted Clubhouse style)
 */
export default function HowItWorksSection({ onOpenStartModal }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Launch & Invite in 1-Click',
      subtitle: 'Zero Friction',
      icon: Mic,
      description: 'Create your Echo room instantly from any browser or phone. Share a simple web link — listeners join live without downloading an app or creating an account.',
      detailBadge: 'Browser Native · Instant Link',
      demoPreview: {
        heading: 'Create Room',
        val: 'Weekly Founders Huddle #42',
        actionBtn: 'Start Live Stage',
      },
    },
    {
      number: 2,
      title: 'Talk Naturally, AI Listens',
      subtitle: 'Silent Co-Host',
      icon: Cpu,
      description: "Focus 100% on active discussion. Echo's AI listener silently identifies speaker voices, transcribes in real-time, and flags important moments without interrupting.",
      detailBadge: 'Multi-Speaker Voice ID',
      demoPreview: {
        heading: 'Live AI Transcriber',
        val: "Sarah: 'Let's launch the beta on Tuesday morning...'",
        actionBtn: 'AI Bookmarking Active',
      },
    },
    {
      number: 3,
      title: 'Instant Recap On Exit',
      subtitle: 'Zero Delay',
      icon: FileText,
      description: 'The moment the host ends the room, Echo synthesizes the entire session into a structured recap card: executive summary, key takeaways, and action items.',
      detailBadge: 'Generated in < 3 seconds',
      demoPreview: {
        heading: 'Recap Generated',
        val: '✓ Beta launch confirmed for Tuesday 9AM EST.',
        actionBtn: 'View 3 Audio Clips',
      },
    },
    {
      number: 4,
      title: 'Share & Search Forever',
      subtitle: 'Permanent Memory',
      icon: Share2,
      description: 'Distribute your room recap to your community or team. Embed audio quotes on Twitter/X, export to Notion or Slack, or search across past rooms anytime.',
      detailBadge: 'Notion & Slack Export',
      demoPreview: {
        heading: 'Knowledge Hub',
        val: 'Exported to #general-announcements',
        actionBtn: 'Share Recap Link',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-[#F5C518] text-xs font-black uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              Simple 4-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#1A1A1A] leading-tight">
              How Echo leaves a lasting memory{' '}
              <br className="hidden sm:block" />
              in{' '}
              <span className="relative inline-block">
                4 effortless steps
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F5C518] rounded-full" aria-hidden="true" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#555555]">
              From spontaneous mic open to shareable recap in seconds. No extra work for hosts or listeners.
            </p>
          </div>
        </ScrollReveal>

        {/* Step selector tabs */}
        <ScrollReveal animation="fade-up" delay={80}>
          <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2">
            {steps.map((s) => (
              <button
                key={s.number}
                onClick={() => setActiveStep(s.number)}
                className={[
                  'flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap',
                  activeStep === s.number
                    ? 'bg-[#1A1A1A] text-[#F5F0E8] shadow-md'
                    : 'bg-white text-[#555555] border border-[#E0D8CC] hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]',
                ].join(' ')}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                  activeStep === s.number ? 'bg-[#F5C518] text-[#1A1A1A]' : 'bg-[#EDE8DE] text-[#555555]'
                }`}>
                  {s.number}
                </span>
                <span>Step {s.number}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const IconComp = step.icon;
            const isActive = activeStep === step.number;
            return (
              <ScrollReveal key={step.number} animation="fade-up" delay={i * 80}>
                <div
                  onClick={() => setActiveStep(step.number)}
                  className={[
                    'rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative group',
                    isActive
                      ? 'bg-white border-2 border-[#1A1A1A] shadow-[0_8px_32px_-4px_rgba(26,26,26,0.15)] scale-[1.02]'
                      : 'bg-[#EDE8DE] border border-[#E0D8CC] hover:bg-white hover:border-[#1A1A1A]/30',
                  ].join(' ')}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black font-heading ${
                      isActive ? 'bg-[#F5C518] text-[#1A1A1A]' : 'bg-white text-[#1A1A1A]'
                    }`}>
                      0{step.number}
                    </div>
                    <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                      {step.subtitle}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-5 h-5 ${isActive ? 'text-[#1A1A1A]' : 'text-[#555555]'}`} />
                      <h3 className="font-heading font-black text-base text-[#1A1A1A] leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mini preview */}
                  <div className="mt-6 pt-4 border-t border-[#E0D8CC] space-y-2">
                    <div className="bg-[#F5C518]/15 p-3 rounded-xl border border-[#F5C518]/30 text-left">
                      <div className="flex items-center justify-between text-[10px] text-[#888888] font-bold mb-1">
                        <span>{step.demoPreview.heading}</span>
                        <span className="text-[#1A1A1A]">ACTIVE</span>
                      </div>
                      <p className="text-xs font-bold text-[#1A1A1A] truncate">
                        {step.demoPreview.val}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#555555]">
                      <span>{step.detailBadge}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action banner — charcoal bg + yellow CTA */}
        <ScrollReveal animation="fade-up" delay={120}>
          <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-[#1A1A1A] p-8 text-center shadow-[0_8px_40px_-8px_rgba(26,26,26,0.30)] space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5C518] text-xs font-black">
              <Sparkles className="w-4 h-4" />
              ready to try it live?
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F5F0E8]">
              Experience the 4-step magic in under 60 seconds.
            </h3>
            <p className="text-[#888888] text-sm sm:text-base max-w-xl mx-auto">
              Host a sample room, say a few sentences into your microphone, and see Echo generate your room recap in real time.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenStartModal}
                className="btn-accent text-sm px-8 py-3.5"
              >
                <Mic className="w-4 h-4" />
                start your first room free
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
