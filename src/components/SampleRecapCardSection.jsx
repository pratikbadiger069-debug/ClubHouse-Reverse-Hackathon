import React, { useState } from 'react';
import { Play, Pause, Volume2, Share2, Copy, Check, Sparkles, Clock, Users, ArrowUpRight, Zap, Lightbulb, Bookmark, MessageSquare, Download } from 'lucide-react';

export default function SampleRecapCardSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [activeSpeakerQuote, setActiveSpeakerQuote] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  const roomData = {
    title: "Building Warm AI Products & Natural UI Systems",
    date: "Recorded Yesterday at 4:30 PM • Room #142",
    duration: "38 min",
    listeners: 184,
    speakersCount: 3,
    speakers: [
      { name: "Maya Lin", role: "Product Lead", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" },
      { name: "Devon Vance", role: "Design Director", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" },
      { name: "Siddharth Rao", role: "AI Engineer", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" }
    ],
    executiveSummary: "The panel discussed how AI products often feel cold or hyper-analytical, and why adopting rounded warm typography, terracotta palette tokens, and ambient live audio recaps creates far deeper human resonance.",
    takeaways: [
      { type: "💡 Insight", text: "Human audio carries emotional nuances that plain text prompts miss. Capturing voice recaps preserves enthusiasm.", author: "Maya Lin" },
      { type: "⚡ Action Item", text: "Adopt 32px rounded-3xl container radii and warm cream background tokens across all Echo landing surfaces.", author: "Devon Vance" },
      { type: "🔥 Hot Take", text: "Linear text transcripts without speaker audio quotes are dead. Future recaps must be interactive audio moments.", author: "Siddharth Rao" }
    ],
    audioQuotes: [
      { time: "04:15", speaker: "Maya Lin", quote: "When you listen to a recap, hearing 5 seconds of the speaker's real voice builds instant trust." },
      { time: "18:30", speaker: "Devon Vance", quote: "Rounded corners and soft warm shadows signal friendliness before the user even reads a single word." },
      { time: "29:05", speaker: "Siddharth Rao", quote: "Echo's real-time AI listener processes audio tokens at sub-100ms latency without lag." }
    ]
  };

  const handleCopyRecap = () => {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const speeds = ['1x', '1.25x', '1.5x', '2x'];
  const toggleSpeed = () => {
    const idx = speeds.indexOf(playbackSpeed);
    setPlaybackSpeed(speeds[(idx + 1) % speeds.length]);
  };

  return (
    <section id="sample-recap" className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#E05638]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0EB] text-[#E05638] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Interactive Output Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
            What an Echo room <span className="text-[#E05638]">leaves behind</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B5E57]">
            This is an actual sample recap page automatically produced when an Echo live room concludes.
          </p>
        </div>

        {/* The Main Sample Recap Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-white border border-[#F0E5DC] p-6 sm:p-10 shadow-2xl space-y-8 relative">
          
          {/* Toast Notification */}
          {copiedToast && (
            <div className="absolute top-4 right-4 bg-[#2D231E] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-20">
              <Check className="w-4 h-4 text-[#10B981]" />
              Markdown Recap copied to clipboard!
            </div>
          )}

          {/* Top Header info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F5ECE5]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF0EB] text-[#E05638] border border-[#FCD9CE]">
                  ROOM RECAP #142
                </span>
                <span className="text-xs font-medium text-[#9E8E85]">
                  {roomData.date}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D231E]">
                {roomData.title}
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handleCopyRecap}
                className="btn-secondary text-xs px-4 py-2.5"
              >
                <Copy className="w-4 h-4 text-[#E05638]" />
                <span>Copy Recap</span>
              </button>
              <button 
                onClick={handleCopyRecap}
                className="btn-primary text-xs px-4 py-2.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Link</span>
              </button>
            </div>
          </div>

          {/* Room Stats & Speaker Avatars Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FAF5F0] p-4 rounded-2xl border border-[#F0E5DC]">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {roomData.speakers.map((sp, i) => (
                  <img key={i} src={sp.avatar} alt={sp.name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                ))}
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#2D231E]">3 Speakers • {roomData.listeners} Listeners</p>
                <p className="text-[#9E8E85]">Maya Lin, Devon Vance, Siddharth Rao</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#6B5E57]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E05638]" />
                {roomData.duration} total
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#F59E0B]" />
                3 Audio Soundbites
              </span>
            </div>
          </div>

          {/* Interactive Audio Highlight Player Widget */}
          <div className="bg-gradient-to-r from-[#2D231E] to-[#45362E] text-white rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse" />
                <span className="font-bold uppercase tracking-wider text-[#FFB6A3]">Top Audio Highlight Clip</span>
              </div>
              <button 
                onClick={toggleSpeed}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 font-mono text-[11px] transition-colors"
              >
                Speed: {playbackSpeed}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-[#E05638] hover:bg-[#C9472B] text-white flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center justify-between text-xs text-[#FFD8CD] font-medium">
                  <span className="truncate">"{roomData.audioQuotes[activeSpeakerQuote].quote}"</span>
                  <span className="font-mono text-[11px] ml-2">{roomData.audioQuotes[activeSpeakerQuote].time}</span>
                </div>

                {/* Scrub Bar */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setAudioProgress(Math.round((clickX / rect.width) * 100));
                  }}
                  className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer relative"
                >
                  <div 
                    className="bg-gradient-to-r from-[#E05638] to-[#F59E0B] h-full rounded-full transition-all duration-150"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-[#2D231E] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E05638]" />
              Executive AI Summary
            </h4>
            <p className="text-sm sm:text-base text-[#6B5E57] leading-relaxed bg-[#FFF8F3] p-4 rounded-2xl border border-[#FCD9CE]">
              {roomData.executiveSummary}
            </p>
          </div>

          {/* Key Takeaways Grid */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg text-[#2D231E]">
              Key Room Takeaways
            </h4>
            <div className="space-y-3">
              {roomData.takeaways.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-[#F0E5DC] shadow-sm hover:border-[#E05638]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#E05638]">{item.type}</span>
                    <p className="text-sm font-semibold text-[#2D231E]">{item.text}</p>
                  </div>
                  <span className="text-xs text-[#9E8E85] font-medium shrink-0">
                    Spoken by <strong className="text-[#2D231E]">{item.author}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Speaker Quote Selector */}
          <div className="space-y-4 pt-4 border-t border-[#F5ECE5]">
            <h4 className="font-heading font-bold text-lg text-[#2D231E] flex items-center justify-between">
              <span>Interactive Speaker Audio Quotes</span>
              <span className="text-xs text-[#9E8E85] font-normal">Click to play soundbite</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roomData.audioQuotes.map((q, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveSpeakerQuote(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    activeSpeakerQuote === idx
                      ? 'bg-[#FFF0EB] border-[#E05638] ring-2 ring-[#E05638]/20 shadow-md'
                      : 'bg-[#FAF5F0] border-[#F0E5DC] hover:border-[#E05638]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-[#2D231E]">{q.speaker}</span>
                    <span className="text-[#E05638] font-mono text-[10px]">{q.time}</span>
                  </div>
                  <p className="text-xs text-[#6B5E57] italic line-clamp-3">
                    "{q.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer Banner */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F5ECE5] text-xs text-[#9E8E85]">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#10B981]" />
              Verified Echo AI Knowledge Artifact
            </span>
            <span className="text-[#E05638] font-semibold flex items-center gap-1 cursor-pointer hover:underline" onClick={handleCopyRecap}>
              Export to Notion, Markdown & Web <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
