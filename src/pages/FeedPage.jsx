import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Sparkles, Flame, Users, ArrowRight, Zap, Info, Plus, Library, MessageSquare } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import ScrollReveal from '../components/ui/ScrollReveal';
import { initialRooms, initialRecaps, initialCommunities } from '../lib/seedData';
import { calculateRecommendationScore } from '../lib/scoring';

export default function FeedPage({ onOpenStartModal }) {
  const navigate = useNavigate();

  // Load user profile from localStorage or default
  const savedProfile = JSON.parse(localStorage.getItem('echo_user_profile') || '{}');
  const userInterests = savedProfile.interests || ["Placements", "AI & CS", "Design"];

  // Calculate recommendation scores for rooms
  const rankedRooms = initialRooms.map(room => {
    const rec = calculateRecommendationScore(room, userInterests);
    return { ...room, score: rec.score, reason: rec.reason };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="py-10 bg-[#FDFBF7] min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Feed Welcome Banner */}
        <ScrollReveal animation="fade-up">
          <div className="rounded-3xl bg-gradient-to-r from-[#2D231E] to-[#45362E] text-white p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFB6A3] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Personalized Room Feed
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl">
                Welcome back, {savedProfile.name || 'Alex'}! 👋
              </h1>
              <p className="text-sm sm:text-base text-[#D1C5BD]">
                Here are the top active audio rooms and community recaps matching your interests in <strong className="text-white">{userInterests.join(', ')}</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 z-10">
              <Button 
                variant="primary" 
                size="lg"
                onClick={onOpenStartModal}
                icon={Plus}
              >
                Host a Room
              </Button>
              <Link to="/match">
                <Button variant="amber" size="lg" icon={Zap}>
                  Quick 1-on-1 Call
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Recommended Live & Upcoming Rooms Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-2xl text-[#2D231E] flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#E05638]" />
              Recommended Live & Scheduled Rooms
            </h2>
            <Link to="/rooms" className="text-xs font-bold text-[#E05638] hover:underline flex items-center gap-1">
              View All Rooms <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rankedRooms.map((room) => (
              <ScrollReveal key={room.id} animation="fade-up">
                <Card variant="default" className="flex flex-col justify-between space-y-5 h-full">
                  <div className="space-y-4">
                    
                    {/* Explainable Recommendation Formula Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFF0EB] text-[#E05638] flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {room.reason}
                      </span>
                      {room.status === 'live' ? (
                        <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                          LIVE NOW
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full">
                          SCHEDULED
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#2D231E]">
                      {room.title}
                    </h3>

                    {/* Host Avatar Info */}
                    <div className="flex items-center gap-3">
                      <Avatar src={room.hostAvatar} name={room.hostName} size="md" />
                      <div className="text-xs">
                        <p className="font-bold text-[#2D231E]">{room.hostName}</p>
                        <p className="text-[#9E8E85]">{room.listenersCount} listeners • {room.started_at}</p>
                      </div>
                    </div>

                    <div className="bg-[#FAF4EE] p-3 rounded-2xl text-xs text-[#6B5E57] italic">
                      "{room.recentSnippet}"
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F5ECE5] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#9E8E85]">
                      {room.tags.map(t => <span key={t} className="bg-[#FAF0E8] px-2 py-0.5 rounded">#{t}</span>)}
                    </div>

                    <Link to={`/room/${room.id}`}>
                      <Button variant="primary" size="sm">
                        {room.status === 'live' ? 'Join Stage' : 'Set RSVP'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Suggested Communities Section */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-2xl text-[#2D231E] flex items-center gap-2">
              <Users className="w-6 h-6 text-[#8B5CF6]" />
              Communities For Your Track
            </h2>
            <Link to="/communities" className="text-xs font-bold text-[#8B5CF6] hover:underline flex items-center gap-1">
              Explore All Guilds <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initialCommunities.map((comm) => (
              <Card key={comm.id} variant="warm" className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="purple" size="sm">{comm.topic}</Badge>
                    <span className="text-xs font-semibold text-[#6B5E57]">{comm.membersCount} Members</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#2D231E]">
                    {comm.name}
                  </h3>
                  <p className="text-xs text-[#6B5E57] leading-relaxed">
                    {comm.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0E5DC] flex items-center justify-between">
                  <div className="flex gap-1">
                    {comm.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-[#F0E5DC] text-[#6B5E57]">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link to={`/community/${comm.id}`}>
                    <Button variant="secondary" size="sm">
                      View Guild
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Past Recaps Feed */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-2xl text-[#2D231E] flex items-center gap-2">
              <Library className="w-6 h-6 text-[#F59E0B]" />
              Popular Past Audio Recaps
            </h2>
            <Link to="/library" className="text-xs font-bold text-[#F59E0B] hover:underline flex items-center gap-1">
              Search Library Archive <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {initialRecaps.map((recap) => (
              <Card key={recap.room_id} variant="default" className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber" size="sm">Quality Score: {recap.quality_score}</Badge>
                    <span className="text-xs text-[#9E8E85]">{recap.date} • {recap.listeners} listeners</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#2D231E]">
                    {recap.title}
                  </h3>
                  <p className="text-xs text-[#6B5E57] line-clamp-2">
                    {recap.summary}
                  </p>
                </div>

                <Link to={`/recap/${recap.room_id}`} className="shrink-0">
                  <Button variant="secondary" size="md" icon={ArrowRight} iconPosition="right">
                    Read Full Recap
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
