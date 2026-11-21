import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { DESIGN_PHILOSOPHY } from '../data/defaultCmsData';
import { PageHeading } from '../components/PageHeading';
import { PortraitFrame } from '../components/PortraitFrame';
import { Reveal } from '../components/Reveal';

export function AboutPage() {
  usePageSeo('about');
  const { profile, resolveMediaUrl } = useCms();
  const cvResolved = resolveMediaUrl(profile.cvUrl);

  return (
    <div>
      <PageHeading
        label="About Me"
        headline={profile.aboutHeadline}
        highlightWord="PURPOSE"
      />

      {/* Intro + Portrait Split */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <PortraitFrame aspectClass="aspect-[4/5]" />
              {cvResolved && (
                <a
                  href={cvResolved}
                  download={profile.cvFileName || 'Akande-Olalekan-CV.pdf'}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#111111] text-xs font-semibold tracking-[0.16em] uppercase text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              )}
            </div>

            <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-[#555555] leading-relaxed">
              <Reveal>
                <div className="space-y-5">
                  {profile.aboutIntro.split('\n\n').map((para, i) => (
                    <p key={i} className={i === 0 ? 'text-[#111111] font-medium text-lg md:text-xl' : ''}>
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              <div className="pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                    Creative Identity
                  </p>
                  <p className="font-display text-base font-bold text-[#111111]">
                    {profile.creativeIdentity}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                    Location
                  </p>
                  <p className="font-display text-base font-bold text-[#111111]">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="bg-[#F4F4F4] border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                  My Story
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                  {profile.storyHeadline}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 space-y-5 text-base text-[#555555] leading-relaxed">
              {profile.storyContent.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* My Design Philosophy */}
      <section className="bg-[#111111] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                My Design Philosophy
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                {profile.philosophyHeadline}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESIGN_PHILOSOPHY.map((item, idx) => (
              <div
                key={item.title}
                className="bg-[#1A1A1A] border border-white/10 p-8 flex flex-col justify-between gap-6"
              >
                <span className="font-mono-num text-xs font-semibold text-[#E31B23]">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Design + CTA */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Beyond Design
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                {profile.beyondHeadline}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base text-[#555555] leading-relaxed">
              {profile.beyondContent.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#111111] transition-colors"
                >
                  <span>Let&apos;s Create Something Together</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
