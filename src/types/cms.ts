export type ProjectFilterCategory =
  | 'BRANDING'
  | 'GRAPHIC DESIGN'
  | 'SOCIAL MEDIA'
  | 'WEBSITE DESIGN'
  | 'UI/UX DESIGN';

export interface StatItem {
  value: string;
  label: string;
}

export interface SiteSettings {
  brandName: string;
  creativeIdentity: string;
  monogram: string;
  logoUrl?: string;
  primaryColor: string;
  blackColor: string;
  whiteColor: string;
  headingFont: string;
  bodyFont: string;
  contactEmail: string;
  whatsappNumber: string;
  behanceUrl: string;
  instagramUrl: string;
  pinterestUrl: string;
  linkedinUrl: string;
  announcementEnabled: boolean;
  announcementText: string;
  heroLabel: string;
  heroHeadline: string;
  heroHighlightWords: string;
  heroSupportingText: string;
  heroLocationText: string;
  heroAvailabilityRemote: string;
  heroAvailabilityTypes: string;
  footerHeadline: string;
  footerDescription: string;
  footerCtaTitle: string;
  footerCtaSubtitle: string;
  footerCopyright: string;
  statsItems: StatItem[];
  budgetRangesNgn: string[];
  budgetRangesUsd: string[];
  budgetRangesGbp: string[];
  updatedAt?: unknown;
}

export interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  company: string;
  responsibilities: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  date: string;
}

export interface ProfileData {
  fullName: string;
  creativeIdentity: string;
  professionalTitle: string;
  location: string;
  availabilitySummary: string;
  portraitUrl: string;
  cvUrl: string;
  cvFileName: string;
  aboutHeadline: string;
  aboutIntro: string;
  storyHeadline: string;
  storyContent: string;
  philosophyHeadline: string;
  beyondHeadline: string;
  beyondContent: string;
  experiences: ExperienceItem[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  coreCompetencies: string[];
  updatedAt?: unknown;
}

export interface ProjectGalleryItem {
  id: string;
  url: string;
  caption: string;
  layout: 'wide' | 'standard' | 'tall';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  filterCategory: ProjectFilterCategory;
  categoryLabel: string;
  shortDescription: string;
  overview: string;
  client: string;
  industry: string;
  servicesProvided: string[];
  duration: string;
  year: string;
  background: string;
  challenge: string;
  creativeApproach: string;
  process: string;
  outcome: string;
  contribution: string;
  coverImageUrl: string;
  galleryImages: ProjectGalleryItem[];
  liveUrl?: string;
  featured: boolean;
  status: 'published' | 'draft';
  sortOrder: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  shortDescription: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  category: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
  updatedAt?: unknown;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientPosition: string;
  companyName: string;
  quote: string;
  clientImageUrl: string;
  published: boolean;
  sortOrder: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type EnquiryStatus = 'unread' | 'read' | 'completed';

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  company: string;
  serviceRequired: string;
  budget: string;
  timeline: string;
  description: string;
  status: EnquiryStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface SeoPageConfig {
  pageKey: string;
  title: string;
  description: string;
  keywords: string;
  ogImageUrl: string;
  updatedAt?: unknown;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  mimeType: string;
  dataUrl: string;
  category: string;
  uploadedBy: string;
  createdAt?: unknown;
}
