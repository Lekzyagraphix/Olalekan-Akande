import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { PageHeading } from '../components/PageHeading';

export function PrivacyPolicyPage() {
  usePageSeo('privacy');
  const { settings } = useCms();

  return (
    <div>
      <PageHeading
        label="Legal"
        headline="PRIVACY POLICY."
        description="How information submitted through this portfolio website is handled and protected."
      />

      <section className="bg-white dark:bg-[#0D0D0D] transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24 space-y-10 text-base text-[#555555] dark:text-[#B3B3B3] leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-bold text-[#111111] dark:text-white mb-3">
              1. Information Collected
            </h2>
            <p>
              When you submit a project enquiry through the contact form, we collect your name,
              email address, optional company or brand name, selected service, budget range,
              timeline, and project description solely to respond to your enquiry and evaluate a
              potential collaboration.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[#111111] dark:text-white mb-3">
              2. How Your Information Is Used
            </h2>
            <p>
              Information submitted is reviewed exclusively by {settings.brandName} ({settings.creativeIdentity})
              to communicate with you regarding your design or development project. Your details are
              never sold, rented, or shared with third-party marketers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[#111111] dark:text-white mb-3">
              3. Data Security &amp; Retention
            </h2>
            <p>
              Project enquiries are stored securely with strict administrator-only access controls.
              If you would like any previously submitted enquiry updated or deleted, please contact{' '}
              {settings.contactEmail ? (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-[#E31B23] font-medium hover:underline"
                >
                  {settings.contactEmail}
                </a>
              ) : (
                'us via the contact page'
              )}
              .
            </p>
          </div>

          <div className="pt-6 border-t border-black/10 dark:border-white/12">
            <Link
              to="/contact"
              className="text-xs font-semibold tracking-[0.16em] uppercase text-[#E31B23] hover:text-[#111111] dark:hover:text-white transition-colors"
            >
              Return to Contact Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
