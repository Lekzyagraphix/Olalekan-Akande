import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="bg-[#111111] text-white min-h-[72vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 w-full">
        <p className="font-mono-num text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-4">
          Error 404
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.06] max-w-3xl mb-6">
          LOOKS LIKE YOU&apos;VE TAKEN A{' '}
          <span className="text-[#E31B23]">CREATIVE DETOUR.</span>
        </h1>
        <p className="text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s
          get you back to something more interesting.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </section>
  );
}
