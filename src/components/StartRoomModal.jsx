import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mic, MicOff, Sparkles, Check, Radio, FileText, ArrowRight } from 'lucide-react';

// Slug a room title → a clean URL-friendly id
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    || 'my-room';
}

export default function StartRoomModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [roomTitle, setRoomTitle] = useState('Spontaneous Design & AI Banter');
  const [recapEnabled, setRecapEnabled] = useState(true);

  const handleLaunch = () => {
    if (!roomTitle.trim()) return;
    const slug = slugify(roomTitle.trim());
    onClose();
    navigate(`/room/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D231E]/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-room-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#F0E5DC] shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full text-[#9E8E85] hover:bg-[#FAF5F0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon + heading */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#E05638] flex items-center justify-center">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h3 id="start-room-title" className="font-heading font-extrabold text-2xl text-[#2D231E]">
              Host an Echo Room
            </h3>
            <p className="text-sm text-[#6B5E57]">
              Name your room, launch it, and share the link with anyone.
            </p>
          </div>

          {/* Room title */}
          <div className="space-y-2">
            <label htmlFor="room-title-input" className="text-xs font-bold text-[#2D231E] uppercase tracking-wider block">
              Room Title
            </label>
            <input
              id="room-title-input"
              type="text"
              value={roomTitle}
              onChange={e => setRoomTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLaunch()}
              placeholder="Enter a topic…"
              className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
              autoFocus
            />
            {/* URL preview */}
            <p className="text-[11px] text-[#9E8E85] font-mono pl-1">
              /room/<span className="text-[#E05638] font-bold">{slugify(roomTitle.trim() || 'my-room')}</span>
            </p>
          </div>

          {/* Echo AI toggle */}
          <div className="bg-[#FFF8F3] p-4 rounded-2xl border border-[#FCD9CE] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#2D231E] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E05638]" />
                Echo AI Note-Taker &amp; Recap
              </span>
              <button
                type="button"
                onClick={() => setRecapEnabled(v => !v)}
                className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                  recapEnabled
                    ? 'bg-[#ECFDF5] text-[#10B981]'
                    : 'bg-[#F1F5F9] text-[#9E8E85]'
                }`}
              >
                {recapEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
            <p className="text-[#6B5E57]">
              Echo will transcribe live audio and compile a shareable recap when the room ends.
            </p>
          </div>

          {/* Launch button */}
          <button
            onClick={handleLaunch}
            disabled={!roomTitle.trim()}
            className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            Launch Live Room
          </button>
        </div>

      </div>
    </div>
  );
}
