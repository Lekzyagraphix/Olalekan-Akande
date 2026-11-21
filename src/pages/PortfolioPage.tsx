import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Instagram } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { MANAGED_SOCIAL_PAGES } from '../data/defaultCmsData';
import type { ProjectFilterCategory } from '../types/cms';
import { CmsImage } from '../components/CmsImage';
import { PageHeading } from '../components/PageHeading';
import { ProjectCard } from '../components/ProjectCard';

const FILTER_OPTIONS: Array<{ value: 'ALL' | ProjectFilterCategory; label: string }> = [
  { value: 'ALL', label: 'All Projects' },
  { value: 'BRANDING', label: 'Branding' },
  { value: 'GRAPHIC DESIGN', label: 'Graphic Design' },
  { value: 'SOCIAL MEDIA', label: 'Social Media' },
  { value: 'WEBSITE DESIGN', label: 'Website Design' },
  { value: 'UI/UX DESIGN', label: 'UI/UX Design' },
];

function cleanHost(url?: string): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function PortfolioPage() {
  usePageSeo('portfolio');
  const { publishedProjects } = useCms();
  const [activeFilter, setActiveFilter] = useState<'ALL' | ProjectFilterCategory>('ALL');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return publishedProjects;
    return publishedProjects.filter((p) => p.filterCategory === activeFilter);
  }, [publishedProjects, activeFilter]);

  const liveWebsites = useMemo(
    () =>
      publishedProjects.filter(
        (p) => Boolean(p.liveUrl) && !(p.liveUrl ?? '').toLowerCase().includes('instagram.com')
      ),
    [publishedProjects]
  );

  return (
    <div>
      <PageHeading
        label="Portfolio"
        headline="SELECTED WORK. THOUGHTFUL IDEAS. REAL CREATIVE SOLUTIONS."
        highlightWord="REAL CREATIVE"
        description={
          "Welcome to my portfolio, a collection of creative projects spanning brand identity, graphic design, social media campaigns, website development and digital product experiences.\n\nEach project represents a different challenge, creative direction and opportunity to create something meaningful."
        }
      />

      <section className="bg-white dark:bg-[#0D0D0D] border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          {/* Interactive Dynamic Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-black/10 dark:border-white/12">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-2"
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setActiveFilter(option.value)}
                    className={`px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E31B23] text-white'
                        : 'bg-[#F4F4F4] dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono-num text-xs text-[#777777] dark:text-[#9A9A9A]">
              Showing {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-[#F4F4F4] dark:bg-[#171717] border border-black/10 dark:border-white/12 p-12 text-center">
              <p className="font-display text-xl font-bold text-[#111111] dark:text-white mb-2">
                No projects in this category yet.
              </p>
              <p className="text-sm text-[#555555] dark:text-[#B3B3B3] mb-6">
                Select another discipline filter or view all available projects.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('ALL')}
                className="px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#E31B23] hover:text-white transition-colors cursor-pointer"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Direct Links Directory: Websites Built & Managed Social Pages */}
      <section className="bg-[#F4F4F4] dark:bg-[#141414] border-b border-black/10 dark:border-white/12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Websites Launched */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                <Globe className="w-4 h-4" />
                <span>Live Client Websites</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] dark:text-white mb-8">
                Websites Designed &amp; Delivered
              </h2>

              <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 divide-y divide-black/10 dark:divide-white/12">
                {liveWebsites.map((site, idx) => (
                  <a
                    key={site.id}
                    href={site.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-[#111111] dark:hover:bg-[#E31B23] hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-24 sm:w-28 aspect-[16/10] shrink-0 overflow-hidden bg-[#111111] border border-black/10 dark:border-white/15 group-hover:border-white/15">
                        <CmsImage
                          src={site.coverImageUrl}
                          alt={`${site.title} website preview`}
                          className="w-full h-full object-cover object-top"
                          fallback={
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-mono-num text-white/70">
                              WEB
                            </div>
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono-num text-xs font-semibold text-[#E31B23] group-hover:text-white">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="font-display text-base md:text-lg font-bold truncate">
                            {site.title}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-[#777777] dark:text-[#9A9A9A] group-hover:text-white/75 truncate">
                          {site.categoryLabel} · {cleanHost(site.liveUrl)}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] dark:text-white group-hover:text-white whitespace-nowrap shrink-0">
                      <span className="hidden sm:inline">Visit Site</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Managed Social Media Pages */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                <Instagram className="w-4 h-4" />
                <span>Social Channels</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] dark:text-white mb-8">
                Social Media Pages Managed
              </h2>

              <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 divide-y divide-black/10 dark:divide-white/12">
                {MANAGED_SOCIAL_PAGES.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 p-5 hover:bg-[#111111] dark:hover:bg-[#E31B23] hover:text-white transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-mono-num text-xs font-semibold text-[#E31B23] group-hover:text-white">
                        {channel.platform} · {channel.handle}
                      </p>
                      <p className="font-display text-base font-bold mt-1">{channel.name}</p>
                      <p className="mt-1 text-xs text-[#777777] dark:text-[#9A9A9A] group-hover:text-white/75 leading-relaxed">
                        {channel.focus}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#111111] dark:text-white group-hover:text-white shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] dark:bg-[#080808] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-2">
              Start A Collaboration
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">
              Have a brand or digital product you want to bring to life?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
