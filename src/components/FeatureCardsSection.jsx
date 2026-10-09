import React, { useState } from 'react';
import { Users, Scissors, CheckSquare, Search, Sparkles, Play, Pause, ArrowRight, Bookmark, Check, Volume2 } from 'lucide-react';

export default function FeatureCardsSection() {
  // State for interactive audio snippet demo inside feature card 2
  const [isPlayingSnippet, setIsPlayingSnippet] = useState(false);
  
  // State for interactive search bar demo inside feature card 4
  const [searchQuery, setSearchQuery] = useState('roadmap');
  
  // State for interactive task checklist in feature card 3
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalize brand design system tokens", assignee: "Elena", done: true },
    { id: 2, text: "Schedule beta demo with community test group", assignee: "Marcus", done: false },
    { id: 3, text: "Integrate Notion workspace webhook", assignee: "Aria", done: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const searchResults = [
    { time: "14:22", room: "Product Strategy Huddle", snippet: "...we will finalize the roadmap after testing the new UI components..." },
    { time: "28:10", room: "Design Review Ep. 12", snippet: "...our Q4 roadmap puts heavy focus on mobile responsiveness..." }
  ].filter(r => r.snippet.toLowerCase().includes(searchQuery.toLowerCase()) || r.room.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <section id="features" className="py-20 bg-[#FAF4EE] border-t border-[#F0E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE4D6] text-[#E05638] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Built for Voice-First Knowledge
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
            4 Superpowers that turn live audio <br className="hidden sm:block" />
            into <span className="text-[#E05638]">permanent assets</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B5E57]">
            Every Echo room is backed by intelligent speech analysis designed for warm, human collaboration.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Feature Card 1: Speaker Breakdown & Voice ID */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E5DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#E05638] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
                1. Multi-Speaker Breakdown
              </h3>
              <p className="text-sm text-[#6B5E57] leading-relaxed">
                Echo instantly maps who spoke when. Color-coded speaker avatars show exact dialogue flow with timestamped quotes so context is never confused.
              </p>
            </div>

            {/* Micro Demo: Interactive Speaker Breakdown Widget */}
            <div className="bg-[#FAF5F0] rounded-2xl p-4 border border-[#F0E5DC] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#9E8E85]">
                <span>LIVE SPEAKER TIMELINE</span>
                <span className="text-[#E05638]">3 SPEAKERS DETECTED</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#F0E5DC] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E05638] text-white flex items-center justify-center font-bold text-xs">EV</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2D231E]">Elena Vance</span>
                      <span className="text-[10px] text-[#9E8E85]">04:12</span>
                    </div>
                    <p className="text-[#6B5E57] truncate">"Let's focus on user accessibility and rounded UI tokens..."</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#F0E5DC] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold text-xs">MC</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2D231E]">Marcus Chen</span>
                      <span className="text-[10px] text-[#9E8E85]">06:45</span>
                    </div>
                    <p className="text-[#6B5E57] truncate">"I have the Tailwind theme tokens ready for review."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2: 15-Second Audio Snippet Clipper */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E5DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
                2. Smart Soundbite Clipper
              </h3>
              <p className="text-sm text-[#6B5E57] leading-relaxed">
                Echo automatically identifies high-energy, high-insight moments and extracts 15-second shareable audio snippets with auto-generated visual captions.
              </p>
            </div>

            {/* Micro Demo: Interactive Audio Snippet Player */}
            <div className="bg-[#FFFBEB] rounded-2xl p-4 border border-[#FDE68A] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Soundbite #02</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold text-[#D97706]">15s</span>
                </div>
                <button 
                  onClick={() => setIsPlayingSnippet(!isPlayingSnippet)}
                  className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
                >
                  {isPlayingSnippet ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>

              {/* Animated Waveform */}
              <div className="bg-white p-3 rounded-xl border border-[#FDE68A] space-y-2">
                <p className="text-xs font-semibold text-[#2D231E] italic">
                  "{isPlayingSnippet ? "Voice is the most natural high-bandwidth way humans communicate..." : "Click play to listen to 15s highlight..."}"
                </p>
                <div className="flex items-center gap-1 h-6">
                  {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 40, 65, 90, 50].map((h, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full transition-all duration-300 ${isPlayingSnippet ? 'bg-[#D97706] animate-pulse' : 'bg-[#FDE68A]'}`}
                      style={{ height: isPlayingSnippet ? `${Math.max(10, (h * Math.random()) % 100)}%` : `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 3: Automated Action Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E5DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
                3. Auto Action Item Checklist
              </h3>
              <p className="text-sm text-[#6B5E57] leading-relaxed">
                Echo detects verbal agreements like "I'll handle the design" and converts them into checkable tasks assigned to room participants with 1-tap Notion export.
              </p>
            </div>

            {/* Micro Demo: Interactive Task List */}
            <div className="bg-[#ECFDF5]/50 rounded-2xl p-4 border border-[#A7F3D0] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#065F46] mb-1">
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
                        task.done ? 'bg-[#10B981] border-[#10B981] text-white' : 'border-[#9E8E85]'
                      }`}>
                        {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-xs font-medium truncate ${task.done ? 'line-through text-[#9E8E85]' : 'text-[#2D231E]'}`}>
                        {task.text}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] shrink-0 ml-2">
                      @{task.assignee}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Card 4: Semantic Audio Search */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E5DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
                4. Semantic Audio Search
              </h3>
              <p className="text-sm text-[#6B5E57] leading-relaxed">
                Never lose a spoken detail again. Search your entire room library by asking natural questions or searching keywords to jump to the exact second.
              </p>
            </div>

            {/* Micro Demo: Interactive Audio Search Bar */}
            <div className="bg-[#F8F5FF] rounded-2xl p-4 border border-[#DDD6FE] space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search audio archive (e.g. roadmap, pricing)..."
                  className="w-full bg-white pl-9 pr-3 py-2 text-xs rounded-xl border border-[#DDD6FE] text-[#2D231E] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30"
                />
              </div>

              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <div key={i} className="bg-white p-2.5 rounded-xl border border-[#DDD6FE] text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-[#8B5CF6]">{res.room}</span>
                        <span className="bg-[#F3E8FF] text-[#7C3AED] px-1.5 py-0.5 rounded font-mono">@{res.time}</span>
                      </div>
                      <p className="text-[#6B5E57] text-[11px]">"{res.snippet}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#9E8E85] italic text-center py-2">No matching audio clips found for "{searchQuery}".</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
