import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Sparkles, Check, Plus, ArrowRight, Heart } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { initialCommunities } from '../lib/seedData';

export default function CommunitiesPage() {
  const [joinedMap, setJoinedMap] = useState({ 'comm-1': true, 'comm-2': true });

  const toggleJoin = (id) => {
    setJoinedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F0E5DC]">
          <div className="space-y-2">
            <Badge variant="purple" size="lg" icon={Users}>
              Interest-Based Communities
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D231E]">
              Echo Guilds & Topic Guilds
            </h1>
            <p className="text-sm sm:text-base text-[#6B5E57] max-w-xl">
              Connect with students and creators sharing your track. Community membership drives room recommendations and notifications.
            </p>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialCommunities.map((comm) => {
            const isJoined = joinedMap[comm.id];
            return (
              <Card key={comm.id} variant="default" className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="relative h-40 rounded-2xl overflow-hidden border border-[#F0E5DC]">
                    <img src={comm.banner} alt={comm.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="purple" size="sm">{comm.topic}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-2xl text-[#2D231E]">
                        {comm.name}
                      </h3>
                      <span className="text-xs font-bold text-[#6B5E57] bg-[#FAF4EE] px-3 py-1 rounded-full border border-[#F0E5DC]">
                        {comm.membersCount} Members
                      </span>
                    </div>
                    <p className="text-sm text-[#6B5E57] leading-relaxed">
                      {comm.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F5ECE5] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {comm.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold bg-[#FAF0E8] text-[#6B5E57] px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant={isJoined ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => toggleJoin(comm.id)}
                      icon={isJoined ? Check : Plus}
                    >
                      {isJoined ? 'Joined Guild' : 'Join Guild'}
                    </Button>
                    
                    <Link to={`/community/${comm.id}`}>
                      <Button variant="ghost" size="sm" icon={ArrowRight} ariaLabel="View details" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
