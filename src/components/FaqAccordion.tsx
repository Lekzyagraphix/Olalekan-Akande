import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../data/defaultCmsData';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 border-t border-b border-black/10">
      {FAQS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="py-5 md:py-6">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono-num text-xs font-semibold text-[#E31B23]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-base md:text-lg font-semibold text-[#111111] group-hover:text-[#E31B23] transition-colors">
                  {item.question}
                </span>
              </div>
              <span className="w-9 h-9 shrink-0 flex items-center justify-center border border-black/15 text-[#111111] group-hover:border-[#E31B23] group-hover:text-[#E31B23] transition-colors">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="pt-4 pl-8 md:pl-10 pr-12 text-sm md:text-base text-[#555555] leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
