/**
 * roomStore.js — In-memory live-room registry + presence bus
 *
 * WHY THIS EXISTS:
 *  Supabase Realtime Presence would handle this in production, but we need
 *  the app to work in demo mode without any env vars. This module is a thin
 *  pub-sub singleton that any component can import and subscribe to.
 *
 * DATA SHAPES:
 *  Room   { id, title, topic, language, status, hostId, hostName, createdAt }
 *  Member { userId, name, avatar, role:'host'|'speaker'|'listener', speaking, micOn, joinedAt }
 *
 * FLOW:
 *  1. StartRoomModal calls createRoom() → gets back roomId
 *  2. Host navigates to /room/:id
 *  3. LiveRoomPage calls joinRoom(id, member) → subscribes to presence updates
 *  4. Any participant update (mic toggle, speaking, leave) calls updateMember()
 *  5. endRoom() marks status='ended', all subscribers are notified
 */

import { nanoid } from 'nanoid';

// ── State ──────────────────────────────────────────────────────────────────
const _rooms   = new Map(); // roomId → room meta
const _members = new Map(); // roomId → Map<userId, member>
const _subs    = new Map(); // roomId → Set<callback>

// ── Helpers ────────────────────────────────────────────────────────────────
function _notify(roomId) {
  const room    = _rooms.get(roomId);
  const members = [...(_members.get(roomId)?.values() ?? [])];
  const cbs     = _subs.get(roomId);
  if (!cbs) return;
  cbs.forEach(cb => cb({ room, members }));
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Create a new live room. Returns the new room object. */
export function createRoom({ title, topic, language, hostId, hostName, hostAvatar }) {
  const id = nanoid(10); // 10-char, URL-safe, unguessable
  const room = {
    id,
    title:     title || 'Untitled Room',
    topic:     topic || '',
    language:  language || 'English',
    status:    'live',
    hostId,
    hostName,
    hostAvatar,
    createdAt: Date.now(),
  };
  _rooms.set(id, room);
  _members.set(id, new Map());
  return room;
}

/** Look up a room by ID. Returns the room meta or null. */
export function getRoom(roomId) {
  return _rooms.get(roomId) ?? null;
}

/** Get the current member list for a room. */
export function getMembers(roomId) {
  return [...(_members.get(roomId)?.values() ?? [])];
}

/**
 * Join a room (or update an existing member record).
 * Returns an unsubscribe function.
 *
 * @param {string}   roomId
 * @param {object}   member  – { userId, name, avatar, role }
 * @param {function} onChange – called with ({ room, members }) whenever anything changes
 */
export function joinRoom(roomId, member, onChange) {
  const room = _rooms.get(roomId);
  if (!room) return () => {}; // room doesn't exist

  // Upsert member
  const memberMap = _members.get(roomId);
  memberMap.set(member.userId, {
    micOn:    false,
    speaking: false,
    joinedAt: Date.now(),
    ...member,
  });

  // Register subscriber
  if (!_subs.has(roomId)) _subs.set(roomId, new Set());
  _subs.get(roomId).add(onChange);

  _notify(roomId);

  // Return cleanup function
  return () => {
    _subs.get(roomId)?.delete(onChange);
    _members.get(roomId)?.delete(member.userId);
    _notify(roomId);
  };
}

/** Update any fields on a member (micOn, speaking, role, etc.). */
export function updateMember(roomId, userId, patch) {
  const memberMap = _members.get(roomId);
  if (!memberMap) return;
  const existing = memberMap.get(userId);
  if (!existing) return;
  memberMap.set(userId, { ...existing, ...patch });
  _notify(roomId);
}

/** Remove a participant by host action. */
export function removeMember(roomId, userId) {
  _members.get(roomId)?.delete(userId);
  _notify(roomId);
}

/**
 * End the room. Notifies all subscribers, then freezes state.
 * Returns the final room object (for the recap redirect).
 */
export function endRoom(roomId) {
  const room = _rooms.get(roomId);
  if (!room) return null;
  room.status = 'ended';
  room.endedAt = Date.now();
  _notify(roomId);
  // After a short delay, clear subscriber list (everyone should have redirected)
  setTimeout(() => {
    _subs.delete(roomId);
    _members.delete(roomId);
  }, 5000);
  return room;
}

// ── Caption broadcast bus (separate from presence) ─────────────────────────
// Uses a simple in-tab event bus. In production, replace with Supabase
// Realtime Broadcast channel `room:<id>:captions`.
const _captionSubs = new Map(); // roomId → Set<callback>

/** Subscribe to caption events for a room. Returns unsubscribe fn. */
export function subscribeCaptions(roomId, callback) {
  if (!_captionSubs.has(roomId)) _captionSubs.set(roomId, new Set());
  _captionSubs.get(roomId).add(callback);
  return () => _captionSubs.get(roomId)?.delete(callback);
}

/** Broadcast a caption line to all subscribers. */
export function broadcastCaption(roomId, line) {
  // line: { lineId, speakerId, speakerName, text, isFinal, ts }
  _captionSubs.get(roomId)?.forEach(cb => cb(line));
}

// ── Hand-raise event bus ───────────────────────────────────────────────────
const _handSubs = new Map();

export function subscribeHandRaises(roomId, callback) {
  if (!_handSubs.has(roomId)) _handSubs.set(roomId, new Set());
  _handSubs.get(roomId).add(callback);
  return () => _handSubs.get(roomId)?.delete(callback);
}

export function broadcastHandRaise(roomId, event) {
  // event: { type:'raise'|'lower'|'approve', userId, name, avatar }
  _handSubs.get(roomId)?.forEach(cb => cb(event));
}
