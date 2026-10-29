import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Copy, 
  Check, 
  MessageCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { BRAND_INFO, CONFERENCE_INFO } from '../data/content';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  programName: string;
  registrationId: string;
  capstoneTitle?: string;
  issueDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  programName,
  registrationId,
  capstoneTitle,
  issueDate = 'November 30, 2026',
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const certificateId = `RTOC-CERT-${registrationId.replace(/^RTOC-?/i, '') || '842915'}`;
  const verificationUrl = `${window.location.origin}/#verify/${certificateId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = `I just earned my official Certificate of Practical Competence in "${programName}" from RtoC LABS! Certificate ID: ${certificateId}. Verify at: ${verificationUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print bg-[#071426] px-5 py-3.5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4 animate-icon-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
                Official Credential Issued
              </span>
              <p className="text-xs text-slate-300">
                Verified Certificate of Practical Competence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer group"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Copy Verification Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-pop-check" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer group"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hover:rotate-90"
              aria-label="Close Certificate Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Scrollable Container */}
        <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto bg-slate-100 dark:bg-slate-950 flex justify-center">
          
          {/* Official Certificate Artwork (Landscape format) */}
          <div className="print-only-certificate relative w-full max-w-3xl bg-white text-slate-900 border-8 border-double border-[#0B1F3A] p-6 sm:p-10 rounded-xl shadow-xl flex flex-col justify-between space-y-6 overflow-hidden">
            
            {/* Subtle Guilloche / Watermark Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <img
                src="/assets/rtoc_r_logo.png"
                alt="Watermark"
                className="w-96 h-96 object-contain"
              />
            </div>

            {/* Certificate Header */}
            <div className="relative z-10 text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#071426] p-1 border border-slate-700 shadow-md flex items-center justify-center">
                  <img
                    src="/assets/rtoc_r_logo.png"
                    alt="RtoC LABS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-xl font-extrabold tracking-tight font-heading text-[#071426] block leading-none">
                    RtoC <span className="text-[#2563EB]">LABS</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    Reason to Create
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#2563EB] block">
                  Academy of Practical Digital Skills & AI
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#071426] tracking-tight uppercase mt-1">
                  Certificate of Practical Competence
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent mx-auto mt-2" />
              </div>
            </div>

            {/* Recipient Declaration */}
            <div className="relative z-10 text-center space-y-3 py-2">
              <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
                This credential is officially conferred upon
              </p>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-normal border-b-2 border-slate-200 pb-2 inline-block px-8 min-w-[280px]">
                {studentName || 'Learner Name'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed pt-1">
                for successfully fulfilling all practical syllabus requirements and demonstrating verified technical competence in the learning pathway:
              </p>

              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#2563EB]">
                {programName || 'Digital Skills & AI Innovation Program'}
              </h3>

              {capstoneTitle && (
                <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg p-2 max-w-lg mx-auto">
                  <span className="font-semibold text-slate-800">Capstone Project: </span>
                  <span className="italic">"{capstoneTitle}"</span>
                </p>
              )}
            </div>

            {/* Security Seal, ID & Signatures Footer */}
            <div className="relative z-10 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              
              {/* Signatures */}
              <div className="space-y-1 sm:text-left">
                <div className="font-serif italic text-base text-slate-800 font-semibold">
                  Eng. Kevin Ochieng
                </div>
                <div className="w-36 h-px bg-slate-400 mx-auto sm:mx-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Director of Academy Programs
                </span>
                <span className="text-[9px] text-slate-500 block">RtoC LABS</span>
              </div>

              {/* Gold/Cyan Holographic Security Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-amber-50 border border-amber-300 flex flex-col items-center justify-center text-center p-1">
                    <ShieldCheck className="w-5 h-5 text-amber-600 mb-0.5" />
                    <span className="text-[8px] font-extrabold uppercase tracking-tight text-amber-900 leading-none">
                      Verified
                    </span>
                    <span className="text-[7px] font-bold text-amber-700 leading-none mt-0.5">
                      Skills
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">
                  {certificateId}
                </span>
              </div>

              {/* Signature 2 & Issue Date */}
              <div className="space-y-1 sm:text-right">
                <div className="font-serif italic text-base text-slate-800 font-semibold">
                  Dr. Sandra Mwangi
                </div>
                <div className="w-36 h-px bg-slate-400 mx-auto sm:ml-auto" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Lead Technical Mentor
                </span>
                <span className="text-[9px] text-slate-500 block">
                  Issued: {issueDate}
                </span>
              </div>

            </div>

            {/* Verification Footer Note */}
            <div className="relative z-10 pt-2 text-center text-[9px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
              <span>Google Meet Cohort Verified</span>
              <span>Reason to Create · Nairobi, Kenya & Virtual</span>
              <span>Credential: {certificateId}</span>
            </div>

          </div>

        </div>

        {/* Modal Bottom Action Bar (Hidden on print) */}
        <div className="no-print p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Eligible for LinkedIn, resume portfolios, and client verification.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer group"
            >
              <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
