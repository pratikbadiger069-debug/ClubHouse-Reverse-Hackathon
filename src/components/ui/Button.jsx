import React from 'react';

/**
 * Button — Clubhouse-inspired pill buttons
 *
 * Variants:
 *  primary   — charcoal fill + cream text (main CTA)
 *  secondary — outline charcoal, transparent bg (reference outline button)
 *  accent    — yellow fill + dark text (hero accent)
 *  ghost     — no border, subtle hover bg
 *  amber     — amber fill (functional: scheduled rooms)
 *  emerald   — green fill (functional: live join)
 *  danger    — red fill (destructive actions)
 *
 * All hover states animate only transform + background-color (GPU-safe).
 * Duration: 150ms — matches Clubhouse's snappy but not harsh feel.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  ariaLabel,
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-heading font-bold rounded-full',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'select-none cursor-pointer',
  ].join(' ');

  const variants = {
    // charcoal fill + cream text — matches Clubhouse's primary pill button
    primary:   'bg-[#1A1A1A] hover:bg-[#333333] active:bg-[#000] text-[#F5F0E8] border-2 border-[#1A1A1A] hover:border-[#333333] hover:shadow-[0_8px_20px_-4px_rgba(26,26,26,0.25)] hover:-translate-y-0.5',
    // outline charcoal — matches Clubhouse secondary outline button
    secondary: 'bg-transparent hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F5F0E8] border-2 border-[#1A1A1A] hover:-translate-y-0.5',
    // yellow accent — matches yellow hero screenshot variant
    accent:    'bg-[#F5C518] hover:bg-[#DDB010] active:bg-[#C9A00A] text-[#1A1A1A] border-2 border-[#F5C518] hover:border-[#DDB010] hover:-translate-y-0.5',
    // ghost — minimal, no border
    ghost:     'bg-transparent hover:bg-[#EDE8DE] text-[#555555] hover:text-[#1A1A1A] border-2 border-transparent',
    // functional — amber for scheduled/upcoming
    amber:     'bg-[#F59E0B] hover:bg-[#D97706] text-white border-2 border-[#F59E0B] hover:shadow-md hover:-translate-y-0.5',
    // functional — green for live join actions
    emerald:   'bg-[#10B981] hover:bg-[#059669] text-white border-2 border-[#10B981] hover:shadow-md hover:-translate-y-0.5',
    // functional — red for destructive
    danger:    'bg-[#E11D48] hover:bg-[#BE123C] text-white border-2 border-[#E11D48] hover:shadow-md',
  };

  const sizes = {
    sm: 'text-xs py-2 px-4 gap-1.5',
    md: 'text-sm py-2.5 px-5 gap-2',
    lg: 'text-base py-3 px-7 gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className={`${iconSizes[size]} shrink-0`} aria-hidden="true" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className={`${iconSizes[size]} shrink-0`} aria-hidden="true" />
          )}
        </>
      )}
    </button>
  );
}
