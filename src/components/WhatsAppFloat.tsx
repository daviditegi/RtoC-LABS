import React, { useState } from 'react';
import { BRAND_INFO } from '../data/content';
import { MessageCircle, X, Sparkles, Send, Globe, Palette, GraduationCap } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    {
      label: 'Register for the Conference',
      icon: GraduationCap,
      message: 'Hello RtoC LABS, I would like to register for the upcoming Digital Skills Conference (Nov 9–30, 2026).',
    },
    {
      label: 'Enquire About AI Training',
      icon: Sparkles,
      message: 'Hello RtoC LABS, I would like to enquire about your Artificial Intelligence & Smart Thinking program.',
    },
    {
      label: 'Request a Website Quote',
      icon: Globe,
      message: 'Hello RtoC LABS, I would like to request a quotation for a modern corporate / business website.',
    },
    {
      label: 'Enquire About Graphic Design',
      icon: Palette,
      message: 'Hello RtoC LABS, I am interested in your Graphic Design & Visual Communication training/services.',
    },
  ];

  const createWhatsAppUrl = (text: string) => {
    return `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Inquiry Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-[#071426] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors">
          <div className="bg-[#071426] dark:bg-[#030914] p-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pop-check">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-heading">RtoC LABS WhatsApp</h3>
                <p className="text-[11px] text-slate-300">Fast assistance & registration</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Close WhatsApp prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#071426] space-y-2.5 transition-colors">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Choose a topic to start a direct conversation on WhatsApp (+254795756208):
            </p>

            <div className="space-y-1.5">
              {quickPrompts.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={createWhatsAppUrl(item.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-700/80 hover:border-[#2563EB] dark:hover:border-[#22D3EE] hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition-all text-xs font-medium text-slate-800 dark:text-slate-100 group"
                  >
                    <Icon className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <Send className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-[#2563EB] dark:group-hover:text-[#22D3EE] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <a
                href={createWhatsAppUrl('Hello RtoC LABS, I would like to learn more about your digital skills programs and services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all hover:shadow-md shadow-sm group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Open General WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#071426] dark:bg-[#0B1F3A] text-white hover:bg-[#0B1F3A] dark:hover:bg-[#1E3A60] border border-[#2563EB]/40 dark:border-[#22D3EE]/40 rounded-full shadow-xl shadow-black/20 hover:shadow-2xl transition-all cursor-pointer"
        aria-label="Open WhatsApp contact menu"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm animate-icon-pulse">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <span className="text-xs font-semibold pr-1 hidden sm:inline whitespace-nowrap">
          {isOpen ? 'Close Inquiries' : 'Chat with Us'}
        </span>
      </button>
    </aside>
  );
};
