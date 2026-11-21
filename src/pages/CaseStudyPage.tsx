import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { CmsImage } from '../components/CmsImage';
import { ImageLightbox, type LightboxSlide } from '../components/ImageLightbox';
import { ProjectCard } from '../components/ProjectCard';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { projects, publishedProjects, isAdmin, resolveMediaUrl } = useCms();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePool = isAdmin ? projects : publishedProjects;
  const project = useMemo(
    () => visiblePool.find((p) => p.slug === slug || p.id === slug),
    [visiblePool, slug]
  );

  usePageSeo('portfolio', {
    title: project
      ? `${project.title} | Case Study — Akande Olalekan`
      : 'Project Not Found | Akande Olalekan',
    description: project?.shortDescription,
    image: project?.coverImageUrl,
  });

  if (!project) {
    return (
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-4">
          Case Study
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-4">
          Project Not Found
        </h1>
        <p className="text-base text-[#555555] max-w-lg mx-auto mb-8">
          This project may have been moved or is currently unpublished.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#E31B23] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </section>
    );
  }

  const coverResolved = resolveMediaUrl(project.coverImageUrl);
  const gallerySlides: LightboxSlide[] = [];
  if (coverResolved) {
    gallerySlides.push({
      url: project.coverImageUrl,
      caption: `${project.title} — Primary Showcase`,
    });
  }
  project.galleryImages.forEach((item) => {
    if (resolveMediaUrl(item.url)) {
      gallerySlides.push({
        url: item.url,
        caption: item.caption || project.title,
      });
    }
  });

  const relatedProjects = publishedProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div>
      {/* Case Study Header */}
      <section className="bg-[#111111] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-16 md:pt-16 md:pb-20">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white/70 hover:text-[#E31B23] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/65 mb-4">
            <span className="text-[#E31B23] font-semibold uppercase tracking-[0.16em]">
              {project.filterCategory}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            {project.year && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">{project.year}</span>
              </>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] max-w-4xl">
            {project.title}
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-3xl">
            {project.overview || project.shortDescription}
          </p>

          {/* Metadata Strip */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                Client / Brand
              </p>
              <p className="text-sm font-semibold">{project.client || project.title}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                Industry
              </p>
              <p className="text-sm font-semibold">{project.industry || 'Digital & Brand'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                Duration
              </p>
              <p className="text-sm font-semibold">{project.duration || 'Project Engagement'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                Year Completed
              </p>
              <p className="font-mono-num text-sm font-semibold">{project.year || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                Services Provided
              </p>
              <p className="text-sm text-white/85">
                {project.servicesProvided.length > 0
                  ? project.servicesProvided.join(', ')
                  : project.categoryLabel}
              </p>
            </div>
          </div>

          {project.liveUrl && (
            <div className="mt-8">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors"
              >
                <span>Visit Live Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Primary Cover Visual */}
      <section className="bg-[#F4F4F4] border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
          {coverResolved ? (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative w-full aspect-[16/9] bg-[#111111] border border-black/10 overflow-hidden block cursor-pointer"
            >
              <CmsImage
                src={project.coverImageUrl}
                alt={`${project.title} showcase`}
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute bottom-4 right-4 px-3.5 py-2 bg-[#111111]/90 text-white text-xs font-semibold tracking-[0.14em] uppercase inline-flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5 text-[#E31B23]" />
                <span>Enlarge</span>
              </span>
            </button>
          ) : (
            <div className="bg-[#111111] text-white p-10 md:p-16 border border-black/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E31B23] mb-2">
                  Project Visuals
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  {project.title} — Case Study Documentation
                </h2>
                <p className="mt-2 text-sm text-white/65 max-w-xl">
                  {isAdmin
                    ? 'No project screenshots have been uploaded for this entry yet. Upload cover and gallery screenshots in the CMS Dashboard.'
                    : 'Visual screenshots and layout mockups for this project are managed through the studio archive.'}
                </p>
              </div>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-[#111111] transition-colors shrink-0 self-start"
                >
                  Upload Project Media
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Case Study Editorial Narrative */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-black/10">
            <div className="lg:col-span-4">
              <p className="font-mono-num text-xs font-semibold text-[#E31B23] mb-2">01</p>
              <h2 className="font-display text-2xl font-bold text-[#111111]">
                Project Background
              </h2>
            </div>
            <div className="lg:col-span-8 text-base text-[#555555] leading-relaxed">
              <p>{project.background}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-black/10">
            <div className="lg:col-span-4">
              <p className="font-mono-num text-xs font-semibold text-[#E31B23] mb-2">02</p>
              <h2 className="font-display text-2xl font-bold text-[#111111]">
                The Challenge
              </h2>
            </div>
            <div className="lg:col-span-8 text-base text-[#555555] leading-relaxed">
              <p>{project.challenge}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-black/10">
            <div className="lg:col-span-4">
              <p className="font-mono-num text-xs font-semibold text-[#E31B23] mb-2">03</p>
              <h2 className="font-display text-2xl font-bold text-[#111111]">
                Creative Approach
              </h2>
            </div>
            <div className="lg:col-span-8 text-base text-[#555555] leading-relaxed">
              <p>{project.creativeApproach}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-black/10">
            <div className="lg:col-span-4">
              <p className="font-mono-num text-xs font-semibold text-[#E31B23] mb-2">04</p>
              <h2 className="font-display text-2xl font-bold text-[#111111]">
                Design &amp; Development Process
              </h2>
            </div>
            <div className="lg:col-span-8 text-base text-[#555555] leading-relaxed">
              <p>{project.process}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-black/10">
            <div className="lg:col-span-4">
              <p className="font-mono-num text-xs font-semibold text-[#E31B23] mb-2">05</p>
              <h2 className="font-display text-2xl font-bold text-[#111111]">
                Final Outcome
              </h2>
            </div>
            <div className="lg:col-span-8 text-base text-[#555555] leading-relaxed">
              <p>{project.outcome}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <p className="font-mono-num text-xs font-semibold text-[#E31B23] mb-2">06</p>
              <h2 className="font-display text-2xl font-bold text-[#111111]">
                My Specific Contribution
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base text-[#111111] font-medium leading-relaxed mb-6">
                {project.contribution}
              </p>
              {project.servicesProvided.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#777777]">
                  {project.servicesProvided.map((svc, idx) => (
                    <React.Fragment key={svc}>
                      <span className="text-[#111111] font-medium">{svc}</span>
                      {idx < project.servicesProvided.length - 1 && (
                        <span className="text-[#E31B23]" aria-hidden="true">
                          /
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery (varied editorial grid + lightbox) */}
      {project.galleryImages.length > 0 && (
        <section className="bg-[#F4F4F4] border-b border-black/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
              Project Gallery
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] mb-10">
              Visual Previews &amp; Deliverables
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {project.galleryImages.map((item, idx) => {
                const slideIdx = coverResolved ? idx + 1 : idx;
                const colSpan =
                  item.layout === 'wide'
                    ? 'md:col-span-12 aspect-[16/9]'
                    : item.layout === 'tall'
                    ? 'md:col-span-5 aspect-[4/5]'
                    : 'md:col-span-6 aspect-[4/3]';
                return (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={() => setLightboxIndex(slideIdx)}
                    className={`${colSpan} group relative bg-[#111111] border border-black/10 overflow-hidden block text-left cursor-pointer`}
                  >
                    <CmsImage
                      src={item.url}
                      alt={item.caption || `${project.title} preview ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    {item.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent text-white text-xs">
                        {item.caption}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-white border-b border-black/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-2">
                  Continue Exploring
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111]">
                  Related Projects
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] hover:text-[#E31B23] transition-colors"
              >
                All Projects
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel, i) => (
                <ProjectCard key={rel.id} project={rel} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-2">
              Project Inquiry
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight">
              Need a similar solution for your brand?
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

      <ImageLightbox
        slides={gallerySlides}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}
