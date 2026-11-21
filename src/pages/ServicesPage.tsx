import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { INDUSTRIES } from '../data/defaultCmsData';
import { PageHeading } from '../components/PageHeading';
import { CmsImage } from '../components/CmsImage';
import { Reveal } from '../components/Reveal';

export function ServicesPage() {
  usePageSeo('services');
  const { publishedServices, resolveMediaUrl } = useCms();

  return (
    <div>
      <PageHeading
        label="Services"
        headline="CREATIVE & DIGITAL SOLUTIONS FOR BRANDS READY TO GROW."
        highlightWord="GROW"
        description={
          "I offer a range of design and digital services that help businesses establish their identities, strengthen their online presence and communicate their value effectively.\n\nWhether you need a new visual identity, compelling marketing designs or a functional website, I bring creativity, strategic thinking and attention to detail to every project."
        }
      />

      {/* Detailed Service Sections */}
      <section className="bg-white dark:bg-[#0D0D0D] divide-y divide-black/10 dark:divide-white/12 border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        {publishedServices.map((service) => {
          const imgResolved = resolveMediaUrl(service.imageUrl);
          return (
            <div key={service.id} className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
              <Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono-num text-sm font-bold text-[#E31B23]">
                        SERVICE {service.number}
                      </span>
                      <span className="text-[#777777] dark:text-[#9A9A9A]">/</span>
                      <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#777777] dark:text-[#9A9A9A]">
                        {service.title}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-white">
                      {service.headline || service.title}
                    </h2>

                    {imgResolved && (
                      <div className="mt-8 aspect-[4/3] bg-[#F4F4F4] dark:bg-[#171717] border border-black/10 dark:border-white/12 overflow-hidden">
                        <CmsImage
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                    <div className="space-y-4 text-base text-[#555555] dark:text-[#B3B3B3] leading-relaxed">
                      {(service.description || service.shortDescription)
                        .split('\n\n')
                        .map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                    </div>

                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#111111] dark:text-white mb-4">
                        What&apos;s Included
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-black/10 dark:border-white/12 pt-5">
                        {service.deliverables.map((item) => (
                          <div key={item} className="flex items-start gap-2.5 text-sm text-[#111111] dark:text-[#EAEAEA]">
                            <span className="w-1.5 h-1.5 bg-[#E31B23] mt-2 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {service.idealFor && (
                      <div className="bg-[#F4F4F4] dark:bg-[#171717] p-5 border border-black/10 dark:border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-sm text-[#111111] dark:text-white font-medium">{service.idealFor}</p>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#E31B23] hover:text-[#111111] dark:hover:text-white transition-colors shrink-0"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* Industries I Work With */}
      <section className="bg-[#111111] dark:bg-[#080808] text-white border-b border-white/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Sector Experience
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                INDUSTRIES I WORK WITH.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/15">
            {INDUSTRIES.map((industry, idx) => (
              <div
                key={industry}
                className="p-6 md:p-7 border-r border-b border-white/15 flex flex-col justify-between gap-4 hover:bg-[#1A1A1A] transition-colors"
              >
                <span className="font-mono-num text-xs font-semibold text-[#E31B23]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-base md:text-lg font-bold tracking-tight">
                  {industry}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">
                Ready to move your brand forward?
              </h3>
              <p className="text-sm md:text-base text-white/70 mt-2">
                Share your goals and let&apos;s outline the right creative scope.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
