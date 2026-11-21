import React, { useEffect, useState } from 'react';
import { Loader2, Save, Upload } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { uploadCmsMedia } from '../../lib/mediaUpload';
import type { SeoPageConfig } from '../../types/cms';
import { CmsImage } from '../CmsImage';

interface AdminSeoTabProps {
  onNotify: (msg: string) => void;
}

const PAGE_LABELS: Record<string, string> = {
  home: 'Home Page',
  about: 'About Me Page',
  services: 'Services Page',
  portfolio: 'Portfolio Page',
  process: 'My Process Page',
  experience: 'Experience & Skills Page',
  contact: 'Contact Page',
  privacy: 'Privacy Policy Page',
};

export function AdminSeoTab({ onNotify }: AdminSeoTabProps) {
  const { seoPages, saveSeoPage, resolveMediaUrl } = useCms();
  const [selectedKey, setSelectedKey] = useState<string>('home');
  const [draft, setDraft] = useState<SeoPageConfig>(seoPages.home);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (seoPages[selectedKey]) {
      setDraft(seoPages[selectedKey]);
    }
  }, [seoPages, selectedKey]);

  const handleSelectPage = (key: string) => {
    setSelectedKey(key);
    setDraft(seoPages[key]);
  };

  const handleOgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCmsMedia(file, 'seo-og');
      setDraft((prev) => ({ ...prev, ogImageUrl: url }));
      onNotify('Social sharing image uploaded. Save SEO to publish.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSeoPage(draft);
      onNotify(`SEO settings for ${PAGE_LABELS[selectedKey]} saved.`);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Failed to save SEO.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-black/10">
        <h2 className="font-display text-2xl font-extrabold text-[#111111]">
          SEO &amp; Social Sharing Management
        </h2>
        <p className="text-sm text-[#777777] mt-1">
          Configure page titles, meta descriptions, keywords, and social sharing images per route.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.keys(PAGE_LABELS).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelectPage(key)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer ${
              selectedKey === key
                ? 'bg-[#E31B23] text-white'
                : 'bg-white border border-black/10 text-[#111111] hover:border-[#111111]'
            }`}
          >
            {PAGE_LABELS[key]}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-white border border-black/10 p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#111111] mb-2">
            Page Title *
          </label>
          <input
            type="text"
            required
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#111111] mb-2">
            Meta Description
          </label>
          <textarea
            rows={3}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#111111] mb-2">
            Keywords (comma separated)
          </label>
          <input
            type="text"
            value={draft.keywords}
            onChange={(e) => setDraft({ ...draft, keywords: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm text-[#111111] focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {resolveMediaUrl(draft.ogImageUrl) && (
            <CmsImage
              src={draft.ogImageUrl}
              alt="OpenGraph share preview"
              className="w-32 h-20 object-cover border border-black/10"
            />
          )}
          <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase hover:bg-[#E31B23] cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Uploading...' : 'Upload Social Sharing Image'}</span>
            <input type="file" accept="image/*" onChange={handleOgUpload} className="hidden" />
          </label>
          {draft.ogImageUrl && (
            <button
              type="button"
              onClick={() => setDraft({ ...draft, ogImageUrl: '' })}
              className="text-xs font-semibold text-[#E31B23] cursor-pointer"
            >
              Remove Image
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#111111] cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save SEO Settings</span>
        </button>
      </form>
    </div>
  );
}
