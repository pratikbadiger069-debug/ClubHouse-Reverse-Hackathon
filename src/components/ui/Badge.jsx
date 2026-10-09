import React from 'react';

/**
 * Badge — Clubhouse-inspired minimal pill badge
 *
 * The palette shifts: charcoal replaces terracotta, yellow accent replaces amber.
 * Green (live) and purple (communities) remain for accessibility + differentiation.
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-bold tracking-wide rounded-full border transition-colors select-none';

  const variants = {
    // charcoal fill + cream text — primary brand badge
    default:    'bg-[#1A1A1A] text-[#F5F0E8] border-[#1A1A1A]',
    // yellow accent — highlight, featured
    accent:     'bg-[#F5C518] text-[#1A1A1A] border-[#DDB010]',
    // cream tint — neutral, secondary
    neutral:    'bg-[#EDE8DE] text-[#555555] border-[#E0D8CC]',
    // outline style — subtle
    outline:    'bg-transparent text-[#1A1A1A] border-[#1A1A1A]',
    // green — LIVE status (functional, accessible)
    live:       'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]',
    // purple — community/guild (functional)
    purple:     'bg-[#F3E8FF] text-[#8B5CF6] border-[#DDD6FE]',
    // amber — scheduled/upcoming
    amber:      'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
    // dark — inverted on dark cards
    dark:       'bg-[#2E2E2E] text-[#F5F0E8] border-[#2E2E2E]',
    // old terracotta alias -> now charcoal (backward compat)
    terracotta: 'bg-[#1A1A1A] text-[#F5F0E8] border-[#1A1A1A]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 uppercase',
    md: 'text-xs px-3 py-1 uppercase',
    lg: 'text-sm px-4 py-1.5 font-semibold',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
