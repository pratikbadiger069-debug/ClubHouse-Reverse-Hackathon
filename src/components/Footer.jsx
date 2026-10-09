import React, { useState } from 'react';
import { Volume2, Sparkles, Send, Check, Heart, Shield, Terminal } from 'lucide-react';

export default function Footer({ onOpenStartModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#2D231E] text-white pt-16 pb-12 border-t border-[#45362E] relative overflow-hidden">
      {/* Soft Glow Ambient Orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E05638]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Pitch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#45362E]">
          
          {/* Brand Pitch Column */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#E05638] to-[#FF6B4A] flex items-center justify-center text-white shadow-md">
                <Volume2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
                  Echo
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                </span>
                <span className="text-[11px] font-medium text-[#FFB6A3] tracking-wide uppercase">
                  Live Audio • Permanent Knowledge
                </span>
              </div>
            </a>

            <p className="text-sm text-[#D1C5BD] leading-relaxed max-w-md">
              Echo bridges spontaneous audio conversations and permanent knowledge archives. Built with warm, friendly design tokens and real-time AI transcription.
            </p>

            <div className="pt-2">
              <button 
                onClick={onOpenStartModal}
                className="bg-[#E05638] hover:bg-[#C9472B] text-white font-heading font-bold text-xs px-6 py-3 rounded-full shadow transition-transform hover:scale-105 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Host a Free Echo Room Now
              </button>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7 bg-[#3B2F29] rounded-3xl p-6 sm:p-8 border border-[#524239] space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#FFB6A3] uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Echo Weekly Digest
              </span>
              <h4 className="font-heading font-bold text-xl text-white">
                Get top community audio recaps delivered to your inbox
              </h4>
              <p className="text-xs text-[#D1C5BD]">
                No spam. Only 5-minute curated summaries of the best public Echo rooms.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-[#ECFDF5] text-[#047857] p-3.5 rounded-2xl border border-[#A7F3D0] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-[#10B981]" />
                You're subscribed! We'll send you next week's top audio recaps.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-[#2D231E] border border-[#524239] text-white text-xs px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E05638]/50"
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#E05638] hover:bg-[#C9472B] text-white text-xs font-bold font-heading px-6 py-3 rounded-2xl transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#45362E] text-xs">
          
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Product</h5>
            <ul className="space-y-2 text-[#D1C5BD]">
              <li><a href="#how-it-works" className="hover:text-[#FFB6A3] transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-[#FFB6A3] transition-colors">Live Transcriber</a></li>
              <li><a href="#features" className="hover:text-[#FFB6A3] transition-colors">Soundbite Clipper</a></li>
              <li><a href="#sample-recap" className="hover:text-[#FFB6A3] transition-colors">Sample Recap Card</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Integrations</h5>
            <ul className="space-y-2 text-[#D1C5BD]">
              <li><a href="#features" className="hover:text-[#FFB6A3] transition-colors">Notion Sync</a></li>
              <li><a href="#features" className="hover:text-[#FFB6A3] transition-colors">Slack Webhooks</a></li>
              <li><a href="#features" className="hover:text-[#FFB6A3] transition-colors">Twitter / X Audio Clips</a></li>
              <li><a href="#features" className="hover:text-[#FFB6A3] transition-colors">Markdown Export</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Community</h5>
            <ul className="space-y-2 text-[#D1C5BD]">
              <li><a href="#" className="hover:text-[#FFB6A3] transition-colors">Public Echo Rooms</a></li>
              <li><a href="#" className="hover:text-[#FFB6A3] transition-colors">Host Guidelines</a></li>
              <li><a href="#" className="hover:text-[#FFB6A3] transition-colors">Discord Guild</a></li>
              <li><a href="#" className="hover:text-[#FFB6A3] transition-colors">Beta Feedback</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Design System</h5>
            <ul className="space-y-2 text-[#D1C5BD]">
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E05638]"></span> Terracotta `#E05638`</li>
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Amber `#F59E0B`</li>
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FDFBF7]"></span> Cream `#FDFBF7`</li>
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Live Emerald `#10B981`</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3958D]">
          <p>© 2026 Echo Inc. All rights reserved. Crafted for live audio that leaves something behind.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
