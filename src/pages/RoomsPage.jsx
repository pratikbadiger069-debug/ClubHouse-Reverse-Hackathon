import React, { useState } from 'react';
import { Radio, Users, Mic, Sparkles, Filter, Search, ArrowRight, Clock, Plus, Volume2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function RoomsPage({ onOpenStartModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const liveRooms = [
    {
      id: 1,
      title: "Designing Fluid UI Tokens & Warm Design Systems",
      category: "Design",
      host: "Elena Vance",
      hostRole: "Head of Product Design",
      hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      listeners: 142,
      duration: "24m elapsed",
      isLive: true,
      tags: ["Design Tokens", "Tailwind", "Accessibility"],
      recentSnippet: "We're replacing rigid 8px offsets with fluid clamp formulas for dynamic layouts..."
    },
    {
      id: 2,
      title: "AI Audio Models: Real-time Transcription at Scale",
      category: "Engineering",
      host: "Marcus Chen",
      hostRole: "Staff AI Engineer",
      hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      listeners: 89,
      duration: "45m elapsed",
      isLive: true,
      tags: ["Whisper AI", "WebSockets", "Latency"],
      recentSnippet: "Sub-100ms streaming audio tokens allow instantaneous AI recap bookmarking..."
    },
    {
      id: 3,
      title: "Community Huddle: Product Roadmap Q4 Q&A",
      category: "Product",
      host: "Aria Patel",
      hostRole: "VP of Product",
      hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      listeners: 210,
      duration: "12m elapsed",
      isLive: true,
      tags: ["Roadmap", "Community", "Features"],
      recentSnippet: "Our top requested feature is direct export to Notion database webhooks..."
    }
  ];

  const upcomingRooms = [
    {
      id: 4,
      title: "Voice-First Knowledge Management Masterclass",
      category: "Knowledge",
      host: "Devon Vance",
      time: "Today at 5:00 PM EST",
      scheduledBy: "184 set reminders",
      tags: ["Notion", "Productivity", "Audio"]
    },
    {
      id: 5,
      title: "Building Accessible Web Apps with WCAG AAA Standards",
      category: "Design",
      host: "Sarah Jenkins",
      time: "Tomorrow at 11:00 AM EST",
      scheduledBy: "94 set reminders",
      tags: ["a11y", "ARIA", "Color Contrast"]
    }
  ];

  const categories = ['All', 'Design', 'Engineering', 'Product', 'Knowledge'];

  const filteredLive = liveRooms.filter(r => {
    const matchesCat = activeCategory === 'All' || r.category === activeCategory;
    const matchesQuery = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F0E5DC]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#10B981] text-xs font-bold uppercase tracking-wider border border-[#A7F3D0]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                Live Audio Directory
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
                Active Echo Rooms
              </h1>
              <p className="text-sm sm:text-base text-[#6B5E57] max-w-xl">
                Tune into live voice conversations or start your own. Every room automatically captures key insights into a permanent recap archive.
              </p>
            </div>

            <Button 
              variant="primary" 
              size="lg"
              onClick={onOpenStartModal}
              icon={Plus}
            >
              Start a Live Room
            </Button>
          </div>
        </ScrollReveal>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0" role="tablist" aria-label="Room categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                  activeCategory === cat
                    ? 'bg-[#E05638] text-white shadow-md'
                    : 'bg-white text-[#6B5E57] border border-[#F0E5DC] hover:border-[#E05638]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#9E8E85] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live rooms..."
              aria-label="Search live audio rooms by topic or tag"
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-[#F0E5DC] text-xs text-[#2D231E] placeholder-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
            />
          </div>
        </div>

        {/* Live Rooms Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-[#2D231E] flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#E05638]" />
              Happening Right Now ({filteredLive.length})
            </h2>
          </div>

          {filteredLive.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLive.map((room) => (
                <ScrollReveal key={room.id} animation="fade-up">
                  <Card variant="default" className="flex flex-col justify-between space-y-6 h-full">
                    <div className="space-y-4">
                      
                      {/* Room Header & Live Pill */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFF0EB] text-[#E05638]">
                          {room.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                          LIVE • {room.listeners} listeners
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-lg text-[#2D231E] leading-snug">
                        {room.title}
                      </h3>

                      {/* Host Info */}
                      <div className="flex items-center gap-3 pt-2">
                        <img 
                          src={room.hostAvatar} 
                          alt={`Host avatar for ${room.host}`} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
                        />
                        <div className="text-xs">
                          <p className="font-bold text-[#2D231E]">{room.host}</p>
                          <p className="text-[#9E8E85]">{room.hostRole}</p>
                        </div>
                      </div>

                      {/* Live Speech snippet */}
                      <div className="bg-[#FAF4EE] p-3 rounded-2xl border border-[#F0E5DC] text-xs space-y-1">
                        <span className="text-[10px] font-bold text-[#E05638] uppercase tracking-wider block">Real-time Audio Stream</span>
                        <p className="text-[#6B5E57] italic">"{room.recentSnippet}"</p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-[#F5ECE5] flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {room.tags.map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-[#FAF0E8] text-[#6B5E57] px-2 py-0.5 rounded-md">
                            #{t}
                          </span>
                        ))}
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={onOpenStartModal}
                        icon={Mic}
                      >
                        Join Room
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <Card variant="warm" className="text-center py-12 space-y-3">
              <Volume2 className="w-10 h-10 text-[#9E8E85] mx-auto" />
              <h3 className="font-heading font-bold text-lg text-[#2D231E]">No live rooms found</h3>
              <p className="text-xs text-[#6B5E57]">Try changing your search terms or host your own room now!</p>
              <div className="pt-2">
                <Button variant="primary" size="sm" onClick={onOpenStartModal}>
                  Start First Room
                </Button>
              </div>
            </Card>
          )}
        </section>

        {/* Upcoming Scheduled Rooms */}
        <section className="space-y-6 pt-6">
          <h2 className="font-heading font-bold text-xl text-[#2D231E] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            Upcoming Scheduled Sessions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingRooms.map((room) => (
              <Card key={room.id} variant="warm" className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
                      {room.category}
                    </span>
                    <span className="text-xs font-semibold text-[#6B5E57]">
                      {room.time}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#2D231E]">
                    {room.title}
                  </h3>
                  <p className="text-xs text-[#9E8E85]">Hosted by <strong className="text-[#2D231E]">{room.host}</strong> • {room.scheduledBy}</p>
                </div>

                <div className="pt-3 border-t border-[#F0E5DC] flex items-center justify-between">
                  <span className="text-xs text-[#E05638] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                    Set RSVP Reminder <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Button variant="secondary" size="sm">
                    Remind Me
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
