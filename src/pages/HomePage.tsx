import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Instagram,
  Layers,
  LayoutGrid,
  Megaphone,
  PenTool,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import {
  MANAGED_SOCIAL_PAGES,
  PROCESS_PREVIEW_STEPS,
  WHY_WORK_WITH_ME,
} from '../data/defaultCmsData';
import { Reveal } from '../components/Reveal';
import { CmsImage } from '../components/CmsImage';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqAccordion } from '../components/FaqAccordion';

function formatHost(url?: string): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function HomePage() {
  usePageSeo('home');
  const { settings, profile, publishedServices, publishedProjects, resolveMediaUrl } = useCms();

  const featuredProjects = publishedProjects.filter((p) => p.featured);
  const displayProjects = (featuredProjects.length > 0 ? featuredProjects : publishedProjects).slice(
    0,
    6
  );
  const liveWebsites = publishedProjects.filter(
    (p) => Boolean(p.liveUrl) && !(p.liveUrl ?? '').toLowerCase().includes('instagram.com')
  );
  const portraitResolved = resolveMediaUrl(profile.portraitUrl);
  const isCutoutAvatar = portraitResolved.includes('LAG_Invoice_pp_');
  const [portraitError, setPortraitError] = useState(false);

  useEffect(() => {
    setPortraitError(false);
  }, [portraitResolved]);

  const supportingParagraphs = settings.heroSupportingText
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const renderHighlightedHeadline = () => {
    const words = settings.heroHighlightWords
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean);
    if (words.length === 0) return settings.heroHeadline;

    const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
    const parts = settings.heroHeadline.split(regex);

    return parts.map((part, idx) => {
      const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase());
      return isMatch ? (
        <span key={idx} className="text-[#E31B23]">
          {part}
        </span>
      ) : (
        <React.Fragment key={idx}>{part}</React.Fragment>
      );
    });
  };

  const orbitCards = [
    {
      index: '01',
      title: 'Brand Identity',
      subtitle: 'Logos, guidelines & visual systems',
      to: '/services',
      icon: Layers,
      accent: 'bg-[#E31B23] text-white',
    },
    {
      index: '02',
      title: 'Graphic & Social',
      subtitle: 'Campaigns & marketing visuals',
      to: '/portfolio',
      icon: Megaphone,
      accent: 'bg-[#111111] text-white',
    },
    {
      index: '03',
      title: 'Web Development',
      subtitle: 'Responsive sites & e-commerce',
      to: '/services',
      icon: Globe,
      accent: 'bg-[#E31B23] text-white',
    },
    {
      index: '04',
      title: 'Product UI/UX',
      subtitle: 'Intuitive digital interfaces',
      to: '/portfolio',
      icon: LayoutGrid,
      accent: 'bg-[#111111] text-white',
    },
  ];

  return (
    <div>
      {/* Section 1: Centered Editorial Hero (Template-Inspired, Red/Black/White) */}
      <section className="relative bg-white border-b border-black/10 overflow-hidden">
        {/* Subtle Architectural Radial Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[520px] bg-[radial-gradient(ellipse_at_center_bottom,rgba(244,244,244,1)_0%,rgba(255,255,255,0)_72%)]"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-0">
          {/* Top Centered Headline Block + Right Circular Stamp */}
          <div className="relative max-w-4xl mx-auto text-center">
            {/* Circular Stamp Seal (Desktop) */}
            <div
              aria-hidden="true"
              className="hidden xl:flex absolute -right-28 top-6 w-24 h-24 items-center justify-center"
            >
              <svg viewBox="0 0 120 120" className="w-full h-full text-[#111111]">
                <defs>
                  <path
                    id="hero-stamp-circle"
                    d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  fontSize="8.5"
                  fontWeight="700"
                  letterSpacing="2.8"
                  className="uppercase"
                >
                  <textPath href="#hero-stamp-circle">
                    {settings.creativeIdentity} · LAGOS NIGERIA ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute text-[#E31B23] text-xl leading-none font-bold">✦</span>
            </div>

            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#E31B23] mb-4">
              {settings.heroLabel}
            </p>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.05] text-[#111111] mx-auto max-w-4xl text-balance">
              {renderHighlightedHeadline()}
            </h1>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto">
              {supportingParagraphs[0] || settings.heroSupportingText}
            </p>

            {/* Centered Dual CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#E31B23] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white border border-black/20 text-[#111111] text-xs font-semibold tracking-[0.14em] uppercase hover:border-[#E31B23] hover:text-[#E31B23] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-[#E31B23]" />
              </Link>
            </div>
          </div>

          {/* Centerpiece Portrait Stage with Flanking Tilted Cards & Orbit Arcs */}
          <div className="relative mt-10 md:mt-12 min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex flex-col justify-end">
            {/* Subtle Connecting Arc SVG (Desktop) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 420"
              fill="none"
              className="hidden lg:block pointer-events-none absolute inset-x-0 top-0 w-full h-[380px] text-black/15"
            >
              <path
                d="M 145 70 Q 320 280 510 245"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                d="M 1055 95 Q 880 285 690 245"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>

            {/* Left Tilted Feature Card (Desktop) */}
            <Link
              to="/process"
              className="hidden lg:block absolute left-2 xl:left-6 -top-10 w-60 bg-white border border-black/10 rounded-2xl p-5 shadow-[0_14px_34px_rgba(17,17,17,0.06)] -rotate-6 hover:rotate-0 hover:border-[#E31B23] transition-all duration-300 z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center mb-3">
                <PenTool className="w-4 h-4" />
              </div>
              <p className="font-display text-base font-bold text-[#111111] leading-snug">
                Turn ideas into purpose.
              </p>
              <p className="mt-1.5 text-xs text-[#777777] leading-relaxed">
                Strategy, design and web solutions built to communicate clearly.
              </p>
            </Link>

            {/* Right Tilted Feature Card (Desktop) */}
            <Link
              to="/services"
              className="hidden lg:block absolute right-2 xl:right-6 -top-4 w-60 bg-white border border-black/10 rounded-2xl p-5 shadow-[0_14px_34px_rgba(17,17,17,0.06)] rotate-6 hover:rotate-0 hover:border-[#E31B23] transition-all duration-300 z-10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-xs font-extrabold tracking-tight text-[#111111] px-2.5 py-1 rounded-md bg-[#F4F4F4] border border-black/10">
                  {settings.monogram}
                </span>
                <span className="w-7 h-7 rounded-lg bg-[#E31B23] text-white flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="font-display text-base font-bold text-[#111111] leading-snug">
                Brands, anywhere, anytime.
              </p>
              <p className="mt-1.5 text-xs text-[#777777] leading-relaxed">
                Remote collaboration across the UK, Europe, Africa and worldwide.
              </p>
            </Link>

            {/* Centered Portrait & Orbiting Discipline Cards */}
            <div className="relative mx-auto w-full max-w-4xl flex flex-col items-center justify-end">
              {/* Orbiting Discipline Cards (Desktop Floating Arc around Portrait) */}
              {(() => {
                const Icon0 = orbitCards[0].icon;
                const Icon1 = orbitCards[1].icon;
                const Icon2 = orbitCards[2].icon;
                const Icon3 = orbitCards[3].icon;
                return (
                  <>
                    <Link
                      to={orbitCards[0].to}
                      className="hidden md:block absolute left-6 lg:left-16 top-10 lg:top-8 z-20 w-52 bg-white/92 backdrop-blur-md border border-black/10 rounded-xl p-3.5 shadow-[0_12px_30px_rgba(17,17,17,0.08)] hover:border-[#E31B23] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${orbitCards[0].accent}`}
                        >
                          <Icon0 className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-display text-sm font-bold text-[#111111] truncate">
                          {orbitCards[0].title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">{orbitCards[0].subtitle}</p>
                    </Link>

                    <Link
                      to={orbitCards[1].to}
                      className="hidden md:block absolute left-0 lg:left-4 bottom-20 lg:bottom-24 z-20 w-52 bg-white/92 backdrop-blur-md border border-black/10 rounded-xl p-3.5 shadow-[0_12px_30px_rgba(17,17,17,0.08)] hover:border-[#E31B23] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${orbitCards[1].accent}`}
                        >
                          <Icon1 className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-display text-sm font-bold text-[#111111] truncate">
                          {orbitCards[1].title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">{orbitCards[1].subtitle}</p>
                    </Link>

                    <Link
                      to={orbitCards[2].to}
                      className="hidden md:block absolute right-6 lg:right-16 top-12 lg:top-10 z-20 w-52 bg-white/92 backdrop-blur-md border border-black/10 rounded-xl p-3.5 shadow-[0_12px_30px_rgba(17,17,17,0.08)] hover:border-[#E31B23] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${orbitCards[2].accent}`}
                        >
                          <Icon2 className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-display text-sm font-bold text-[#111111] truncate">
                          {orbitCards[2].title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">{orbitCards[2].subtitle}</p>
                    </Link>

                    <Link
                      to={orbitCards[3].to}
                      className="hidden md:block absolute right-0 lg:right-4 bottom-16 lg:bottom-20 z-20 w-52 bg-white/92 backdrop-blur-md border border-black/10 rounded-xl p-3.5 shadow-[0_12px_30px_rgba(17,17,17,0.08)] hover:border-[#E31B23] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${orbitCards[3].accent}`}
                        >
                          <Icon3 className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-display text-sm font-bold text-[#111111] truncate">
                          {orbitCards[3].title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">{orbitCards[3].subtitle}</p>
                    </Link>
                  </>
                );
              })()}

              {/* Central Portrait Cutout or Editorial Frame */}
              {portraitResolved && !portraitError ? (
                <div
                  className={`relative z-10 w-72 sm:w-80 md:w-[390px] h-[340px] sm:h-[390px] md:h-[430px] flex items-end justify-center ${
                    isCutoutAvatar ? 'pt-4' : ''
                  }`}
                >
                  <img
                    src={portraitResolved}
                    alt={`${profile.fullName} — ${profile.professionalTitle}`}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitError(true)}
                    className={
                      isCutoutAvatar
                        ? 'w-full h-full object-contain object-bottom drop-shadow-[0_18px_36px_rgba(17,17,17,0.18)]'
                        : 'w-full h-full object-cover object-top rounded-t-3xl border-x border-t border-black/10'
                    }
                  />
                  {/* Soft bottom fade to ground the portrait */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/75 via-white/20 to-transparent"
                  />
                </div>
              ) : (
                <div className="relative z-10 w-72 sm:w-80 h-80 bg-[#111111] text-white flex flex-col items-center justify-center border border-black/15 rounded-t-3xl">
                  <span className="font-display text-5xl font-extrabold">{settings.monogram}</span>
                  <span className="mt-2 text-xs tracking-[0.2em] uppercase text-[#E31B23]">
                    {settings.creativeIdentity}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Corner Anchors (Desktop) */}
            <div className="hidden lg:block absolute left-0 bottom-8 max-w-[230px]">
              <div className="w-6 h-px bg-[#E31B23] mb-3" />
              <p className="text-xs font-semibold text-[#111111]">{settings.heroLocationText}</p>
              <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                {settings.heroAvailabilityRemote}
              </p>
            </div>

            <div className="hidden lg:block absolute right-0 bottom-8 text-right max-w-[230px]">
              <span className="inline-block text-[#E31B23] text-base leading-none mb-2">✦</span>
              <p className="text-xs font-semibold text-[#111111]">
                {settings.creativeIdentity}
              </p>
              <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                {settings.heroAvailabilityTypes}
              </p>
            </div>
          </div>

          {/* Mobile/Tablet Discipline Grid & Availability Row */}
          <div className="lg:hidden py-8 border-t border-black/10 space-y-6">
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {orbitCards.map((card) => (
                <Link
                  key={card.index}
                  to={card.to}
                  className="bg-[#F4F4F4] border border-black/10 p-4"
                >
                  <p className="font-mono-num text-[11px] font-semibold text-[#E31B23] mb-1">
                    {card.index}
                  </p>
                  <p className="font-display text-sm font-bold text-[#111111]">{card.title}</p>
                  <p className="text-[11px] text-[#777777] mt-0.5">{card.subtitle}</p>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                  Location
                </p>
                <p className="text-sm font-semibold text-[#111111]">{settings.heroLocationText}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                  Remote Readiness
                </p>
                <p className="text-sm font-semibold text-[#111111]">
                  {settings.heroAvailabilityRemote}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-1">
                  Availability
                </p>
                <p className="text-sm font-semibold text-[#111111]">
                  {settings.heroAvailabilityTypes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Marquee Ribbon */}
      <div className="bg-[#111111] text-white py-3.5 overflow-hidden border-b border-white/10">
        <div className="animate-marquee text-xs font-semibold tracking-[0.2em] uppercase">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8 whitespace-nowrap">
              <span>Product Design</span>
              <span className="text-[#E31B23]">/</span>
              <span>Brand Identity</span>
              <span className="text-[#E31B23]">/</span>
              <span>Graphic &amp; Social Media Design</span>
              <span className="text-[#E31B23]">/</span>
              <span>Website Design &amp; Development</span>
              <span className="text-[#E31B23]">/</span>
              <span>{settings.creativeIdentity}</span>
              <span className="text-[#E31B23]">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: About Preview */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-4">
                  A Little About Me
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-[#111111]">
                  CREATIVE THINKING. STRATEGIC DESIGN.{' '}
                  <span className="text-[#E31B23]">DIGITAL SOLUTIONS.</span>
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base text-[#555555] leading-relaxed">
              <Reveal delay={0.08}>
                <div className="space-y-4">
                  <p>
                    I am a designer who enjoys turning complex ideas into simple, functional and
                    visually engaging experiences.
                  </p>
                  <p>
                    My work sits at the intersection of creativity, technology and communication.
                    From developing brand identities and creating marketing materials to designing
                    websites and digital interfaces, I approach every project with the goal of
                    creating something purposeful and impactful.
                  </p>
                  <p>
                    Over the years, I have worked with different clients, businesses and
                    organisations across various industries, helping them communicate their ideas,
                    establish stronger brand identities and build a better digital presence.
                  </p>
                  <p className="text-[#111111] font-medium">
                    I believe great design goes beyond aesthetics. It is about understanding people,
                    identifying problems and creating solutions that make a difference.
                  </p>
                </div>

                <div className="pt-8">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#111111] text-[#111111] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <span>More About Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Editable Statistics Strip */}
          {settings.statsItems && settings.statsItems.length > 0 && (
            <div className="mt-16 pt-10 border-t border-black/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {settings.statsItems.map((stat, idx) => (
                <div key={`${stat.label}-${idx}`}>
                  <p className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-xs md:text-sm text-[#777777]">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Services Preview */}
      <section className="bg-[#F4F4F4] border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                  What I Do
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                  CREATIVE SERVICES BUILT AROUND YOUR BUSINESS NEEDS.
                </h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111111] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#E31B23] transition-colors shrink-0 self-start md:self-auto"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Projects */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                  Selected Work
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                  A SELECTION OF IDEAS BROUGHT TO LIFE.
                </h2>
                <p className="mt-4 text-sm md:text-base text-[#555555] leading-relaxed">
                  Every project represents an opportunity to solve a problem, communicate an idea or
                  create something meaningful. Explore a selection of my work across branding,
                  graphic design, digital experiences and website development.
                </p>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#111111] transition-colors shrink-0 self-start lg:self-auto"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          {/* Live Websites & Managed Social Pages Index */}
          <div className="mt-14 pt-12 border-t border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#E31B23] mb-4">
                <Globe className="w-3.5 h-3.5" />
                <span>Websites Built &amp; Live</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {liveWebsites.map((site) => (
                  <a
                    key={site.id}
                    href={site.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 p-3.5 bg-[#F4F4F4] border border-black/10 hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-20 aspect-[16/10] shrink-0 overflow-hidden bg-[#111111] border border-black/10 group-hover:border-white/15">
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
                        <p className="font-display text-sm font-bold truncate">{site.title}</p>
                        <p className="text-[11px] text-[#777777] group-hover:text-white/75 truncate">
                          {formatHost(site.liveUrl)}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#E31B23] group-hover:text-white shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#E31B23] mb-4">
                <Instagram className="w-3.5 h-3.5" />
                <span>Social Media Pages Managed</span>
              </div>
              <div className="border border-black/10 divide-y divide-black/10 bg-white">
                {MANAGED_SOCIAL_PAGES.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold truncate">{channel.name}</p>
                      <p className="font-mono-num text-[11px] text-[#777777] group-hover:text-white/75 truncate">
                        {channel.platform} · {channel.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#E31B23] group-hover:text-white shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Work With Me */}
      <section className="bg-[#111111] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                Why Work With Me
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                DESIGN WITH PURPOSE.{' '}
                <span className="text-[#E31B23]">CREATIVITY WITH DIRECTION.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-l border-white/15">
            {WHY_WORK_WITH_ME.map((item) => (
              <div
                key={item.number}
                className="p-7 border-r border-b border-white/15 flex flex-col justify-between gap-6 hover:bg-[#1A1A1A] transition-colors"
              >
                <span className="font-mono-num text-xs font-semibold text-[#E31B23]">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Work Process Preview */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                  Workflow
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                  A CLEAR PROCESS. BETTER RESULTS.
                </h2>
              </div>
              <Link
                to="/process"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#111111] text-[#111111] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#111111] hover:text-white transition-colors shrink-0 self-start md:self-auto"
              >
                <span>See How I Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_PREVIEW_STEPS.map((step) => (
              <div
                key={step.number}
                className="border border-black/10 p-6 flex flex-col justify-between gap-6 bg-white hover:border-[#E31B23] transition-colors"
              >
                <span className="font-mono-num text-2xl font-bold text-[#E31B23]">
                  {step.number}.
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#111111] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials (hidden on public site when empty) */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <section className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-3">
                  Questions
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
                  FREQUENTLY ASKED QUESTIONS.
                </h2>
                <p className="mt-4 text-sm md:text-base text-[#555555] leading-relaxed">
                  Clear answers regarding availability, project scope, and how collaborations work.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-4">
                  Next Step
                </p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08]">
                  HAVE AN IDEA?{' '}
                  <span className="text-[#E31B23]">LET&apos;S BRING IT TO LIFE.</span>
                </h2>
                <div className="mt-6 space-y-3 text-base text-white/75 max-w-2xl leading-relaxed">
                  <p>
                    Whether you&apos;re building a new brand, improving your digital presence or
                    looking for a creative partner to support your next project, I&apos;d love to
                    hear from you.
                  </p>
                  <p>
                    Let&apos;s discuss your ideas and explore how we can create something
                    meaningful together.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors whitespace-nowrap"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/25 text-white text-xs font-semibold tracking-[0.16em] uppercase hover:border-white transition-colors whitespace-nowrap"
                >
                  <span>Contact Me</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
