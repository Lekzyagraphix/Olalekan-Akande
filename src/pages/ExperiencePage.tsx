import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { PageHeading } from '../components/PageHeading';
import { Reveal } from '../components/Reveal';

export function ExperiencePage() {
  usePageSeo('experience');
  const { profile, resolveMediaUrl } = useCms();
  const cvResolved = resolveMediaUrl(profile.cvUrl);

  return (
    <div>
      <PageHeading
        label="Experience & Skills"
        headline="EXPERIENCE, SKILLS & THE TOOLS BEHIND MY WORK."
        highlightWord="TOOLS"
        description={
          "My professional journey has been shaped by hands-on experience, continuous learning and working on creative projects across different industries.\n\nOver the years, I have developed a combination of creative and technical skills that allow me to approach projects from different perspectives, from visual communication and brand development to website design and digital experiences."
        }
      />

      {/* Professional Experience */}
      <section className="bg-white dark:bg-[#0D0D0D] border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Career History
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-white">
                Professional Experience
              </h2>
            </div>
            {cvResolved && (
              <a
                href={cvResolved}
                download={profile.cvFileName || 'Akande-Olalekan-CV.pdf'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#E31B23] hover:text-white transition-colors shrink-0 self-start"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            )}
          </div>

          <div className="divide-y divide-black/10 dark:divide-white/12 border-t border-b border-black/10 dark:border-white/12">
            {profile.experiences.map((exp, idx) => (
              <Reveal key={exp.id || idx}>
                <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5">
                    <p className="font-mono-num text-xs font-semibold text-[#E31B23] uppercase tracking-[0.14em] mb-2">
                      {exp.period}
                    </p>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#111111] dark:text-white">
                      {exp.role}
                    </h3>
                    {exp.company && (
                      <p className="mt-1 text-sm text-[#777777] dark:text-[#9A9A9A]">{exp.company}</p>
                    )}
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#777777] dark:text-[#9A9A9A] mb-4">
                      Responsibilities
                    </p>
                    <ul className="space-y-2.5 text-sm md:text-base text-[#111111] dark:text-[#EAEAEA]">
                      {exp.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[#E31B23] mt-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="bg-[#F4F4F4] dark:bg-[#141414] border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Toolkit
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-white">
                Technical Skills
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skillCategories.map((cat, idx) => (
              <div key={cat.id || idx} className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-7">
                <span className="font-mono-num text-xs font-semibold text-[#E31B23]">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight text-[#111111] dark:text-white mt-2 mb-5 pb-4 border-b border-black/10 dark:border-white/12">
                  {cat.title}
                </h3>
                <ul className="space-y-2.5 text-sm text-[#111111] dark:text-[#EAEAEA]">
                  {cat.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#111111] dark:bg-[#E31B23] shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Core Competencies */}
      <section className="bg-white dark:bg-[#0D0D0D] border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Education */}
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Academic &amp; Certifications
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] dark:text-white mb-8">
                Education &amp; Qualifications
              </h2>
              <div className="divide-y divide-black/10 dark:divide-white/12 border-t border-b border-black/10 dark:border-white/12">
                {profile.education.map((edu, idx) => (
                  <div key={edu.id || idx} className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#111111] dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-[#555555] dark:text-[#B3B3B3] mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="font-mono-num text-xs font-semibold text-[#E31B23] shrink-0">
                      {edu.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Strengths
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] dark:text-white mb-8">
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-black/10 dark:border-white/12">
                {profile.coreCompetencies.map((comp) => (
                  <div
                    key={comp}
                    className="p-4 border-r border-b border-black/10 dark:border-white/12 text-sm font-medium text-[#111111] dark:text-[#EAEAEA] flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 bg-[#E31B23] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Availability */}
      <section className="bg-[#111111] dark:bg-[#080808] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Availability
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
                OPEN TO MEANINGFUL OPPORTUNITIES.
              </h2>
              <div className="space-y-4 text-base text-white/75 leading-relaxed max-w-2xl">
                {profile.availabilitySummary.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
