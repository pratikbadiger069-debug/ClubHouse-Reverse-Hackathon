/**
 * useMicLevel.js — Web Audio API mic-level analyser hook
 *
 * HOW IT WORKS:
 *  1. We call getUserMedia({ audio: true }) to get a MediaStream.
 *  2. We connect it to an AudioContext + AnalyserNode.
 *  3. On every animation frame we read getByteFrequencyData() to get a
 *     frequency spectrum, average it, and expose it as a 0-100 "level".
 *  4. We also expose 7 "bands" (slices of the spectrum) for the wave bars.
 *  5. Everything is cleaned up when `enabled` goes false or the component unmounts.
 *
 * RETURNED SHAPE:
 *  { level, bands, error, permissionDenied, noMicFound }
 *    - level:           0-100 average amplitude
 *    - bands:           number[7] – per-bar 0-100 amplitudes for the waveform
 *    - error:           string | null – friendly message
 *    - permissionDenied bool
 *    - noMicFound:      bool
 */

import { useState, useEffect, useRef, useCallback } from 'react';

const NUM_BARS = 7;

export function useMicLevel(enabled) {
  const [level,           setLevel]           = useState(0);
  const [bands,           setBands]           = useState(Array(NUM_BARS).fill(0));
  const [error,           setError]           = useState(null);
  const [permissionDenied,setPermissionDenied]= useState(false);
  const [noMicFound,      setNoMicFound]      = useState(false);
  const [silenceWarning,  setSilenceWarning]  = useState(false); // "we can't hear you"

  const streamRef    = useRef(null);
  const contextRef   = useRef(null);
  const analyserRef  = useRef(null);
  const rafRef       = useRef(null);
  const dataArrayRef = useRef(null);
  const silenceTimer = useRef(null);

  // ── Cleanup function ────────────────────────────────────────────────────
  const cleanup = useCallback(() => {
    if (rafRef.current)      cancelAnimationFrame(rafRef.current);
    if (streamRef.current)   streamRef.current.getTracks().forEach(t => t.stop());
    if (contextRef.current && contextRef.current.state !== 'closed') {
      contextRef.current.close();
    }
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
    streamRef.current   = null;
    contextRef.current  = null;
    analyserRef.current = null;
    rafRef.current      = null;
    setLevel(0);
    setBands(Array(NUM_BARS).fill(0));
    setSilenceWarning(false);
  }, []);

  useEffect(() => {
    if (!enabled) {
      cleanup();
      return;
    }

    let cancelled = false;

    async function init() {
      try {
        // Request mic access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }

        streamRef.current = stream;
        setError(null);
        setPermissionDenied(false);
        setNoMicFound(false);

        // Build Web Audio graph: source → analyser → (nothing; we don't play it back)
        const ctx      = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        analyser.fftSize          = 256; // 128 frequency bins
        analyser.smoothingTimeConstant = 0.75;

        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        contextRef.current  = ctx;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount); // 128 bins

        // silence detection timer — resets whenever we detect sound
        let silenceMs = 0;
        let lastNonSilentTime = Date.now();

        // ── Animation loop ────────────────────────────────────────────────
        function tick() {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          const data    = dataArrayRef.current;
          const binCount = data.length; // 128

          // Overall average level (0-255 → 0-100)
          let sum = 0;
          for (let i = 0; i < binCount; i++) sum += data[i];
          const avg = (sum / binCount / 255) * 100;
          setLevel(Math.round(avg));

          // Divide bins into NUM_BARS groups for the waveform
          const binsPerBar = Math.floor(binCount / NUM_BARS);
          const newBands = Array.from({ length: NUM_BARS }, (_, b) => {
            let bSum = 0;
            for (let j = 0; j < binsPerBar; j++) bSum += data[b * binsPerBar + j];
            return Math.round((bSum / binsPerBar / 255) * 100);
          });
          setBands(newBands);

          // Silence warning: if avg < 2 for 4+ seconds
          if (avg > 2) {
            lastNonSilentTime = Date.now();
            setSilenceWarning(false);
          } else if (Date.now() - lastNonSilentTime > 4000) {
            setSilenceWarning(true);
          }

          rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);

      } catch (err) {
        if (cancelled) return;
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionDenied(true);
          setError('Microphone permission was denied. Please allow mic access in your browser settings and reload.');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setNoMicFound(true);
          setError('No microphone was found. Plug in a mic and try again.');
        } else if (err.name === 'NotReadableError') {
          setError('Your microphone is in use by another app. Close it and try again.');
        } else {
          setError(`Could not access microphone: ${err.message}`);
        }
        setLevel(0);
        setBands(Array(NUM_BARS).fill(0));
      }
    }

    init();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled, cleanup]);

  return { level, bands, error, permissionDenied, noMicFound, silenceWarning };
}
