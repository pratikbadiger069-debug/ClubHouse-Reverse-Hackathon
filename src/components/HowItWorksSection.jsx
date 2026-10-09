import React, { useState } from 'react';
import { Mic, Radio, Cpu, FileText, Share2, Sparkles, Check, ArrowRight, Play, Layers } from 'lucide-react';

export default function HowItWorksSection({ onOpenStartModal }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Launch & Invite in 1-Click",
      subtitle: "Zero Friction",
      icon: Mic,
      description: "Create your Echo room instantly from any browser or phone. Share a simple web link—listeners can join live without downloading an app or creating an account.",
      detailBadge: "Browser Native • Instant Link",
      demoPreview: {
        heading: "Create Room",
        fieldLabel: "Room Title",
        val: "Weekly Founders Huddle #42",
        actionBtn: "Start Live Stage"
      }
    },
    {
      number: 2,
      title: "Talk Naturally, AI Listens",
      subtitle: "Silent Co-Host",
      icon: Cpu,
      description: "Focus 100% on active discussion. Echo’s warm AI listener silently identifies speaker voices, transcribes in real-time, and flags important moments without interrupting.",
      detailBadge: "Multi-Speaker Voice ID",
      demoPreview: {
        heading: "Live AI Transcriber",
        fieldLabel: "Active Speaker",
        val: "Sarah: 'Let's launch the beta on Tuesday morning...'",
        actionBtn: "AI Bookmarking Active"
      }
    },
    {
      number: 3,
      title: "Instant Recap On Exit",
      subtitle: "Zero Delay",
      icon: FileText,
      description: "The moment the host ends the room, Echo synthesizes the entire session into a structured recap card: executive summary, key takeaways, and action items.",
      detailBadge: "Generated in < 3 seconds",
      demoPreview: {
        heading: "Recap Generated",
        fieldLabel: "Key Takeaway",
        val: "✓ Beta launch confirmed for Tuesday 9AM EST.",
        actionBtn: "View 3 Audio Clips"
      }
    },
    {
      number: 4,
      title: "Share & Search Forever",
      subtitle: "Permanent Memory",
      icon: Share2,
      description: "Distribute your room's recap page to your community or team. Embed audio quotes on Twitter/X, export to Notion or Slack, or search across past rooms anytime.",
      detailBadge: "Notion & Slack Export",
      demoPreview: {
        heading: "Knowledge Hub",
        fieldLabel: "Export Target",
        val: "Exported to #general-announcements",
        actionBtn: "Share Recap Link"
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0EB] text-[#E05638] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
            How Echo leaves a lasting memory <br className="hidden sm:block" />
            in <span className="text-[#E05638]">4 effortless steps</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B5E57]">
            From spontaneous mic open to shareable recap in seconds. No extra work for hosts or listeners.
          </p>
        </div>

        {/* Step Selector Tabs for Mobile & Quick Jump */}
        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {steps.map((s) => (
            <button
              key={s.number}
              onClick={() => setActiveStep(s.number)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeStep === s.number
                  ? 'bg-[#E05638] text-white shadow-md'
                  : 'bg-white text-[#6B5E57] border border-[#F0E5DC] hover:border-[#E05638]/40'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                activeStep === s.number ? 'bg-white text-[#E05638]' : 'bg-[#FAF4EE] text-[#6B5E57]'
              }`}>
                {s.number}
              </span>
              <span>Step {s.number}</span>
            </button>
          ))}
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComp = step.icon;
            const isActive = activeStep === step.number;
            return (
              <div 
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                  isActive 
                    ? 'bg-white border-2 border-[#E05638] shadow-xl scale-[1.02]' 
                    : 'bg-[#FAF5F0] border border-[#F0E5DC] hover:bg-white hover:border-[#E05638]/40'
                }`}
              >
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold font-heading ${
                    isActive ? 'bg-[#E05638] text-white' : 'bg-[#FFF0EB] text-[#E05638]'
                  }`}>
                    0{step.number}
                  </div>
                  <span className="text-[11px] font-bold text-[#9E8E85] uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-5 h-5 ${isActive ? 'text-[#E05638]' : 'text-[#6B5E57]'}`} />
                    <h3 className="font-heading font-bold text-lg text-[#2D231E]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B5E57] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Micro Preview Component inside card */}
                <div className="mt-6 pt-4 border-t border-[#F0E5DC] space-y-2">
                  <div className="bg-[#FFF8F3] p-3 rounded-xl border border-[#FCD9CE] text-left">
                    <div className="flex items-center justify-between text-[10px] text-[#9E8E85] font-semibold mb-1">
                      <span>{step.demoPreview.heading}</span>
                      <span className="text-[#E05638]">ACTIVE</span>
                    </div>
                    <p className="text-xs font-semibold text-[#2D231E] truncate">
                      {step.demoPreview.val}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#E05638]">
                    <span>{step.detailBadge}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-[#E05638] to-[#FF6B4A] p-8 text-white text-center shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            Ready to try it live?
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl">
            Experience the 4-step magic in under 60 seconds.
          </h3>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto">
            Host a sample room, say a few sentences into your microphone, and see Echo generate your room recap in real time.
          </p>
          <div className="pt-2">
            <button 
              onClick={onOpenStartModal}
              className="bg-white text-[#2D231E] hover:bg-[#FFF3EB] font-heading font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-[#E05638]" />
              Start Your First Room Free
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
