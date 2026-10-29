import React, { useState, useMemo } from 'react';
import { ActivePage, ResourceArticle } from '../types';
import { RESOURCES_DATA } from '../data/content';
import { Search, Clock, Calendar, User, ArrowRight, BookOpen, Share2 } from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectArticle: (article: ResourceArticle) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate, onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Artificial Intelligence',
    'Web Development',
    'Financial Literacy',
    'Graphic Design',
  ];

  const filteredArticles = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-0">
      {/* 1. Header Banner */}
      <section className="bg-[#071426] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              Knowledge & Insights
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Resources, Guides & Articles
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Practical guides on responsible AI adoption, modern web architecture, digital storytelling ethics, visual hierarchy, and financial market safety.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search */}
      <section className="py-6 bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 sticky top-18 z-30 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] bg-slate-50 dark:bg-[#0B1F3A] focus:bg-white dark:focus:bg-[#071426] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Articles Grid */}
      <section className="py-16 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071426] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-lg dark:hover:border-slate-700 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-[#2563EB] dark:text-[#22D3EE] uppercase tracking-wider text-[11px]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                      <Clock className="w-3.5 h-3.5 animate-icon-pulse" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#22D3EE] transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{article.author}</span>
                  </div>

                  <button
                    onClick={() => onSelectArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-[#22D3EE] hover:text-[#1d4ed8] dark:hover:text-cyan-300 cursor-pointer group/link"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
