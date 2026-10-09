/**
 * useLiveCaptions.js — Web Speech API caption engine + Realtime broadcast
 *
 * ARCHITECTURE:
 *  Each speaker/host runs SpeechRecognition locally (the browser can only hear
 *  its own mic). Recognized text is published to the roomStore captionBus,
 *  which in production would be a Supabase Realtime Broadcast channel.
 *
 * INTERIM vs FINAL:
 *  - Interim: sent to roomStore every ~300ms, shown in grey, updated in-place.
 *  - Final:   sent once, turned black, saved to transcript_lines in the DB.
 *
 * AUTO-RESTART:
 *  Chrome stops recognition on silence or after ~60 s. We restart on `end`
 *  if the mic is still on. After 3 consecutive failures we show a reconnect banner.
 */

import { useEffect, useRef, useCallback } from 'react';
import { broadcastCaption } from '../lib/roomStore';
import { nanoid } from 'nanoid';

export function useLiveCaptions({
  roomId,
  speakerId,
  speakerName,
  enabled,        // true when mic is on AND user is host/speaker
  language = 'en-US',
  onStatusChange, // (status: 'idle'|'listening'|'reconnecting'|'unsupported') => void
}) {
  const recognitionRef   = useRef(null);
  const lineIdRef        = useRef(nanoid(8)); // current interim line id
  const retryCountRef    = useRef(0);
  const enabledRef       = useRef(enabled);
  const lastBroadcast    = useRef(0);
  const BROADCAST_THROTTLE = 280; // ms between interim broadcasts

  // Keep enabled ref in sync (avoids stale closure in the `end` handler)
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  // ── Build and start recognition ────────────────────────────────────────
  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      onStatusChange?.('unsupported');
      return;
    }

    const r = new SR();
    r.continuous      = true;
    r.interimResults  = true;
    r.lang            = language;
    r.maxAlternatives = 1;

    recognitionRef.current = r;
    onStatusChange?.('listening');

    r.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          // Publish final line — create a new lineId for the next interim
          broadcastCaption(roomId, {
            lineId:      lineIdRef.current,
            speakerId,
            speakerName,
            text:        result[0].transcript.trim(),
            isFinal:     true,
            ts:          Date.now(),
          });
          // Reset for next utterance
          lineIdRef.current = nanoid(8);
          retryCountRef.current = 0;
          onStatusChange?.('listening');
        } else {
          interim += result[0].transcript;
        }
      }

      // Throttled interim broadcast (avoid flooding)
      if (interim) {
        const now = Date.now();
        if (now - lastBroadcast.current >= BROADCAST_THROTTLE) {
          lastBroadcast.current = now;
          broadcastCaption(roomId, {
            lineId:      lineIdRef.current,
            speakerId,
            speakerName,
            text:        interim,
            isFinal:     false,
            ts:          now,
          });
        }
      }
    };

    r.onerror = (event) => {
      // 'no-speech' and 'network' are transient — just let `end` handle restart
      if (event.error === 'aborted') return;
      if (event.error !== 'no-speech' && event.error !== 'network') {
        console.warn('[captions] error:', event.error);
      }
    };

    // AUTO-RESTART: Chrome fires `end` after silence or ~60 s timeout
    r.onend = () => {
      if (!enabledRef.current) return; // user turned mic off — don't restart
      retryCountRef.current += 1;
      if (retryCountRef.current > 3) {
        onStatusChange?.('reconnecting');
      }
      // Small delay to avoid tight loops on repeated errors
      setTimeout(() => {
        if (enabledRef.current) start();
      }, 400);
    };

    try {
      r.start();
    } catch (e) {
      // `start` throws if already started; ignore
    }
  }, [roomId, speakerId, speakerName, language, onStatusChange]);

  // ── Effect: start/stop based on `enabled` ────────────────────────────
  useEffect(() => {
    if (enabled) {
      lineIdRef.current  = nanoid(8);
      retryCountRef.current = 0;
      start();
    } else {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      onStatusChange?.('idle');
    }

    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, [enabled, start, onStatusChange]);
}
