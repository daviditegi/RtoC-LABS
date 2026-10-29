import React, { useState } from 'react';
import { ResourceArticle } from '../types';
import { X, Clock, Calendar, User, Share2, Check } from 'lucide-react';

interface ArticleModalProps {
  article: ResourceArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white dark:bg-[#071426] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#071426] dark:bg-[#030914] p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-[#22D3EE]">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-cyan-400 animate-icon-pulse" />
              {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE]" />
                {article.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE]" />
                {article.date}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic transition-colors">
            "{article.excerpt}"
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {article.keyTakeaways && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-2 transition-colors">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Core Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {article.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#22D3EE] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#030914] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />}
            <span>{copied ? 'Link Copied!' : 'Share Resource'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
