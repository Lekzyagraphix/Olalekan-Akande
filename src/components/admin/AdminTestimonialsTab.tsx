import React, { useState } from 'react';
import { Edit3, Eye, EyeOff, Loader2, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { uploadCmsMedia } from '../../lib/mediaUpload';
import type { Testimonial } from '../../types/cms';
import { CmsImage } from '../CmsImage';

interface AdminTestimonialsTabProps {
  onNotify: (msg: string) => void;
}

export function AdminTestimonialsTab({ onNotify }: AdminTestimonialsTabProps) {
  const { testimonials, saveTestimonial, deleteTestimonial, resolveMediaUrl } = useCms();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadCmsMedia(file, 'testimonial');
      setEditing({ ...editing, clientImageUrl: url });
      onNotify('Client photo uploaded.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      await saveTestimonial(editing, isNew);
      onNotify('Testimonial saved.');
      setEditing(null);
      setIsNew(false);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Failed to save testimonial.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#111111]">
            Testimonials Management
          </h2>
          <p className="text-sm text-[#777777] mt-1">
            Add real client testimonials. The testimonials section on the public site automatically
            displays when published entries exist.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing({
              id: `testimonial_${Date.now()}`,
              clientName: '',
              clientPosition: '',
              companyName: '',
              quote: '',
              clientImageUrl: '',
              published: true,
              sortOrder: testimonials.length + 1,
            });
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] transition-colors cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white border border-black/10 p-10 text-center">
          <p className="font-display text-lg font-bold text-[#111111] mb-2">
            No Testimonials Yet
          </p>
          <p className="text-sm text-[#555555]">
            Add verified client feedback here when ready. Nothing fabricated is displayed on your
            portfolio.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-black/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                {resolveMediaUrl(t.clientImageUrl) && (
                  <CmsImage
                    src={t.clientImageUrl}
                    alt={t.clientName}
                    className="w-12 h-12 object-cover border border-black/10 shrink-0"
                  />
                )}
                <div>
                  <p className="font-display text-base font-bold text-[#111111]">{t.clientName}</p>
                  <p className="text-xs text-[#777777]">
                    {[t.clientPosition, t.companyName].filter(Boolean).join(' · ')} ·{' '}
                    {t.published ? 'Published' : 'Hidden'}
                  </p>
                  <p className="text-sm text-[#555555] mt-2 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={async () => {
                    await saveTestimonial({ ...t, published: !t.published }, false);
                    onNotify(t.published ? 'Testimonial hidden.' : 'Testimonial published.');
                  }}
                  className="px-3 py-2 border border-black/15 text-xs font-semibold uppercase inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {t.published ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[#E31B23]" />
                      <span>Published</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-[#777777]" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(t);
                    setIsNew(false);
                  }}
                  className="px-3.5 py-2 bg-[#111111] text-white text-xs font-semibold uppercase hover:bg-[#E31B23] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await deleteTestimonial(t.id);
                    onNotify('Testimonial deleted.');
                  }}
                  className="p-2 border border-black/15 text-[#777777] hover:text-[#E31B23] cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-[#111111]/80 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-white border border-black/20 max-w-2xl w-full p-6 md:p-8 space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-display text-xl font-extrabold text-[#111111]">
                {isNew ? 'Add Testimonial' : 'Edit Testimonial'}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="p-2 text-[#777777] hover:text-[#111111] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editing.clientName}
                  onChange={(e) => setEditing({ ...editing, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Position / Role</label>
                <input
                  type="text"
                  value={editing.clientPosition}
                  onChange={(e) => setEditing({ ...editing, clientPosition: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">Company Name</label>
              <input
                type="text"
                value={editing.companyName}
                onChange={(e) => setEditing({ ...editing, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">Testimonial Quote *</label>
              <textarea
                rows={4}
                required
                value={editing.quote}
                onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {resolveMediaUrl(editing.clientImageUrl) && (
                <CmsImage
                  src={editing.clientImageUrl}
                  alt={editing.clientName}
                  className="w-14 h-14 object-cover border border-black/10"
                />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-xs font-semibold uppercase hover:bg-[#E31B23] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload Client Photo (Optional)'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-black/10">
              <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="accent-[#E31B23]"
                />
                <span>Published</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-5 py-2.5 border border-black/15 text-xs font-semibold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E31B23] text-white text-xs font-semibold uppercase hover:bg-[#111111] cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
