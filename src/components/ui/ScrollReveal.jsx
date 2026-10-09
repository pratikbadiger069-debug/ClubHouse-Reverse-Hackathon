import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up', 'fade-in', 'slide-left', 'slide-right', 'zoom-in'
  delay = 0, // ms delay
  duration = 600, // ms duration
  threshold = 0.15,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const animationClasses = {
    'fade-up': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    'fade-in': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    'slide-left': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    'slide-right': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
    'zoom-in': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) ${animationClasses[animation] || animationClasses['fade-up']} ${className}`}
    >
      {children}
    </div>
  );
}
