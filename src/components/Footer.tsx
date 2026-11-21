import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export function Footer() {
  const { settings } = useCms();

  const cleanWhatsapp = (settings.whatsappNumber || '').replace(/[^\d]/g, '');

  const socialLinks = [
    { label: 'Behance', href: settings.behanceUrl },
    { label: 'Instagram', href: settings.instagramUrl },
    { label: 'Pinterest', href: settings.pinterestUrl },
    { label: 'LinkedIn', href: settings.linkedinUrl },
    {
      label: 'WhatsApp',
      href: cleanWhatsapp
        ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
            "Hello Akande, I'd like to discuss a project."
          )}`
        : '',
    },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="bg-[#111111] dark:bg-[#080808] text-white border-t border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10 md:pt-24 md:pb-12">
        {/* Top CTA & Brand Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 bg-[#E31B23] text-white font-display text-xs font-extrabold tracking-tight">
                {settings.monogram}
              </span>
              <span className="font-display text-sm font-bold tracking-[0.14em] uppercase">
                {settings.brandName}.
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-lg">
              {settings.footerHeadline}
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md">
              {settings.footerDescription}
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E31B23] mb-5">
                Explore
              </h3>
              <ul className="space-y-3 text-sm text-white/75">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/process" className="hover:text-white transition-colors">
                    My Process
                  </Link>
                </li>
                <li>
                  <Link to="/experience" className="hover:text-white transition-colors">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E31B23] mb-5">
                Connect
              </h3>
              <ul className="space-y-3 text-sm text-white/75">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-white/40" />
                    </a>
                  </li>
                ))}
                {settings.contactEmail && (
                  <li>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="hover:text-white transition-colors"
                    >
                      Email
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col justify-between bg-[#1A1A1A] p-5 border border-white/10">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E31B23] mb-2">
                  {settings.footerCtaTitle}
                </p>
                <p className="text-sm text-white/80 leading-snug mb-5">
                  {settings.footerCtaSubtitle}
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E31B23] text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-[#111111] transition-colors whitespace-nowrap"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <p>{settings.footerCopyright}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/admin" className="hover:text-[#E31B23] transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
