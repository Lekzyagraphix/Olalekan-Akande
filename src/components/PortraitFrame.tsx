import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import { CmsImage } from './CmsImage';

interface PortraitFrameProps {
  className?: string;
  aspectClass?: string;
}

export function PortraitFrame({
  className = '',
  aspectClass = 'aspect-[4/5]',
}: PortraitFrameProps) {
  const { profile, settings, isAdmin, resolveMediaUrl } = useCms();
  const resolved = resolveMediaUrl(profile.portraitUrl);

  const isCutoutAvatar = resolved.includes('LAG_Invoice_pp_');

  return (
    <div
      className={`relative bg-[#1A1A1A] border border-black/15 overflow-hidden ${aspectClass} ${className}`}
    >
      {resolved ? (
        <>
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60">
              {profile.location}
            </span>
            <span className="w-3 h-3 bg-[#E31B23]" aria-hidden="true" />
          </div>
          <CmsImage
            src={profile.portraitUrl}
            alt={`${profile.fullName} — ${profile.professionalTitle}`}
            loading="eager"
            className={
              isCutoutAvatar
                ? 'w-full h-full object-contain object-bottom pt-10 px-4'
                : 'w-full h-full object-cover object-top'
            }
          />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#111111]/95 via-[#111111]/55 to-transparent text-white">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E31B23]">
              {profile.creativeIdentity}
            </p>
            <p className="font-display text-base font-bold mt-0.5">{profile.fullName}</p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-between p-7 md:p-9 bg-[#111111] text-white relative">
          {/* Architectural Corner Accents */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60">
              {settings.creativeIdentity}
            </span>
            <span className="w-3 h-3 bg-[#E31B23]" aria-hidden="true" />
          </div>

          <div className="my-auto py-8 flex flex-col items-start">
            <div className="w-24 h-24 md:w-28 md:h-28 border border-white/20 flex items-center justify-center mb-6 relative">
              <span className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                {settings.monogram}
              </span>
              <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-[#E31B23]" />
            </div>
            <p className="font-display text-xl md:text-2xl font-bold tracking-tight">
              {profile.fullName}
            </p>
            <p className="text-sm text-white/65 mt-1">{profile.professionalTitle}</p>
          </div>

          <div className="pt-5 border-t border-white/15 flex items-center justify-between gap-4">
            <span className="text-xs text-white/60">{profile.location}</span>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#E31B23] hover:text-white transition-colors"
              >
                Upload Portrait in CMS
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
