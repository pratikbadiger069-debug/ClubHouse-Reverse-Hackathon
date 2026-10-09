import React, { useState } from 'react';
import { HelpCircle, Clock, VolumeX, AlertTriangle, CheckCircle2, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ProblemSection({ onOpenStartModal }) {
  const [activeTab, setActiveTab] = useState('problem');

  const painPoints = [
    {
      id: 1,
      icon: VolumeX,
      title: "The Great Audio Evaporation",
      description: "You host a 90-minute live room packed with brilliant ideas, spontaneous strategies, and hilarious jokes. The moment the room ends... poof. It's gone forever into the void.",
      tag: "Lost Knowledge"
    },
    {
      id: 2,
      icon: Clock,
      title: "Timezone & Schedule FOMO",
      description: "Teammates, followers, or podcast listeners who couldn't tune in live miss out completely. Listening to an hour-long unedited raw recording is a chore nobody completes.",
      tag: "Zero Engagement"
    },
    {
      id: 3,
      icon: AlertTriangle,
      title: "Manual Note-Taking Kills Flow",
      description: "Trying to scribble down action items and key takeaways while speaking breaks your natural conversational momentum. You end up managing notes instead of connecting.",
      tag: "Ruined Spontaneity"
    }
  ];

  return (
    <section id="problem" className="py-20 bg-[#FAF4EE] border-y border-[#F0E5DC] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFEAE0] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE4D6] text-[#E05638] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            The Ephemeral Audio Dilemma
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
            Why do the best live voice conversations <br className="hidden sm:block" />
            <span className="text-[#E05638]">leave nothing behind?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B5E57]">
            Voice is the most natural, high-bandwidth way humans communicate — yet standard live audio tools treat your wisdom as disposable.
          </p>
        </div>

        {/* 3 Pain Points Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-[#F0E5DC] shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#E05638] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF0E8] text-[#9E8E85]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#2D231E]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B5E57] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5ECE5] flex items-center gap-2 text-xs font-semibold text-[#E05638]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Standard Audio Room Problem</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Before vs After Echo Interactive Contrast Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-white border border-[#F0E5DC] p-6 sm:p-8 shadow-xl">
          <div className="text-center space-y-2 mb-8">
            <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
              The Echo Transformation
            </h3>
            <p className="text-sm text-[#6B5E57]">
              Compare standard live audio rooms with Echo's permanent memory layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Old Way */}
            <div className="bg-[#FFF5F5] rounded-2xl p-6 border border-[#FEE2E2] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#FCA5A5]/30">
                <span className="font-heading font-bold text-base text-[#991B1B]">Standard Live Audio</span>
                <span className="text-xs font-bold text-[#DC2626] bg-white px-2.5 py-1 rounded-full">Ephemeral</span>
              </div>
              <ul className="space-y-3 text-sm text-[#7F1D1D]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">✕</span>
                  <span>Audio disappears forever when room closes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">✕</span>
                  <span>No text transcript or searchable history</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">✕</span>
                  <span>Listeners who missed live stream get 0 value</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">✕</span>
                  <span>Speakers must manually record or take notes</span>
                </li>
              </ul>
            </div>

            {/* Echo Way */}
            <div className="bg-[#ECFDF5] rounded-2xl p-6 border border-[#A7F3D0] space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-3 border-b border-[#6EE7B7]/40">
                <span className="font-heading font-bold text-base text-[#065F46] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  Echo Live Rooms
                </span>
                <span className="text-xs font-bold text-[#047857] bg-white px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                  Permanent Knowledge
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#064E3B]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Instant 1-click rich AI recap on exit</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Speaker breakdown & searchable transcript</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>15-second viral audio snippets generated</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Auto export action items directly to Notion & Slack</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Section CTA button */}
          <div className="mt-8 text-center">
            <button 
              onClick={onOpenStartModal}
              className="btn-primary text-sm px-6 py-3"
            >
              <Sparkles className="w-4 h-4" />
              Build Memory Into Your Next Room
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
