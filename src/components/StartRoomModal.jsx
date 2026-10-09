import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Volume2, Sparkles, Check, Play, Radio, Users, FileText, ArrowRight } from 'lucide-react';

export default function StartRoomModal({ isOpen, onClose }) {
  const [roomTitle, setRoomTitle] = useState("Spontaneous Design & AI Banter");
  const [isRoomLive, setIsRoomLive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [transcriptBubbles, setTranscriptBubbles] = useState([]);
  const [recapDone, setRecapDone] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Timer while room is live
  useEffect(() => {
    let interval;
    if (isRoomLive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setTimerSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRoomLive]);

  // Simulated live spoken thoughts
  const sampleSpeechOptions = [
    "We need to ensure all UI cards use warm terracotta borders and 32px rounded corners.",
    "Echo's real-time AI transcription makes note-taking completely effortless!",
    "Can someone summarize our key decisions from the product sync earlier today?",
    "Let's make sure the Notion export webhook fires as soon as the host ends the room."
  ];

  const handleStartLive = () => {
    setIsRoomLive(true);
    setRecapDone(false);
    setTranscriptBubbles([
      { speaker: "You (Host)", text: `Welcome everyone to "${roomTitle}"! Echo AI is listening live.`, time: "00:01" }
    ]);
  };

  const handleSimulateSpeech = (text) => {
    const min = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const sec = (timerSeconds % 60).toString().padStart(2, '0');
    setTranscriptBubbles(prev => [
      ...prev,
      { speaker: "You (Host)", text, time: `${min}:${sec}` }
    ]);
  };

  const handleEndRoom = () => {
    setIsRoomLive(false);
    setRecapDone(true);
  };

  const formatTimer = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D231E]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#F0E5DC] shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9E8E85] hover:bg-[#FAF5F0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        {!isRoomLive && !recapDone && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#E05638] flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-[#2D231E]">
                Host an Echo Room
              </h3>
              <p className="text-sm text-[#6B5E57]">
                Experience live audio with automatic AI recap generation.
              </p>
            </div>

            {/* Room Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D231E] uppercase tracking-wider block">
                Room Title
              </label>
              <input 
                type="text"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                placeholder="Enter room topic..."
                className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
              />
            </div>

            {/* Settings Toggles */}
            <div className="bg-[#FFF8F3] p-4 rounded-2xl border border-[#FCD9CE] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2D231E] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E05638]" />
                  Echo AI Note-Taker & Recap
                </span>
                <span className="font-bold text-[#10B981]">ENABLED</span>
              </div>
              <p className="text-[#6B5E57]">
                Echo will process your live mic audio, detect takeaways, and compile a shareable recap upon room end.
              </p>
            </div>

            <button 
              onClick={handleStartLive}
              className="btn-primary w-full justify-center text-sm py-3.5"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Launch Live Room Stage
            </button>
          </div>
        )}

        {/* Live Stage Mode */}
        {isRoomLive && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5ECE5]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E05638] animate-ping" />
                <span className="font-heading font-bold text-base text-[#2D231E]">STAGE LIVE</span>
              </div>
              <span className="font-mono font-bold text-xs bg-[#FFF0EB] text-[#E05638] px-3 py-1 rounded-full">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-heading font-bold text-lg text-[#2D231E] truncate">
                {roomTitle}
              </h4>
              <p className="text-xs text-[#9E8E85]">1 Host • Echo AI Companion Listening</p>
            </div>

            {/* Live Transcript Stream */}
            <div className="bg-[#FAF5F0] rounded-2xl p-4 border border-[#F0E5DC] max-h-48 overflow-y-auto space-y-2">
              <span className="text-[10px] font-bold text-[#9E8E85] uppercase tracking-wider block">Real-time Transcript</span>
              {transcriptBubbles.map((bubble, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-[#F0E5DC] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-[#E05638]">{bubble.speaker}</span>
                    <span className="text-[#9E8E85]">{bubble.time}</span>
                  </div>
                  <p className="text-[#2D231E]">{bubble.text}</p>
                </div>
              ))}
            </div>

            {/* Simulated Voice Actions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2D231E]">Simulate Spoken Phrases:</span>
              <div className="flex flex-wrap gap-2">
                {sampleSpeechOptions.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSimulateSpeech(opt)}
                    className="text-left text-[11px] font-medium bg-white hover:bg-[#FFF0EB] hover:border-[#E05638] text-[#6B5E57] p-2.5 rounded-xl border border-[#F0E5DC] transition-colors"
                  >
                    "{opt.slice(0, 45)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Controls Bar */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full border text-xs font-semibold flex items-center gap-2 ${
                  isMicOn ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]' : 'bg-[#FFF1F2] border-[#FECDD3] text-[#E11D48]'
                }`}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                {isMicOn ? "Mic On" : "Muted"}
              </button>

              <button 
                onClick={handleEndRoom}
                className="bg-[#E05638] hover:bg-[#C9472B] text-white font-heading font-bold text-xs px-6 py-3 rounded-full shadow transition-transform hover:scale-105 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                End Room & Generate Recap
              </button>
            </div>
          </div>
        )}

        {/* Generated Recap View */}
        {recapDone && (
          <div className="space-y-5 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-2xl text-[#2D231E]">
                Recap Ready!
              </h3>
              <p className="text-sm text-[#6B5E57]">
                Echo synthesized your session into a structured knowledge card.
              </p>
            </div>

            <div className="bg-[#FFF8F3] p-4 rounded-2xl border border-[#FCD9CE] text-left space-y-2 text-xs">
              <span className="font-bold text-[#E05638] uppercase tracking-wider block">Generated Executive Summary</span>
              <p className="text-[#2D231E] font-medium leading-relaxed">
                Host discussed room setup for "{roomTitle}". Captured {transcriptBubbles.length} live spoken statements and compiled 2 key action items.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button 
                onClick={() => {
                  onClose();
                  const el = document.getElementById('sample-recap');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary w-full justify-center text-sm py-3"
              >
                <FileText className="w-4 h-4" />
                View Full Sample Recap
              </button>
              <button 
                onClick={() => {
                  setRecapDone(false);
                  setIsRoomLive(false);
                }}
                className="btn-secondary w-full justify-center text-sm py-3"
              >
                Host Another Room
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
