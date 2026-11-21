import React from 'react';
import { Reveal } from './Reveal';

interface PageHeadingProps {
  label: string;
  headline: string;
  highlightWord?: string;
  description?: string;
  dark?: boolean;
}

export function PageHeading({
  label,
  headline,
  highlightWord,
  description,
  dark = false,
}: PageHeadingProps) {
  const renderHeadline = () => {
    if (!highlightWord) return headline;
    const upperTarget = highlightWord.toUpperCase();
    const parts = headline.split(new RegExp(`(${highlightWord})`, 'i'));
    return parts.map((part, idx) =>
      part.toUpperCase() === upperTarget ? (
        <span key={idx} className="text-[#E31B23]">
          {part}
        </span>
      ) : (
        <React.Fragment key={idx}>{part}</React.Fragment>
      )
    );
  };

  return (
    <section
      className={`border-b transition-colors duration-200 ${
        dark
          ? 'bg-[#111111] dark:bg-[#080808] text-white border-white/10'
          : 'bg-white dark:bg-[#0D0D0D] text-[#111111] dark:text-[#F5F5F5] border-black/10 dark:border-white/12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-5">
            {label}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] max-w-4xl">
            {renderHeadline()}
          </h1>
          {description && (
            <div
              className={`mt-7 max-w-2xl text-base md:text-lg leading-relaxed space-y-4 ${
                dark ? 'text-white/75' : 'text-[#555555] dark:text-[#B3B3B3]'
              }`}
            >
              {description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
