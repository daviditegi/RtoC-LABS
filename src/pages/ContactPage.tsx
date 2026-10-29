import React, { useState } from 'react';
import { ActivePage } from '../types';
import { BRAND_INFO } from '../data/content';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Palette, 
  GraduationCap,
  Video
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'Training' | 'Tech Service' | 'Partnership' | 'General'>('Training');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const createWhatsAppUrl = (text: string) => {
    return `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  const contextActions = [
    {
      title: 'Enquire About AI Training',
      icon: Sparkles,
      msg: 'Hello RtoC LABS, I would like to enquire about your Artificial Intelligence & Smart Thinking program.',
    },
    {
      title: 'Register for the Conference',
      icon: GraduationCap,
      msg: 'Hello RtoC LABS, I would like to register for the upcoming Digital Skills Conference (Nov 9–30, 2026).',
    },
    {
      title: 'Request a Website Quote',
      icon: Globe,
      msg: 'Hello RtoC LABS, I would like to request a quotation for web design and development.',
    },
    {
      title: 'Enquire About Graphic Design',
      icon: Palette,
      msg: 'Hello RtoC LABS, I am interested in Graphic Design & Visual Communication training or services.',
    },
    {
      title: 'Ask About Media Training',
      icon: Video,
      msg: 'Hello RtoC LABS, I want to learn more about the Media, Journalism & Content Creation track.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const newInquiry = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      inquiryType,
      message,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('rtoc_messages') || '[]');
      existing.unshift(newInquiry);
      localStorage.setItem('rtoc_messages', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div className="space-y-0">
      {/* 1. Header Banner */}
      <section className="bg-[#071426] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Contact RtoC LABS
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Have questions regarding our training programs, upcoming conference sessions, or digital technology development services? We are here to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Direct Channels & Fast WhatsApp Prompts */}
      <section className="py-12 bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 animate-icon-pulse" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                Official WhatsApp Channel
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Direct conversations for fast registration verification and program inquiries.
              </p>
              <a
                href={createWhatsAppUrl('Hello RtoC LABS, I would like to learn more about your digital skills programs and services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline block"
              >
                {BRAND_INFO.whatsappNumber}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 animate-subtle-float" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                Email Inquiries
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Send official corporate briefs, syllabus questions, or institutional partnerships.
              </p>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="text-xs font-bold text-[#2563EB] dark:text-[#22D3EE] hover:underline block"
              >
                {BRAND_INFO.email}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6] dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 animate-icon-pulse" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                Location & Delivery
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Headquartered in Nairobi, Kenya with live interactive cohorts accessible across Africa via Google Meet.
              </p>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                {BRAND_INFO.location}
              </span>
            </div>

          </div>

          {/* Context-Aware One-Click Inquiry Bar */}
          <div className="mt-10 p-6 rounded-2xl bg-[#071426] dark:bg-[#030914] text-white border border-slate-800 space-y-4 transition-colors">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider block">
              Fast Context Inquiries via WhatsApp
            </span>
            <div className="flex flex-wrap gap-2.5">
              {contextActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <a
                    key={i}
                    href={createWhatsAppUrl(action.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B1F3A] hover:bg-[#2563EB] dark:bg-[#071426] dark:hover:bg-[#2563EB] border border-slate-700 text-xs text-slate-200 hover:text-white transition-all group"
                  >
                    <Icon className="w-3.5 h-3.5 text-cyan-300 group-hover:scale-110 transition-transform" />
                    <span>{action.title}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Inquiry Form Section */}
      <section className="py-16 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#071426] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1F3A]/40 transition-colors">
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Fill in the details below and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-pop-check">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800 dark:text-white">{fullName}</strong>. Your inquiry regarding <strong className="text-slate-800 dark:text-white">{inquiryType}</strong> has been logged. We will contact you via {email} or {phone || 'phone'} shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
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
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dennis Kimani"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    >
                      <option value="Training" className="dark:bg-[#0B1F3A]">Training & Learning Academy</option>
                      <option value="Tech Service" className="dark:bg-[#0B1F3A]">Technology & Development Services</option>
                      <option value="Partnership" className="dark:bg-[#0B1F3A]">Partnership & Youth Programs</option>
                      <option value="General" className="dark:bg-[#0B1F3A]">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dennis@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Your Message / Detailed Request <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your query, goals, or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] resize-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Direct assistance: <strong className="text-slate-700 dark:text-slate-200">{BRAND_INFO.whatsappNumber}</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-2 transition-all hover:shadow-md cursor-pointer shadow-sm group"
                  >
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
