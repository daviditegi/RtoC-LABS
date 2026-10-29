import React, { useState } from 'react';
import { ActivePage } from '../types';
import { BRAND_INFO, CONFERENCE_INFO } from '../data/content';
import { ShieldCheck, AlertCircle, FileText, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms';
  onNavigate: (page: ActivePage) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="space-y-0 min-h-screen bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
      {/* Header */}
      <section className="bg-[#071426] dark:bg-[#030914] text-white py-14 border-b border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-[#22D3EE] hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-white">
            {tab === 'privacy' ? 'Privacy Policy & Data Notice' : 'Terms of Use & Educational Disclaimers'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last updated: October 2026 · Official governance guidelines of RtoC LABS (Reason to Create).
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 text-xs font-semibold">
          <button
            onClick={() => setTab('privacy')}
            className={`py-4 border-b-2 transition-colors cursor-pointer ${
              tab === 'privacy' 
                ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`py-4 border-b-2 transition-colors cursor-pointer ${
              tab === 'terms' 
                ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Terms of Use & Financial Risk Disclaimers
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071426] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
          
          {tab === 'privacy' ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  1. Information We Collect
                </h2>
                <p>
                  RtoC LABS collects only personal information strictly necessary to facilitate training enrollment, conference participation, and corporate service delivery. This includes your name, email address, WhatsApp or telephone contact, country of residence, and age range to ensure appropriate learning cohort placements.
                </p>
                <p className="mt-2">
                  We do not collect payment card CVVs, online banking passwords, or unnecessary sensitive identity metrics.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  2. Purpose of Processing
                </h2>
                <p>
                  Your information is utilized solely to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Verify program enrollment and administrative fee payment.</li>
                  <li>Issue secure, non-public Google Meet session links.</li>
                  <li>Provide course syllabi, lab repositories, and lecture schedules.</li>
                  <li>Respond to service inquiries, quotations, and partnership requests.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  3. Google Meet Link Confidentiality
                </h2>
                <p>
                  Access links to RtoC LABS virtual cohorts and conferences are private and non-transferable. We share links directly with registered and verified participants via WhatsApp or email to maintain classroom integrity and student privacy.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  4. Responsible AI & Data Safeguards
                </h2>
                <p>
                  Student project work, code samples, or exercises created within our programs are not fed into public artificial intelligence models without explicit student authorization.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  5. Contact for Privacy Inquiries
                </h2>
                <p>
                  For data access, correction, or deletion inquiries, contact our administrative team via email at <strong className="text-slate-900 dark:text-white">{BRAND_INFO.email}</strong> or WhatsApp at <strong className="text-slate-900 dark:text-white">{BRAND_INFO.whatsappNumber}</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Mandatory Forex Disclaimer */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-2 transition-colors">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-icon-pulse" />
                  <span>Substantial Risk Disclosure: Financial & Forex Education</span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  Foreign exchange and financial market trading involves substantial risk of loss and is not suitable for every individual. RtoC LABS provides educational instruction on macroeconomic mechanics, chart reading, trading psychology, and strict risk management.
                </p>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>We do not provide investment advice, financial planning, or guaranteed returns.</strong> Educational demonstrations and assignments are conducted strictly on simulated demo accounts.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By enrolling in any RtoC LABS academy pathway or accessing our corporate website, you agree to comply with these terms and conditions.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  2. Commitment Fees & Conference Pricing
                </h2>
                <p>
                  As explicitly specified in official announcements:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The General Digital Skills Conference fee is <strong>KSh 3,000 or US$25</strong> for the 3-week virtual intensive.</li>
                  <li>The specialized Forex Education class carries a distinct <strong>KSh 1,000 commitment fee</strong>, which applies specifically to that track.</li>
                  <li>Enrollment is verified upon receipt of payment confirmation through the official channels.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  3. Code of Conduct & Responsible Technology
                </h2>
                <p>
                  Learners are required to uphold academic integrity. Plagiarism, deceptive use of AI generated content, harassment during live Google Meet lectures, or distribution of unauthorized recordings will result in immediate dismissal without refund.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2">
                  4. Intellectual Property
                </h2>
                <p>
                  "RtoC LABS" and "Reason to Create" are the trademarks and brand identities of RtoC LABS. All instructional guides, blueprints, and materials remain the intellectual property of RtoC LABS, while student capstone projects remain the property of the respective student creators.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
