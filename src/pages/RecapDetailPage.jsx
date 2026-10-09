import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Copy, Share2, Check, Clock, Users, ArrowRight, Play, Pause, Zap, HelpCircle, Calendar, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { initialRecaps } from '../lib/seedData';

export default function RecapDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recap = initialRecaps.find(r => r.room_id === id) || initialRecaps[0];
  const [copied, setCopied] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Follow-up room suggestions generated from unanswered questions & key points
  const followUpSuggestions = [
    {
      title: `Deep Dive: ${recap.unanswered_questions[0] || 'Next Steps in Tech Placements'}`,
      suggestedHost: recap.hostName,
      time: "Tomorrow at 6:00 PM EST"
    },
    {
      title: `Implementation Huddle: ${recap.action_items[0]?.text || 'Finalizing Architecture'}`,
      suggestedHost: "Community Guild",
      time: "Friday at 4:00 PM EST"
    }
  ];

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation back */}
        <Link to="/library" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E05638] hover:underline">
          <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Recap Library
        </Link>

        {/* Main Recap Card */}
        <Card variant="default" className="space-y-8 p-6 sm:p-10 shadow-2xl relative">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F5ECE5]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="terracotta" size="sm">{recap.topic}</Badge>
                <Badge variant="amber" size="sm">Quality Score: {recap.quality_score}</Badge>
                <span className="text-xs text-[#9E8E85]">{recap.date} • {recap.duration}</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D231E]">
                {recap.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="secondary" size="sm" onClick={handleCopy} icon={copied ? Check : Copy}>
                {copied ? 'Copied!' : 'Copy Markdown'}
              </Button>
            </div>
          </div>

          {/* Host Info */}
          <div className="flex items-center gap-3 bg-[#FAF5F0] p-4 rounded-2xl border border-[#F0E5DC]">
            <Avatar src={recap.hostAvatar} name={recap.hostName} size="md" />
            <div className="text-xs">
              <p className="font-bold text-[#2D231E]">Hosted by {recap.hostName}</p>
              <p className="text-[#9E8E85]">{recap.listeners} Total Listeners • Verified Audio Knowledge Artifact</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg text-[#2D231E] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E05638]" />
              Executive AI Summary
            </h3>
            <p className="text-sm text-[#6B5E57] leading-relaxed bg-[#FFF8F3] p-4 rounded-2xl border border-[#FCD9CE]">
              {recap.summary}
            </p>
          </div>

          {/* Key Points with Clickable Timestamps */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#2D231E]">
              Key Points & Timestamped Moments
            </h3>
            <div className="space-y-3">
              {recap.key_points.map((kp, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveTimestamp(kp.ts)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    activeTimestamp === kp.ts 
                      ? 'bg-[#FFF0EB] border-[#E05638] ring-2 ring-[#E05638]/20' 
                      : 'bg-white border-[#F0E5DC] hover:border-[#E05638]/40'
                  }`}
                >
                  <span className="font-mono font-bold text-xs bg-[#E05638] text-white px-2.5 py-1 rounded-full shrink-0">
                    {kp.ts}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#2D231E]">
                    {kp.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="space-y-3 pt-4 border-t border-[#F5ECE5]">
            <h3 className="font-heading font-bold text-lg text-[#2D231E] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#10B981]" />
              Auto Action Items
            </h3>
            <div className="space-y-2">
              {recap.action_items.map((act, i) => (
                <div key={i} className="bg-[#ECFDF5] p-3 rounded-xl border border-[#A7F3D0] text-xs flex items-center justify-between font-semibold text-[#047857]">
                  <span>✓ {act.text}</span>
                  <Badge variant="emerald" size="sm">@{act.assignee}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Unanswered Questions */}
          <div className="space-y-3 pt-4 border-t border-[#F5ECE5]">
            <h3 className="font-heading font-bold text-lg text-[#2D231E] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#F59E0B]" />
              Unanswered Questions for Follow-up
            </h3>
            <ul className="space-y-2 text-xs text-[#6B5E57] bg-[#FFFBEB] p-4 rounded-2xl border border-[#FDE68A] list-disc list-inside font-medium">
              {recap.unanswered_questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

        </Card>

        {/* Continue this Discussion: Auto-Generated Follow-up Rooms */}
        <section className="space-y-6 pt-4">
          <div className="space-y-1">
            <Badge variant="purple" size="sm">Phase 3 Feature</Badge>
            <h2 className="font-heading font-bold text-2xl text-[#2D231E]">
              Continue This Discussion
            </h2>
            <p className="text-xs text-[#6B5E57]">
              Suggested follow-up rooms auto-generated from unanswered questions in this recap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {followUpSuggestions.map((sug, i) => (
              <Card key={i} variant="warm" className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider">Suggested Follow-Up</span>
                  <h4 className="font-heading font-bold text-base text-[#2D231E]">
                    {sug.title}
                  </h4>
                  <p className="text-xs text-[#9E8E85]">Hosted by {sug.suggestedHost} • {sug.time}</p>
                </div>

                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate(`/room/${sug.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}
                  icon={Calendar}
                >
                  Schedule This Room 1-Click
                </Button>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
