import React, { useState, useMemo } from 'react';
import { ActivePage, Program, ProgramCategory } from '../types';
import { PROGRAMS_DATA, CONFERENCE_INFO } from '../data/content';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Monitor, 
  Calendar, 
  AlertCircle, 
  Coins, 
  Brain, 
  Video, 
  Code, 
  Palette,
  Sparkles,
  PlusCircle
} from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectProgram: (program: Program) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate, onSelectProgram }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFutureTracks, setShowFutureTracks] = useState(false);

  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter((prog) => {
      const matchesCategory = selectedCategory === 'all' || prog.category === selectedCategory;
      const matchesSearch = 
        prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: { key: ProgramCategory; label: string }[] = [
    { key: 'all', label: 'All Programs' },
    { key: 'ai', label: 'Artificial Intelligence' },
    { key: 'media', label: 'Media & Journalism' },
    { key: 'software', label: 'Software & Tech' },
    { key: 'design', label: 'Graphic Design' },
    { key: 'finance', label: 'Financial Literacy' },
  ];

  const futureOpportunities = [
    {
      title: 'Mobile App Engineering with React Native',
      category: 'Software Development',
      status: 'Upcoming Cohort',
      desc: 'Build cross-platform mobile apps for Android and iOS devices with offline persistence and push notifications.',
    },
    {
      title: 'AgriTech IoT Telemetry & Sensor Deployment',
      category: 'Hardware & IoT',
      status: 'Upcoming Cohort',
      desc: 'Hands-on hardware lab connecting environmental sensors and solar controllers to cloud monitoring dashboards.',
    },
    {
      title: 'Digital Freelance Business Accelerator',
      category: 'Digital Entrepreneurship',
      status: 'Upcoming Cohort',
      desc: 'Practical workshop on proposal pitching, client contract structuring, international wire invoicing, and portfolio branding.',
    },
  ];

  return (
    <div className="space-y-0 transition-colors duration-200">
      {/* 1. Header Banner */}
      <section className="bg-[#071426] dark:bg-[#030914] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              RtoC LABS Academy
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Programs & Digital Skills Pathways
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Equipping young Africans with practical digital skills, responsible AI knowledge, software development capabilities, creative media production, and sound financial literacy.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Conference Notice & Pricing Clarification */}
      <section className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-200/80 dark:border-blue-900 py-4 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-blue-900 dark:text-blue-200">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wide bg-[#2563EB] text-white px-2 py-0.5 rounded text-[10px]">
                Upcoming
              </span>
              <span>
                <strong>{CONFERENCE_INFO.title}:</strong> Nov 9 – Nov 30, 2026 via Google Meet. General Fee: <strong>KSh 3,000 / $25</strong>.
              </span>
            </div>
            <div className="text-[11px] text-blue-800 dark:text-blue-300">
              * Note: Specialized Forex education requires a separate <strong>KSh 1,000 commitment fee</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter & Search Bar */}
      <section className="py-6 bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800 sticky top-18 z-30 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics, skills, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 transition-colors"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. Programs Grid */}
      <section className="py-16 bg-[#F8FAFC] dark:bg-[#050D1A] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No programs match your search query.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Try adjusting your keywords or clearing the category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] underline underline-offset-2 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-0 group"
                >
                  {/* Left Media */}
                  <div className="lg:col-span-4 relative bg-slate-100 dark:bg-slate-800 min-h-[220px] lg:min-h-full overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                        {prog.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="uppercase tracking-wider font-semibold text-[#2563EB] dark:text-[#22D3EE]">
                            {prog.category.toUpperCase()}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {prog.duration}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Monitor className="w-3.5 h-3.5 text-slate-400" />
                            Google Meet
                          </span>
                        </div>

                        <div className="text-xs font-bold text-[#2563EB] dark:text-[#22D3EE] bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900">
                          {prog.feeLabel}
                        </div>
                      </div>

                      {/* Title & Short Description */}
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
                          {prog.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                          {prog.shortDescription}
                        </p>
                      </div>

                      {/* Important Forex Warning if Applicable */}
                      {prog.commitmentFeeNote && (
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">{prog.commitmentFeeNote}</span>
                            <span className="text-[11px] text-amber-800 dark:text-amber-300 italic block mt-0.5">
                              Forex trading involves real market risk. Education strictly focuses on risk discipline, psychology, and demo practice; no profits guaranteed.
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Topics Matrix */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                          Core Topics Covered:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                          {prog.topics.slice(0, 6).map((topic, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        onClick={() => onSelectProgram(prog)}
                        className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:underline inline-flex items-center gap-1 cursor-pointer group"
                      >
                        <span>View Full Syllabus & Outcomes</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => onNavigate('register')}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs group"
                        >
                          <span>Register Interest</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Future Learning Opportunities Expandable */}
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Future Opportunities & Specialized Tracks
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Upcoming bootcamps and advanced tracks in curriculum development.
                </p>
              </div>

              <button
                onClick={() => setShowFutureTracks(!showFutureTracks)}
                className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:underline flex items-center gap-1 cursor-pointer group"
              >
                <span>{showFutureTracks ? 'Hide Upcoming Tracks' : 'Show Upcoming Tracks'}</span>
                <PlusCircle className={`w-3.5 h-3.5 transition-transform duration-200 ${showFutureTracks ? 'rotate-45' : 'group-hover:rotate-90'}`} />
              </button>
            </div>

            {showFutureTracks && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {futureOpportunities.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-2 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{item.category}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">{item.status}</span>
                    </div>
                    <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
