import React from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { PageHeading } from '../components/PageHeading';
import { ProjectInquiryForm } from '../components/ProjectInquiryForm';

export function ContactPage() {
  usePageSeo('contact');
  const { settings, profile, isAdmin } = useCms();

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^\d]/g, '');
  const socialLinks = [
    { label: 'Behance', url: settings.behanceUrl },
    { label: 'Instagram', url: settings.instagramUrl },
    { label: 'Pinterest', url: settings.pinterestUrl },
    { label: 'LinkedIn', url: settings.linkedinUrl },
  ].filter((item) => Boolean(item.url));

  return (
    <div>
      <PageHeading
        label="Contact"
        headline="LET'S TALK ABOUT WHAT YOU'RE BUILDING."
        highlightWord="BUILDING"
        description={
          "Have a project in mind, need a creative partner or looking to discuss a professional opportunity?\n\nI'm always interested in connecting with people and businesses working on meaningful ideas.\n\nWhether you need a brand identity, a website, digital design support or someone to collaborate with your team, let's start a conversation."
        }
      />

      <section className="bg-[#F4F4F4] border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#111111] text-white p-8 md:p-10 space-y-8">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-2">
                    Contact Details
                  </p>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight">
                    {profile.fullName}
                  </h2>
                  <p className="text-sm text-white/70 mt-1">{profile.creativeIdentity}</p>
                </div>

                <div className="space-y-5 pt-6 border-t border-white/15 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#E31B23] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">{profile.location}</p>
                      <p className="text-white/65">Available for Remote Projects Worldwide</p>
                    </div>
                  </div>

                  {settings.contactEmail && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#E31B23] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-white/50 mb-0.5">
                          Email
                        </p>
                        <a
                          href={`mailto:${settings.contactEmail}`}
                          className="font-semibold text-white hover:text-[#E31B23] transition-colors break-all"
                        >
                          {settings.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {cleanWhatsapp && (
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-4 h-4 text-[#E31B23] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-white/50 mb-0.5">
                          WhatsApp
                        </p>
                        <a
                          href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                            "Hello Akande, I'd like to discuss a project."
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono-num font-semibold text-white hover:text-[#E31B23] transition-colors"
                        >
                          {settings.whatsappNumber}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp Action (only active when configured in CMS) */}
                {cleanWhatsapp ? (
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                      "Hello Akande, I'd like to discuss a project."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 hover:bg-white hover:text-[#111111] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                ) : isAdmin ? (
                  <div className="p-4 border border-white/15 text-xs text-white/65">
                    WhatsApp contact button is hidden until you enter your WhatsApp phone number in
                    Admin CMS → Website Settings.
                  </div>
                ) : null}

                {/* Social Links */}
                <div className="pt-6 border-t border-white/15">
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/50 mb-4">
                    Creative Channels
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:border-[#E31B23] hover:text-[#E31B23] transition-colors"
                      >
                        <span>{social.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-2">
                  Project Inquiry
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111]">
                  Tell me about your project.
                </h2>
              </div>
              <ProjectInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
