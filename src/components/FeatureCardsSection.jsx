import React, { useState } from 'react';
import { Users, Scissors, CheckSquare, Search, Sparkles, Play, Pause, ArrowRight, Check, Volume2 } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

/**
 * FeatureCardsSection — Clubhouse-inspired cream/charcoal/yellow palette
 * Section bg: cream soft (#EDE8DE)
 * Feature icon boxes: charcoal fill + yellow icon color
 * Demo widgets: yellow-tint borders instead of colored tints
 * Interactive elements fully preserved
 */
export default function FeatureCardsSection() {
  const [isPlayingSnippet, setIsPlayingSnippet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('roadmap');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finalize brand design system tokens', assignee: 'Elena', done: true },
    { id: 2, text: 'Schedule beta demo with community test group', assignee: 'Marcus', done: false },
    { id: 3, text: 'Integrate Notion workspace webhook', assignee: 'Aria', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const searchResults = [
    { time: '14:22', room: 'Product Strategy Huddle', snippet: '...we will finalize the roadmap after testing the new UI components...' },
    { time: '28:10', room: 'Design Review Ep. 12', snippet: '...our Q4 roadmap puts heavy focus on mobile responsiveness...' },
  ].filter(r =>
    r.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* Shared card wrapper */
  const FeatureCard = ({ children }) => (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D8CC] shadow-[0_2px_8px_-1px_rgba(26,26,26,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(26,26,26,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
      {children}
    </div>
  );

  return (
    <section id="features" className="py-20 bg-[#EDE8DE] border-t border-[#E0D8CC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5C518] text-[#1A1A1A] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Built for Voice-First Knowledge
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#1A1A1A] leading-tight">
              4 superpowers that turn live audio{' '}
              <br className="hidden sm:block" />
              into{' '}
              <span className="relative inline-block">
                permanent assets
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F5C518] rounded-full" aria-hidden="true" />
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#555555]">
              Every Echo room is backed by intelligent speech analysis designed for warm, human collaboration.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: Speaker Breakdown */}
          <ScrollReveal animation="fade-up" delay={0}>
            <FeatureCard>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-[#F5C518] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#1A1A1A]">
                  1. Multi-Speaker Breakdown
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Echo instantly maps who spoke when. Color-coded speaker avatars show exact dialogue flow with timestamped quotes so context is never confused.
                </p>
              </div>

              <div className="bg-[#F5F0E8] rounded-2xl p-4 border border-[#E0D8CC] space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-[#888888]">
                  <span>LIVE SPEAKER TIMELINE</span>
                  <span className="text-[#1A1A1A]">3 SPEAKERS DETECTED</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { initials: 'EV', name: 'Elena Vance', time: '04:12', quote: '"Let\'s focus on user accessibility and rounded UI tokens..."' },
                    { initials: 'MC', name: 'Marcus Chen', time: '06:45', quote: '"I have the Tailwind theme tokens ready for review."' },
                  ].map((sp, i) => (
                    <div key={sp.initials} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#F5C518] flex items-center justify-center font-black text-xs shrink-0">
                        {sp.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-[#1A1A1A]">{sp.name}</span>
                          <span className="text-[10px] text-[#888888]">{sp.time}</span>
                        </div>
                        <p className="text-[#555555] truncate">{sp.quote}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card 2: Soundbite Clipper */}
          <ScrollReveal animation="fade-up" delay={80}>
            <FeatureCard>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-[#F5C518] flex items-center justify-center">
                  <Scissors className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#1A1A1A]">
                  2. Smart Soundbite Clipper
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Echo automatically identifies high-energy, high-insight moments and extracts 15-second shareable audio snippets with auto-generated visual captions.
                </p>
              </div>

              <div className="bg-[#F5C518]/15 rounded-2xl p-4 border border-[#F5C518]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">Soundbite #02</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-black text-[#1A1A1A]">15s</span>
                  </div>
                  <button
                    onClick={() => setIsPlayingSnippet(!isPlayingSnippet)}
                    className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#F5C518] flex items-center justify-center shadow hover:scale-105 transition-transform"
                  >
                    {isPlayingSnippet ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#F5C518]/30 space-y-2">
                  <p className="text-xs font-semibold text-[#1A1A1A] italic">
                    "{isPlayingSnippet ? 'Voice is the most natural high-bandwidth way humans communicate...' : 'Click play to listen to 15s highlight...'}"
                  </p>
                  <div className="flex items-center gap-1 h-6">
                    {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 40, 65, 90, 50].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${isPlayingSnippet ? 'bg-[#F5C518] animate-pulse' : 'bg-[#E0D8CC]'}`}
                        style={{ height: isPlayingSnippet ? `${Math.max(10, (h * (0.5 + Math.random() * 0.5))).toFixed(0)}%` : `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card 3: Action Checklist */}
          <ScrollReveal animation="fade-up" delay={40}>
            <FeatureCard>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10B981] text-white flex items-center justify-center">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#1A1A1A]">
                  3. Auto Action Item Checklist
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Echo detects verbal agreements like "I'll handle the design" and converts them into checkable tasks assigned to room participants with 1-tap Notion export.
                </p>
              </div>

              <div className="bg-[#ECFDF5] rounded-2xl p-4 border border-[#A7F3D0] space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-[#065F46] mb-1">
                  <span>DETECTED ACTION ITEMS</span>
                  <span>{tasks.filter(t => t.done).length}/{tasks.length} DONE</span>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="bg-white p-2.5 rounded-xl border border-[#A7F3D0]/60 flex items-center justify-between cursor-pointer hover:bg-[#F0FDF4] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                          task.done ? 'bg-[#10B981] border-[#10B981] text-white' : 'border-[#E0D8CC]'
                        }`}>
                          {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-xs font-medium truncate ${task.done ? 'line-through text-[#888888]' : 'text-[#1A1A1A]'}`}>
                          {task.text}
                        </span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] shrink-0 ml-2">
                        @{task.assignee}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card 4: Semantic Audio Search */}
          <ScrollReveal animation="fade-up" delay={120}>
            <FeatureCard>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#1A1A1A]">
                  4. Semantic Audio Search
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Never lose a spoken detail again. Search your entire room library by asking natural questions or searching keywords to jump to the exact second.
                </p>
              </div>

              <div className="bg-[#F3E8FF] rounded-2xl p-4 border border-[#DDD6FE] space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search audio archive..."
                    className="w-full bg-white pl-9 pr-3 py-2 text-xs rounded-xl border border-[#DDD6FE] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30"
                  />
                </div>

                <div className="space-y-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((res, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-xl border border-[#DDD6FE] text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-black">
                          <span className="text-[#8B5CF6]">{res.room}</span>
                          <span className="bg-[#F3E8FF] text-[#7C3AED] px-1.5 py-0.5 rounded font-mono">@{res.time}</span>
                        </div>
                        <p className="text-[#555555] text-[11px]">"{res.snippet}"</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#888888] italic text-center py-2">
                      No matching audio clips found for "{searchQuery}".
                    </p>
                  )}
                </div>
              </div>
            </FeatureCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
