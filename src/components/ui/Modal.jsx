import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  className = ''
}) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D231E]/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop overlay click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className={`bg-white rounded-3xl ${maxWidth} w-full p-6 sm:p-8 border border-[#F0E5DC] shadow-2xl relative z-10 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 ${className}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#9E8E85] hover:bg-[#FAF5F0] hover:text-[#2D231E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Title Header */}
        {(title || subtitle) && (
          <div className="space-y-1 pr-8">
            {title && (
              <h3 id="modal-title" className="font-heading font-extrabold text-2xl text-[#2D231E]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-[#6B5E57]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div>{children}</div>
      </div>
    </div>
  );
}
