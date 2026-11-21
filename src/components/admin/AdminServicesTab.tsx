import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Edit3,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { uploadCmsMedia } from '../../lib/mediaUpload';
import type { ServiceItem } from '../../types/cms';
import { CmsImage } from '../CmsImage';

interface AdminServicesTabProps {
  onNotify: (msg: string) => void;
}

export function AdminServicesTab({ onNotify }: AdminServicesTabProps) {
  const { services, saveService, deleteService, resolveMediaUrl } = useCms();
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadCmsMedia(file, 'service');
      setEditing({ ...editing, imageUrl: url });
      onNotify('Service image uploaded.');
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
      await saveService(editing);
      onNotify(`Service "${editing.title}" saved.`);
      setEditing(null);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= services.length) return;
    const current = services[index];
    const swap = services[target];
    await saveService({ ...current, sortOrder: target + 1 });
    await saveService({ ...swap, sortOrder: index + 1 });
    onNotify('Service order updated.');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#111111]">
            Services Management
          </h2>
          <p className="text-sm text-[#777777] mt-1">
            Edit service categories, deliverables, images, order, and visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: `service-${Date.now()}`,
              number: String(services.length + 1).padStart(2, '0'),
              title: 'New Service',
              headline: '',
              shortDescription: '',
              description: '',
              deliverables: [],
              idealFor: '',
              category: 'DESIGN',
              imageUrl: '',
              published: true,
              sortOrder: services.length + 1,
            })
          }
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] transition-colors cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-4">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className="bg-white border border-black/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-[#777777]">
                <span className="font-mono-num font-bold text-[#E31B23]">{svc.number}</span>
                <span>·</span>
                <span>{svc.category}</span>
                <span>·</span>
                <span>{svc.published ? 'Published' : 'Hidden'}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#111111]">{svc.title}</h3>
              <p className="text-xs text-[#555555] mt-1 max-w-2xl">{svc.shortDescription}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleMove(idx, -1)}
                disabled={idx === 0}
                className="p-2 border border-black/15 text-[#111111] disabled:opacity-30 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 1)}
                disabled={idx === services.length - 1}
                className="p-2 border border-black/15 text-[#111111] disabled:opacity-30 cursor-pointer"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={async () => {
                  await saveService({ ...svc, published: !svc.published });
                  onNotify(svc.published ? 'Service hidden.' : 'Service published.');
                }}
                className="px-3 py-2 border border-black/15 text-xs font-semibold uppercase text-[#111111] inline-flex items-center gap-1.5 cursor-pointer"
              >
                {svc.published ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-[#E31B23]" />
                    <span>Visible</span>
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
                onClick={() => setEditing(svc)}
                className="px-3.5 py-2 bg-[#111111] text-white text-xs font-semibold uppercase hover:bg-[#E31B23] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  await deleteService(svc.id);
                  onNotify(`Deleted "${svc.title}".`);
                }}
                className="p-2 border border-black/15 text-[#777777] hover:text-[#E31B23] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-[#111111]/80 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-white border border-black/20 max-w-3xl w-full p-6 md:p-8 space-y-5 my-6 text-[#111111]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-display text-xl font-extrabold text-[#111111]">
                Edit Service
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="p-2 text-[#777777] hover:text-[#111111] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Number</label>
                <input
                  type="text"
                  required
                  value={editing.number}
                  onChange={(e) => setEditing({ ...editing, number: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase mb-1.5">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Category</label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Ideal For</label>
                <input
                  type="text"
                  value={editing.idealFor}
                  onChange={(e) => setEditing({ ...editing, idealFor: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">Headline</label>
              <input
                type="text"
                value={editing.headline}
                onChange={(e) => setEditing({ ...editing, headline: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">
                Short Summary (Homepage) *
              </label>
              <textarea
                rows={2}
                required
                value={editing.shortDescription}
                onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">
                Detailed Description (Services Page)
              </label>
              <textarea
                rows={4}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">
                Deliverables (one per line)
              </label>
              <textarea
                rows={4}
                value={editing.deliverables.join('\n')}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    deliverables: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {resolveMediaUrl(editing.imageUrl) && (
                <CmsImage
                  src={editing.imageUrl}
                  alt={editing.title}
                  className="w-24 h-16 object-cover border border-black/10"
                />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-xs font-semibold uppercase hover:bg-[#E31B23] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload Service Image'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {editing.imageUrl && (
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, imageUrl: '' })}
                  className="text-xs text-[#E31B23] font-semibold cursor-pointer"
                >
                  Remove Image
                </button>
              )}
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
                  <span>Save Service</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
