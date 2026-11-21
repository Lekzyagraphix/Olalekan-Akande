import React, { useMemo, useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const SERVICE_OPTIONS = [
  'Brand Identity & Logo Design',
  'Graphic Design',
  'Social Media Design',
  'Website Design & Development',
  'Product Design / UI/UX',
  'Other / Multiple Services',
];

const TIMELINE_OPTIONS = [
  'As Soon As Possible',
  'Within 1–2 Weeks',
  'Within 1 Month',
  'Flexible Timeline',
];

type Currency = 'NGN' | 'USD' | 'GBP';

export function ProjectInquiryForm() {
  const { settings, submitEnquiry } = useCms();

  const [currency, setCurrency] = useState<Currency>('USD');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceRequired, setServiceRequired] = useState(SERVICE_OPTIONS[0]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = useMemo(() => {
    if (currency === 'NGN') return settings.budgetRangesNgn;
    if (currency === 'GBP') return settings.budgetRangesGbp;
    return settings.budgetRangesUsd;
  }, [currency, settings]);

  const activeBudget = budget && budgetOptions.includes(budget) ? budget : budgetOptions[0] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (description.trim().length < 10) {
      setErrorMessage('Please provide a brief project description (at least 10 characters).');
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        company: company.trim(),
        serviceRequired,
        budget: `${currency}: ${activeBudget}`,
        timeline,
        description: description.trim(),
      });
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setCompany('');
      setDescription('');
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to send your enquiry right now. Please try again or reach out via email.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#111111] text-white p-8 md:p-12 border border-black/15">
        <div className="w-12 h-12 bg-[#E31B23] flex items-center justify-center mb-6">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          Project Inquiry Received
        </h3>
        <p className="text-base text-white/80 leading-relaxed mb-8">
          Thank you for reaching out. Your enquiry has been received. I&apos;ll review the details
          and get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 border border-white/25 text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#E31B23] hover:border-[#E31B23] transition-colors cursor-pointer"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-white border border-black/10 p-7 md:p-10">
      {errorMessage && (
        <div
          role="alert"
          className="p-4 bg-[#E31B23]/10 border border-[#E31B23] text-sm text-[#111111]"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="enquiry-full-name"
            className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] mb-2"
          >
            Full Name *
          </label>
          <input
            id="enquiry-full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-email"
            className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] mb-2"
          >
            Email Address *
          </label>
          <input
            id="enquiry-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="enquiry-company"
            className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] mb-2"
          >
            Company / Brand
          </label>
          <input
            id="enquiry-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Brand or organisation name"
            className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-service"
            className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] mb-2"
          >
            Service Required *
          </label>
          <select
            id="enquiry-service"
            value={serviceRequired}
            onChange={(e) => setServiceRequired(e.target.value)}
            className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="enquiry-budget"
              className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111]"
            >
              Project Budget *
            </label>
            <div className="inline-flex border border-black/15">
              {(['NGN', 'USD', 'GBP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => {
                    setCurrency(curr);
                    setBudget('');
                  }}
                  className={`px-2 py-0.5 text-[11px] font-semibold transition-colors cursor-pointer ${
                    currency === curr
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
          <select
            id="enquiry-budget"
            value={activeBudget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          >
            {budgetOptions.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="enquiry-timeline"
            className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] mb-2"
          >
            Project Timeline *
          </label>
          <select
            id="enquiry-timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          >
            {TIMELINE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="enquiry-description"
          className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#111111] mb-2"
        >
          Project Description *
        </label>
        <textarea
          id="enquiry-description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell me about your brand, goals, deliverables, and what you want to achieve..."
          className="w-full px-4 py-3 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23] resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#111111] disabled:opacity-60 transition-colors cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Send Project Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
