import React from 'react';

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
  const baseStyles = "rounded-3xl border transition-all duration-300 relative overflow-hidden";

  const variants = {
    default: "bg-white border-[#F0E5DC] shadow-[0_10px_30px_-5px_rgba(224,86,56,0.08)]",
    warm: "bg-[#FAF4EE] border-[#F0E5DC]",
    terracotta: "bg-[#FFF0EB] border-[#FCD9CE]",
    emerald: "bg-[#ECFDF5] border-[#A7F3D0]",
    dark: "bg-[#2D231E] border-[#45362E] text-white",
    flat: "bg-white border-[#F0E5DC]"
  };

  const hoverStyles = hoverable 
    ? "hover:shadow-[0_20px_40px_-10px_rgba(224,86,56,0.16)] hover:-translate-y-1 hover:border-[#E05638]/30" 
    : "";

  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-10"
  };

  return (
    <div
      onClick={onClick}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
      className={`${baseStyles} ${variants[variant] || variants.default} ${hoverStyles} ${paddings[padding] || paddings.md} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
