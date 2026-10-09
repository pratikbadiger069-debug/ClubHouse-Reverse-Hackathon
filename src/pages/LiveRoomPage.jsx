/**
 * LiveRoomPage.jsx — Real-time private audio room
 *
 * ARCHITECTURE:
 *  - Room state lives in roomStore (in-memory pub-sub, swappable with Supabase Realtime)
 *  - Mic audio → useMicLevel hook → MicWave bars (proves mic works)
 *  - Speech → useLiveCaptions hook → broadcastCaption() → subscribeCaptions()
 *  - Presence: joinRoom() / updateMember() / leaveRoom() in roomStore
 *
 * TWO-WINDOW DEMO:
 *  Window A: creates room via StartRoomModal → arrives here as host
 *  Window B: opens /room/:id → hits RoomLobby → joins as guest → sees captions
 *  NOTE: roomStore is per-tab (no SharedWorker in demo). In production, replace
 *  with Supabase Realtime Presence + Broadcast channel.
 *
 * ID FLOW:
 *  room.id (nanoid, 10 chars) = DB row ID = audio room name = realtime channel name
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Mic, MicOff, X, Share2, Copy, Check, Sparkles, Users, FileText,
  ArrowLeft, Hand, Globe, Radio, AlertCircle, RefreshCw, Zap
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import MicWave, { SpeakingRing } from '../components/MicWave';
import { useMicLevel } from '../hooks/useMicLevel';
import { useLiveCaptions } from '../hooks/useLiveCaptions';
import {
  getRoom, joinRoom, updateMember, removeMember, endRoom,
  broadcastHandRaise, subscribeHandRaises, subscribeCaptions, broadcastCaption,
} from '../lib/roomStore';

// ── Helpers ────────────────────────────────────────────────────────────────
function getProfileSafe() {
  try { return JSON.parse(localStorage.getItem('echo_user_profile')); }
  catch { return null; }
}

function getGuestSafe() {
  try { return JSON.parse(localStorage.getItem('echo_guest')); }
  catch { return null; }
}

// Map speaker name → a stable colour for captions
const CAPTION_COLORS = ['#E05638', '#2563EB', '#059669', '#7C3AED', '#D97706'];
const colorCache = {};
let colorIndex = 0;
function colorForSpeaker(name) {
  if (!colorCache[name]) {
    colorCache[name] = CAPTION_COLORS[colorIndex % CAPTION_COLORS.length];
    colorIndex++;
  }
  return colorCache[name];
}

// Language code map for SpeechRecognition
const LANG_CODES = {
  English: 'en-US', Hindi: 'hi-IN', Spanish: 'es-ES',
  French: 'fr-FR', Mandarin: 'zh-CN', German: 'de-DE', Japanese: 'ja-JP',
};

// ── RoomLobby ──────────────────────────────────────────────────────────────
/**
 * Shown when a guest opens /room/:id.
 * Collects display name, checks mic permission, then calls onJoin.
 */
function RoomLobby({ room, onJoin }) {
  const [name,    setName]    = useState('');
  const [stage,   setStage]   = useState('name'); // 'name' | 'mic' | 'ready'
  const [micOk,   setMicOk]   = useState(false);
  const [micErr,  setMicErr]  = useState(null);

  // Mic permission check
  const checkMic = async () => {
    setMicErr(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      s.getTracks().forEach(t => t.stop()); // we don't need the stream yet
      setMicOk(true);
      setStage('ready');
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setMicErr('Mic permission denied — you can still join as a listener.');
      } else if (err.name === 'NotFoundError') {
        setMicErr('No microphone found — you can still join as a listener.');
      } else {
        setMicErr(`Mic error: ${err.message}. You can still join as a listener.`);
      }
      setStage('ready');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#F0E5DC] space-y-6">

        {/* Room info */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            LIVE
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-[#2D231E]">{room.title}</h1>
          {room.topic && <p className="text-sm text-[#6B5E57]">{room.topic}</p>}
          <p className="text-xs text-[#9E8E85]">Hosted by {room.hostName}</p>
        </div>

        {/* Step 1: Enter name */}
        {stage === 'name' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2D231E] uppercase tracking-wider block">
                Your display name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && name.trim() && setStage('mic')}
                placeholder="e.g. Priya M."
                autoFocus
                className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
              />
            </div>
            <Button
              variant="primary" size="lg"
              className="w-full justify-center"
              disabled={!name.trim()}
              onClick={() => setStage('mic')}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Mic check */}
        {stage === 'mic' && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF0EB] flex items-center justify-center mx-auto">
              <Mic className="w-8 h-8 text-[#E05638]" />
            </div>
            <div>
              <p className="font-bold text-[#2D231E]">Allow microphone access?</p>
              <p className="text-sm text-[#6B5E57] mt-1">You'll join as a listener and can request to speak later.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="primary" size="lg" className="w-full justify-center" onClick={checkMic}>
                <Mic className="w-4 h-4" /> Allow & Join
              </Button>
              <button
                onClick={() => { setMicOk(false); setStage('ready'); }}
                className="text-sm text-[#6B5E57] underline underline-offset-2"
              >
                Skip — join as listener only
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ready to join */}
        {stage === 'ready' && (
          <div className="space-y-4">
            {micErr && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-2 text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                {micErr}
              </div>
            )}
            {micOk && !micErr && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex gap-2 text-xs text-emerald-800">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                Microphone is ready!
              </div>
            )}
            <Button
              variant="primary" size="lg"
              className="w-full justify-center"
              onClick={() => onJoin({ name: name.trim(), micGranted: micOk })}
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Join Room
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

// ── CaptionPanel ────────────────────────────────────────────────────────────
function CaptionPanel({ lines, interims, speechSupported }) {
  const bottomRef       = useRef(null);
  const panelRef        = useRef(null);
  const [autoscroll, setAutoscroll] = useState(true);

  // Auto-scroll to bottom unless user scrolled up manually
  useEffect(() => {
    if (autoscroll) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, interims, autoscroll]);

  const handleScroll = () => {
    if (!panelRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = panelRef.current;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 80;
    setAutoscroll(nearBottom);
  };

  const allLines = [
    ...lines.map(l => ({ ...l, isInterim: false })),
    ...Object.values(interims).map(l => ({ ...l, isInterim: true })),
  ].sort((a, b) => a.ts - b.ts);

  // Last 2-3 "large" caption lines (subtitle style)
  const recentFinals = lines.slice(-3);

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Subtitle-style large captions (last 3 final lines) */}
      <div className="bg-[#2D231E]/90 rounded-2xl p-4 mb-3 min-h-[72px] flex flex-col justify-end">
        {recentFinals.length === 0 && (
          <p className="text-[#9E8E85] text-sm italic text-center">
            {speechSupported ? 'Captions will appear here…' : 'Live captions need Chrome or Edge'}
          </p>
        )}
        {recentFinals.map(l => (
          <p key={l.lineId} className="text-white font-medium text-sm leading-snug">
            <span style={{ color: colorForSpeaker(l.speakerName) }} className="font-bold text-xs mr-1.5">
              {l.speakerName}
            </span>
            {l.text}
          </p>
        ))}
        {/* Current interim (if any) */}
        {Object.values(interims).map(il => (
          <p key={il.lineId} className="text-[#9E8E85] text-sm italic leading-snug">
            <span style={{ color: colorForSpeaker(il.speakerName) }} className="font-bold text-xs mr-1.5 opacity-70">
              {il.speakerName}
            </span>
            {il.text}…
          </p>
        ))}
      </div>

      {/* Scrollable history */}
      <div
        ref={panelRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-1.5 pr-1"
        style={{ maxHeight: 220 }}
      >
        {allLines.map((l, i) => (
          <div key={l.lineId + i} className={`flex gap-2 text-xs ${l.isInterim ? 'opacity-60' : ''}`}>
            <span
              className="font-bold shrink-0 mt-px"
              style={{ color: colorForSpeaker(l.speakerName) }}
            >
              {l.speakerName.split(' ')[0]}
            </span>
            <span className={l.isInterim ? 'text-[#9E8E85] italic' : 'text-[#2D231E]'}>
              {l.text}{l.isInterim ? '…' : ''}
            </span>
          </div>
        ))}
        {!autoscroll && (
          <button
            onClick={() => { setAutoscroll(true); bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-[10px] font-bold text-[#E05638] bg-[#FFF0EB] px-2 py-1 rounded-full sticky bottom-0"
          >
            ↓ Jump to latest
          </button>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reconnecting banner */}
      {/* passed as prop if needed */}
    </div>
  );
}

// ── Main LiveRoomPage component ────────────────────────────────────────────
export default function LiveRoomPage() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  // ── Room lookup ─────────────────────────────────────────────────────────
  const room = getRoom(roomId);

  // ── Current user identity ───────────────────────────────────────────────
  const profile = getProfileSafe();
  const guest   = getGuestSafe();
  const me = profile || guest;

  // Determine if this user is the host
  const isHost = room && me && (me.username === room.hostId || me.name === room.hostName);

  // ── Lobby state ─────────────────────────────────────────────────────────
  // Show lobby if user has no identity at all (cold link)
  const [inLobby, setInLobby] = useState(!me && !!room);

  // ── Room presence ───────────────────────────────────────────────────────
  const [members, setMembers] = useState([]);
  const [handQueue, setHandQueue] = useState([]);
  const leaveRef = useRef(null);

  // ── Mic + captions ──────────────────────────────────────────────────────
  const [isMicOn, setIsMicOn] = useState(false);
  const [role, setRole] = useState(isHost ? 'host' : 'listener');
  const canSpeak = role === 'host' || role === 'speaker';

  const { level, bands, error: micError, silenceWarning } = useMicLevel(isMicOn && canSpeak);
  const [captionStatus, setCaptionStatus] = useState('idle');

  // Caption lines (final) + interims map (keyed by lineId, updated in place)
  const [captionLines,   setCaptionLines]   = useState([]);
  const [captionInterims, setCaptionInterims] = useState({}); // lineId → line

  // Caption speech recognition
  const langCode = LANG_CODES[room?.language] || 'en-US';
  useLiveCaptions({
    roomId,
    speakerId: me?.username || me?.name || 'guest',
    speakerName: me?.name || 'Guest',
    enabled: isMicOn && canSpeak,
    language: langCode,
    onStatusChange: setCaptionStatus,
  });

  // ── Timer ───────────────────────────────────────────────────────────────
  const [timerSeconds, setTimerSeconds] = useState(0);
  useEffect(() => {
    if (inLobby) return;
    const t = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [inLobby]);

  // ── Invite link copy ────────────────────────────────────────────────────
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${window.location.origin}/room/${roomId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: room?.title || 'Echo Room', url: inviteUrl });
    } else {
      copyLink();
    }
  };

  // ── Join presence ───────────────────────────────────────────────────────
  const doJoin = useCallback((overrideName = null, overrideRole = null) => {
    if (!room) return;
    const userId = me?.username || me?.name || `guest-${Date.now()}`;
    const memberRole = overrideRole || role;
    leaveRef.current?.(); // leave previous if any
    leaveRef.current = joinRoom(roomId, {
      userId,
      name:   overrideName || me?.name || 'Guest',
      avatar: me?.avatar   || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      role:   memberRole,
      micOn:  isMicOn,
      speaking: false,
    }, ({ members: m }) => setMembers(m));
  }, [room, roomId, me, role, isMicOn]);

  // Join when not in lobby anymore
  useEffect(() => {
    if (!inLobby && room) doJoin();
    return () => leaveRef.current?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inLobby]);

  // ── Update presence when mic/speaking changes ───────────────────────────
  useEffect(() => {
    if (!me || !room) return;
    const userId = me?.username || me?.name;
    const speaking = level > 8; // threshold for "speaking"
    updateMember(roomId, userId, { micOn: isMicOn, speaking });
  }, [isMicOn, level, roomId, me, room]);

  // ── Caption subscription ────────────────────────────────────────────────
  useEffect(() => {
    const unsub = subscribeCaptions(roomId, (line) => {
      if (line.isFinal) {
        setCaptionLines(prev => {
          // Remove the interim version of this line (same lineId) then add final
          const without = prev.filter(l => l.lineId !== line.lineId);
          return [...without, line];
        });
        setCaptionInterims(prev => {
          const n = { ...prev };
          delete n[line.lineId];
          return n;
        });
      } else {
        // Update interim in place (no duplicate lines)
        setCaptionInterims(prev => ({ ...prev, [line.lineId]: line }));
      }
    });
    return unsub;
  }, [roomId]);

  // ── Hand-raise subscription ─────────────────────────────────────────────
  useEffect(() => {
    const unsub = subscribeHandRaises(roomId, (event) => {
      if (event.type === 'raise') {
        setHandQueue(prev => [...prev.filter(h => h.userId !== event.userId), event]);
      } else if (event.type === 'lower' || event.type === 'approve') {
        setHandQueue(prev => prev.filter(h => h.userId !== event.userId));
      }
    });
    return unsub;
  }, [roomId]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const toggleMic = () => setIsMicOn(v => !v);

  const handleRaiseHand = () => {
    broadcastHandRaise(roomId, {
      type: 'raise',
      userId: me?.username || me?.name,
      name:   me?.name || 'Guest',
      avatar: me?.avatar,
    });
  };

  const approveHand = (person) => {
    updateMember(roomId, person.userId, { role: 'speaker' });
    broadcastHandRaise(roomId, { type: 'approve', userId: person.userId });
    setHandQueue(prev => prev.filter(h => h.userId !== person.userId));
  };

  const demoteMember = (userId) => {
    updateMember(roomId, userId, { role: 'listener', micOn: false });
  };

  const kickMember = (userId) => {
    removeMember(roomId, userId);
  };

  const handleEndRoom = () => {
    endRoom(roomId);
    // Navigate to a recap stub (the real recap pipeline picks it up)
    navigate(`/recap/recap-${roomId}`);
  };

  const handleLobbyJoin = ({ name, micGranted }) => {
    // Save a guest identity
    const guest = { name, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` };
    localStorage.setItem('echo_guest', JSON.stringify(guest));
    setInLobby(false);
    setIsMicOn(micGranted);
    doJoin(name, 'listener');
  };

  const formatTimer = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // ── Edge cases ──────────────────────────────────────────────────────────
  // Room doesn't exist in the store (cold reload or ended)
  if (!room) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <div className="max-w-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FFF0EB] flex items-center justify-center mx-auto">
            <Radio className="w-8 h-8 text-[#E05638] opacity-40" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#2D231E]">Room not found</h1>
          <p className="text-sm text-[#6B5E57]">
            This room may have ended or the link is invalid.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Link to="/library" className="btn-primary justify-center text-sm py-3">
              <FileText className="w-4 h-4" /> Browse Recaps
            </Link>
            <Link to="/home" className="btn-secondary justify-center text-sm py-3">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Room has ended
  if (room.status === 'ended') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <div className="max-w-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-[#059669]" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#2D231E]">Room ended</h1>
          <p className="text-sm text-[#6B5E57]">The host ended the session. The recap is being generated.</p>
          <Link
            to={`/recap/recap-${roomId}`}
            className="btn-primary justify-center text-sm py-3 inline-flex"
          >
            <FileText className="w-4 h-4" /> View Recap
          </Link>
        </div>
      </div>
    );
  }

  // Lobby for guests (no profile)
  if (inLobby) {
    return <RoomLobby room={room} onJoin={handleLobbyJoin} />;
  }

  // ── Main room UI ────────────────────────────────────────────────────────
  const hosts    = members.filter(m => m.role === 'host');
  const speakers = members.filter(m => m.role === 'speaker');
  const listeners= members.filter(m => m.role === 'listener');
  const speechSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Room Header ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-[#F0E5DC] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            {/* Back + Live indicator + Title */}
            <div className="flex-1 min-w-0 space-y-1">
              <Link to="/rooms" className="text-xs text-[#9E8E85] hover:text-[#E05638] flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Rooms
              </Link>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                  LIVE · {formatTimer(timerSeconds)}
                </span>
                {room.language !== 'English' && (
                  <span className="text-xs text-[#6B5E57] flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> {room.language}
                  </span>
                )}
              </div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#2D231E] truncate">
                {room.title}
              </h1>
              {room.topic && (
                <p className="text-xs text-[#6B5E57]">{room.topic}</p>
              )}
            </div>

            {/* Invite link actions */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <div className="bg-[#FAF5F0] border border-[#F0E5DC] rounded-xl px-3 py-2 flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono text-[#9E8E85] truncate max-w-[140px]">
                  /room/{roomId}
                </span>
                <button
                  onClick={copyLink}
                  aria-label="Copy invite link"
                  className="shrink-0 text-[#E05638] hover:text-[#C9472B]"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={shareLink}
                className="p-2.5 rounded-xl bg-[#FFF0EB] text-[#E05638] hover:bg-[#FFE4D6] transition-colors"
                aria-label="Share room"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isHost && (
                <Button variant="danger" size="sm" onClick={handleEndRoom} icon={X}>
                  End Room
                </Button>
              )}
            </div>
          </div>

          {/* Invite link banner (prominent) */}
          {copied && (
            <div className="mt-3 bg-[#ECFDF5] border border-emerald-200 rounded-xl px-4 py-2 text-xs text-emerald-800 font-medium flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              Link copied! Share it so others can join.
            </div>
          )}
        </div>

        {/* ── Hand-raise queue (host only) ─────────────────────────────── */}
        {isHost && handQueue.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Hand className="w-4 h-4" /> Raised hands
            </p>
            {handQueue.map(person => (
              <div key={person.userId} className="flex items-center justify-between gap-3">
                <span className="text-sm text-[#2D231E] font-medium">{person.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveHand(person)}
                    className="text-xs bg-[#E05638] text-white px-3 py-1.5 rounded-full font-bold hover:bg-[#C9472B]"
                  >
                    Allow to speak
                  </button>
                  <button
                    onClick={() => broadcastHandRaise(roomId, { type: 'lower', userId: person.userId })}
                    className="text-xs text-[#6B5E57] px-3 py-1.5 rounded-full border border-[#F0E5DC] hover:bg-[#FAF5F0]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column: Participants ─────────────────────────────── */}
          <div className="lg:col-span-1 space-y-4">

            {/* Stage (host + speakers) */}
            <Card variant="default" className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#E05638]" /> On Stage
                </h2>
                <Badge variant="terracotta" size="sm">{hosts.length + speakers.length}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[...hosts, ...speakers].map(m => (
                  <div key={m.userId} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-colors ${
                        m.speaking ? 'border-[#E05638]' : 'border-[#F0E5DC]'
                      }`}>
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`; }}
                        />
                      </div>
                      {m.speaking && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#E05638] border-2 border-white animate-pulse" aria-label="Speaking" />
                      )}
                      {!m.micOn && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#9E8E85] border-2 border-white flex items-center justify-center">
                          <MicOff className="w-2 h-2 text-white" />
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-[#2D231E] leading-tight truncate w-full">
                      {m.name}
                    </p>
                    <p className="text-[9px] text-[#9E8E85] capitalize">{m.role}</p>

                    {/* Host controls */}
                    {isHost && m.userId !== (me?.username || me?.name) && (
                      <div className="flex gap-1">
                        {m.role === 'speaker' && (
                          <button
                            onClick={() => demoteMember(m.userId)}
                            className="text-[9px] text-[#9E8E85] border border-[#F0E5DC] px-1.5 py-0.5 rounded-full hover:border-[#E05638] hover:text-[#E05638]"
                          >
                            Demote
                          </button>
                        )}
                        <button
                          onClick={() => kickMember(m.userId)}
                          className="text-[9px] text-[#9E8E85] border border-[#F0E5DC] px-1.5 py-0.5 rounded-full hover:border-red-400 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {hosts.length + speakers.length === 0 && (
                  <p className="col-span-3 text-xs text-[#9E8E85] text-center py-4">No one on stage yet</p>
                )}
              </div>
            </Card>

            {/* Listeners */}
            {listeners.length > 0 && (
              <Card variant="default" className="p-5 space-y-3">
                <h2 className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#9E8E85]" /> Listeners
                  <Badge variant="default" size="sm">{listeners.length}</Badge>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listeners.map(m => (
                    <div key={m.userId} className="flex items-center gap-1.5 bg-[#FAF5F0] px-2.5 py-1.5 rounded-full text-xs text-[#6B5E57]">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-5 h-5 rounded-full"
                        onError={e => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`; }}
                      />
                      {m.name}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* ── Right column: Captions + Controls ────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Live Captions panel */}
            <Card variant="default" className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E05638]" /> Live Captions
                </h2>
                {captionStatus === 'reconnecting' && (
                  <span className="text-[10px] text-amber-600 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Reconnecting…
                  </span>
                )}
                {captionStatus === 'listening' && (
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Listening
                  </span>
                )}
                {!speechSupported && (
                  <span className="text-[10px] text-amber-600">Chrome/Edge only</span>
                )}
              </div>

              <CaptionPanel
                lines={captionLines}
                interims={captionInterims}
                speechSupported={speechSupported}
              />
            </Card>

            {/* ── My Controls ──────────────────────────────────────────── */}
            <Card variant="default" className="p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

                {/* Mic button + wave */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleMic}
                    className={`relative p-4 rounded-2xl border-2 transition-all font-bold text-sm flex items-center gap-2 ${
                      isMicOn
                        ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
                        : 'bg-[#FAF5F0] border-[#F0E5DC] text-[#9E8E85]'
                    }`}
                    aria-label={isMicOn ? 'Turn mic off' : 'Turn mic on'}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    <span className="text-xs hidden sm:inline">
                      {isMicOn ? (level > 8 ? 'Speaking' : 'Mic on') : 'Mic off'}
                    </span>
                  </button>

                  {/* Waveform — only visible when mic is on */}
                  <div className={`transition-opacity ${isMicOn ? 'opacity-100' : 'opacity-0'}`}>
                    <MicWave bands={bands} size="md" silent={!isMicOn || level < 2} />
                  </div>
                </div>

                {/* Mic status text */}
                <div className="flex-1 text-xs text-[#6B5E57] space-y-1">
                  {micError && (
                    <div className="flex items-start gap-1.5 text-red-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      {micError}
                    </div>
                  )}
                  {silenceWarning && isMicOn && !micError && (
                    <div className="flex items-start gap-1.5 text-amber-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      We can't hear you. Check your microphone or browser permissions.
                    </div>
                  )}
                  {isMicOn && !micError && !silenceWarning && (
                    <span className="text-emerald-600">
                      {canSpeak ? '🎙 Your voice is being transcribed.' : '🎧 Mic ready — raise your hand to speak.'}
                    </span>
                  )}
                  {!isMicOn && <span>Click the mic button to unmute.</span>}
                </div>

                {/* Role actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {role === 'listener' && (
                    <Button variant="secondary" size="sm" icon={Hand} onClick={handleRaiseHand}>
                      Raise Hand
                    </Button>
                  )}
                  {isHost && (
                    <Button variant="danger" size="sm" icon={X} onClick={handleEndRoom}>
                      End Room
                    </Button>
                  )}
                </div>
              </div>

              {/* Mic state label (explicit) */}
              <div className="mt-3 pt-3 border-t border-[#F5ECE5] flex items-center gap-2 text-xs text-[#9E8E85]">
                {!isMicOn && <><MicOff className="w-3.5 h-3.5" /> Mic off</>}
                {isMicOn && level < 3 && <><Mic className="w-3.5 h-3.5 text-emerald-500" /> Mic on, listening…</>}
                {isMicOn && level >= 3 && (
                  <span className="flex items-center gap-2 text-emerald-600 font-medium">
                    <Mic className="w-3.5 h-3.5" />
                    Speaking
                    <MicWave bands={bands} size="sm" color="#059669" />
                  </span>
                )}
                <span className="ml-auto flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#F59E0B]" />
                  {members.length} in room
                </span>
              </div>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
