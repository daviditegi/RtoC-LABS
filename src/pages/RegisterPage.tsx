import React, { useState } from 'react';
import { ActivePage } from '../types';
import { BRAND_INFO, CONFERENCE_INFO, PROGRAMS_DATA } from '../data/content';
import { 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  MessageCircle, 
  Monitor, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  Ticket
} from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: ActivePage) => void;
  preselectedProgramId?: string;
  onOpenTracker?: (regId: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, preselectedProgramId, onOpenTracker }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [ageRange, setAgeRange] = useState('18–24');
  const [selectedProgram, setSelectedProgram] = useState(preselectedProgramId || 'conference-general');
  const [learningGoals, setLearningGoals] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Email' | 'Phone'>('WhatsApp');
  const [paymentReference, setPaymentReference] = useState('');
  const [consent, setConsent] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    fullName: string;
    programTitle: string;
    feeNote: string;
    reference: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Determine pricing based on selection
  const isForex = selectedProgram === 'prog-finance';
  const isConference = selectedProgram === 'conference-general';

  const getFeeDisplay = () => {
    if (isForex) {
      return {
        amount: 'KSh 1,000',
        label: 'Specialized Forex Education Commitment Fee',
        note: 'Covers the dedicated 3-week Financial Markets & Forex Education Track.',
      };
    }
    return {
      amount: 'KSh 3,000 / US$25',
      label: 'General Digital Skills Conference & Academy Fee',
      note: 'Covers full 3-week conference access across AI, Software, Media, and Graphic Design modules.',
    };
  };

  const currentFee = getFeeDisplay();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !learningGoals.trim()) {
      setErrorMsg('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    if (!consent) {
      setErrorMsg('Please agree to the privacy notice and educational terms before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const regId = `RTOC-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const programObj = PROGRAMS_DATA.find((p) => p.id === selectedProgram);
      const programName = selectedProgram === 'conference-general' 
        ? CONFERENCE_INFO.title 
        : (programObj?.name || 'Selected Program');

      const newRecord = {
        id: regId,
        createdAt: new Date().toISOString(),
        fullName,
        email,
        phone,
        country,
        ageRange,
        programId: selectedProgram,
        programName,
        learningGoals,
        preferredContact,
        paymentReference: paymentReference.trim() || 'Pending Transfer / WhatsApp Verification',
        paymentStatus: 'Pending Verification',
        feePaidNote: currentFee.amount,
      };

      try {
        const existing = JSON.parse(localStorage.getItem('rtoc_registrations') || '[]');
        existing.unshift(newRecord);
        localStorage.setItem('rtoc_registrations', JSON.stringify(existing));
      } catch {
        // fallback
      }

      setIsSubmitting(false);
      setSubmittedTicket({
        id: regId,
        fullName,
        programTitle: programName,
        feeNote: currentFee.amount,
        reference: paymentReference.trim() || 'Pending Verification',
      });
    }, 600);
  };

  const whatsappNotificationUrl = submittedTicket
    ? `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
        `Hello RtoC LABS, I have registered for ${submittedTicket.programTitle}. Registration ID: ${submittedTicket.id}. Name: ${submittedTicket.fullName}. Payment Reference: ${submittedTicket.reference}. Please verify my enrollment for the Google Meet sessions.`
      )}`
    : '';

  return (
    <div className="space-y-0">
      {/* 1. Header Banner */}
      <section className="bg-[#071426] text-white py-14 lg:py-18 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              Enrollment & Conference Registration
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Join the RtoC LABS Cohort
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Register for the upcoming Digital Skills Conference ({CONFERENCE_INFO.dates}) or individual training pathways delivered live via Google Meet.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('tracker')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22D3EE] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                <span>Already registered? Open your Learning Progress Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conference Key Fact Strip */}
      <section className="bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 transition-colors">
              <span className="text-slate-500 dark:text-slate-400 block">Conference Schedule</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE] animate-icon-pulse" />
                {CONFERENCE_INFO.dates}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 transition-colors">
              <span className="text-slate-500 dark:text-slate-400 block">Classroom Venue</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Monitor className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE] animate-subtle-float" />
                Google Meet Live Classroom
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 transition-colors">
              <span className="text-slate-500 dark:text-slate-400 block">General Conference Fee</span>
              <span className="font-bold text-[#2563EB] dark:text-[#22D3EE] block mt-0.5">
                KSh 3,000 or US$25
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 transition-colors">
              <span className="text-amber-800 dark:text-amber-300 font-semibold block">Forex Education Fee</span>
              <span className="font-bold text-amber-900 dark:text-amber-200 block mt-0.5">
                KSh 1,000 Commitment Fee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Form or Ticket Confirmation */}
      <section className="py-16 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {submittedTicket ? (
            /* Submission Confirmation Card */
            <div className="bg-white dark:bg-[#071426] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in duration-200 transition-colors">
              <div className="bg-[#071426] dark:bg-[#030914] p-6 text-white text-center space-y-2 border-b border-slate-800">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-pop-check">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading">
                  Enrollment Registered Successfully
                </h2>
                <p className="text-xs text-slate-300">
                  Registration ID: <span className="font-mono text-cyan-300 font-bold">{submittedTicket.id}</span>
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200/80 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400">Applicant:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{submittedTicket.fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400">Program Track:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{submittedTicket.programTitle}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400">Scheduled Fee:</span>
                    <span className="font-bold text-[#2563EB] dark:text-[#22D3EE]">{submittedTicket.feeNote}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 dark:text-slate-400">Payment Reference:</span>
                    <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{submittedTicket.reference}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-blue-950 dark:text-blue-200 text-xs">
                  <h4 className="font-bold uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE] animate-icon-pulse" />
                    <span>How You Will Receive Your Google Meet Access Link</span>
                  </h4>
                  <p className="leading-relaxed">
                    As specified in RtoC LABS policy, the Google Meet access link is kept private and will be dispatched directly to your confirmed WhatsApp and Email address upon payment verification.
                  </p>
                  <p className="leading-relaxed">
                    To expedite administrative verification, click the button below to message our official registrar on WhatsApp (+254795756208).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenTracker ? onOpenTracker(submittedTicket.id) : onNavigate('tracker')}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md cursor-pointer group"
                  >
                    <span>Track Your Learning Progress</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={whatsappNotificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md group"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Confirm via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setLearningGoals('');
                      setPaymentReference('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer text-center"
                  >
                    Register Another Participant
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Enrollment Form */
            <div className="bg-white dark:bg-[#071426] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
              <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0B1F3A]/40 transition-colors">
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Participant Enrollment Form
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Complete the fields below to enroll. No credit cards or passwords required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs">
                {errorMsg && (
                  <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 animate-icon-pulse" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Program Selection */}
                <div className="space-y-2">
                  <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                    Select Learning Pathway or Conference <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                  >
                    <option value="conference-general" className="dark:bg-[#0B1F3A]">
                      Digital Skills Conference 2026 (Nov 9–30) — All Core Modules (KSh 3,000 / $25)
                    </option>
                    {PROGRAMS_DATA.map((prog) => (
                      <option key={prog.id} value={prog.id} className="dark:bg-[#0B1F3A]">
                        {prog.name} — {prog.feeLabel}
                      </option>
                    ))}
                  </select>

                  {/* Pricing and fee distinction banner */}
                  <div className={`p-3.5 rounded-xl border text-xs transition-colors ${
                    isForex 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200' 
                      : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200'
                  }`}>
                    <div className="flex items-center justify-between font-bold">
                      <span>{currentFee.label}</span>
                      <span className="text-sm font-extrabold">{currentFee.amount}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed opacity-90">
                      {currentFee.note}
                    </p>
                    {isForex && (
                      <p className="mt-1 text-[10px] text-amber-800 dark:text-amber-300 italic">
                        Notice: As outlined in official guidelines, Forex trading education is educational only and requires dedicated discipline; this commitment fee applies specifically to this track.
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Ochieng"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="samuel@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 795 756 208"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Age Range
                    </label>
                    <select
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    >
                      <option value="Under 18" className="dark:bg-[#0B1F3A]">Under 18</option>
                      <option value="18–24" className="dark:bg-[#0B1F3A]">18–24</option>
                      <option value="25–34" className="dark:bg-[#0B1F3A]">25–34</option>
                      <option value="35+" className="dark:bg-[#0B1F3A]">35+</option>
                    </select>
                  </div>
                </div>

                {/* Learning Goals */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    What are your primary learning goals? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. I want to build a portfolio web project, learn how to automate content creation using AI responsibly, and explore freelancing opportunities."
                    value={learningGoals}
                    onChange={(e) => setLearningGoals(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] resize-none transition-colors"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Preferred Communication Channel
                  </label>
                  <div className="flex gap-4">
                    {(['WhatsApp', 'Email', 'Phone'] as const).map((method) => (
                      <label key={method} className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={preferredContact === method}
                          onChange={() => setPreferredContact(method)}
                          className="text-[#2563EB] dark:text-[#22D3EE] focus:ring-[#2563EB]"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Information Section */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 transition-colors">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wide text-[11px] flex items-center justify-between">
                    <span>Payment Verification & Instructions</span>
                    <span className="text-[#2563EB] dark:text-[#22D3EE] font-bold">{currentFee.amount}</span>
                  </h4>
                  
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Payment verification is handled directly through our authorized administrative workflow. Once you make the transfer to the official RtoC LABS contact number (<strong className="text-slate-800 dark:text-white">{BRAND_INFO.whatsappNumber}</strong>), enter your M-Pesa / Bank confirmation code below or verify via WhatsApp.
                  </p>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      M-Pesa / Payment Transaction Code (Optional at submission, required before class):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. QK89XY721Z"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071426] font-mono uppercase text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Note: You can submit your registration now and send proof of payment via WhatsApp later.
                    </span>
                  </div>
                </div>

                {/* Privacy and Policy Consent */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#2563EB] dark:text-[#22D3EE] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-slate-600 dark:text-slate-400 text-[11px] leading-tight cursor-pointer">
                    I agree to the RtoC LABS Privacy Notice and Terms of Use. I understand that the Google Meet link will be provided following payment verification, and that registration is subject to cohort capacity.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Questions? Call or WhatsApp: <strong className="text-slate-700 dark:text-slate-200">{BRAND_INFO.whatsappNumber}</strong>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-2 transition-all hover:shadow-md cursor-pointer shadow-sm disabled:opacity-50 group"
                  >
                    {isSubmitting ? (
                      <span>Processing Enrollment...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
