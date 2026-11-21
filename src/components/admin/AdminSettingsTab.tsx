import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { uploadCmsMedia } from '../../lib/mediaUpload';
import type { SiteSettings } from '../../types/cms';
import { CmsImage } from '../CmsImage';

interface AdminSettingsTabProps {
  onNotify: (msg: string) => void;
}

const HEADING_FONTS = ['Sora', 'Manrope', 'Outfit', 'Plus Jakarta Sans'];
const BODY_FONTS = ['Manrope', 'Plus Jakarta Sans', 'DM Sans'];

export function AdminSettingsTab({ onNotify }: AdminSettingsTabProps) {
  const { settings, saveSettings, resolveMediaUrl } = useCms();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadCmsMedia(file, 'logo');
      setForm((prev) => ({ ...prev, logoUrl: url }));
      onNotify('Logo uploaded. Click Save Settings to publish.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Logo upload failed.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings(form);
      onNotify('Website settings saved and published.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#111111]">
            Website Settings
          </h2>
          <p className="text-sm text-[#777777] mt-1">
            Manage brand identity, colours, typography, contact info, hero, and footer.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] disabled:opacity-60 transition-colors cursor-pointer self-start"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Brand Identity & Logo */}
      <div className="bg-white border border-black/10 p-6 md:p-8 space-y-6">
        <h3 className="font-display text-lg font-bold text-[#111111]">Brand &amp; Logo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={form.brandName}
              onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Creative Identity
            </label>
            <input
              type="text"
              value={form.creativeIdentity}
              onChange={(e) => setForm({ ...form, creativeIdentity: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Monogram
            </label>
            <input
              type="text"
              maxLength={8}
              value={form.monogram}
              onChange={(e) => setForm({ ...form, monogram: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 pt-2">
          {resolveMediaUrl(form.logoUrl) && (
            <div className="p-2 bg-[#F4F4F4] border border-black/10">
              <CmsImage src={form.logoUrl} alt="Brand logo" className="h-10 w-auto object-contain" />
            </div>
          )}
          <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#E31B23] transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploadingLogo ? 'Uploading...' : 'Upload Logo Image'}</span>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
          </label>
          {form.logoUrl && (
            <button
              type="button"
              onClick={() => setForm({ ...form, logoUrl: '' })}
              className="text-xs font-semibold text-[#E31B23] hover:underline cursor-pointer"
            >
              Use Text Wordmark Instead
            </button>
          )}
        </div>
      </div>

      {/* Brand Colours & Typography */}
      <div className="bg-white border border-black/10 p-6 md:p-8 space-y-6">
        <h3 className="font-display text-lg font-bold text-[#111111]">Colours &amp; Typography</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Primary Red
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                className="w-11 h-10 border border-black/15 cursor-pointer"
              />
              <input
                type="text"
                value={form.primaryColor}
                onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm font-mono-num"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Black
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.blackColor}
                onChange={(e) => setForm({ ...form, blackColor: e.target.value })}
                className="w-11 h-10 border border-black/15 cursor-pointer"
              />
              <input
                type="text"
                value={form.blackColor}
                onChange={(e) => setForm({ ...form, blackColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm font-mono-num"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              White
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.whiteColor}
                onChange={(e) => setForm({ ...form, whiteColor: e.target.value })}
                className="w-11 h-10 border border-black/15 cursor-pointer"
              />
              <input
                type="text"
                value={form.whiteColor}
                onChange={(e) => setForm({ ...form, whiteColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm font-mono-num"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Heading Font
            </label>
            <select
              value={form.headingFont}
              onChange={(e) => setForm({ ...form, headingFont: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            >
              {HEADING_FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Body Font
            </label>
            <select
              value={form.bodyFont}
              onChange={(e) => setForm({ ...form, bodyFont: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            >
              {BODY_FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="bg-white border border-black/10 p-6 md:p-8 space-y-6">
        <h3 className="font-display text-lg font-bold text-[#111111]">Contact &amp; Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              WhatsApp Phone Number (with country code, e.g. 234...)
            </label>
            <input
              type="text"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              placeholder="Leave blank to hide WhatsApp button"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Behance URL
            </label>
            <input
              type="url"
              value={form.behanceUrl}
              onChange={(e) => setForm({ ...form, behanceUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Pinterest URL
            </label>
            <input
              type="url"
              value={form.pinterestUrl}
              onChange={(e) => setForm({ ...form, pinterestUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Announcement Bar & Hero */}
      <div className="bg-white border border-black/10 p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[#111111]">
            Announcement Bar &amp; Homepage Hero
          </h3>
          <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase cursor-pointer">
            <input
              type="checkbox"
              checked={form.announcementEnabled}
              onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })}
              className="accent-[#E31B23]"
            />
            <span>Show Announcement Bar</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            Announcement Bar Text
          </label>
          <input
            type="text"
            value={form.announcementText}
            onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Hero Small Label
            </label>
            <input
              type="text"
              value={form.heroLabel}
              onChange={(e) => setForm({ ...form, heroLabel: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Highlighted Words (comma separated)
            </label>
            <input
              type="text"
              value={form.heroHighlightWords}
              onChange={(e) => setForm({ ...form, heroHighlightWords: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            Hero Main Headline
          </label>
          <input
            type="text"
            value={form.heroHeadline}
            onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            Hero Supporting Text
          </label>
          <textarea
            rows={4}
            value={form.heroSupportingText}
            onChange={(e) => setForm({ ...form, heroSupportingText: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Location Line
            </label>
            <input
              type="text"
              value={form.heroLocationText}
              onChange={(e) => setForm({ ...form, heroLocationText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Remote Line
            </label>
            <input
              type="text"
              value={form.heroAvailabilityRemote}
              onChange={(e) => setForm({ ...form, heroAvailabilityRemote: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Engagement Types Line
            </label>
            <input
              type="text"
              value={form.heroAvailabilityTypes}
              onChange={(e) => setForm({ ...form, heroAvailabilityTypes: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Statistics & Footer */}
      <div className="bg-white border border-black/10 p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[#111111]">
            Statistics Strip &amp; Footer Content
          </h3>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                statsItems: [...form.statsItems, { value: 'New Metric', label: 'Description' }],
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E31B23] uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stat</span>
          </button>
        </div>

        <div className="space-y-3">
          {form.statsItems.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <input
                type="text"
                value={item.value}
                onChange={(e) => {
                  const next = [...form.statsItems];
                  next[idx] = { ...next[idx], value: e.target.value };
                  setForm({ ...form, statsItems: next });
                }}
                placeholder="Value"
                className="sm:col-span-4 px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
              <input
                type="text"
                value={item.label}
                onChange={(e) => {
                  const next = [...form.statsItems];
                  next[idx] = { ...next[idx], label: e.target.value };
                  setForm({ ...form, statsItems: next });
                }}
                placeholder="Label"
                className="sm:col-span-7 px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    statsItems: form.statsItems.filter((_, i) => i !== idx),
                  })
                }
                aria-label="Remove stat"
                className="sm:col-span-1 p-2 text-[#777777] hover:text-[#E31B23] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-black/10">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Footer Headline
            </label>
            <input
              type="text"
              value={form.footerHeadline}
              onChange={(e) => setForm({ ...form, footerHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Copyright Line
            </label>
            <input
              type="text"
              value={form.footerCopyright}
              onChange={(e) => setForm({ ...form, footerCopyright: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            Footer Description
          </label>
          <textarea
            rows={2}
            value={form.footerDescription}
            onChange={(e) => setForm({ ...form, footerDescription: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>
      </div>

      {/* Budget Dropdown Ranges */}
      <div className="bg-white border border-black/10 p-6 md:p-8 space-y-4">
        <h3 className="font-display text-lg font-bold text-[#111111]">
          Inquiry Budget Ranges (one per line)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              NGN Ranges
            </label>
            <textarea
              rows={4}
              value={form.budgetRangesNgn.join('\n')}
              onChange={(e) =>
                setForm({
                  ...form,
                  budgetRangesNgn: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              USD Ranges
            </label>
            <textarea
              rows={4}
              value={form.budgetRangesUsd.join('\n')}
              onChange={(e) =>
                setForm({
                  ...form,
                  budgetRangesUsd: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              GBP Ranges
            </label>
            <textarea
              rows={4}
              value={form.budgetRangesGbp.join('\n')}
              onChange={(e) =>
                setForm({
                  ...form,
                  budgetRangesGbp: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
