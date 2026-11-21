import React, { useEffect, useState } from 'react';
import { FileText, Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { uploadCmsMedia } from '../../lib/mediaUpload';
import type { ProfileData } from '../../types/cms';
import { CmsImage } from '../CmsImage';

interface AdminProfileTabProps {
  onNotify: (msg: string) => void;
}

export function AdminProfileTab({ onNotify }: AdminProfileTabProps) {
  const { profile, saveProfile, resolveMediaUrl } = useCms();
  const [form, setForm] = useState<ProfileData>(profile);
  const [saving, setSaving] = useState(false);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPortrait(true);
    try {
      const url = await uploadCmsMedia(file, 'portrait');
      setForm((prev) => ({ ...prev, portraitUrl: url }));
      onNotify('Portrait uploaded. Click Save Profile to publish.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Portrait upload failed.');
    } finally {
      setUploadingPortrait(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCv(true);
    try {
      const url = await uploadCmsMedia(file, 'cv');
      setForm((prev) => ({ ...prev, cvUrl: url, cvFileName: file.name }));
      onNotify('CV uploaded. Click Save Profile to publish.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'CV upload failed.');
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile(form);
      onNotify('Profile, biography, experience, and skills saved.');
    } catch (err) {
      onNotify(err instanceof Error ? err.message : 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 [&_input]:bg-[#F4F4F4] dark:[&_input]:bg-[#0D0D0D] [&_input]:border-black/10 dark:[&_input]:border-white/15 [&_input]:text-[#111111] dark:[&_input]:text-white [&_textarea]:bg-[#F4F4F4] dark:[&_textarea]:bg-[#0D0D0D] [&_textarea]:border-black/10 dark:[&_textarea]:border-white/15 [&_textarea]:text-[#111111] dark:[&_textarea]:text-white"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/12">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#111111] dark:text-white">
            Profile Management
          </h2>
          <p className="text-sm text-[#777777] dark:text-[#999999] mt-1">
            Upload your portrait and CV, and manage your biography, experience, skills, and education.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#111111] dark:hover:bg-white dark:hover:text-[#111111] disabled:opacity-60 transition-colors cursor-pointer self-start"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      {/* Portrait & CV Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-[#111111] dark:text-white">Portrait Photograph</h3>
          <div className="flex items-center gap-5">
            <div className="w-24 h-28 bg-[#111111] border border-black/10 dark:border-white/15 overflow-hidden shrink-0 flex items-center justify-center text-white text-xs">
              {resolveMediaUrl(form.portraitUrl) ? (
                <CmsImage
                  src={form.portraitUrl}
                  alt="Profile portrait"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>No Photo</span>
              )}
            </div>
            <div className="space-y-3">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#E31B23] dark:hover:bg-[#E31B23] dark:hover:text-white transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingPortrait ? 'Uploading...' : 'Upload Portrait'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePortraitUpload}
                  className="hidden"
                />
              </label>
              {form.portraitUrl && (
                <button
                  type="button"
                  onClick={() => setForm({ ...form, portraitUrl: '' })}
                  className="block text-xs font-semibold text-[#E31B23] hover:underline cursor-pointer"
                >
                  Remove Portrait
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-[#111111] dark:text-white">Curriculum Vitae (PDF)</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F4F4F4] dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#E31B23]" />
            </div>
            <div className="space-y-2 min-w-0">
              <p className="text-sm font-medium text-[#111111] dark:text-white truncate">
                {form.cvFileName || 'No CV uploaded yet'}
              </p>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#E31B23] dark:hover:bg-[#E31B23] dark:hover:text-white transition-colors cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingCv ? 'Uploading...' : 'Upload CV (PDF)'}</span>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleCvUpload}
                    className="hidden"
                  />
                </label>
                {form.cvUrl && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, cvUrl: '', cvFileName: '' })}
                    className="text-xs font-semibold text-[#E31B23] hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Bio */}
      <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-6 md:p-8 space-y-5">
        <h3 className="font-display text-lg font-bold text-[#111111] dark:text-white">Personal Details &amp; Bio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={form.professionalTitle}
              onChange={(e) => setForm({ ...form, professionalTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
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
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            About Introduction
          </label>
          <textarea
            rows={4}
            value={form.aboutIntro}
            onChange={(e) => setForm({ ...form, aboutIntro: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            My Story
          </label>
          <textarea
            rows={6}
            value={form.storyContent}
            onChange={(e) => setForm({ ...form, storyContent: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            Professional Availability Summary
          </label>
          <textarea
            rows={3}
            value={form.availabilitySummary}
            onChange={(e) => setForm({ ...form, availabilitySummary: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] border border-black/10 text-sm"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[#111111] dark:text-white">
            Professional Experience
          </h3>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                experiences: [
                  ...form.experiences,
                  {
                    id: `exp_${Date.now()}`,
                    role: 'New Role',
                    period: '2025 – Present',
                    company: '',
                    responsibilities: ['Lead creative deliverables'],
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E31B23] uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>

        <div className="space-y-6">
          {form.experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="p-5 bg-[#F4F4F4] dark:bg-[#141414] border border-black/10 dark:border-white/12 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono-num text-xs font-bold text-[#E31B23]">
                  Role 0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      experiences: form.experiences.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-xs text-[#777777] dark:text-[#999999] hover:text-[#E31B23] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => {
                    const next = [...form.experiences];
                    next[idx] = { ...next[idx], role: e.target.value };
                    setForm({ ...form, experiences: next });
                  }}
                  placeholder="Role Title"
                  className="px-3 py-2 bg-white dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
                />
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => {
                    const next = [...form.experiences];
                    next[idx] = { ...next[idx], period: e.target.value };
                    setForm({ ...form, experiences: next });
                  }}
                  placeholder="Period"
                  className="px-3 py-2 bg-white dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const next = [...form.experiences];
                    next[idx] = { ...next[idx], company: e.target.value };
                    setForm({ ...form, experiences: next });
                  }}
                  placeholder="Company / Practice"
                  className="px-3 py-2 bg-white dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#777777] dark:text-[#999999] mb-1">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={4}
                  value={exp.responsibilities.join('\n')}
                  onChange={(e) => {
                    const next = [...form.experiences];
                    next[idx] = {
                      ...next[idx],
                      responsibilities: e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    };
                    setForm({ ...form, experiences: next });
                  }}
                  className="w-full px-3 py-2 bg-white dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Core Competencies */}
      <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[#111111] dark:text-white">
            Education &amp; Qualifications
          </h3>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                education: [
                  ...form.education,
                  { id: `edu_${Date.now()}`, degree: 'Certification', institution: '', date: '' },
                ],
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E31B23] uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Qualification</span>
          </button>
        </div>

        <div className="space-y-3">
          {form.education.map((edu, idx) => (
            <div key={edu.id || idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => {
                  const next = [...form.education];
                  next[idx] = { ...next[idx], degree: e.target.value };
                  setForm({ ...form, education: next });
                }}
                placeholder="Degree / Certificate"
                className="md:col-span-5 px-3 py-2 bg-[#F4F4F4] dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => {
                  const next = [...form.education];
                  next[idx] = { ...next[idx], institution: e.target.value };
                  setForm({ ...form, education: next });
                }}
                placeholder="Institution"
                className="md:col-span-4 px-3 py-2 bg-[#F4F4F4] dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
              />
              <input
                type="text"
                value={edu.date}
                onChange={(e) => {
                  const next = [...form.education];
                  next[idx] = { ...next[idx], date: e.target.value };
                  setForm({ ...form, education: next });
                }}
                placeholder="Date"
                className="md:col-span-2 px-3 py-2 bg-[#F4F4F4] dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
              />
              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, education: form.education.filter((_, i) => i !== idx) })
                }
                aria-label="Delete qualification"
                className="md:col-span-1 p-2 text-[#777777] dark:text-[#999999] hover:text-[#E31B23] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-black/10 dark:border-white/12">
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2">
            Core Competencies (one per line)
          </label>
          <textarea
            rows={4}
            value={form.coreCompetencies.join('\n')}
            onChange={(e) =>
              setForm({
                ...form,
                coreCompetencies: e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className="w-full px-3.5 py-2.5 bg-[#F4F4F4] dark:bg-[#0D0D0D] border border-black/10 dark:border-white/15 text-sm text-[#111111] dark:text-white"
          />
        </div>
      </div>
    </form>
  );
}
