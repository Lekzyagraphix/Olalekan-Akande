import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageSeo } from '../hooks/usePageSeo';
import { CLARITY_PRINCIPLES, FULL_PROCESS_STAGES } from '../data/defaultCmsData';
import { PageHeading } from '../components/PageHeading';
import { Reveal } from '../components/Reveal';

export function ProcessPage() {
  usePageSeo('process');

  return (
    <div>
      <PageHeading
        label="My Process"
        headline="GOOD WORK STARTS WITH A GOOD PROCESS."
        highlightWord="GOOD PROCESS"
        description={
          "Every successful project requires more than creative ideas. It requires clear communication, proper planning, thoughtful execution and attention to detail.\n\nMy process is designed to make collaboration straightforward while ensuring that every stage of the project contributes towards the desired outcome."
        }
      />

      {/* Five Process Stages */}
      <section className="bg-white dark:bg-[#0D0D0D] divide-y divide-black/10 dark:divide-white/12 border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        {FULL_PROCESS_STAGES.map((stage) => (
          <div key={stage.number} className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-18">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2">
                  <span className="font-mono-num text-4xl md:text-5xl font-extrabold text-[#E31B23]">
                    {stage.number}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] dark:text-white">
                    {stage.title}
                  </h2>
                </div>
                <div className="lg:col-span-5 space-y-5">
                  <p className="text-base text-[#555555] dark:text-[#B3B3B3] leading-relaxed">{stage.description}</p>
                  <div className="pt-4 border-t border-black/10 dark:border-white/12">
                    <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#777777] dark:text-[#999999] mb-1">
                      Deliverable
                    </p>
                    <p className="text-sm font-semibold text-[#111111] dark:text-white">{stage.deliverable}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Clarity Section */}
      <section className="bg-[#111111] dark:bg-[#080808] text-white transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Collaboration Standard
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                A WORKING RELATIONSHIP BUILT ON CLARITY.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {CLARITY_PRINCIPLES.map((item, idx) => (
                  <div
                    key={item}
                    className="bg-[#1A1A1A] border border-white/10 p-6 flex items-start gap-4"
                  >
                    <span className="font-mono-num text-xs font-semibold text-[#E31B23] mt-1">
                      0{idx + 1}
                    </span>
                    <p className="text-sm md:text-base text-white/85 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
