import React from 'react';
import { ActivePage } from '../types';
import { BRAND_INFO, CORE_VALUES } from '../data/content';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Brain, 
  Users, 
  Award, 
  Lightbulb,
  Target
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0 transition-colors duration-200">
      {/* 1. Header Hero */}
      <section className="bg-[#071426] dark:bg-[#030914] text-white py-18 lg:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              <span>About RtoC LABS</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Our Origins & Philosophy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white leading-tight">
              Every Great Solution Begins With a Reason to Create.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              RtoC LABS was founded on a simple conviction: young people in Kenya and across Africa should not merely be passive consumers of global technology. They have the talent, intellect, and creativity to design, build, and deploy the solutions their communities and industries need.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 space-y-4 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {BRAND_INFO.mission}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B1F3A] dark:bg-[#050D1A] text-white border border-slate-700 dark:border-slate-800 space-y-4 group hover:border-[#22D3EE]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/30 text-[#22D3EE] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Our Vision
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {BRAND_INFO.vision}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Brand Story */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-[#050D1A] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
                Our Story & Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                From Curiosity to Competence
              </h2>
              
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Millions of young Africans interact with digital devices daily. Yet a persistent gap remains between consuming media and knowing how to design and engineer practical technology.
                </p>
                <p>
                  <strong>RtoC LABS</strong> (<strong>Reason to Create</strong>) bridges this gap. We combine hands-on software development, responsible artificial intelligence, creative design, and financial literacy to transform natural curiosity into real, marketable competence.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('programs')}
                  className="px-6 py-3 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span>Explore Our Learning Pathways</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700 bg-[#071426] p-4">
                <img
                  src="/assets/aistudio/RtoC_Labs__Reason_to_Create_b6f2ad23.png"
                  alt="Official RtoC LABS Reason to Create Brand Identity"
                  className="w-full h-auto rounded-xl object-contain shadow-md"
                />
                <div className="p-4 pt-3 space-y-1 text-center">
                  <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wide">
                    Official Brand Identity
                  </span>
                  <p className="text-xs text-slate-300">
                    "Don't Just Use Technology. Learn to Create With It."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20 bg-white dark:bg-[#071426] border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mt-1">
              Our Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              These fundamental convictions guide our curriculum, our community culture, and our collaborative technology work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors space-y-2.5 group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    {val.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Responsible AI and Technology Commitment */}
      <section className="py-20 bg-[#071426] dark:bg-[#030914] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-[#22D3EE] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 animate-subtle-float" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-heading tracking-tight text-white">
              Our Commitment to Responsible AI & Ethical Tech
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Artificial intelligence offers unprecedented velocity for research, software development, and creative production. But with power comes responsibility. At RtoC LABS, every student is trained in:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
              <div className="p-4 rounded-xl bg-[#0B1F3A] dark:bg-[#071426] border border-slate-800 space-y-2 group hover:border-[#22D3EE]/40 transition-colors">
                <span className="text-xs font-bold text-[#22D3EE] block">Fact Verification</span>
                <p className="text-xs text-slate-400">
                  Checking every claim, number, and code snippet against primary source benchmarks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1F3A] dark:bg-[#071426] border border-slate-800 space-y-2 group hover:border-[#22D3EE]/40 transition-colors">
                <span className="text-xs font-bold text-[#22D3EE] block">Privacy & Security</span>
                <p className="text-xs text-slate-400">
                  Safeguarding personal data, proprietary information, and user confidentiality.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1F3A] dark:bg-[#071426] border border-slate-800 space-y-2 group hover:border-[#22D3EE]/40 transition-colors">
                <span className="text-xs font-bold text-[#22D3EE] block">Human Agency</span>
                <p className="text-xs text-slate-400">
                  Retaining critical thought, original perspective, and human-centered ethics in all solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Leadership & Ecosystem Structure */}
      <section className="py-20 bg-white dark:bg-[#071426] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider">
              Organization Structure
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mt-1">
              Leadership & Community Mentors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Our organization is driven by passionate practitioners, developers, and educators focused on youth digital enablement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                RtoC
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Program Directorate</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Curriculum & Academy Operations</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Guides learning syllabi, live Google Meet sessions, and project evaluation standards to ensure practical relevance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-[#0284C7] dark:text-cyan-400 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                TECH
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Technology & Labs Engineering</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Solutions & Prototyping</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Architects real-world software, database architectures, and hardware IoT experiments for clients and students.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 group hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/70 text-[#8B5CF6] dark:text-purple-300 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                STUDIO
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Creative & Media Studio</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Visual Design & Storytelling</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mentors students in video production suites, branding identities, and high-impact digital communication.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-lg text-xs font-semibold bg-[#0B1F3A] dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors cursor-pointer inline-flex items-center gap-2 group border border-slate-700"
            >
              <span>Connect with Our Team or Propose a Partnership</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
