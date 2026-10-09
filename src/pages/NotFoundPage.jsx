import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Home, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* Warm Ambient Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFF0EB] rounded-full blur-3xl opacity-70 pointer-events-none" />

      <Card variant="default" className="max-w-md w-full text-center space-y-6 p-8 sm:p-10 shadow-2xl relative z-10 border-[#F0E5DC]">
        
        {/* Animated 404 Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-[#FFF0EB] text-[#E05638] flex items-center justify-center shadow-md">
          <VolumeX className="w-10 h-10 animate-bounce" />
          <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#E05638] text-white font-mono font-bold text-xs">
            404
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#E05638] uppercase tracking-wider block">
            Room Silence
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-[#2D231E]">
            This Echo has faded away
          </h1>
          <p className="text-sm text-[#6B5E57] leading-relaxed">
            The live room or recap page you are looking for might have been moved, renamed, or completed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" icon={Home} className="w-full">
              Back to Home
            </Button>
          </Link>
          <Link to="/rooms" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" icon={Radio} className="w-full">
              Explore Live Rooms
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}
