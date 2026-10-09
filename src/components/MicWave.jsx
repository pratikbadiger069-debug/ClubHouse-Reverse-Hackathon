/**
 * MicWave.jsx — Animated microphone waveform component
 *
 * Renders 7 vertical bars whose heights are driven by the `bands` array from
 * useMicLevel. When all bands are 0 (silent/mic off) the bars sit flat.
 * A subtle spring animation via CSS transitions makes it feel smooth.
 *
 * SIZE VARIANTS:
 *  size="sm"  – used on participant cards to show who's speaking
 *  size="md"  – default, used next to the host's own mic button
 *  size="lg"  – large, shown in the lobby during mic permission check
 */

import React from 'react';

const HEIGHTS = { sm: 16, md: 32, lg: 52 };
const BAR_W   = { sm: 2,  md: 3,  lg: 4  };

export default function MicWave({ bands = [], size = 'md', color = '#E05638', silent = false }) {
  const maxH  = HEIGHTS[size] ?? HEIGHTS.md;
  const barW  = BAR_W[size]   ?? BAR_W.md;
  const count = bands.length || 7;

  return (
    <div
      className="flex items-end gap-px"
      aria-hidden="true"
      style={{ height: maxH, width: count * (barW + 2) }}
    >
      {Array.from({ length: count }, (_, i) => {
        // minimum 3% so bars are always visible (never invisible)
        const raw  = bands[i] ?? 0;
        const pct  = silent ? 3 : Math.max(3, raw);
        const h    = Math.round((pct / 100) * maxH);
        return (
          <div
            key={i}
            style={{
              width:           barW,
              height:          h,
              background:      color,
              borderRadius:    barW,
              transition:      'height 80ms ease-out',
              opacity:         silent ? 0.3 : 0.9,
            }}
          />
        );
      })}
    </div>
  );
}

/** Small "is speaking" ring indicator for participant cards */
export function SpeakingRing({ speaking, color = '#E05638' }) {
  if (!speaking) return null;
  return (
    <span
      aria-label="Speaking"
      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse"
      style={{ background: color }}
    />
  );
}
