import React from 'react';
import { Mic } from 'lucide-react';

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
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-lg"
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
          className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm transition-transform ${
            isActiveSpeaker ? 'ring-4 ring-[#E05638]/40 scale-105' : ''
          }`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-[#E05638] text-white font-bold flex items-center justify-center border-2 border-white shadow-sm ${
            isActiveSpeaker ? 'ring-4 ring-[#E05638]/40 scale-105' : ''
          }`}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Active Mic Indicator Badge */}
      {isActiveSpeaker && (
        <span 
          className="absolute -bottom-1 -right-1 bg-[#E05638] text-white p-1 rounded-full shadow-md animate-pulse"
          title="Speaking now"
          aria-label="Speaking now"
        >
          <Mic className="w-3 h-3" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}
