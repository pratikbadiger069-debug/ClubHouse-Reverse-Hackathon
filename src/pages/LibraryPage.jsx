import React, { useState } from 'react';
import { Library, Search, Play, Pause, Sparkles, FileText, Share2, Copy, Check, Filter, Clock, Users, ArrowUpRight, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [playingId, setPlayingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const recaps = [
    {
      id: 1,
      title: "Building Warm AI Products & Natural UI Systems",
      date: "Oct 8, 2026",
      duration: "38 min",
      speakers: ["Maya Lin", "Devon Vance", "Siddharth Rao"],
      topic: "Design",
      summary: "Adopting rounded warm typography, terracotta palette tokens, and ambient live audio recaps creates far deeper human resonance than hyper-analytical dark modes.",
      audioQuote: "When you listen to a recap, hearing 5 seconds of the speaker's real voice builds instant trust.",
      actionItem: "Adopt 32px rounded-3xl container radii across all Echo landing surfaces."
    },
    {
      id: 2,
      title: "Sub-100ms Streaming Audio & Real-time AI Transcripts",
      date: "Oct 6, 2026",
      duration: "42 min",
      speakers: ["Marcus Chen", "Elena Vance"],
      topic: "Engineering",
      summary: "How WebSockets and binary audio buffers enable sub-100ms transcription latency while maintaining high precision for multi-speaker identification.",
      audioQuote: "Binary web-audio streaming tokens cut server transcription latency by 45%.",
      actionItem: "Finalize WebSocket fallback strategy for unreliable mobile connections."
    },
    {
      id: 3,
      title: "Product Roadmap Q4: Notion Webhooks & Community Recaps",
      date: "Oct 3, 2026",
      duration: "29 min",
      speakers: ["Aria Patel", "Sarah Jenkins"],
      topic: "Product",
      summary: "Exploring automatic Notion database syncing, Slack webhook triggers, and shareable public recap URLs for non-listeners.",
      audioQuote: "Notion export is our single most requested feature from beta podcast hosts.",
      actionItem: "Publish Notion integration API documentation by Friday."
    },
    {
      id: 4,
      title: "Voice Knowledge Systems vs Static Documentation",
      date: "Sep 28, 2026",
      duration: "51 min",
      speakers: ["Devon Vance", "Maya Lin"],
      topic: "Knowledge",
      summary: "Why voice-first conversations capture emotional nuance and intent better than static docs, and how AI bridges the searchability gap.",
      audioQuote: "The future of documentation is conversational search over real audio moments.",
      actionItem: "Create semantic search index over all past community huddles."
    }
  ];

  const handleCopy = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredRecaps = recaps.filter(r => {
    const matchesFilter = activeFilter === 'All' || r.topic === activeFilter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.speakers.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F0E5DC]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold uppercase tracking-wider border border-[#FDE68A]">
                <Library className="w-4 h-4" />
                Permanent Knowledge Archive
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
                Echo Recap Library
              </h1>
              <p className="text-sm sm:text-base text-[#6B5E57] max-w-xl">
                Browse executive summaries, key takeaways, and 15-second audio highlights from all past Echo rooms.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#9E8E85] bg-[#FAF5F0] px-4 py-2.5 rounded-full border border-[#F0E5DC]">
                {recaps.length} Saved Recaps
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0" role="tablist" aria-label="Recap categories">
            {['All', 'Design', 'Engineering', 'Product', 'Knowledge'].map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={activeFilter === t}
                onClick={() => setActiveFilter(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                  activeFilter === t
                    ? 'bg-[#E05638] text-white shadow-md'
                    : 'bg-white text-[#6B5E57] border border-[#F0E5DC] hover:border-[#E05638]/40'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#9E8E85] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recaps by keyword or speaker..."
              aria-label="Search audio recaps"
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-[#F0E5DC] text-xs text-[#2D231E] placeholder-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
            />
          </div>
        </div>

        {/* Recaps List */}
        <div className="space-y-6">
          {filteredRecaps.map((item) => (
            <ScrollReveal key={item.id} animation="fade-up">
              <Card variant="default" className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5ECE5]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF0EB] text-[#E05638]">
                        {item.topic}
                      </span>
                      <span className="text-xs text-[#9E8E85]">{item.date} • {item.duration}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#2D231E]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleCopy(item.id)}
                      icon={copiedId === item.id ? Check : Copy}
                    >
                      {copiedId === item.id ? 'Copied!' : 'Copy Markdown'}
                    </Button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Summary Column */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E05638]">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Executive Summary</span>
                    </div>
                    <p className="text-sm text-[#6B5E57] leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#2D231E]">
                      <Users className="w-4 h-4 text-[#9E8E85]" />
                      <span>Speakers: {item.speakers.join(', ')}</span>
                    </div>
                  </div>

                  {/* Audio Quote Player Widget Column */}
                  <div className="lg:col-span-5 bg-[#FAF4EE] p-4 rounded-2xl border border-[#F0E5DC] space-y-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Key Audio Moment
                      </span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold text-[#6B5E57]">15s Clip</span>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-[#F0E5DC]">
                      <button 
                        onClick={() => setPlayingId(playingId === item.id ? null : item.id)}
                        aria-label={playingId === item.id ? "Pause audio highlight" : "Play audio highlight"}
                        className="w-10 h-10 rounded-full bg-[#E05638] text-white flex items-center justify-center shrink-0 shadow hover:scale-105 transition-transform"
                      >
                        {playingId === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <p className="text-xs text-[#2D231E] italic font-medium">
                        "{item.audioQuote}"
                      </p>
                    </div>

                    <div className="text-[11px] text-[#047857] bg-[#ECFDF5] px-3 py-1.5 rounded-xl border border-[#A7F3D0] flex items-center gap-1.5 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Task: {item.actionItem}</span>
                    </div>
                  </div>

                </div>

              </Card>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
