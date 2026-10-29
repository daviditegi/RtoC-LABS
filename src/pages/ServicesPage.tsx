import React, { useState } from 'react';
import { ActivePage, ServiceItem } from '../types';
import { SERVICES_DATA, BRAND_INFO } from '../data/content';
import { 
  ArrowRight, 
  Globe, 
  Database, 
  Palette, 
  Video, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Calculator, 
  MessageCircle,
  Clock,
  ShieldAlert
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [selectedServiceForEstimator, setSelectedServiceForEstimator] = useState('Website Development');
  const [tier, setTier] = useState<'starter' | 'standard' | 'enterprise'>('standard');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Database': return Database;
      case 'Palette': return Palette;
      case 'Video': return Video;
      case 'Sparkles': return Sparkles;
      case 'Cpu': return Cpu;
      default: return Sparkles;
    }
  };

  // Scope Estimator matrix
  const estimatorEstimates = {
    'Website Development': {
      starter: { timeline: '1–2 Weeks', deliverables: 'Custom 1-3 page fast responsive landing/portfolio website with contact capture' },
      standard: { timeline: '2–4 Weeks', deliverables: 'Complete 5-8 page corporate website with CMS, SEO foundation, and mobile optimization' },
      enterprise: { timeline: '4–8 Weeks', deliverables: 'Full-scale custom web platform with multi-role portals, API integrations, and database' },
    },
    'Software & Database Solutions': {
      starter: { timeline: '2–3 Weeks', deliverables: 'Structured relational database schema and spreadsheet data migration script' },
      standard: { timeline: '3–5 Weeks', deliverables: 'Custom internal information portal with role-based records management' },
      enterprise: { timeline: '6–10 Weeks', deliverables: 'Enterprise operational ERP/inventory system with multi-endpoint integrations' },
    },
    'Graphic Design & Branding': {
      starter: { timeline: '5–7 Days', deliverables: 'Logo wordmark, core color palette, typography hierarchy, and social avatars' },
      standard: { timeline: '2 Weeks', deliverables: 'Full brand guidelines book, collateral templates, social carousel kit, and presentation deck' },
      enterprise: { timeline: '3–4 Weeks', deliverables: 'Comprehensive corporate visual rebrand across digital, print, packaging, and video assets' },
    },
    'Media & Digital Marketing': {
      starter: { timeline: 'Weekly / Bi-weekly', deliverables: '4 high-retention short-form video edits and multi-platform distribution assets' },
      standard: { timeline: 'Monthly Retainer', deliverables: 'Complete 30-day content calendar, 12 polished videos, and community management' },
      enterprise: { timeline: 'Quarterly Campaign', deliverables: 'End-to-end documentary storytelling campaign, ad creatives, and growth analysis' },
    },
    'AI Integration & Productivity': {
      starter: { timeline: '1 Week', deliverables: 'Team workflow audit and custom department prompt engineering guidelines' },
      standard: { timeline: '2–3 Weeks', deliverables: 'Semi-automated internal research and documentation pipelines with safety checks' },
      enterprise: { timeline: '4–6 Weeks', deliverables: 'Custom knowledge retrieval integration and company-wide responsible AI governance' },
    },
    'IoT & Technology Innovation': {
      starter: { timeline: '2–3 Weeks', deliverables: 'Hardware feasibility report, sensor selection, and breadboard prototype' },
      standard: { timeline: '4–6 Weeks', deliverables: 'Functional microcontroller node with LoRa/WiFi telemetry and basic cloud dashboard' },
      enterprise: { timeline: '8–12 Weeks', deliverables: 'Multi-node pilot deployment with solar power buffer and custom analytics portal' },
    },
  };

  const currentEstimate = 
    estimatorEstimates[selectedServiceForEstimator as keyof typeof estimatorEstimates]?.[tier] ||
    estimatorEstimates['Website Development'].standard;

  return (
    <div className="space-y-0">
      {/* 1. Header Hero */}
      <section className="bg-[#071426] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              RtoC Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Technology & Development Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We partner with businesses, schools, organizations, and entrepreneurs to design and build dependable websites, databases, visual branding, media campaigns, and AI productivity workflows.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-3 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
              >
                <span>Request a Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Project Scope Estimator */}
      <section className="py-12 bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <div className="flex items-center gap-2 mb-4 text-[#2563EB] dark:text-[#22D3EE]">
              <Calculator className="w-5 h-5 animate-subtle-float" />
              <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Interactive Project Scope & Timeline Estimator
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-4 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Select Service:</label>
                <select
                  value={selectedServiceForEstimator}
                  onChange={(e) => setSelectedServiceForEstimator(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071426] text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                >
                  <option value="Website Development" className="dark:bg-[#071426]">Website Development</option>
                  <option value="Software & Database Solutions" className="dark:bg-[#071426]">Software & Database Solutions</option>
                  <option value="Graphic Design & Branding" className="dark:bg-[#071426]">Graphic Design & Branding</option>
                  <option value="Media & Digital Marketing" className="dark:bg-[#071426]">Media & Digital Marketing</option>
                  <option value="AI Integration & Productivity" className="dark:bg-[#071426]">AI Integration & Productivity</option>
                  <option value="IoT & Technology Innovation" className="dark:bg-[#071426]">IoT & Technology Innovation</option>
                </select>
              </div>

              <div className="md:col-span-4 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Select Project Scale:</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg text-xs">
                  <button
                    onClick={() => setTier('starter')}
                    className={`py-1.5 px-2 rounded-md font-medium text-center transition-colors cursor-pointer ${
                      tier === 'starter' ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Starter
                  </button>
                  <button
                    onClick={() => setTier('standard')}
                    className={`py-1.5 px-2 rounded-md font-medium text-center transition-colors cursor-pointer ${
                      tier === 'standard' ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setTier('enterprise')}
                    className={`py-1.5 px-2 rounded-md font-medium text-center transition-colors cursor-pointer ${
                      tier === 'enterprise' ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-white dark:bg-[#071426] border border-slate-200/80 dark:border-slate-700/80 space-y-2 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Typical Timeline:</span>
                  <span className="font-bold text-[#2563EB] dark:text-[#22D3EE] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 animate-icon-pulse" />
                    {currentEstimate.timeline}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {currentEstimate.deliverables}
                </p>
                <button
                  onClick={() => onOpenQuote(selectedServiceForEstimator)}
                  className="w-full mt-2 py-1.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer text-center"
                >
                  Request Quote for this Scope
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Services Grid */}
      <section className="py-16 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((srv) => {
              const Icon = getServiceIcon(srv.iconName);
              return (
                <div
                  key={srv.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071426] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-lg dark:hover:border-slate-700 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>

                    <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      {srv.title}
                    </h2>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {srv.summary}
                    </p>

                    {/* Key Deliverables */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {srv.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal Client Profile */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Ideal For:
                      </span>
                      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {srv.idealClients.map((client, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                            <span>{client}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Service Footer Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Consultation tailored
                    </span>
                    <button
                      onClick={() => onOpenQuote(srv.title)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs group/btn"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Realistic Delivery Notice */}
          <div className="mt-12 p-4 rounded-xl bg-white dark:bg-[#071426] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3 transition-colors">
            <ShieldAlert className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE] shrink-0 mt-0.5 animate-icon-pulse" />
            <p className="leading-relaxed">
              <strong>Professional Scope Assurance:</strong> We only undertake projects where technical feasibility, schedule alignment, and clear client objectives are established. Quotations are structured with transparent deliverables and zero fabricated claims.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
