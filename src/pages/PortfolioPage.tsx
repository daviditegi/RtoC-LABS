import React, { useState, useMemo } from 'react';
import { ActivePage, PortfolioCategory, PortfolioItem } from '../types';
import { PORTFOLIO_DATA, BRAND_INFO } from '../data/content';
import { 
  Check, 
  Filter, 
  ExternalLink, 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Calculator,
  Eye,
  Sparkles
} from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [selectedFilter, setSelectedFilter] = useState<PortfolioCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioItem | null>(null);

  // Interactive Forex Calculator State
  const [calcBalance, setCalcBalance] = useState<number>(1000);
  const [calcCurrency, setCalcCurrency] = useState<'USD' | 'KES'>('USD');
  const [calcRiskPct, setCalcRiskPct] = useState<number>(1);
  const [calcStopLossPips, setCalcStopLossPips] = useState<number>(25);
  const [calcPair, setCalcPair] = useState<string>('EUR/USD');

  // Forex Math
  const conversionRate = 130; // KES per USD approx
  const effectiveBalanceUSD = calcCurrency === 'USD' ? calcBalance : calcBalance / conversionRate;
  const riskAmountUSD = (effectiveBalanceUSD * calcRiskPct) / 100;
  const riskAmountKES = riskAmountUSD * conversionRate;
  
  // Standard lot pip value approx $10 per pip on EUR/USD
  const pipValuePerStandardLot = 10;
  const calculatedLotSize = calcStopLossPips > 0 
    ? Math.max(0.01, Math.round((riskAmountUSD / (calcStopLossPips * pipValuePerStandardLot)) * 100) / 100)
    : 0.01;
  const projectedReward1to2USD = riskAmountUSD * 2;
  const projectedReward1to2KES = riskAmountKES * 2;

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return PORTFOLIO_DATA;
    return PORTFOLIO_DATA.filter((p) => p.category === selectedFilter);
  }, [selectedFilter]);

  const categories: { key: PortfolioCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Projects', count: PORTFOLIO_DATA.length },
    { key: 'finance', label: 'Forex & Financial Education', count: PORTFOLIO_DATA.filter(p => p.category === 'finance').length },
    { key: 'software', label: 'Software & Databases', count: PORTFOLIO_DATA.filter(p => p.category === 'software').length },
    { key: 'ai', label: 'AI Innovation', count: PORTFOLIO_DATA.filter(p => p.category === 'ai').length },
    { key: 'web', label: 'Web & E-Commerce', count: PORTFOLIO_DATA.filter(p => p.category === 'web').length },
    { key: 'design', label: 'Graphic Design & Branding', count: PORTFOLIO_DATA.filter(p => p.category === 'design').length },
    { key: 'media', label: 'Digital Media', count: PORTFOLIO_DATA.filter(p => p.category === 'media').length },
    { key: 'iot', label: 'IoT & Hardware', count: PORTFOLIO_DATA.filter(p => p.category === 'iot').length },
  ];

  return (
    <div className="space-y-0">
      {/* 1. Header Banner */}
      <section className="bg-[#071426] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-md overflow-hidden bg-slate-900 border border-slate-700/60 inline-flex items-center justify-center p-0.5">
                <img src="/assets/rtoc_r_logo.png" alt="R Logo" className="w-full h-full object-contain" />
              </span>
              <span>RtoC LABS Reference Portfolio</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">10 Comprehensive Case Studies</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Projects, Blueprints & Creations
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore reference architecture blueprints, financial market risk calculators, full-stack software systems, AI pipelines, and digital media productions built across RtoC LABS.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Forex Position Sizing & Psychology References</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                <span>100% Verifiable Reference Blueprints</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Navigation */}
      <section className="py-5 bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800 sticky top-18 z-30 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedFilter(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedFilter === cat.key
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedFilter === cat.key ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Portfolio Grid */}
      <section className="py-16 bg-[#F8FAFC] dark:bg-[#050D1A] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Media Image */}
                <div className="relative h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                      {item.status}
                    </span>
                    {item.category === 'finance' && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                        <Coins className="w-3 h-3" />
                        Forex Ref
                      </span>
                    )}
                  </div>

                  {/* Title lockup on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wide">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold font-heading text-white mt-0.5 line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.overview}
                    </p>

                    {item.problemStatement && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        <span className="font-semibold text-slate-900 dark:text-white block text-[11px] uppercase tracking-wide">
                          Problem Addressed:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 line-clamp-2">{item.problemStatement}</p>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Architecture Highlights:
                      </span>
                      {item.keyHighlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[65%]">
                      {item.tools.slice(0, 3).map((tool, i) => (
                        <React.Fragment key={i}>
                          <span className="truncate">{tool}</span>
                          {i < Math.min(item.tools.length, 3) - 1 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveModalProject(item)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs shrink-0 group"
                    >
                      <span>Blueprint</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Classification Explanation */}
          <div className="mt-16 p-6 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300 transition-colors">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE]" />
              <span>RtoC LABS Reference Portfolio Integrity Standard</span>
            </h4>
            <p className="leading-relaxed">
              Every project above serves as an educational blueprint or operational software architecture created within RtoC LABS. In our Forex & Financial Literacy tracks, all reference tools (RiskGuard FX, MarketPulse FX, TradeJournal Pro) are designed strictly around capital protection, simulated demo accounts, and risk-to-reward mathematics.
            </p>
          </div>

        </div>
      </section>

      {/* Blueprint Detail & Live Demo Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div 
            className="relative bg-white dark:bg-[#0B1F3A] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#071426] p-6 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#22D3EE] uppercase tracking-wide font-semibold">
                  <span>{activeModalProject.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white bg-slate-800 px-2 py-0.5 rounded text-[10px]">{activeModalProject.status}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hover:rotate-90 duration-200"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                  Project Overview & Utility
                </h4>
                <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {activeModalProject.overview}
                </p>
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeModalProject.problemStatement && (
                  <div className="p-4 rounded-xl bg-red-50/70 dark:bg-red-950/40 border border-red-100 dark:border-red-900 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wide text-red-900 dark:text-red-200 block">
                      The Challenge / Problem
                    </span>
                    <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed">
                      {activeModalProject.problemStatement}
                    </p>
                  </div>
                )}

                {activeModalProject.solutionArchitecture && (
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wide text-blue-900 dark:text-blue-200 block">
                      Engineering Solution
                    </span>
                    <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                      {activeModalProject.solutionArchitecture}
                    </p>
                  </div>
                )}
              </div>

              {/* INTERACTIVE FOREX RISK CALCULATOR DEMO (When viewing RiskGuard FX) */}
              {activeModalProject.interactiveDemoType === 'forex-calculator' && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-700 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-400" />
                      <h5 className="font-bold font-heading text-sm text-white">
                        Live Interactive Risk Calculator Simulator
                      </h5>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      1% Risk Discipline Standard
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">
                        Account Balance:
                      </label>
                      <div className="flex rounded-lg overflow-hidden border border-slate-700">
                        <select
                          value={calcCurrency}
                          onChange={(e) => setCalcCurrency(e.target.value as any)}
                          className="bg-slate-800 text-white px-2 py-1.5 text-xs focus:outline-none"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="KES">KES (KSh)</option>
                        </select>
                        <input
                          type="number"
                          value={calcBalance}
                          onChange={(e) => setCalcBalance(Math.max(10, Number(e.target.value)))}
                          className="w-full bg-slate-950 px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">
                        Currency Pair:
                      </label>
                      <select
                        value={calcPair}
                        onChange={(e) => setCalcPair(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                      >
                        <option value="EUR/USD">EUR/USD</option>
                        <option value="GBP/USD">GBP/USD</option>
                        <option value="USD/JPY">USD/JPY</option>
                        <option value="XAU/USD">XAU/USD (Gold)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">
                        Risk Limit (% of Equity):
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[1, 2, 3].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setCalcRiskPct(pct)}
                            className={`py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                              calcRiskPct === pct
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">
                        Stop-Loss Distance (Pips):
                      </label>
                      <input
                        type="number"
                        value={calcStopLossPips}
                        onChange={(e) => setCalcStopLossPips(Math.max(5, Number(e.target.value)))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Calculated Outputs */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Max Permitted Risk</span>
                      <span className="text-red-400 font-bold font-mono text-sm">
                        ${riskAmountUSD.toFixed(2)} / KSh {Math.round(riskAmountKES).toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Safe Position Sizing</span>
                      <span className="text-[#22D3EE] font-extrabold font-mono text-sm">
                        {calculatedLotSize} Lots
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Target Reward (1:2 R:R)</span>
                      <span className="text-emerald-400 font-bold font-mono text-sm">
                        +${projectedReward1to2USD.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    Educational simulator demonstration. Enforces position sizing discipline taught in the RtoC LABS Financial Literacy & Forex track.
                  </p>
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Technical Specifications & Architecture
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeModalProject.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Tools & Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {activeModalProject.metricsOrResults && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                  <strong>Outcome / Validation Benchmark:</strong> {activeModalProject.metricsOrResults}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-slate-50 dark:bg-[#071426] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Interested in building a similar technical solution?
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeModalProject.title;
                    setActiveModalProject(null);
                    onOpenQuote(title);
                  }}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer"
                >
                  Request Technical Blueprint Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
