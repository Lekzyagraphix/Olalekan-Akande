import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import type { Project } from '../types/cms';
import { CmsImage } from './CmsImage';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function formatLiveLabel(url?: string): { host: string; isInstagram: boolean; cta: string } | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, '');
    const isInstagram = hostname.includes('instagram.com');
    const pathHandle = isInstagram ? parsed.pathname.replace(/\//g, '') : '';
    return {
      host: isInstagram && pathHandle ? `@${pathHandle}` : hostname,
      isInstagram,
      cta: isInstagram ? 'Instagram' : 'Visit Site',
    };
  } catch {
    return {
      host: url,
      isInstagram: url.includes('instagram.com'),
      cta: url.includes('instagram.com') ? 'Instagram' : 'Visit Site',
    };
  }
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { resolveMediaUrl, isAdmin } = useCms();
  const coverResolved = resolveMediaUrl(project.coverImageUrl);
  const idxLabel = String(index + 1).padStart(2, '0');
  const liveMeta = formatLiveLabel(project.liveUrl);

  return (
    <article className="group border border-black/10 dark:border-white/12 bg-white dark:bg-[#171717] flex flex-col transition-colors">
      <Link
        to={`/portfolio/${project.slug}`}
        className="block relative aspect-[16/11] bg-[#111111] overflow-hidden border-b border-black/10 dark:border-white/12"
      >
        {coverResolved ? (
          <CmsImage
            src={project.coverImageUrl}
            alt={`${project.title} — ${project.categoryLabel}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full p-7 md:p-8 flex flex-col justify-between bg-[#111111] text-white transition-colors duration-300 group-hover:bg-[#1A1A1A]">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono-num text-xs font-semibold text-[#E31B23]">
                {idxLabel}
              </span>
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/55 truncate">
                {liveMeta ? liveMeta.host : project.year || 'Case Study'}
              </span>
            </div>

            <div className="my-auto">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/50 mb-2">
                {project.industry || project.filterCategory}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-[#E31B23] transition-colors">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/60 gap-3">
              <span className="truncate">{project.categoryLabel}</span>
              {isAdmin && (
                <span className="text-[#E31B23] shrink-0">Upload media</span>
              )}
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-[#111111] text-[#111111] dark:text-white flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <ArrowUpRight className="w-4 h-4 text-[#E31B23]" />
        </div>
      </Link>

      <div className="p-6 md:p-7 flex-1 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#777777] dark:text-[#9A9A9A] mb-2">
            <span className="font-mono-num font-semibold text-[#E31B23]">{idxLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.categoryLabel}</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#111111] dark:text-white group-hover:text-[#E31B23] transition-colors">
            <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="mt-3 text-sm text-[#555555] dark:text-[#B3B3B3] leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-black/10 dark:border-white/12 flex items-center justify-between gap-3">
          <Link
            to={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] dark:text-white hover:text-[#E31B23] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3 shrink-0">
            {project.liveUrl && liveMeta && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#E31B23] hover:text-[#111111] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>{liveMeta.cta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.status === 'draft' && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E31B23]">
                Draft
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
