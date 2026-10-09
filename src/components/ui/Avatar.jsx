import React from 'react';
import { Mic } from 'lucide-react';

/**
 * Avatar — circular avatar with optional active-speaker ring
 *
 * Active speaker ring uses yellow accent (#F5C518) instead of old terracotta.
 * Fallback initials bg uses charcoal (#1A1A1A) with cream text.
 */
export default function Avatar({
  src,
  alt = 'User avatar',
  name = '',
  size = 'md',
  isActiveSpeaker = false,
  role = 'speaker',
  className = ''
}) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const getInitials = (str) => {
    if (!str) return 'U';
    return str.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={[
            sizes[size],
            'rounded-full object-cover border-2 border-white shadow-sm transition-transform duration-300',
            /* Active speaker: yellow ring instead of old terracotta */
            isActiveSpeaker ? 'ring-4 ring-[#F5C518] ring-offset-1 scale-105' : '',
          ].join(' ')}
        />
      ) : (
        /* Fallback initials: charcoal bg + cream text */
        <div
          className={[
            sizes[size],
            'rounded-full bg-[#1A1A1A] text-[#F5F0E8] font-bold flex items-center justify-center border-2 border-white shadow-sm',
            isActiveSpeaker ? 'ring-4 ring-[#F5C518] ring-offset-1 scale-105' : '',
          ].join(' ')}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Active Mic Indicator Badge — charcoal + cream, not terracotta */}
      {isActiveSpeaker && (
        <span
          className="absolute -bottom-1 -right-1 bg-[#1A1A1A] text-[#F5C518] p-1 rounded-full shadow-md"
          title="Speaking now"
          aria-label="Speaking now"
        >
          <Mic className="w-3 h-3" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
