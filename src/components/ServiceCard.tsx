import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import type { ServiceItem } from '../types/cms';
import { CmsImage } from './CmsImage';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { resolveMediaUrl } = useCms();
  const imgResolved = resolveMediaUrl(service.imageUrl);

  return (
    <div className="bg-white border border-black/10 p-7 md:p-9 flex flex-col justify-between hover:border-[#111111] transition-colors">
      <div>
        {imgResolved && (
          <div className="aspect-[16/9] mb-6 bg-[#F4F4F4] overflow-hidden border border-black/10">
            <CmsImage
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono-num text-sm font-bold text-[#E31B23]">
            {service.number}.
          </span>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#777777]">
            {service.category}
          </span>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#111111] mb-3">
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-[#555555] leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        <div className="border-t border-black/10 pt-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#777777] mb-3">
            Services Include
          </p>
          <ul className="space-y-2 text-sm text-[#111111]">
            {service.deliverables.slice(0, 6).map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-[#E31B23] mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-black/10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] hover:text-[#E31B23] transition-colors"
        >
          <span>Explore Service Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
