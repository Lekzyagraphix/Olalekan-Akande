import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import { CmsImage } from './CmsImage';
import { Reveal } from './Reveal';

export function TestimonialsSection() {
  const { publishedTestimonials, isAdmin, resolveMediaUrl } = useCms();

  if (publishedTestimonials.length === 0 && !isAdmin) {
    return null;
  }

  return (
    <section className="bg-[#F4F4F4] dark:bg-[#141414] border-t border-b border-black/10 dark:border-white/12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
              Client Perspectives
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-white">
              WHAT WORKING TOGETHER LOOKS LIKE.
            </h2>
          </div>
        </Reveal>

        {publishedTestimonials.length === 0 ? (
          <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E31B23] mb-1">
                Administration Preview Only
              </p>
              <p className="text-sm text-[#555555] dark:text-[#B3B3B3]">
                No client testimonials have been published yet. This section remains hidden from
                public visitors until you add a testimonial in the CMS.
              </p>
            </div>
            <Link
              to="/admin"
              className="px-5 py-2.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#E31B23] hover:text-white transition-colors shrink-0"
            >
              Manage Testimonials
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedTestimonials.map((item) => {
              const photo = resolveMediaUrl(item.clientImageUrl);
              return (
                <blockquote
                  key={item.id}
                  className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-7 flex flex-col justify-between gap-6"
                >
                  <p className="text-sm md:text-base text-[#111111] dark:text-[#F5F5F5] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="pt-5 border-t border-black/10 dark:border-white/12 flex items-center gap-3.5">
                    {photo ? (
                      <CmsImage
                        src={item.clientImageUrl}
                        alt={item.clientName}
                        className="w-11 h-11 object-cover border border-black/10 dark:border-white/12 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 bg-[#111111] dark:bg-[#222222] text-white font-display text-xs font-bold flex items-center justify-center shrink-0">
                        {item.clientName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-display text-sm font-bold text-[#111111] dark:text-white">
                        {item.clientName}
                      </p>
                      <p className="text-xs text-[#777777] dark:text-[#9A9A9A]">
                        {[item.clientPosition, item.companyName].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
