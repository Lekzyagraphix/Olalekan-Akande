import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CmsImage } from './CmsImage';

export interface LightboxSlide {
  url: string;
  caption?: string;
}

interface ImageLightboxProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function ImageLightbox({
  slides,
  activeIndex,
  onClose,
  onChangeIndex,
}: ImageLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && slides.length > 1) {
        onChangeIndex((activeIndex + 1) % slides.length);
      }
      if (e.key === 'ArrowLeft' && slides.length > 1) {
        onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, slides.length, onClose, onChangeIndex]);

  if (activeIndex === null || !slides[activeIndex]) return null;
  const current = slides[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/95 flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Project image lightbox"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-[#E31B23] hover:border-[#E31B23] transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-[#E31B23] hover:border-[#E31B23] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChangeIndex((activeIndex + 1) % slides.length);
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-[#E31B23] hover:border-[#E31B23] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div
        className="max-w-5xl w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-h-[80vh] flex items-center justify-center bg-black border border-white/10 overflow-hidden">
          <CmsImage
            src={current.url}
            alt={current.caption || 'Project visual'}
            loading="eager"
            className="max-h-[78vh] w-auto object-contain"
          />
        </div>
        <div className="flex items-center justify-between w-full text-xs text-white/75">
          <span>{current.caption || 'Project Showcase'}</span>
          <span className="font-mono-num">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
