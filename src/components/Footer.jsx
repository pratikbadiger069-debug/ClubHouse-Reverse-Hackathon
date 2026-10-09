import React, { useState } from 'react';
import { Volume2, Sparkles, Send, Check } from 'lucide-react';

/**
 * Footer — Clubhouse-inspired charcoal dark footer
 *
 * Dark charcoal (#1A1A1A) background with cream (#F5F0E8) text
 * Yellow (#F5C518) accent for logo icon text and CTA
 * Newsletter form restyled with cream input border
 * Footer nav links: cream on hover
 * Bottom bar: muted cream-gray text
 */
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
    <footer className="bg-[#1A1A1A] text-[#F5F0E8] pt-16 pb-12 border-t border-[#2E2E2E] relative overflow-hidden">
      {/* Subtle yellow ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#F5C518]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2E2E2E]">

          {/* Brand column */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-2xl text-[#F5F0E8] tracking-tight">
                  echo
                </span>
                <span className="text-[9px] font-semibold text-[#888888] uppercase tracking-widest">
                  live audio · permanent knowledge
                </span>
              </div>
            </a>

            <p className="text-sm text-[#888888] leading-relaxed max-w-md">
              Echo bridges spontaneous audio conversations and permanent knowledge archives. Built with a warm, human design and real-time AI transcription.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenStartModal}
                className="btn-accent text-sm px-6 py-3"
              >
                <Sparkles className="w-4 h-4" />
                host a free echo room now
              </button>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-7 bg-[#2E2E2E] rounded-3xl p-6 sm:p-8 border border-[#3A3A3A] space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-[#F5C518] uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Echo Weekly Digest
              </span>
              <h4 className="font-heading font-black text-xl text-[#F5F0E8]">
                Get top community audio recaps delivered to your inbox
              </h4>
              <p className="text-xs text-[#888888]">
                No spam. Only 5-minute curated summaries of the best public Echo rooms.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-[#ECFDF5] text-[#047857] p-3.5 rounded-2xl border border-[#A7F3D0] text-xs font-bold flex items-center gap-2">
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
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] text-[#F5F0E8] text-xs px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F5C518]/40 placeholder-[#888888]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-accent text-xs px-6 py-3 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#2E2E2E] text-xs">
          <div className="space-y-3">
            <h5 className="font-heading font-black text-sm text-[#F5F0E8] uppercase tracking-wider">Product</h5>
            <ul className="space-y-2 text-[#888888]">
              <li><a href="#how-it-works" className="hover:text-[#F5C518] transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-[#F5C518] transition-colors">Live Transcriber</a></li>
              <li><a href="#features" className="hover:text-[#F5C518] transition-colors">Soundbite Clipper</a></li>
              <li><a href="#sample-recap" className="hover:text-[#F5C518] transition-colors">Sample Recap Card</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-black text-sm text-[#F5F0E8] uppercase tracking-wider">Integrations</h5>
            <ul className="space-y-2 text-[#888888]">
              <li><a href="#features" className="hover:text-[#F5C518] transition-colors">Notion Sync</a></li>
              <li><a href="#features" className="hover:text-[#F5C518] transition-colors">Slack Webhooks</a></li>
              <li><a href="#features" className="hover:text-[#F5C518] transition-colors">Twitter / X Audio Clips</a></li>
              <li><a href="#features" className="hover:text-[#F5C518] transition-colors">Markdown Export</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-black text-sm text-[#F5F0E8] uppercase tracking-wider">Community</h5>
            <ul className="space-y-2 text-[#888888]">
              <li><a href="#" className="hover:text-[#F5C518] transition-colors">Public Echo Rooms</a></li>
              <li><a href="#" className="hover:text-[#F5C518] transition-colors">Host Guidelines</a></li>
              <li><a href="#" className="hover:text-[#F5C518] transition-colors">Discord Guild</a></li>
              <li><a href="#" className="hover:text-[#F5C518] transition-colors">Beta Feedback</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-heading font-black text-sm text-[#F5F0E8] uppercase tracking-wider">Design System</h5>
            <ul className="space-y-2 text-[#888888]">
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F5C518] shrink-0" /> Yellow <code>#F5C518</code></li>
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F5F0E8] shrink-0" /> Cream <code>#F5F0E8</code></li>
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] shrink-0" /> Charcoal <code>#1A1A1A</code></li>
              <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" /> Live Green <code>#10B981</code></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555555]">
          <p>© 2026 Echo Inc. All rights reserved. Crafted for live audio that leaves something behind.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#F5F0E8] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F5F0E8] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F5F0E8] transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
