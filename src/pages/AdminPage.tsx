import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  FolderKanban,
  Globe,
  LogOut,
  Mail,
  MessageSquareQuote,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  User,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useTheme } from '../context/ThemeContext';
import { AdminSettingsTab } from '../components/admin/AdminSettingsTab';
import { AdminProfileTab } from '../components/admin/AdminProfileTab';
import { AdminPortfolioTab } from '../components/admin/AdminPortfolioTab';
import { AdminServicesTab } from '../components/admin/AdminServicesTab';
import { AdminTestimonialsTab } from '../components/admin/AdminTestimonialsTab';
import { AdminEnquiriesTab } from '../components/admin/AdminEnquiriesTab';
import { AdminSeoTab } from '../components/admin/AdminSeoTab';

type AdminTab =
  | 'enquiries'
  | 'portfolio'
  | 'services'
  | 'profile'
  | 'testimonials'
  | 'settings'
  | 'seo';

export function AdminPage() {
  const { authReady, user, isAdmin, authError, signInAdmin, signOutAdmin, enquiries } = useCms();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>('portfolio');
  const [notice, setNotice] = useState<string | null>(null);

  const unreadCount = enquiries.filter((e) => e.status === 'unread').length;

  const notify = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => {
      setNotice((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
          Verifying Session...
        </p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-between p-6 md:p-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-extrabold tracking-tight">
            AKANDE OLALEKAN<span className="text-[#E31B23]">.</span>
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold tracking-[0.14em] uppercase text-white/70 hover:text-white"
          >
            Return to Site
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto bg-[#1A1A1A] border border-white/15 p-8 md:p-10 space-y-6 my-auto">
          <div className="w-11 h-11 bg-[#E31B23] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-2">
              Protected Route
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">
              Portfolio CMS Admin
            </h1>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Sign in with your verified administrator Google account to manage projects, services,
              profile media, testimonials, SEO metadata, and incoming enquiries.
            </p>
          </div>

          {authError && (
            <div className="p-4 bg-[#E31B23]/15 border border-[#E31B23] text-xs text-white leading-relaxed">
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={() => void signInAdmin()}
            className="w-full py-4 px-6 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
          >
            Sign In with Google
          </button>
        </div>

        <p className="text-xs text-white/40 text-center">
          Lekzy Graphics · Content Management System
        </p>
      </div>
    );
  }

  const tabs: Array<{ id: AdminTab; label: string; icon: React.ReactNode; badge?: number }> = [
    { id: 'portfolio', label: 'Portfolio', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & CV', icon: <User className="w-4 h-4" /> },
    {
      id: 'enquiries',
      label: 'Enquiries',
      icon: <Mail className="w-4 h-4" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Sharing', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#0D0D0D] text-[#111111] dark:text-[#F5F5F5] flex flex-col transition-colors duration-200">
      {/* Top Admin Bar */}
      <header className="bg-[#111111] dark:bg-[#080808] text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-[#E31B23] font-display text-xs font-extrabold flex items-center justify-center">
              AO
            </span>
            <span className="font-display text-sm font-bold tracking-[0.12em] uppercase">
              CMS Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-9 h-9 inline-flex items-center justify-center border border-white/20 text-white hover:border-[#E31B23] hover:text-[#E31B23] transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 hover:text-[#E31B23] transition-colors"
            >
              <span>View Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => void signOutAdmin()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-white/20 text-xs font-semibold uppercase hover:border-[#E31B23] hover:text-[#E31B23] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {notice && (
        <div className="bg-[#111111] text-white border-b border-[#E31B23]">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-xs font-medium">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="text-[#E31B23] font-semibold uppercase cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="bg-white dark:bg-[#171717] border border-black/10 dark:border-white/12 p-4 space-y-1 sticky top-24">
            <p className="px-3 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#777777] dark:text-[#999999] truncate">
              Signed in: {user.email}
            </p>
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3.5 py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#111111] dark:bg-[#E31B23] text-white'
                      : 'text-[#111111] dark:text-[#E5E5E5] hover:bg-[#F4F4F4] dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={active ? 'text-[#E31B23] dark:text-white' : 'text-[#777777] dark:text-[#999999]'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </span>
                  {tab.badge !== undefined && (
                    <span className="font-mono-num px-2 py-0.5 bg-[#E31B23] text-white text-[10px]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 min-w-0">
          {activeTab === 'portfolio' && <AdminPortfolioTab onNotify={notify} />}
          {activeTab === 'services' && <AdminServicesTab onNotify={notify} />}
          {activeTab === 'profile' && <AdminProfileTab onNotify={notify} />}
          {activeTab === 'enquiries' && <AdminEnquiriesTab onNotify={notify} />}
          {activeTab === 'testimonials' && <AdminTestimonialsTab onNotify={notify} />}
          {activeTab === 'settings' && <AdminSettingsTab onNotify={notify} />}
          {activeTab === 'seo' && <AdminSeoTab onNotify={notify} />}
        </main>
      </div>
    </div>
  );
}
