import React from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function DemoBadge() {
  const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL);

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border shadow-sm ${
        isSupabaseConfigured 
          ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]' 
          : 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]'
      }`}
      title={isSupabaseConfigured ? "Connected to Supabase DB & Realtime" : "Running on seeded demo data (MOCK MODE)"}
    >
      {isSupabaseConfigured ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Live API Connected</span>
        </>
      ) : (
        <>
          <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Demo Data Mode</span>
        </>
      )}
    </div>
  );
}
