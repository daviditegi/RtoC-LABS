import React from 'react';
import { ActivePage, Program } from '../types';
import { BRAND_INFO, TRUST_PILLARS, PROGRAMS_DATA, PORTFOLIO_DATA, CONFERENCE_INFO } from '../data/content';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  Check, 
  ShieldCheck, 
  Monitor, 
  Calendar,
  ExternalLink,
  Cpu,
  Brain,
  Video,
  Code,
  Palette,
  Coins,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectProgram: (program: Program) => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProgram, onOpenQuote }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return Brain;
      case 'media': return Video;
      case 'software': return Code;
      case 'design': return Palette;
      case 'finance': return Coins;
      default: return Sparkles;
    }
  };

  const learningSteps = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Choose your pathway',
      desc: 'Select from AI, Web Development, Media, Visual Design, or Financial Literacy.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Learn',
      tagline: 'Live interactive classes',
      desc: 'Join scheduled Google Meet labs with real-time screen sharing and guidance.',
      icon: BookOpen,
    },
    {
      num: '03',
      title: 'Create',
      tagline: 'Build a real project',
      desc: 'Apply every lesson to an actual website, design suite, video, or data system.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Grow',
      tagline: 'Launch your portfolio',
      desc: 'Showcase verified project links to clients, employers, and collaborators.',
      icon: TrendingUp,
    },
  ];

  const whyPoints = [
    {
      title: 'Hands-On Projects',
      desc: 'No passive lectures. Every class ends with practical work you can build and test.',
    },
    {
      title: 'Responsible AI',
      desc: 'Use AI tools productively while developing independent, critical thinking.',
    },
    {
      title: 'Industry Standard Tools',
      desc: 'Train with Figma, VS Code, Git, GitHub, modern web frameworks, and media suites.',
    },
    {
      title: 'Freelance & Career Skills',
      desc: 'Learn how to package services, price client projects, and work remotely.',
    },
    {
      title: 'Supportive Community',
      desc: 'Collaborate with motivated young creators and developers across Africa.',
    },
    {
      title: 'Verifiable Progress',
      desc: 'Track every module completion and earn credentials backed by your code.',
    },
  ];

  // Selected top 4 showcase projects (including Forex!)
  const featuredShowcase = PORTFOLIO_DATA.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#071426] text-white pt-10 pb-18 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Clean Brand Kicker with R logo */}
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#22D3EE] uppercase tracking-wider bg-[#0B1F3A]/90 px-3 py-1.5 rounded-full border border-slate-700/80">
                <div className="w-5 h-5 rounded-md overflow-hidden bg-[#071426] p-0.5 border border-slate-700 flex items-center justify-center">
                  <img src="/assets/rtoc_r_logo.png" alt="R Logo" className="w-full h-full object-contain" />
                </div>
                <span>RtoC LABS</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-300">Reason to Create</span>
              </div>

              {/* Punchy Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white leading-[1.12] text-balance">
                YOUR FUTURE IS DIGITAL. YOUR IDEAS CAN CHANGE THE WORLD.
              </h1>

              {/* Clear, simple supporting copy */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Discover the skills, tools, and confidence to create with technology. Learn artificial intelligence, software engineering, digital media, and graphic design with RtoC LABS.
              </p>

              {/* Supporting tagline */}
              <p className="text-xs sm:text-sm font-semibold text-[#22D3EE] tracking-wide">
                Learn a skill. Build a project. Create your future.
              </p>

              {/* Direct CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onNavigate('programs')}
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-lg shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('register')}
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#0B1F3A] hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center cursor-pointer"
                >
                  Join November Cohort
                </button>
              </div>

              {/* Simple Guarantee Strip */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <span>Live Google Meet classes · Hands-on projects · Mentored peer labs</span>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-[#0B1F3A] group relative">
                <img
                  src="/src/assets/images/hero_african_youth_tech_lab_1793267882421.jpg"
                  alt="Young African technology learners collaborating in a modern tech studio"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-transparent to-transparent opacity-85" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#071426]/90 backdrop-blur-md border border-slate-700/70 text-xs">
                  <div className="flex items-center justify-between text-[#22D3EE] text-[11px] font-semibold mb-1">
                    <span>Collaborative Tech Studio</span>
                    <span>Live Cohorts</span>
                  </div>
                  <p className="text-white text-xs font-medium">
                    "Don't Just Use Technology. Learn to Create With It."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUE PILLARS (Clean, scannable strip) */}
      <section className="bg-white dark:bg-[#0B1F3A] border-y border-slate-200/80 dark:border-slate-800 py-6 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_PILLARS.map((pillar, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 transition-colors">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[11px] font-mono font-semibold text-[#2563EB] dark:text-[#22D3EE]">
                    0{i + 1}.
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-normal pl-5">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION: CREATE, DON'T JUST CONSUME */}
      <section className="py-16 lg:py-20 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
                Technology Is More Than a Tool. It's an Opportunity to Create.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Most young people spend hours consuming digital media. At RtoC LABS, we help you step behind the screen to become an active creator of websites, applications, visual brands, and intelligent solutions.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:underline underline-offset-4 cursor-pointer inline-flex items-center gap-1.5 group"
                >
                  <span>Learn about our mission & values</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  01
                </div>
                <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">Build Real Products</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  Code responsive websites, build relational databases, and design complete visual brands.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-[#0284C7] dark:text-cyan-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  02
                </div>
                <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">Responsible AI</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  Master prompt engineering and workflow automation with strict fact-checking and ethics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#8B5CF6] dark:text-purple-300 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  03
                </div>
                <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">Project Portfolio</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  Graduate with verified project links and case studies to demonstrate real competence.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. UPCOMING CONFERENCE HIGHLIGHT (Simple & Clear) */}
      <section className="bg-[#0B1F3A] text-white py-10 border-y border-[#2563EB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#22D3EE]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Next Session: 9 – 30 November 2026</span>
                <span aria-hidden="true">·</span>
                <span>Google Meet</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                RtoC LABS Digital Skills Conference 2026
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                3 weeks of intensive virtual classes across AI, Software, Design, and Storytelling. General fee: <strong className="text-white">KSh 3,000 / $25</strong>. (Specialized Forex track has a separate <strong className="text-amber-300">KSh 1,000 commitment fee</strong>).
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('register')}
                className="px-5 py-3 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md w-full sm:w-auto"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('programs')}
                className="px-4 py-3 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-[#071426] border border-slate-700 transition-colors text-center cursor-pointer"
              >
                View Syllabus
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FIVE LEARNING PATHWAYS (Clean & Scannable) */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#071426] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
                Digital Skills Academy
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mt-1">
                Five Major Learning Areas
              </h2>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:underline underline-offset-4 cursor-pointer inline-flex items-center gap-1 group"
            >
              <span>View full curriculum details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS_DATA.map((prog) => {
              const Icon = getCategoryIcon(prog.category);
              return (
                <div
                  key={prog.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] hover:border-[#2563EB]/50 dark:hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="relative h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={prog.image}
                        alt={prog.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="font-semibold text-cyan-300 text-[11px]">
                          {prog.feeLabel}
                        </span>
                        <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded">
                          {prog.duration}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white leading-snug">
                          {prog.name}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                        {prog.shortDescription}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {prog.topics.slice(0, 3).map((topic, idx) => (
                          <React.Fragment key={idx}>
                            <span>{topic.split(' ').slice(0, 2).join(' ')}</span>
                            {idx < 2 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => onSelectProgram(prog)}
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium cursor-pointer"
                    >
                      View Syllabus
                    </button>

                    <button
                      onClick={() => onNavigate('register')}
                      className="px-3.5 py-1.5 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all cursor-pointer flex items-center gap-1 group"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. HOW LEARNING WORKS (4 Simple Steps) */}
      <section className="py-16 lg:py-20 bg-[#071426] dark:bg-[#030914] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider">
              The Learning Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white">
              How You Learn at RtoC LABS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0B1F3A] dark:bg-[#071426] border border-slate-800 space-y-3 flex flex-col justify-between group hover:border-[#22D3EE]/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold font-mono text-slate-500">
                        {step.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 text-[#22D3EE] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <StepIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold font-heading text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#22D3EE] mt-0.5">
                        {step.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. WHY RtoC LABS (Simple Cards) */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#071426] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-xl mb-10">
            <span className="text-xs font-bold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
              Why Join Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mt-1">
              Built for Practical Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map((pt, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 space-y-2 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FEATURED REFERENCE BLUEPRINTS (Including Forex!) */}
      <section className="py-16 lg:py-20 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
                Innovation Showcase
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mt-1">
                Featured Reference Projects
              </h2>
            </div>

            <button
              onClick={() => onNavigate('portfolio')}
              className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:underline underline-offset-4 cursor-pointer inline-flex items-center gap-1 group"
            >
              <span>Explore all 10 portfolio references</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredShowcase.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider text-[11px]">
                      {item.categoryLabel}
                    </span>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {item.overview}
                  </p>

                  <div className="space-y-1 pt-1">
                    {item.keyHighlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[65%]">
                    {item.tools.slice(0, 3).map((tool, i) => (
                      <React.Fragment key={i}>
                        <span className="truncate">{tool}</span>
                        {i < Math.min(item.tools.length, 3) - 1 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0 group"
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="bg-[#071426] text-white py-16 lg:py-20 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider">
            Begin Your Creator Journey
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            YOUR TALENT IS YOUR STARTING POINT. YOUR SKILLS CAN TAKE YOU FURTHER.
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Take the next step toward becoming a creator, developer, designer, or digital professional with RtoC LABS.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <span>Register for Training</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-semibold bg-[#0B1F3A] hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
