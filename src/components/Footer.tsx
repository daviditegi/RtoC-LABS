import React from 'react';
import { ActivePage } from '../types';
import { BRAND_INFO } from '../data/content';
import { MessageCircle, Mail, MapPin, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071426] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        
        {/* Brand Lockup & Value Statement */}
        <div className="pb-12 border-b border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#071426] p-0.5 border border-slate-700/80 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="/assets/rtoc_r_logo.png"
                  alt="RtoC LABS R Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight font-heading">
                  RtoC <span className="text-[#22D3EE]">LABS</span>
                </span>
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Reason to Create</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              "Don't Just Use Technology. Learn to Create With It."
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Empowering young people through AI innovation, technology development, digital media, and practical creative skills across Kenya and Africa.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-wrap gap-4 items-center justify-start lg:justify-end">
            <button
              onClick={() => handleNav('register')}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Register for Digital Skills Conference</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent('Hello RtoC LABS, I would like to inquire about your programs and services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#0B1F3A] hover:bg-slate-800 text-white border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>

        {/* 4 Multi-Column Directory */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-white transition-colors cursor-pointer">
                  Learning Programs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  Innovation Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-white transition-colors cursor-pointer">
                  Resources & Articles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tracker')} className="hover:text-white transition-colors cursor-pointer text-cyan-300">
                  Learning Progress Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                  Website Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                  Software & Databases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                  Graphic Design & Branding
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                  Media & Digital Marketing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                  AI Integration & Productivity
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('register')} className="hover:text-white transition-colors cursor-pointer text-cyan-300">
                  Register for Training
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                  Request a Quote
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Partnership Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5 pt-2">
                  <Lock className="w-3 h-3" />
                  <span>Admin Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {BRAND_INFO.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-white transition-colors">
                  {BRAND_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{BRAND_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Disclaimers & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {BRAND_INFO.currentYear} RtoC LABS — Reason to Create. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Use & Disclaimers
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
