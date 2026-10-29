import React, { useState } from 'react';
import { ActivePage } from '../types';
import { BRAND_INFO, CONFERENCE_INFO } from '../data/content';
import { Menu, X, ArrowRight, Sun, Moon, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activePage, 
  onNavigate, 
  theme, 
  onToggleTheme 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Programs', page: 'programs' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Resources', page: 'resources' },
    { label: 'Progress Tracker', page: 'tracker' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071426]/95 dark:bg-[#050D1A]/95 backdrop-blur-md border-b border-[#2563EB]/20 text-white transition-colors duration-200">
      {/* Top Notice Banner for Conference */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#2563EB] to-[#8B5CF6] text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold tracking-wide">Upcoming:</span>
            <span className="truncate">{CONFERENCE_INFO.title} · {CONFERENCE_INFO.dates}</span>
          </div>
          <button
            onClick={() => handleNavClick('register')}
            className="hidden sm:inline-flex items-center gap-1 text-cyan-300 hover:text-white transition-colors underline underline-offset-2 shrink-0 cursor-pointer group"
          >
            <span>Register Now (Google Meet)</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Top Bar: Zone 1 (Wordmark) - Zone 2 (Links) - Zone 3 (Action & Theme Toggle) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6 xl:gap-8">
        
        {/* Zone 1: Single-Element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group cursor-pointer shrink-0"
          aria-label="RtoC LABS Homepage"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#071426] p-0.5 border border-slate-700/80 shadow-md group-hover:border-[#22D3EE]/80 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0">
              <img
                src="/assets/rtoc_r_logo.png"
                alt="RtoC LABS R Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-white font-heading leading-tight whitespace-nowrap">
                RtoC <span className="text-[#22D3EE]">LABS</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Reason to Create
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Clean Single-Line Text Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-slate-300">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                activePage === item.page
                  ? 'text-[#22D3EE] font-semibold border-b-2 border-[#22D3EE]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions + Dark Mode Toggle + Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Accessible Dark/Light Mode Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="group relative p-2 rounded-xl text-slate-300 hover:text-white bg-[#0B1F3A]/80 hover:bg-[#0B1F3A] border border-slate-700/70 hover:border-[#22D3EE]/60 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            aria-label={theme === 'dark' ? 'Switch to light mode theme' : 'Switch to dark mode theme'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#22D3EE] group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('programs')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Programs</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleNavClick('register')}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-sm shadow-[#2563EB]/40 transition-all whitespace-nowrap cursor-pointer group"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0B1F3A] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071426] dark:bg-[#050D1A] border-b border-[#2563EB]/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          
          {/* Mobile Theme Switcher Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1F3A] border border-slate-700/80 text-xs">
            <span className="text-slate-300 font-medium">Theme Mode:</span>
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-white cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-cyan-300" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activePage === item.page
                    ? 'bg-[#2563EB]/20 text-[#22D3EE] font-semibold'
                    : 'text-slate-200 hover:bg-[#0B1F3A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#2563EB] text-white text-center flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Register for Training</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent('Hello RtoC LABS, I would like to learn more about your digital skills programs and services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-lg text-xs font-medium text-center text-slate-300 bg-[#0B1F3A] hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us: {BRAND_INFO.whatsappNumber}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
