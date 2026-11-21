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
  Star,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { uploadCmsMedia } from '../../lib/mediaUpload';
import type { Project, ProjectFilterCategory, ProjectGalleryItem } from '../../types/cms';
import { CmsImage } from '../CmsImage';

interface AdminPortfolioTabProps {
  onNotify: (msg: string) => void;
}

const CATEGORIES: ProjectFilterCategory[] = [
  'BRANDING',
  'GRAPHIC DESIGN',
  'SOCIAL MEDIA',
  'WEBSITE DESIGN',
  'UI/UX DESIGN',
];

function createEmptyProject(nextOrder: number): Project {
  const id = `project-${Date.now()}`;
  return {
    id,
    slug: id,
    title: '',
    filterCategory: 'BRANDING',
    categoryLabel: '',
    shortDescription: '',
    overview: '',
    client: '',
    industry: '',
    servicesProvided: [],
    duration: '',
    year: String(new Date().getFullYear()),
    background: '',
    challenge: '',
    creativeApproach: '',
    process: '',
    outcome: '',
    contribution: '',
    coverImageUrl: '',
    galleryImages: [],
    liveUrl: '',
    featured: false,
    status: 'draft',
    sortOrder: nextOrder,
  };
}

export function AdminPortfolioTab({ onNotify }: AdminPortfolioTabProps) {
  const { projects, saveProject, deleteProject, resolveMediaUrl } = useCms();
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingCover(true);
    try {
      const url = await uploadCmsMedia(file, 'project-cover');
      setEditing({ ...editing, coverImageUrl: url });
      onNotify('Cover image uploaded. Save project to apply.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Cover upload failed.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editing) return;
    setUploadingGallery(true);
    try {
      const added: ProjectGalleryItem[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadCmsMedia(file, 'project-gallery');
        added.push({
          id: `gal_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          url,
          caption: file.name.replace(/\.[^.]+$/, ''),
          layout: 'standard',
        });
      }
      setEditing({
        ...editing,
        galleryImages: [...editing.galleryImages, ...added],
      });
      onNotify(`${added.length} gallery image(s) uploaded.`);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Gallery upload failed.');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title.trim() || !editing.slug.trim()) {
      onNotify('Project title and URL slug are required.');
      return;
    }
    setSaving(true);
    try {
      const sanitizedSlug = editing.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '');
      await saveProject(
        {
          ...editing,
          id: isNew ? sanitizedSlug : editing.id,
          slug: sanitizedSlug,
        },
        isNew
      );
      onNotify(`Project "${editing.title}" saved.`);
      setEditing(null);
      setIsNew(false);
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    const current = projects[index];
    const swap = projects[target];
    await saveProject({ ...current, sortOrder: target + 1 });
    await saveProject({ ...swap, sortOrder: index + 1 });
    onNotify('Project order updated.');
  };

  const toggleFeatured = async (proj: Project) => {
    await saveProject({ ...proj, featured: !proj.featured });
    onNotify(proj.featured ? 'Removed from featured projects.' : 'Marked as featured.');
  };

  const toggleStatus = async (proj: Project) => {
    const nextStatus = proj.status === 'published' ? 'draft' : 'published';
    await saveProject({ ...proj, status: nextStatus });
    onNotify(`Project set to ${nextStatus}.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#111111]">
            Portfolio Management
          </h2>
          <p className="text-sm text-[#777777] mt-1">
            Add, edit, reorder, feature, publish, or upload screenshots for projects and case studies.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(createEmptyProject(projects.length + 1));
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] transition-colors cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="bg-white border border-black/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-20 h-14 bg-[#111111] border border-black/10 overflow-hidden shrink-0 flex items-center justify-center text-white text-[11px] font-mono-num">
                {resolveMediaUrl(proj.coverImageUrl) ? (
                  <CmsImage
                    src={proj.coverImageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-[#777777]">
                  <span className="font-semibold text-[#E31B23]">{proj.filterCategory}</span>
                  <span>·</span>
                  <span>{proj.status === 'published' ? 'Published' : 'Draft'}</span>
                  {proj.featured && (
                    <>
                      <span>·</span>
                      <span className="text-[#111111] font-semibold">Featured</span>
                    </>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-[#111111] truncate">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#777777] truncate">{proj.categoryLabel}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleMove(idx, -1)}
                disabled={idx === 0}
                title="Move up"
                className="p-2 border border-black/15 text-[#111111] hover:border-[#111111] disabled:opacity-30 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 1)}
                disabled={idx === projects.length - 1}
                title="Move down"
                className="p-2 border border-black/15 text-[#111111] hover:border-[#111111] disabled:opacity-30 cursor-pointer"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleFeatured(proj)}
                title="Toggle featured"
                className={`p-2 border transition-colors cursor-pointer ${
                  proj.featured
                    ? 'bg-[#E31B23] border-[#E31B23] text-white'
                    : 'border-black/15 text-[#777777] hover:text-[#111111]'
                }`}
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleStatus(proj)}
                title={proj.status === 'published' ? 'Set to Draft' : 'Publish'}
                className="px-3 py-2 border border-black/15 text-xs font-semibold uppercase text-[#111111] hover:border-[#111111] inline-flex items-center gap-1.5 cursor-pointer"
              >
                {proj.status === 'published' ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-[#E31B23]" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-[#777777]" />
                    <span>Draft</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(proj);
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
                  await deleteProject(proj.id);
                  onNotify(`Deleted "${proj.title}".`);
                }}
                title="Delete project"
                className="p-2 border border-black/15 text-[#777777] hover:text-[#E31B23] hover:border-[#E31B23] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Editor Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-[#111111]/80 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-white border border-black/20 max-w-4xl w-full p-6 md:p-8 space-y-6 my-6 text-[#111111]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-display text-xl font-extrabold text-[#111111]">
                {isNew ? 'Add New Project' : `Edit: ${editing.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="p-2 text-[#777777] hover:text-[#111111] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setEditing({
                      ...editing,
                      title: nextTitle,
                      slug: isNew
                        ? nextTitle
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, '')
                        : editing.slug,
                    });
                  }}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm font-mono-num"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Filter Category</label>
                <select
                  value={editing.filterCategory}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      filterCategory: e.target.value as ProjectFilterCategory,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">
                  Display Category Label *
                </label>
                <input
                  type="text"
                  required
                  value={editing.categoryLabel}
                  onChange={(e) => setEditing({ ...editing, categoryLabel: e.target.value })}
                  placeholder="e.g. E-commerce Website Design & Development"
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Client / Brand</label>
                <input
                  type="text"
                  value={editing.client}
                  onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Industry</label>
                <input
                  type="text"
                  value={editing.industry}
                  onChange={(e) => setEditing({ ...editing, industry: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Duration</label>
                <input
                  type="text"
                  value={editing.duration}
                  onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Year Completed</label>
                <input
                  type="text"
                  value={editing.year}
                  onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5">Short Description *</label>
              <textarea
                rows={2}
                required
                value={editing.shortDescription}
                onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Project Overview</label>
                <textarea
                  rows={3}
                  value={editing.overview}
                  onChange={(e) => setEditing({ ...editing, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">
                  Services Provided (one per line)
                </label>
                <textarea
                  rows={3}
                  value={editing.servicesProvided.join('\n')}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      servicesProvided: e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Background</label>
                <textarea
                  rows={3}
                  value={editing.background}
                  onChange={(e) => setEditing({ ...editing, background: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Challenge</label>
                <textarea
                  rows={3}
                  value={editing.challenge}
                  onChange={(e) => setEditing({ ...editing, challenge: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Creative Approach</label>
                <textarea
                  rows={3}
                  value={editing.creativeApproach}
                  onChange={(e) => setEditing({ ...editing, creativeApproach: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">
                  Design &amp; Development Process
                </label>
                <textarea
                  rows={3}
                  value={editing.process}
                  onChange={(e) => setEditing({ ...editing, process: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">Final Outcome</label>
                <textarea
                  rows={3}
                  value={editing.outcome}
                  onChange={(e) => setEditing({ ...editing, outcome: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1.5">My Contribution</label>
                <textarea
                  rows={3}
                  value={editing.contribution}
                  onChange={(e) => setEditing({ ...editing, contribution: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-black/10 text-sm"
                />
              </div>
            </div>

            {/* Cover & Gallery Uploads */}
            <div className="p-5 bg-[#F4F4F4] border border-black/10 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase mb-2">Cover Image</p>
                <div className="flex flex-wrap items-center gap-4">
                  {resolveMediaUrl(editing.coverImageUrl) && (
                    <CmsImage
                      src={editing.coverImageUrl}
                      alt="Cover preview"
                      className="w-28 h-20 object-cover border border-black/10"
                    />
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase hover:bg-[#E31B23] cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingCover ? 'Uploading...' : 'Upload Cover Image'}</span>
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                  {editing.coverImageUrl && (
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, coverImageUrl: '' })}
                      className="text-xs text-[#E31B23] font-semibold cursor-pointer"
                    >
                      Remove Cover
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase">Project Gallery</p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31B23] text-white text-xs font-semibold uppercase hover:bg-[#111111] cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingGallery ? 'Uploading...' : 'Upload Gallery Images'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {editing.galleryImages.length > 0 && (
                  <div className="space-y-3">
                    {editing.galleryImages.map((gal, gIdx) => (
                      <div
                        key={gal.id || gIdx}
                        className="bg-white p-3 border border-black/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-2 h-14 bg-[#111111] overflow-hidden">
                          <CmsImage src={gal.url} alt={gal.caption} className="w-full h-full object-cover" />
                        </div>
                        <input
                          type="text"
                          value={gal.caption}
                          onChange={(e) => {
                            const next = [...editing.galleryImages];
                            next[gIdx] = { ...next[gIdx], caption: e.target.value };
                            setEditing({ ...editing, galleryImages: next });
                          }}
                          placeholder="Image caption"
                          className="sm:col-span-6 px-3 py-1.5 bg-[#F4F4F4] border border-black/10 text-xs"
                        />
                        <select
                          value={gal.layout}
                          onChange={(e) => {
                            const next = [...editing.galleryImages];
                            next[gIdx] = {
                              ...next[gIdx],
                              layout: e.target.value as ProjectGalleryItem['layout'],
                            };
                            setEditing({ ...editing, galleryImages: next });
                          }}
                          className="sm:col-span-3 px-2 py-1.5 bg-[#F4F4F4] border border-black/10 text-xs"
                        >
                          <option value="standard">Standard</option>
                          <option value="wide">Wide (Full Width)</option>
                          <option value="tall">Tall</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            setEditing({
                              ...editing,
                              galleryImages: editing.galleryImages.filter((_, i) => i !== gIdx),
                            })
                          }
                          className="sm:col-span-1 p-1.5 text-[#777777] hover:text-[#E31B23] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10">
              <div className="flex items-center gap-6 text-xs font-semibold uppercase">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    className="accent-[#E31B23]"
                  />
                  <span>Featured on Homepage</span>
                </label>
                <select
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      status: e.target.value as 'published' | 'draft',
                    })
                  }
                  className="px-3 py-2 bg-[#F4F4F4] border border-black/10"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

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
                  <span>Save Project</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
