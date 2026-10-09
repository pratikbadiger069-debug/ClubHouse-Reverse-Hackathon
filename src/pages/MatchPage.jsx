import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Mic, Check, ArrowRight, Heart, Sparkles, PhoneCall, Volume2, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';

export default function MatchPage() {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState('Placements');
  const [matchingStatus, setMatchingStatus] = useState('idle'); // 'idle' | 'searching' | 'connected' | 'ended'
  const [matchedUser, setMatchedUser] = useState(null);
  const [callTimer, setCallTimer] = useState(0);

  const demoUsers = [
    { name: "Marcus Chen", college: "MIT EECS '25", topic: "Placements", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { name: "Aria Patel", college: "UC Berkeley '26", topic: "Career Talk", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
    { name: "Elena Vance", college: "Stanford CS '26", topic: "Design", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
  ];

  const handleStartMatching = () => {
    setMatchingStatus('searching');
  };

  const handleMatchDemoUser = () => {
    const found = demoUsers.find(u => u.topic === selectedTopic) || demoUsers[0];
    setMatchedUser(found);
    setMatchingStatus('connected');
  };

  const handleEndCall = () => {
    setMatchingStatus('ended');
  };

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-8 text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <Badge variant="amber" size="lg" icon={Zap}>
            Instant 1-on-1 Voice Match
          </Badge>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D231E]">
            Find Someone To Talk To
          </h1>
          <p className="text-sm sm:text-base text-[#6B5E57]">
            Get matched automatically with a student or creator sharing your exact interest for a spontaneous 10-minute voice chat.
          </p>
        </div>

        {/* State 1: Topic Selection & Match Launch */}
        {matchingStatus === 'idle' && (
          <Card variant="default" className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3 text-left">
              <label className="font-heading font-bold text-sm text-[#2D231E] block">
                Select Matching Topic
              </label>
              <div className="flex flex-wrap gap-2.5">
                {['Placements', 'AI & CS', 'Design', 'Career Talk', 'Study Rooms'].map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                      selectedTopic === topic 
                        ? 'bg-[#F59E0B] text-white shadow-md' 
                        : 'bg-[#FAF5F0] text-[#6B5E57] border border-[#F0E5DC]'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              variant="amber" 
              size="lg" 
              className="w-full justify-center"
              onClick={handleStartMatching}
              icon={PhoneCall}
            >
              Enter Queue & Find Match
            </Button>
          </Card>
        )}

        {/* State 2: Queue Searching */}
        {matchingStatus === 'searching' && (
          <Card variant="warm" className="space-y-6 p-8">
            <div className="w-16 h-16 rounded-full bg-[#FEF3C7] text-[#D97706] mx-auto flex items-center justify-center animate-bounce">
              <PhoneCall className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
                Searching for a match in #{selectedTopic}...
              </h3>
              <p className="text-xs text-[#6B5E57]">
                Waiting for another peer to enter the queue.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <Button 
                variant="primary" 
                size="md"
                className="w-full justify-center"
                onClick={handleMatchDemoUser}
                icon={Sparkles}
              >
                Match with Demo Peer (Instant Safety)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setMatchingStatus('idle')}>
                Cancel Search
              </Button>
            </div>
          </Card>
        )}

        {/* State 3: Connected Live Call */}
        {matchingStatus === 'connected' && matchedUser && (
          <Card variant="default" className="space-y-6 p-8 border-[#10B981]">
            <div className="flex items-center justify-between text-xs font-bold text-[#10B981]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                CONNECTED 1-ON-1 VOICE
              </span>
              <span>10:00 Max</span>
            </div>

            <div className="flex items-center justify-center gap-6 py-4">
              <div className="text-center space-y-1">
                <Avatar name="You" size="xl" isActiveSpeaker={true} />
                <p className="font-bold text-xs text-[#2D231E]">You</p>
              </div>
              <div className="flex items-center gap-1 text-[#E05638] font-bold">
                <div className="w-2 h-2 rounded-full bg-[#E05638] animate-ping" />
                <div className="w-1 bg-[#E05638] h-6 rounded-full animate-wave-1" />
                <div className="w-1 bg-[#E05638] h-8 rounded-full animate-wave-2" />
                <div className="w-1 bg-[#E05638] h-4 rounded-full animate-wave-3" />
              </div>
              <div className="text-center space-y-1">
                <Avatar src={matchedUser.avatar} name={matchedUser.name} size="xl" isActiveSpeaker={true} />
                <p className="font-bold text-xs text-[#2D231E]">{matchedUser.name}</p>
                <p className="text-[10px] text-[#9E8E85]">{matchedUser.college}</p>
              </div>
            </div>

            <Button variant="danger" size="md" className="w-full justify-center" onClick={handleEndCall}>
              End Call
            </Button>
          </Card>
        )}

        {/* State 4: Post Call Screen */}
        {matchingStatus === 'ended' && (
          <Card variant="default" className="space-y-6 p-8 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-2xl text-[#2D231E]">
                Call Completed!
              </h3>
              <p className="text-xs text-[#6B5E57]">
                You connected with {matchedUser?.name || 'Peer'} on #{selectedTopic}.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button 
                variant="primary" 
                size="md" 
                className="w-full justify-center"
                onClick={() => navigate('/recap/recap-101')}
                icon={Sparkles}
              >
                Save Audio Recap & Takeaways
              </Button>
              <Button 
                variant="secondary" 
                size="md" 
                className="w-full justify-center"
                onClick={() => setMatchingStatus('idle')}
              >
                Connect / Follow Peer
              </Button>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
