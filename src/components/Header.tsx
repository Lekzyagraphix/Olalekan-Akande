import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { CmsImage } from './CmsImage';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const { settings, profile, resolveMediaUrl } = useCms();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const logoResolved = resolveMediaUrl(settings.logoUrl);
  const cleanWhatsapp = (settings.whatsappNumber || '').replace(/[^\d]/g, '');
  const whatsappUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        "Hello Akande, I'd like to discuss a project."
      )}`
    : '';

  return (
    <>
      {settings.announcementEnabled && settings.announcementText && (
        <div className="bg-[#111111] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-2 flex items-center justify-center text-center gap-3">
            <Link
              to="/contact"
              className="text-[11px] md:text-xs font-medium tracking-[0.14em] uppercase text-white/90 hover:text-[#E31B23] transition-colors truncate"
            >
              {settings.announcementText}
            </Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="font-display text-base md:text-lg font-extrabold tracking-tight text-[#111111] whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            {logoResolved ? (
              <CmsImage
                src={settings.logoUrl}
                alt={settings.brandName}
                loading="eager"
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span>
                {settings.brandName}
                <span className="text-[#E31B23]">.</span>
              </span>
            )}
          </Link>

          {/* Zone 2: Clean Single-Line Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#111111]"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link-underline whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#E31B23] font-semibold'
                      : 'text-[#111111] hover:text-[#E31B23]'
                  }`
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive ? 'true' : 'false'}>{item.label}</span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Let's Talk on WhatsApp (${settings.whatsappNumber})`}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden w-10 h-10 flex items-center justify-center border border-black/15 text-[#111111] hover:border-[#E31B23] hover:text-[#E31B23] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-30 bg-[#111111] text-white lg:hidden overflow-y-auto"
          >
            <div className="px-6 py-10 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
              <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-white/10">
                {NAV_ITEMS.map((item, idx) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `py-4 flex items-center justify-between font-display text-2xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-[#E31B23]' : 'text-white hover:text-[#E31B23]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-num text-xs text-white/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </NavLink>
                ))}
                <Link
                  to="/process"
                  className="py-4 flex items-center justify-between font-display text-2xl font-bold tracking-tight text-white hover:text-[#E31B23] transition-colors"
                >
                  <span>My Process</span>
                  <span className="font-mono-num text-xs text-white/40">07</span>
                </Link>
              </nav>

              <div className="pt-8 border-t border-white/10 space-y-4">
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-[#111111] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Let&apos;s Talk on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="w-full py-4 px-6 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-[#111111] transition-colors"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
                <p className="text-xs text-white/55">
                  {settings.creativeIdentity} · {profile.location} · Remote Worldwide
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
