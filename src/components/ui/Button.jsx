import React from 'react';

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
  const baseStyles = "inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none select-none";

  const variants = {
    primary: "bg-[#E05638] hover:bg-[#C9472B] active:bg-[#B33B20] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white hover:bg-[#FAF4EE] text-[#2D231E] border border-[#F0E5DC] hover:border-[#E2D4C8] shadow-sm hover:-translate-y-0.5",
    ghost: "bg-transparent hover:bg-[#FAF4EE] text-[#6B5E57] hover:text-[#2D231E]",
    amber: "bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-md hover:-translate-y-0.5",
    emerald: "bg-[#10B981] hover:bg-[#059669] text-white shadow-md hover:-translate-y-0.5",
    danger: "bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-md"
  };

  const sizes = {
    sm: "text-xs py-2 px-4 gap-1.5",
    md: "text-sm py-2.5 px-5 gap-2",
    lg: "text-base py-3.5 px-7 gap-2.5"
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
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
