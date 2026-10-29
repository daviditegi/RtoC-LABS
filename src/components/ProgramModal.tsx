import React from 'react';
import { Program } from '../types';
import { X, CheckCircle2, Calendar, Clock, Monitor, ArrowRight, AlertCircle, Users } from 'lucide-react';

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
  onRegister: (programId: string) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({ program, onClose, onRegister }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white dark:bg-[#071426] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image & dark overlay */}
        <div className="relative h-56 sm:h-64 bg-[#071426] overflow-hidden">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-[#071426]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              Learning Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              {program.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 text-xs transition-colors">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE] animate-icon-pulse" />
                {program.duration}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Format</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Monitor className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE] animate-subtle-float" />
                Google Meet
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Schedule</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE]" />
                Interactive Labs
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Program Fee</span>
              <span className="font-bold text-[#2563EB] dark:text-[#22D3EE] block mt-0.5">
                {program.feeLabel}
              </span>
            </div>
          </div>

          {/* Fee Distinction Warning if Forex */}
          {program.commitmentFeeNote && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3 transition-colors">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 animate-icon-pulse" />
              <div>
                <p className="font-bold uppercase tracking-wide">Important Fee Distinction</p>
                <p className="mt-1 leading-relaxed text-amber-800 dark:text-amber-300">
                  {program.commitmentFeeNote}
                </p>
                <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-400 italic">
                  Note: Forex education carries substantial financial market risk. RtoC LABS teaches risk management and market structure; we do not provide investment advice or profit guarantees.
                </p>
              </div>
            </div>
          )}

          {/* Program Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Program Overview
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {program.overview}
            </p>
          </div>

          {/* Topics Covered */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Curriculum & Topics Covered
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {program.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-50/70 dark:bg-[#0B1F3A] p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5">
              Who Should Attend
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {program.targetAudience.map((audience, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#22D3EE]" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5">
              Key Learning Outcomes
            </h3>
            <div className="space-y-2">
              {program.learningOutcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-[#030914] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Venue: <span className="font-semibold text-slate-700 dark:text-slate-200">Google Meet</span> · Live Sessions
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRegister(program.id);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-2 transition-all hover:shadow-md cursor-pointer shadow-sm group"
            >
              <span>Enroll in this Program</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
