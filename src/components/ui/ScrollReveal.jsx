import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — IntersectionObserver-based entrance animation
 *
 * Motion principles (Clubhouse-inspired):
 * - Only opacity + transform animated (GPU-composited, no layout shift)
 * - Spring easing: cubic-bezier(0.16, 1, 0.3, 1) — soft, playful, not snappy
 * - 600ms duration — matches reference's relaxed page-load feel
 * - Animate once (unobserve after first reveal)
 * - Stagger via delay prop (ms)
 * - Prefers-reduced-motion: instantly visible, no animation
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',  // 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in'
  delay = 0,              // ms delay before transition starts
  duration = 600,         // ms
  threshold = 0.12,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    /* Respect prefers-reduced-motion — show immediately */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // animate once
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  /* Initial (hidden) → visible state pairs per animation type */
  const states = {
    'fade-up':    isVisible ? 'opacity-100 translate-y-0'   : 'opacity-0 translate-y-6',
    'fade-in':    isVisible ? 'opacity-100 scale-100'        : 'opacity-0 scale-[0.97]',
    'slide-left': isVisible ? 'opacity-100 translate-x-0'   : 'opacity-0 -translate-x-8',
    'slide-right':isVisible ? 'opacity-100 translate-x-0'   : 'opacity-0 translate-x-8',
    'zoom-in':    isVisible ? 'opacity-100 scale-100'        : 'opacity-0 scale-90',
  };

  return (
    <div
      ref={ref}
      style={{
        /* Spring easing — cubic-bezier(0.16, 1, 0.3, 1) for soft, playful feel */
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`${states[animation] ?? states['fade-up']} ${className}`}
    >
      {children}
    </div>
  );
}
