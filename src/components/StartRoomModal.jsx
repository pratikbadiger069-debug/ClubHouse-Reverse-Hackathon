/**
 * StartRoomModal.jsx — Room creation form
 *
 * FLOW:
 *  1. Host fills in title, topic, language.
 *  2. On submit → createRoom() in roomStore (generates a unique 10-char ID).
 *  3. Navigates to /room/:id — the same ID used for presence & captions.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mic, Sparkles, Radio, Globe } from 'lucide-react';
import { createRoom } from '../lib/roomStore';

// ── helper: derive room ID slug from the roomStore entry ─────────────────
function getProfileSafe() {
  try { return JSON.parse(localStorage.getItem('echo_user_profile')); }
  catch { return null; }
}

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'Mandarin', 'German', 'Japanese'];

export default function StartRoomModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [title,    setTitle]    = useState('');
  const [topic,    setTopic]    = useState('');
  const [language, setLanguage] = useState('English');
  const [loading,  setLoading]  = useState(false);

  const handleLaunch = async () => {
    if (!title.trim()) return;
    setLoading(true);

    // Ensure the user has a profile; if not, redirect to onboarding
    const profile = getProfileSafe();
    if (!profile) {
      sessionStorage.setItem('echo_return_to_modal', 'start_room');
      onClose();
      navigate('/onboarding');
      return;
    }

    // Create a real room in the store (nanoid ID)
    const room = createRoom({
      title:      title.trim(),
      topic:      topic.trim(),
      language,
      hostId:     profile.username || profile.name,
      hostName:   profile.name,
      hostAvatar: profile.avatar,
    });

    onClose();
    navigate(`/room/${room.id}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D231E]/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-room-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E0D8CC] shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full text-[#888888] hover:bg-[#EDE8DE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-[#F5C518] flex items-center justify-center">
            <Mic className="w-6 h-6" />
          </div>
          <h3 id="start-room-title" className="font-heading font-black text-2xl text-[#1A1A1A] pt-1">
            Start an Echo Room
          </h3>
          <p className="text-sm text-[#555555]">
            A private link is generated automatically — share it with anyone.
          </p>
        </div>

        {/* Room Title */}
        <div className="space-y-1.5">
          <label htmlFor="room-title" className="text-xs font-bold text-[#2D231E] uppercase tracking-wider block">
            Room Title <span className="text-[#E05638]">*</span>
          </label>
          <input
            id="room-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLaunch()}
            placeholder="e.g. FAANG Placement Prep Q&A"
            autoFocus
            className="w-full bg-[#F5F0E8] px-4 py-3 rounded-2xl border border-[#E0D8CC] text-sm text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
          />
        </div>

        {/* Topic */}
        <div className="space-y-1.5">
          <label htmlFor="room-topic" className="text-xs font-bold text-[#2D231E] uppercase tracking-wider block">
            Topic / Tags
          </label>
          <input
            id="room-topic"
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. DSA, System Design, Placements"
            className="w-full bg-[#F5F0E8] px-4 py-3 rounded-2xl border border-[#E0D8CC] text-sm text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
          />
        </div>

        {/* Language */}
        <div className="space-y-1.5">
          <label htmlFor="room-lang" className="text-xs font-bold text-[#2D231E] uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#F59E0B]" /> Room Language
          </label>
          <select
            id="room-lang"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full bg-[#F5F0E8] px-4 py-3 rounded-2xl border border-[#E0D8CC] text-sm text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <p className="text-[11px] text-[#9E8E85] pl-1">Sets the speech-recognition language for live captions.</p>
        </div>

        {/* Echo AI info */}
        <div className="bg-[#F5C518]/15 p-4 rounded-2xl border border-[#F5C518]/30 flex items-start gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-[#1A1A1A]">Echo AI is always on.</span>
            <span className="text-[#555555]"> Live captions and a full recap are generated automatically when the room ends.</span>
          </div>
        </div>

        {/* Launch */}
        <button
          onClick={handleLaunch}
          disabled={!title.trim() || loading}
          className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            : <Radio className="w-4 h-4 animate-pulse" />
          }
          {loading ? 'Creating room…' : 'Launch Live Room'}
        </button>

      </div>
    </div>
  );
}
