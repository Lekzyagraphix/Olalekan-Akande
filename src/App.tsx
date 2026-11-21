import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CmsProvider } from './context/CmsContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ProcessPage } from './pages/ProcessPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0D0D0D] text-[#111111] dark:text-[#F5F5F5] transition-colors duration-200">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <CmsProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />
            <Route
              path="/services"
              element={
                <PublicLayout>
                  <ServicesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/portfolio"
              element={
                <PublicLayout>
                  <PortfolioPage />
                </PublicLayout>
              }
            />
            <Route
              path="/portfolio/:slug"
              element={
                <PublicLayout>
                  <CaseStudyPage />
                </PublicLayout>
              }
            />
            <Route
              path="/process"
              element={
                <PublicLayout>
                  <ProcessPage />
                </PublicLayout>
              }
            />
            <Route
              path="/experience"
              element={
                <PublicLayout>
                  <ExperiencePage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PublicLayout>
                  <PrivacyPolicyPage />
                </PublicLayout>
              }
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="*"
              element={
                <PublicLayout>
                  <NotFoundPage />
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </CmsProvider>
    </ErrorBoundary>
  </ThemeProvider>
  );
}
