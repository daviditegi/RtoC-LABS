import React, { useState } from 'react';
import { BRAND_INFO } from '../data/content';
import { X, CheckCircle2, Send, MessageCircle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultService = 'Website Development' }) => {
  const [selectedService, setSelectedService] = useState(defaultService);
  const [projectScope, setProjectScope] = useState('Standard Business');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !description.trim()) {
      setErrorMsg('Please complete all required contact fields and project overview.');
      return;
    }

    const quoteRecord = {
      id: `quote-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName,
      company,
      email,
      phone,
      service: selectedService,
      scope: projectScope,
      description,
      status: 'New Inquiry',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('rtoc_quotes') || '[]');
      existing.unshift(quoteRecord);
      localStorage.setItem('rtoc_quotes', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    setSubmitted(true);
    setErrorMsg('');
  };

  const whatsappInquiryUrl = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
    `Hello RtoC LABS, my name is ${fullName || 'a client'}. I just requested a quote for ${selectedService} (${projectScope}). Phone: ${phone}. Project summary: ${description.slice(0, 100)}...`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white dark:bg-[#071426] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#071426] dark:bg-[#030914] p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              Technology & Creative Services
            </span>
            <h2 className="text-xl font-bold font-heading mt-1">
              Request a Project Quotation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-pop-check">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Quotation Request Received!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-800 dark:text-white">{fullName}</span>. Our technology solutions team has logged your specifications for <span className="font-semibold text-slate-800 dark:text-white">{selectedService}</span>. We will review your requirements and reach out within 24 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all hover:shadow-md group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Fast-Track via WhatsApp (+254795756208)</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Service Required <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                >
                  <option value="Website Development" className="dark:bg-[#0B1F3A]">Website Development</option>
                  <option value="Software and Database Solutions" className="dark:bg-[#0B1F3A]">Software & Database Solutions</option>
                  <option value="Graphic Design and Branding" className="dark:bg-[#0B1F3A]">Graphic Design & Branding</option>
                  <option value="Media and Digital Marketing" className="dark:bg-[#0B1F3A]">Media & Digital Marketing</option>
                  <option value="AI Integration and Productivity" className="dark:bg-[#0B1F3A]">AI Integration & Productivity</option>
                  <option value="IoT and Technology Innovation" className="dark:bg-[#0B1F3A]">IoT & Technology Innovation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Estimated Scope / Scale
                </label>
                <select
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                >
                  <option value="Starter / Individual Project" className="dark:bg-[#0B1F3A]">Starter / Individual Project</option>
                  <option value="Standard Business" className="dark:bg-[#0B1F3A]">Standard Business</option>
                  <option value="Custom Enterprise / Complex" className="dark:bg-[#0B1F3A]">Custom Enterprise / Multi-Phase</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Mwangi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Organization / Business Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Agri Solutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="grace@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  WhatsApp / Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +254 712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Project Overview & Specific Deliverables <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe your current challenge, target audience, preferred delivery timeline, and key requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] resize-none transition-colors"
              />
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
              Note: Project feasibility, hardware requirements, and final costs are confirmed following technical review. No fabricated claims or surprise costs.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-2 transition-all hover:shadow-md cursor-pointer shadow-sm group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Submit Quote Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
