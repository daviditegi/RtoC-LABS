/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, Program, ResourceArticle } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ProgramModal } from './components/ProgramModal';
import { QuoteModal } from './components/QuoteModal';
import { ArticleModal } from './components/ArticleModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProgressTrackerPage } from './pages/ProgressTrackerPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProgramForModal, setSelectedProgramForModal] = useState<Program | null>(null);
  const [preselectedProgramIdForRegister, setPreselectedProgramIdForRegister] = useState<string | undefined>(undefined);
  const [trackerRegId, setTrackerRegId] = useState<string | undefined>(undefined);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState('Website Development');
  const [activeArticleForModal, setActiveArticleForModal] = useState<ResourceArticle | null>(null);

  // Dark mode theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('rtoc_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Synchronize 'dark' class on HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('rtoc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync scroll on page transition
  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProgram = (program: Program) => {
    setSelectedProgramForModal(program);
  };

  const handleRegisterFromProgram = (programId: string) => {
    setPreselectedProgramIdForRegister(programId);
    setActivePage('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTracker = (regId?: string) => {
    if (regId) setTrackerRegId(regId);
    setActivePage('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceTitle?: string) => {
    if (serviceTitle) setQuoteServicePrefill(serviceTitle);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#050D1A] text-[#071426] dark:text-[#F8FAFC] selection:bg-[#2563EB]/20 selection:text-[#0B1F3A] transition-colors duration-200">
      {/* Top Navigation with Theme Toggle */}
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProgram={handleSelectProgram}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {activePage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onSelectProgram={handleSelectProgram}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {activePage === 'resources' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onSelectArticle={(article) => setActiveArticleForModal(article)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {activePage === 'register' && (
          <RegisterPage
            onNavigate={handleNavigate}
            preselectedProgramId={preselectedProgramIdForRegister}
            onOpenTracker={handleOpenTracker}
          />
        )}

        {activePage === 'tracker' && (
          <ProgressTrackerPage
            onNavigate={handleNavigate}
            initialRegId={trackerRegId}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
            onOpenTracker={handleOpenTracker}
          />
        )}

        {activePage === 'privacy' && (
          <LegalPage initialTab="privacy" onNavigate={handleNavigate} />
        )}

        {activePage === 'terms' && (
          <LegalPage initialTab="terms" onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppFloat />

      {/* Interactive Modals */}
      <ProgramModal
        program={selectedProgramForModal}
        onClose={() => setSelectedProgramForModal(null)}
        onRegister={handleRegisterFromProgram}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={quoteServicePrefill}
      />

      <ArticleModal
        article={activeArticleForModal}
        onClose={() => setActiveArticleForModal(null)}
      />
    </div>
  );
}
