import React from 'react';
import { Check, CheckCheck, Mail, Trash2 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { EnquiryStatus } from '../../types/cms';

interface AdminEnquiriesTabProps {
  onNotify: (msg: string) => void;
}

export function AdminEnquiriesTab({ onNotify }: AdminEnquiriesTabProps) {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useCms();

  const handleStatus = async (id: string, status: EnquiryStatus) => {
    await updateEnquiryStatus(id, status);
    onNotify(`Enquiry marked as ${status}.`);
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-black/10 dark:border-white/12">
        <h2 className="font-display text-2xl font-extrabold text-[#111111] dark:text-white">
          Contact &amp; Project Enquiries
        </h2>
        <p className="text-sm text-[#777777] dark:text-[#999999] mt-1">
          Review incoming project requests submitted through the Contact page.
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-10 text-center">
          <p className="font-display text-lg font-bold text-[#111111] dark:text-white mb-2">No Enquiries Yet</p>
          <p className="text-sm text-[#555555] dark:text-[#B3B3B3]">
            Project inquiries submitted via the Contact page form will appear here immediately.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div key={enq.id} className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/12">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                    <span
                      className={`font-semibold uppercase tracking-[0.14em] ${
                        enq.status === 'unread'
                          ? 'text-[#E31B23]'
                          : enq.status === 'completed'
                          ? 'text-[#111111] dark:text-white'
                          : 'text-[#777777] dark:text-[#999999]'
                      }`}
                    >
                      {enq.status}
                    </span>
                    <span className="text-[#777777] dark:text-[#999999]">·</span>
                    <span className="text-[#777777] dark:text-[#B3B3B3]">{enq.serviceRequired}</span>
                    <span className="text-[#777777] dark:text-[#999999]">·</span>
                    <span className="font-mono-num text-[#111111] dark:text-white font-medium">{enq.budget}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#111111] dark:text-white">
                    {enq.fullName}{' '}
                    {enq.company && (
                      <span className="text-sm font-normal text-[#777777] dark:text-[#999999]">({enq.company})</span>
                    )}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-[#555555] dark:text-[#B3B3B3]">
                    <a
                      href={`mailto:${enq.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-[#E31B23]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{enq.email}</span>
                    </a>
                    <span>Timeline: {enq.timeline}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {enq.status === 'unread' && (
                    <button
                      type="button"
                      onClick={() => handleStatus(enq.id, 'read')}
                      className="px-3.5 py-2 border border-black/15 dark:border-white/20 text-xs font-semibold uppercase text-[#111111] dark:text-white hover:border-[#111111] dark:hover:border-white inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Read</span>
                    </button>
                  )}
                  {enq.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => handleStatus(enq.id, 'completed')}
                      className="px-3.5 py-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold uppercase hover:bg-[#E31B23] dark:hover:bg-[#E31B23] dark:hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteEnquiry(enq.id);
                      onNotify('Enquiry deleted.');
                    }}
                    className="p-2 border border-black/15 dark:border-white/20 text-[#777777] dark:text-[#999999] hover:text-[#E31B23] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-[#111111] dark:text-[#E5E5E5] leading-relaxed whitespace-pre-line">
                {enq.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
