import React from 'react';

export default function Badge({
  children,
  variant = 'terracotta',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyles = "inline-flex items-center gap-1.5 font-bold tracking-wide rounded-full border transition-colors select-none";

  const variants = {
    terracotta: "bg-[#FFF0EB] text-[#E05638] border-[#FCD9CE]",
    amber: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    live: "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]",
    purple: "bg-[#F3E8FF] text-[#8B5CF6] border-[#DDD6FE]",
    neutral: "bg-[#FAF5F0] text-[#6B5E57] border-[#F0E5DC]",
    dark: "bg-[#2D231E] text-white border-[#45362E]"
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 uppercase",
    md: "text-xs px-3 py-1 uppercase",
    lg: "text-sm px-4 py-1.5 font-semibold"
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.terracotta} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
