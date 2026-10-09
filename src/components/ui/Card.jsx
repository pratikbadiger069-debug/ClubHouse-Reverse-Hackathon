import React from 'react';

/**
 * Card — Clubhouse-inspired minimal card
 *
 * Reference design uses almost-flat cards: white bg, very subtle cream border,
 * minimal shadow (nearly invisible). Hover lifts slightly.
 * All variants map to the new warm cream palette.
 */
export default function Card({
  children,
  variant = 'default',
  hoverable = true,
  padding = 'md',
  className = '',
  onClick,
  role,
  ariaLabel,
  ...props
}) {
  /* Base — rounded-3xl matches Clubhouse's generous border-radius */
  const baseStyles = 'rounded-3xl border transition-all duration-300 relative overflow-hidden';

  const variants = {
    default:    'bg-white border-[#E0D8CC] shadow-[0_2px_8px_-1px_rgba(26,26,26,0.06)]',
    warm:       'bg-[#EDE8DE] border-[#E0D8CC]',           // soft cream — section alternates
    accent:     'bg-[#F5C518] border-[#DDB010]',           // yellow accent card
    charcoal:   'bg-[#1A1A1A] border-[#2E2E2E] text-[#F5F0E8]', // dark inverted
    live:       'bg-[#ECFDF5] border-[#A7F3D0]',           // green tint for live rooms
    purple:     'bg-[#F3E8FF] border-[#DDD6FE]',           // purple for communities
    flat:       'bg-white border-[#E0D8CC]',               // no shadow variant
  };

  /* Hover — only transform + box-shadow (GPU composited) */
  const hoverStyles = hoverable
    ? 'hover:shadow-[0_12px_32px_-4px_rgba(26,26,26,0.14)] hover:-translate-y-1 cursor-pointer'
    : '';

  const paddings = {
    none: 'p-0',
    sm:   'p-4',
    md:   'p-6 sm:p-8',
    lg:   'p-8 sm:p-10',
  };

  return (
    <div
      onClick={onClick}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
      className={`${baseStyles} ${variants[variant] ?? variants.default} ${hoverStyles} ${paddings[padding] ?? paddings.md} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
