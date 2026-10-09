import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Mic, MicOff, Radio, Copy, Check, Sparkles, X, Share2, Users, FileText, Send, ArrowLeft, Zap, Volume2, Hand, Pin, HelpCircle, Globe, BarChart2, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import { fetchAudioRoomToken } from '../lib/audioService';

export default function LiveRoomPage() {
  const { id: roomIdParam } = useParams();
  const navigate = useNavigate();

  const roomId = roomIdParam || 'spontaneous-room';
  const formattedTitle = roomId
    ? roomId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : "Spontaneous Live Audio Room";

  // ── Load user profile from localStorage ─────────────────────────────────
  const storedProfile = (() => {
    try { return JSON.parse(localStorage.getItem('echo_user_profile')); } catch { return null; }
  })();

  // Guard: if no profile, redirect through onboarding and return here
  useEffect(() => {
    if (!storedProfile) {
      sessionStorage.setItem('echo_return_to', `/room/${roomId}`);
      navigate('/onboarding', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myName   = storedProfile?.name   || 'You (Host)';
  const myAvatar = storedProfile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${myName}`;

  // State Management
  const [role, setRole] = useState('host'); // 'host' | 'speaker' | 'listener'
  const [isMicOn, setIsMicOn] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Speakers & Listeners — user is always first (the host)
  const [speakers, setSpeakers] = useState([
    { id: 'sp-you', name: `${myName} (Host)`, role: 'Host', avatar: myAvatar, active: true },
    { id: 'sp-2', name: 'Marcus Chen', role: 'Speaker', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', active: false },
    { id: 'sp-3', name: 'Aria Patel', role: 'Speaker', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', active: false },
  ]);

  const [handRaisedQueue, setHandRaisedQueue] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  // Floating Reactions State
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [pinnedMoments, setPinnedMoments] = useState([
    { time: "01:45", text: "Discussion started on fluid design tokens" }
  ]);

  // Live Captions & Web Speech API
  const [interimText, setInterimText] = useState('');
  const [transcriptLines, setTranscriptLines] = useState([
    { id: 1, speaker: "Marcus Chen", text: "Welcome everyone! Echo AI is active.", time: "01:30" },
    { id: 2, speaker: "Elena Vance", text: "Let's review our fluid typography tokens for the Q4 release.", time: "02:10" }
  ]);

  const [speechSupported, setSpeechSupported] = useState(true);
  const [customSpeakInput, setCustomSpeakInput] = useState('');

  // Live Translation State
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [translatedLines, setTranslatedLines] = useState({});

  // Polls & Quizzes State
  const [activePoll, setActivePoll] = useState({
    id: "poll-1",
    question: "Should we make Notion export automatic on room exit?",
    options: ["Yes, auto sync", "No, prompt first", "Undecided"],
    votes: [14, 5, 2],
    status: "active",
    correctIndex: null
  });
  const [userVotedIndex, setUserVotedIndex] = useState(null);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['Option 1', 'Option 2']);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => setTimerSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Speech API Integration
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const final = event.results[i][0].transcript;
            addTranscriptLine("You (Host)", final);
            setInterimText('');
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setInterimText(interim);
      };

      recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err);
      };

      if (isMicOn && (role === 'host' || role === 'speaker')) {
        recognition.start();
      }

      return () => recognition.stop();
    } catch (e) {
      setSpeechSupported(false);
    }
  }, [isMicOn, role]);

  const addTranscriptLine = (speaker, text) => {
    const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const secs = (timerSeconds % 60).toString().padStart(2, '0');
    setTranscriptLines(prev => [
      ...prev,
      { id: Date.now(), speaker, text, time: `${mins}:${secs}` }
    ]);
  };

  // Reaction Emojis
  const handleTriggerReaction = (emoji) => {
    const newId = Date.now() + Math.random();
    setFloatingReactions(prev => [...prev, { id: newId, emoji, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== newId));
    }, 2000);
  };

  // Pin Moment Action
  const handlePinMoment = () => {
    const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const secs = (timerSeconds % 60).toString().padStart(2, '0');
    setPinnedMoments(prev => [
      ...prev,
      { time: `${mins}:${secs}`, text: transcriptLines[transcriptLines.length - 1]?.text || "Pinned Moment" }
    ]);
  };

  // Raise Hand
  const handleRaiseHand = () => {
    setHandRaisedQueue(prev => [...prev, { id: Date.now(), name: "Listener Student" }]);
    setShowApprovalModal(true);
  };

  const handleApproveSpeaker = (person) => {
    setSpeakers(prev => [...prev, { id: person.id, name: person.name, role: "Speaker", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", active: false }]);
    setHandRaisedQueue(prev => prev.filter(p => p.id !== person.id));
    setShowApprovalModal(false);
  };

  // Poll Voting
  const handleVotePoll = (index) => {
    if (userVotedIndex !== null) return;
    setUserVotedIndex(index);
    const updatedVotes = [...activePoll.votes];
    updatedVotes[index] += 1;
    setActivePoll({ ...activePoll, votes: updatedVotes });
  };

  // Machine Translation Trigger
  const handleTranslateLanguage = async (lang) => {
    setTargetLanguage(lang);
    if (lang === 'English') return;

    // Simulate batch translation API call
    const translatedObj = {};
    for (const line of transcriptLines) {
      translatedObj[line.id] = `[${lang.slice(0, 2).toUpperCase()}] ${line.text}`;
    }
    setTranslatedLines(translatedObj);
  };

  // End Room & Generate Recap Call
  const handleEndRoom = async () => {
    try {
      await fetch('/api/recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          roomTitle: formattedTitle,
          transcript: transcriptLines,
          pins: pinnedMoments.map(p => p.time),
          reactions: floatingReactions
        })
      });
    } catch (e) {
      console.warn("Recap generation API fallback");
    }
    navigate(`/recap/recap-101`);
  };

  const formatTimer = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="py-8 bg-[#FDFBF7] min-h-screen relative overflow-hidden">
      
      {/* Floating Emojis Animation Container */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {floatingReactions.map(r => (
          <div 
            key={r.id}
            style={{ left: `${r.left}%` }}
            className="absolute bottom-20 text-3xl animate-bounce transition-all duration-1000"
          >
            {r.emoji}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Room Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F0E5DC]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">LIVE STAGE</span>
              <span className="font-mono text-xs text-[#9E8E85]">{formatTimer(timerSeconds)}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D231E]">
              {formattedTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              icon={copiedLink ? Check : Share2}
            >
              {copiedLink ? 'Copied Link!' : 'Invite Link'}
            </Button>

            {role === 'host' ? (
              <Button variant="danger" size="sm" onClick={handleEndRoom} icon={X}>
                End Room & Generate Recap
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => navigate('/rooms')}>
                Leave Room
              </Button>
            )}
          </div>
        </div>

        {/* Stage Grid: Left Audio Stage + Right Live Captions & Polls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Stage & Speakers */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Speakers Avatars Grid */}
            <Card variant="default" className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#2D231E] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E05638]" />
                  Active Stage ({speakers.length})
                </h3>
                <span className="text-xs font-bold text-[#9E8E85]">Role: {role.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {speakers.map(sp => (
                  <div key={sp.id} className="bg-[#FAF4EE] p-4 rounded-2xl border border-[#F0E5DC] flex flex-col items-center text-center space-y-2">
                    <Avatar src={sp.avatar} name={sp.name} size="lg" isActiveSpeaker={sp.active} />
                    <span className="font-bold text-xs text-[#2D231E] truncate w-full">{sp.name}</span>
                    <Badge variant="terracotta" size="sm">{sp.role}</Badge>
                  </div>
                ))}
              </div>

              {/* Interaction Bar: Emoji Reactions & Pin Button */}
              <div className="pt-4 border-t border-[#F5ECE5] flex flex-wrap items-center justify-between gap-4">
                
                {/* Emojis */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#6B5E57]">Reactions:</span>
                  {['👏', '💡', '❓', '🔥'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleTriggerReaction(emoji)}
                      className="text-lg p-2 rounded-xl bg-[#FAF5F0] hover:bg-[#FFF0EB] border border-[#F0E5DC] transition-transform hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Pin Moment Button */}
                <Button 
                  variant="amber" 
                  size="sm"
                  onClick={handlePinMoment}
                  icon={Pin}
                >
                  Pin Moment 📌
                </Button>
              </div>

              {/* Speaker Control Bar */}
              <div className="pt-2 flex items-center justify-between">
                <Button 
                  variant={isMicOn ? "emerald" : "danger"} 
                  size="md"
                  onClick={() => setIsMicOn(!isMicOn)}
                  icon={isMicOn ? Mic : MicOff}
                >
                  {isMicOn ? "Mute Mic" : "Unmute Mic"}
                </Button>

                {role === 'listener' && (
                  <Button variant="secondary" size="md" onClick={handleRaiseHand} icon={Hand}>
                    Raise Hand ✋
                  </Button>
                )}
              </div>
            </Card>

            {/* Pinned Moments List */}
            <Card variant="warm" className="space-y-3 p-5">
              <h4 className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-1.5">
                <Pin className="w-4 h-4 text-[#D97706]" />
                Pinned Timestamps ({pinnedMoments.length})
              </h4>
              <div className="space-y-2">
                {pinnedMoments.map((p, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-xl border border-[#F0E5DC] text-xs flex items-center justify-between">
                    <span className="font-mono font-bold text-[#E05638]">{p.time}</span>
                    <span className="text-[#6B5E57] truncate max-w-xs">{p.text}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Right Column: Live Captions, Translations & Polls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Captions Box */}
            <Card variant="default" className="space-y-4 p-5">
              <div className="flex items-center justify-between border-b border-[#F5ECE5] pb-3">
                <span className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E05638]" />
                  Live Speech Transcriber
                </span>

                {/* Translation Dropdown */}
                <div className="flex items-center gap-1 text-xs">
                  <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <select 
                    value={targetLanguage}
                    onChange={(e) => handleTranslateLanguage(e.target.value)}
                    className="bg-[#FAF4EE] border border-[#F0E5DC] rounded-lg px-2 py-1 text-xs text-[#2D231E] font-medium"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Hindi">Hindi</option>
                    <option value="French">French</option>
                    <option value="Mandarin">Mandarin</option>
                  </select>
                </div>
              </div>

              {/* Speech Recognition Warning or Fallback */}
              {!speechSupported && (
                <div className="bg-[#FEF3C7] text-[#D97706] p-3 rounded-xl text-xs space-y-2">
                  <p className="font-bold flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    Web Speech API not active in current browser.
                  </p>
                  <Button 
                    variant="amber" 
                    size="sm"
                    onClick={() => addTranscriptLine("You (Host)", "Testing sample spoken transcript chunk!")}
                  >
                    Load Sample Transcript Chunk
                  </Button>
                </div>
              )}

              {/* Transcript Lines Scroll View */}
              <div className="bg-[#FAF5F0] p-3 rounded-2xl border border-[#F0E5DC] max-h-56 overflow-y-auto space-y-2">
                {transcriptLines.map((line) => (
                  <div key={line.id} className="bg-white p-2.5 rounded-xl border border-[#F0E5DC] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-[#E05638]">{line.speaker}</span>
                      <span className="text-[#9E8E85] font-mono">{line.time}</span>
                    </div>
                    <p className="text-[#2D231E]">
                      {translatedLines[line.id] || line.text}
                    </p>
                  </div>
                ))}

                {/* Interim text in grey */}
                {interimText && (
                  <p className="text-xs text-[#9E8E85] italic p-1 animate-pulse">
                    Listening... "{interimText}"
                  </p>
                )}
              </div>

              {/* Custom Phrase simulator input */}
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={customSpeakInput}
                  onChange={(e) => setCustomSpeakInput(e.target.value)}
                  placeholder="Type simulated speech..."
                  className="w-full bg-[#FAF5F0] px-3 py-2 rounded-xl text-xs border border-[#F0E5DC]"
                />
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    if (customSpeakInput) {
                      addTranscriptLine("You (Host)", customSpeakInput);
                      setCustomSpeakInput('');
                    }
                  }}
                >
                  Speak
                </Button>
              </div>
            </Card>

            {/* Live Polls & Quizzes */}
            <Card variant="terracotta" className="space-y-4 p-5">
              <div className="flex items-center justify-between border-b border-[#FCD9CE] pb-3">
                <span className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-[#E05638]" />
                  Live Room Poll
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold text-[#E05638]">ACTIVE</span>
              </div>

              <div className="space-y-3 text-xs">
                <p className="font-bold text-[#2D231E]">{activePoll.question}</p>
                
                {/* Options Voting Buttons & Bar Chart */}
                <div className="space-y-2">
                  {activePoll.options.map((opt, idx) => {
                    const totalVotes = activePoll.votes.reduce((a, b) => a + b, 0);
                    const pct = totalVotes > 0 ? Math.round((activePoll.votes[idx] / totalVotes) * 100) : 0;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleVotePoll(idx)}
                        disabled={userVotedIndex !== null}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all relative overflow-hidden ${
                          userVotedIndex === idx
                            ? 'bg-[#E05638] text-white border-[#E05638]'
                            : 'bg-white text-[#2D231E] border-[#FCD9CE] hover:bg-[#FAF5F0]'
                        }`}
                      >
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-[#E05638]/10 transition-all duration-300 pointer-events-none"
                          style={{ width: `${pct}%` }}
                        />
                        <div className="flex items-center justify-between relative z-10 font-medium">
                          <span>{opt}</span>
                          <span className="font-bold font-mono">{pct}% ({activePoll.votes[idx]})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

          </div>

        </div>

      </div>

      {/* Host Approval Modal for Raised Hands */}
      <Modal 
        isOpen={showApprovalModal} 
        onClose={() => setShowApprovalModal(false)}
        title="Speaker Request"
        subtitle="A listener has raised their hand to join the stage as a speaker."
      >
        <div className="space-y-4 pt-2">
          <p className="text-sm font-semibold text-[#2D231E]">
            Approve listener to speak in "{formattedTitle}"?
          </p>
          <div className="flex gap-3">
            <Button 
              variant="primary" 
              size="md" 
              className="w-full justify-center"
              onClick={() => handleApproveSpeaker(handRaisedQueue[0] || { id: 99, name: "Student Listener" })}
            >
              Approve Speaker
            </Button>
            <Button 
              variant="secondary" 
              size="md" 
              className="w-full justify-center"
              onClick={() => setShowApprovalModal(false)}
            >
              Deny
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
