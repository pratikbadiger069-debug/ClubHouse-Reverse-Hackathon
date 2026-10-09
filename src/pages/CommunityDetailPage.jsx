import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Radio, Library, ArrowLeft, Check, Plus, Sparkles, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { initialCommunities, initialRooms, initialRecaps, initialUsers } from '../lib/seedData';

export default function CommunityDetailPage() {
  const { id } = useParams();
  const comm = initialCommunities.find(c => c.id === id) || initialCommunities[0];
  const [isMember, setIsMember] = useState(true);

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Link to="/communities" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E05638] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Guilds
        </Link>

        {/* Community Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#F0E5DC] shadow-xl">
          <img src={comm.banner} alt={comm.name} className="w-full h-56 sm:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D231E]/90 via-[#2D231E]/40 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="purple" size="sm">{comm.topic}</Badge>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl">
                  {comm.name}
                </h1>
                <p className="text-sm text-white/80 max-w-xl">
                  {comm.description}
                </p>
              </div>

              <Button 
                variant={isMember ? "secondary" : "primary"}
                size="lg"
                onClick={() => setIsMember(!isMember)}
                icon={isMember ? Check : Plus}
              >
                {isMember ? 'Joined Community' : 'Join Community'}
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs: Members, Live Rooms, Past Recaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed: Live Rooms & Recaps */}
          <div className="lg:col-span-8 space-y-8">
            
            <section className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#2D231E] flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#E05638]" />
                Upcoming & Live Guild Rooms
              </h3>
              <div className="space-y-4">
                {initialRooms.map(r => (
                  <Card key={r.id} variant="default" className="flex items-center justify-between p-5">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#E05638]">{r.status.toUpperCase()} • {r.started_at}</span>
                      <h4 className="font-heading font-bold text-base text-[#2D231E]">{r.title}</h4>
                      <p className="text-xs text-[#9E8E85]">Host: {r.hostName}</p>
                    </div>
                    <Link to={`/room/${r.id}`}>
                      <Button variant="primary" size="sm">Join Stage</Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-4 pt-4">
              <h3 className="font-heading font-bold text-xl text-[#2D231E] flex items-center gap-2">
                <Library className="w-5 h-5 text-[#F59E0B]" />
                Past Community Recaps
              </h3>
              <div className="space-y-4">
                {initialRecaps.map(rec => (
                  <Card key={rec.room_id} variant="warm" className="space-y-2 p-5">
                    <span className="text-xs font-bold text-[#F59E0B]">Quality Score: {rec.quality_score}</span>
                    <h4 className="font-heading font-bold text-base text-[#2D231E]">{rec.title}</h4>
                    <p className="text-xs text-[#6B5E57]">{rec.summary}</p>
                    <div className="pt-2">
                      <Link to={`/recap/${rec.room_id}`}>
                        <Button variant="secondary" size="sm">View Full Recap</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar: Active Members */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="default" className="space-y-4 p-5">
              <h3 className="font-heading font-bold text-lg text-[#2D231E] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8B5CF6]" />
                Guild Members ({comm.membersCount})
              </h3>
              <div className="space-y-3">
                {initialUsers.slice(0, 6).map(u => (
                  <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF5F0] border border-[#F0E5DC]">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="text-xs">
                      <p className="font-bold text-[#2D231E]">{u.name}</p>
                      <p className="text-[#9E8E85]">{u.college}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
