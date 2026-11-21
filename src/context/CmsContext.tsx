import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_SEO_PAGES,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
} from '../data/defaultCmsData';
import {
  ADMIN_BOOTSTRAP_EMAIL,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
  testFirestoreConnection,
} from '../lib/firebase';
import type {
  Enquiry,
  EnquiryStatus,
  MediaAsset,
  ProfileData,
  Project,
  SeoPageConfig,
  ServiceItem,
  SiteSettings,
  Testimonial,
} from '../types/cms';

interface CmsContextValue {
  loading: boolean;
  authReady: boolean;
  user: User | null;
  isAdmin: boolean;
  authError: string | null;
  settings: SiteSettings;
  profile: ProfileData;
  projects: Project[];
  publishedProjects: Project[];
  services: ServiceItem[];
  publishedServices: ServiceItem[];
  testimonials: Testimonial[];
  publishedTestimonials: Testimonial[];
  enquiries: Enquiry[];
  seoPages: Record<string, SeoPageConfig>;
  mediaMap: Record<string, MediaAsset>;
  resolveMediaUrl: (url?: string) => string;
  signInAdmin: () => Promise<void>;
  signOutAdmin: () => Promise<void>;
  saveSettings: (next: SiteSettings) => Promise<void>;
  saveProfile: (next: ProfileData) => Promise<void>;
  saveProject: (project: Project, isNew?: boolean) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  saveTestimonial: (testimonial: Testimonial, isNew?: boolean) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  submitEnquiry: (
    payload: Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  saveSeoPage: (seo: SeoPageConfig) => Promise<void>;
  seedInitialCmsData: () => Promise<void>;
}

const CmsContext = createContext<CmsContextValue | null>(null);

const FONT_FAMILIES: Record<string, string> = {
  Sora: "'Sora', 'Manrope', sans-serif",
  Manrope: "'Manrope', 'Plus Jakarta Sans', sans-serif",
  Outfit: "'Outfit', 'Manrope', sans-serif",
  'Plus Jakarta Sans': "'Plus Jakarta Sans', 'Manrope', sans-serif",
  'DM Sans': "'DM Sans', 'Manrope', sans-serif",
};

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [seoPages, setSeoPages] = useState<Record<string, SeoPageConfig>>(DEFAULT_SEO_PAGES);
  const [mediaMap, setMediaMap] = useState<Record<string, MediaAsset>>({});

  useEffect(() => {
    void testFirestoreConnection();
  }, []);

  // Apply dynamic CMS branding tokens
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-red', settings.primaryColor || '#E31B23');
    root.style.setProperty('--brand-black', settings.blackColor || '#111111');
    root.style.setProperty('--brand-white', settings.whiteColor || '#FFFFFF');
    root.style.setProperty(
      '--font-heading',
      FONT_FAMILIES[settings.headingFont] || FONT_FAMILIES.Sora
    );
    root.style.setProperty(
      '--font-body',
      FONT_FAMILIES[settings.bodyFont] || FONT_FAMILIES.Manrope
    );
  }, [settings]);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthError(null);
      if (!nextUser) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }

      if (
        nextUser.email === ADMIN_BOOTSTRAP_EMAIL &&
        nextUser.emailVerified
      ) {
        setIsAdmin(true);
        setAuthReady(true);
        return;
      }

      try {
        const adminSnap = await getDoc(doc(db, 'admins', nextUser.uid));
        setIsAdmin(adminSnap.exists() && nextUser.emailVerified);
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthReady(true);
      }
    });
    return () => unsub();
  }, []);

  // Seed initial CMS data automatically when admin signs in if database is empty
  const seedInitialCmsData = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const settingsRef = doc(db, 'settings', 'site');
      const settingsSnap = await getDoc(settingsRef);
      if (!settingsSnap.exists()) {
        await setDoc(settingsRef, {
          ...DEFAULT_SITE_SETTINGS,
          updatedAt: serverTimestamp(),
        });
      } else {
        const currentSettings = settingsSnap.data() as SiteSettings;
        const needsLocationMigration =
          currentSettings.heroLocationText === 'Based in Ibadan, Nigeria.';
        const needsWhatsappBackfill = !currentSettings.whatsappNumber;
        if (needsLocationMigration || needsWhatsappBackfill) {
          await setDoc(settingsRef, {
            ...DEFAULT_SITE_SETTINGS,
            ...currentSettings,
            heroLocationText: needsLocationMigration
              ? 'Based in Lagos, Nigeria.'
              : currentSettings.heroLocationText,
            whatsappNumber: needsWhatsappBackfill
              ? DEFAULT_SITE_SETTINGS.whatsappNumber
              : currentSettings.whatsappNumber,
            updatedAt: serverTimestamp(),
          });
        }
      }

      const profileRef = doc(db, 'profile', 'main');
      const profileSnap = await getDoc(profileRef);
      if (!profileSnap.exists()) {
        await setDoc(profileRef, {
          ...DEFAULT_PROFILE,
          updatedAt: serverTimestamp(),
        });
      } else {
        const currentProfile = profileSnap.data() as ProfileData;
        const needsLocationUpdate = currentProfile.location === 'Ibadan, Oyo State, Nigeria';
        const needsPortraitUpdate = !currentProfile.portraitUrl;
        if (needsLocationUpdate || needsPortraitUpdate) {
          await setDoc(profileRef, {
            ...DEFAULT_PROFILE,
            ...currentProfile,
            location: needsLocationUpdate ? 'Lagos, Nigeria' : currentProfile.location,
            portraitUrl: needsPortraitUpdate
              ? DEFAULT_PROFILE.portraitUrl
              : currentProfile.portraitUrl,
            updatedAt: serverTimestamp(),
          });
        }
      }

      const servicesSnap = await getDocs(collection(db, 'services'));
      if (servicesSnap.empty) {
        for (const item of DEFAULT_SERVICES) {
          const { id, ...rest } = item;
          await setDoc(doc(db, 'services', id), {
            ...rest,
            updatedAt: serverTimestamp(),
          });
        }
      }

      const projectsSnap = await getDocs(collection(db, 'projects'));
      if (projectsSnap.empty) {
        for (const proj of DEFAULT_PROJECTS) {
          const { id, ...rest } = proj;
          await setDoc(doc(db, 'projects', id), {
            ...rest,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } else {
        const existingMap = new Map(
          projectsSnap.docs.map((d) => [d.id, d.data() as Omit<Project, 'id'>])
        );
        for (const proj of DEFAULT_PROJECTS) {
          let wasDeleted = false;
          try {
            wasDeleted = localStorage.getItem(`lekzy_deleted_project_${proj.id}`) === '1';
          } catch {
            wasDeleted = false;
          }
          const existingDoc = existingMap.get(proj.id);
          if (!existingDoc && !wasDeleted) {
            const { id, ...rest } = proj;
            await setDoc(doc(db, 'projects', id), {
              ...rest,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } else if (
            existingDoc &&
            ((!existingDoc.liveUrl && proj.liveUrl) ||
              (!existingDoc.coverImageUrl && proj.coverImageUrl))
          ) {
            await updateDoc(doc(db, 'projects', proj.id), {
              liveUrl: existingDoc.liveUrl || proj.liveUrl,
              coverImageUrl: existingDoc.coverImageUrl || proj.coverImageUrl,
              updatedAt: serverTimestamp(),
            });
          }
        }
      }

      const seoSnap = await getDocs(collection(db, 'seo'));
      if (seoSnap.empty) {
        for (const [key, val] of Object.entries(DEFAULT_SEO_PAGES)) {
          await setDoc(doc(db, 'seo', key), {
            ...val,
            updatedAt: serverTimestamp(),
          });
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'cms-seed');
    }
  }, []);

  useEffect(() => {
    if (authReady && isAdmin) {
      void seedInitialCmsData();
    }
  }, [authReady, isAdmin, seedInitialCmsData]);

  // Subscribe to public collections (and admin collections when isAdmin)
  useEffect(() => {
    if (!authReady) return;

    const unsubs: Array<() => void> = [];

    unsubs.push(
      onSnapshot(
        doc(db, 'settings', 'site'),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as SiteSettings;
            setSettings({
              ...DEFAULT_SITE_SETTINGS,
              ...data,
              heroLocationText:
                data.heroLocationText === 'Based in Ibadan, Nigeria.'
                  ? 'Based in Lagos, Nigeria.'
                  : data.heroLocationText || DEFAULT_SITE_SETTINGS.heroLocationText,
              whatsappNumber:
                data.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber,
            });
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          handleFirestoreError(error, OperationType.GET, 'settings/site');
        }
      )
    );

    unsubs.push(
      onSnapshot(
        doc(db, 'profile', 'main'),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as ProfileData;
            setProfile({
              ...DEFAULT_PROFILE,
              ...data,
              location:
                data.location === 'Ibadan, Oyo State, Nigeria'
                  ? 'Lagos, Nigeria'
                  : data.location || DEFAULT_PROFILE.location,
              portraitUrl: data.portraitUrl || DEFAULT_PROFILE.portraitUrl,
            });
          }
        },
        (error) => handleFirestoreError(error, OperationType.GET, 'profile/main')
      )
    );

    const projectsRef = isAdmin
      ? collection(db, 'projects')
      : query(collection(db, 'projects'), where('status', '==', 'published'));

    const NEW_PORTFOLIO_V2_IDS = new Set([
      'atr-tourism',
      'zillion-royalty',
      'new-ace-properties',
      'bulkhead-global',
      'nelacon',
      'goshen-support',
      'lekzy-graphics-social',
    ]);

    unsubs.push(
      onSnapshot(
        projectsRef,
        (snap) => {
          if (!snap.empty) {
            const defaultById = new Map(DEFAULT_PROJECTS.map((p) => [p.id, p]));
            const fromDb: Project[] = snap.docs.map((d) => {
              const raw = d.data() as Omit<Project, 'id'>;
              const fallback = defaultById.get(d.id);
              return {
                ...raw,
                id: d.id,
                liveUrl: raw.liveUrl || fallback?.liveUrl || '',
                coverImageUrl: raw.coverImageUrl || fallback?.coverImageUrl || '',
              };
            });

            const existingIds = new Set(fromDb.map((p) => p.id));
            const extraV2 = DEFAULT_PROJECTS.filter((p) => {
              if (!NEW_PORTFOLIO_V2_IDS.has(p.id) || existingIds.has(p.id)) return false;
              try {
                if (localStorage.getItem(`lekzy_deleted_project_${p.id}`) === '1') return false;
              } catch {
                // ignore storage read errors
              }
              return isAdmin || p.status === 'published';
            });

            const combined = [...fromDb, ...extraV2].sort(
              (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
            );
            setProjects(combined);
          } else if (isAdmin) {
            setProjects([]);
          }
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'projects')
      )
    );

    const servicesRef = isAdmin
      ? collection(db, 'services')
      : query(collection(db, 'services'), where('published', '==', true));

    unsubs.push(
      onSnapshot(
        servicesRef,
        (snap) => {
          if (!snap.empty) {
            const list = snap.docs
              .map((d) => ({ ...(d.data() as Omit<ServiceItem, 'id'>), id: d.id }))
              .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
            setServices(list);
          } else if (isAdmin) {
            setServices([]);
          }
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'services')
      )
    );

    const testimonialsRef = isAdmin
      ? collection(db, 'testimonials')
      : query(collection(db, 'testimonials'), where('published', '==', true));

    unsubs.push(
      onSnapshot(
        testimonialsRef,
        (snap) => {
          const list = snap.docs
            .map((d) => ({ ...(d.data() as Omit<Testimonial, 'id'>), id: d.id }))
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
          setTestimonials(list);
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'testimonials')
      )
    );

    unsubs.push(
      onSnapshot(
        collection(db, 'seo'),
        (snap) => {
          if (!snap.empty) {
            const map: Record<string, SeoPageConfig> = { ...DEFAULT_SEO_PAGES };
            snap.docs.forEach((d) => {
              map[d.id] = d.data() as SeoPageConfig;
            });
            setSeoPages(map);
          }
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'seo')
      )
    );

    unsubs.push(
      onSnapshot(
        collection(db, 'media'),
        (snap) => {
          const nextMap: Record<string, MediaAsset> = {};
          snap.docs.forEach((d) => {
            nextMap[d.id] = { ...(d.data() as Omit<MediaAsset, 'id'>), id: d.id };
          });
          setMediaMap(nextMap);
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'media')
      )
    );

    if (isAdmin) {
      unsubs.push(
        onSnapshot(
          collection(db, 'enquiries'),
          (snap) => {
            const list = snap.docs
              .map((d) => ({ ...(d.data() as Omit<Enquiry, 'id'>), id: d.id }))
              .sort((a, b) => {
                const ta = (a.createdAt as { seconds?: number } | undefined)?.seconds ?? 0;
                const tb = (b.createdAt as { seconds?: number } | undefined)?.seconds ?? 0;
                return tb - ta;
              });
            setEnquiries(list);
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'enquiries')
        )
      );
    } else {
      setEnquiries([]);
    }

    return () => {
      unsubs.forEach((fn) => fn());
    };
  }, [authReady, isAdmin]);

  const resolveMediaUrl = useCallback(
    (url?: string): string => {
      if (!url) return '';
      if (url.startsWith('media://')) {
        const id = url.slice('media://'.length);
        return mediaMap[id]?.dataUrl || '';
      }
      if (url.startsWith('/assets/')) {
        const base = import.meta.env.BASE_URL || '/';
        const normalizedBase = base.endsWith('/') ? base : `${base}/`;
        return `${normalizedBase}${url.slice(1)}`;
      }
      return url;
    },
    [mediaMap]
  );

  const signInAdmin = useCallback(async () => {
    setAuthError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const signedEmail = cred.user.email;
      const isBootstrap =
        signedEmail === ADMIN_BOOTSTRAP_EMAIL && cred.user.emailVerified;
      if (!isBootstrap) {
        const adminSnap = await getDoc(doc(db, 'admins', cred.user.uid));
        if (!adminSnap.exists()) {
          await signOut(auth);
          setAuthError(
            `Access restricted. Signed in account (${signedEmail || 'unknown'}) is not authorised as CMS administrator.`
          );
          return;
        }
      }
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : 'Unable to complete Google sign-in.'
      );
    }
  }, []);

  const signOutAdmin = useCallback(async () => {
    await signOut(auth);
  }, []);

  const saveSettings = useCallback(async (next: SiteSettings) => {
    try {
      await setDoc(doc(db, 'settings', 'site'), {
        ...next,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/site');
    }
  }, []);

  const saveProfile = useCallback(async (next: ProfileData) => {
    try {
      await setDoc(doc(db, 'profile', 'main'), {
        ...next,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'profile/main');
    }
  }, []);

  const saveProject = useCallback(async (project: Project, isNew = false) => {
    const id = project.id || project.slug;
    const path = `projects/${id}`;
    try {
      const { id: _ignore, createdAt, updatedAt: _u, ...rest } = project;
      if (isNew) {
        await setDoc(doc(db, 'projects', id), {
          ...rest,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(doc(db, 'projects', id), {
          ...rest,
          createdAt: createdAt || serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      try {
        localStorage.setItem(`lekzy_deleted_project_${id}`, '1');
      } catch {
        // ignore storage errors
      }
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  }, []);

  const saveService = useCallback(async (service: ServiceItem) => {
    const id = service.id;
    try {
      const { id: _ignore, updatedAt: _u, ...rest } = service;
      await setDoc(doc(db, 'services', id), {
        ...rest,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `services/${id}`);
    }
  }, []);

  const deleteService = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  }, []);

  const saveTestimonial = useCallback(async (testimonial: Testimonial, isNew = false) => {
    const id = testimonial.id || `testimonial_${Date.now()}`;
    try {
      const { id: _ignore, createdAt, updatedAt: _u, ...rest } = testimonial;
      await setDoc(doc(db, 'testimonials', id), {
        ...rest,
        createdAt: isNew ? serverTimestamp() : createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `testimonials/${id}`);
    }
  }, []);

  const deleteTestimonial = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
    }
  }, []);

  const submitEnquiry = useCallback(
    async (payload: Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
      const enquiryId = `enq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      try {
        await setDoc(doc(db, 'enquiries', enquiryId), {
          fullName: payload.fullName.trim(),
          email: payload.email.trim(),
          company: (payload.company || '').trim(),
          serviceRequired: payload.serviceRequired,
          budget: payload.budget,
          timeline: payload.timeline,
          description: payload.description.trim(),
          status: 'unread',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `enquiries/${enquiryId}`);
      }
    },
    []
  );

  const updateEnquiryStatus = useCallback(async (id: string, status: EnquiryStatus) => {
    try {
      await updateDoc(doc(db, 'enquiries', id), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `enquiries/${id}`);
    }
  }, []);

  const deleteEnquiry = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `enquiries/${id}`);
    }
  }, []);

  const saveSeoPage = useCallback(async (seo: SeoPageConfig) => {
    try {
      await setDoc(doc(db, 'seo', seo.pageKey), {
        ...seo,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `seo/${seo.pageKey}`);
    }
  }, []);

  const publishedProjects = useMemo(
    () => projects.filter((p) => p.status === 'published'),
    [projects]
  );

  const publishedServices = useMemo(
    () => services.filter((s) => s.published),
    [services]
  );

  const publishedTestimonials = useMemo(
    () => testimonials.filter((t) => t.published),
    [testimonials]
  );

  const value: CmsContextValue = {
    loading,
    authReady,
    user,
    isAdmin,
    authError,
    settings,
    profile,
    projects,
    publishedProjects,
    services,
    publishedServices,
    testimonials,
    publishedTestimonials,
    enquiries,
    seoPages,
    mediaMap,
    resolveMediaUrl,
    signInAdmin,
    signOutAdmin,
    saveSettings,
    saveProfile,
    saveProject,
    deleteProject,
    saveService,
    deleteService,
    saveTestimonial,
    deleteTestimonial,
    submitEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    saveSeoPage,
    seedInitialCmsData,
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within a CmsProvider.');
  }
  return ctx;
}
