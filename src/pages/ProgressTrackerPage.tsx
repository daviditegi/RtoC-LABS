import React, { useState, useEffect, useMemo } from 'react';
import { ActivePage, SkillModule, StudentProgressRecord } from '../types';
import { BRAND_INFO, CONFERENCE_INFO } from '../data/content';
import { CertificateModal } from '../components/CertificateModal';
import { 
  getOrCreateStudentProgress, 
  saveStudentProgress, 
  DEMO_STUDENT_PROFILES, 
  PROGRAM_MODULES 
} from '../data/modules';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  Sparkles, 
  Calendar, 
  Clock, 
  Monitor, 
  Award, 
  ArrowRight, 
  ExternalLink, 
  Save, 
  Share2, 
  MessageCircle, 
  GraduationCap, 
  Layers, 
  FileText,
  User,
  Check,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Printer
} from 'lucide-react';

interface ProgressTrackerPageProps {
  onNavigate: (page: ActivePage) => void;
  initialRegId?: string;
}

export const ProgressTrackerPage: React.FC<ProgressTrackerPageProps> = ({ onNavigate, initialRegId }) => {
  const [searchIdInput, setSearchIdInput] = useState(initialRegId || '');
  const [currentProgress, setCurrentProgress] = useState<StudentProgressRecord | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [moduleFilter, setModuleFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [lookupError, setLookupError] = useState('');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Auto-load if initialRegId provided or load first demo account
  useEffect(() => {
    if (initialRegId) {
      handleLookup(initialRegId);
    } else {
      // Check local storage for the latest registered user
      try {
        const storedRegs = JSON.parse(localStorage.getItem('rtoc_registrations') || '[]');
        if (storedRegs.length > 0) {
          const latest = storedRegs[0];
          handleLookup(latest.id);
          return;
        }
      } catch {
        // fallback
      }
      // Otherwise load Amina's demo profile
      loadDemoProfile(DEMO_STUDENT_PROFILES[0]);
    }
  }, [initialRegId]);

  const loadDemoProfile = (profile: typeof DEMO_STUDENT_PROFILES[0]) => {
    // Generate fresh record based on profile
    const record = getOrCreateStudentProgress(
      profile.regId,
      profile.programId,
      profile.studentName,
      profile.email,
      profile.programName
    );

    // Apply demo completions
    record.modules.forEach((mod, idx) => {
      mod.isCompleted = profile.completedIndices.includes(idx);
      mod.completedAt = mod.isCompleted ? new Date().toISOString() : undefined;
    });
    record.capstoneTitle = profile.capstoneTitle;
    record.capstoneProjectUrl = profile.capstoneUrl;
    record.studentNotes = profile.notes;
    record.sessionsAttended = profile.sessionsAttended;
    record.totalSessions = profile.totalSessions;

    saveStudentProgress(record);
    setCurrentProgress({ ...record });
    setSearchIdInput(profile.regId);
    setLookupError('');
  };

  const handleLookup = (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    if (!cleanId) {
      setLookupError('Please enter a Registration ID or Email address.');
      return;
    }

    // Check demo profiles first
    const demo = DEMO_STUDENT_PROFILES.find(
      (d) => d.regId.toUpperCase() === cleanId || d.email.toLowerCase() === idToSearch.trim().toLowerCase()
    );
    if (demo) {
      loadDemoProfile(demo);
      return;
    }

    // Check saved progress in localStorage
    const saved = localStorage.getItem(`rtoc_progress_${cleanId}`);
    if (saved) {
      try {
        const parsed: StudentProgressRecord = JSON.parse(saved);
        setCurrentProgress(parsed);
        setLookupError('');
        return;
      } catch {
        // continue
      }
    }

    // Check registrations list in localStorage
    try {
      const storedRegs = JSON.parse(localStorage.getItem('rtoc_registrations') || '[]');
      const found = storedRegs.find(
        (r: any) =>
          r.id.toUpperCase() === cleanId ||
          r.email.toLowerCase() === idToSearch.trim().toLowerCase() ||
          r.phone.replace(/[^0-9]/g, '').includes(cleanId.replace(/[^0-9]/g, ''))
      );

      if (found) {
        const record = getOrCreateStudentProgress(
          found.id,
          found.programId,
          found.fullName,
          found.email,
          found.programName
        );
        setCurrentProgress(record);
        setLookupError('');
        return;
      }
    } catch {
      // continue
    }

    // If still not found, create a placeholder tracking record for this ID
    const newRecord = getOrCreateStudentProgress(
      cleanId,
      'conference-general',
      `Student ${cleanId}`,
      '',
      CONFERENCE_INFO.title
    );
    setCurrentProgress(newRecord);
    setLookupError('');
  };

  const toggleModuleCompletion = (moduleId: string) => {
    if (!currentProgress) return;

    const updatedModules = currentProgress.modules.map((mod) => {
      if (mod.id === moduleId) {
        const nextState = !mod.isCompleted;
        return {
          ...mod,
          isCompleted: nextState,
          completedAt: nextState ? new Date().toISOString() : undefined,
        };
      }
      return mod;
    });

    const updatedRecord: StudentProgressRecord = {
      ...currentProgress,
      modules: updatedModules,
      lastUpdated: new Date().toISOString(),
    };

    setCurrentProgress(updatedRecord);
    saveStudentProgress(updatedRecord);
  };

  const handleSaveNotesAndCapstone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProgress) return;

    saveStudentProgress(currentProgress);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  // Progress metrics calculation
  const totalModules = currentProgress?.modules.length || 0;
  const completedModules = currentProgress?.modules.filter((m) => m.isCompleted).length || 0;
  const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const isAllCompleted = progressPercent === 100;

  const filteredModules = useMemo(() => {
    if (!currentProgress) return [];
    if (moduleFilter === 'completed') return currentProgress.modules.filter((m) => m.isCompleted);
    if (moduleFilter === 'pending') return currentProgress.modules.filter((m) => !m.isCompleted);
    return currentProgress.modules;
  }, [currentProgress, moduleFilter]);

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC] dark:bg-[#050D1A] transition-colors duration-200">
      {/* 1. Header Banner */}
      <section className="bg-[#071426] dark:bg-[#030914] text-white py-14 lg:py-18 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#22D3EE] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 animate-subtle-float" />
              <span>Student Learning Experience</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Competence & Milestones</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white">
              Learning Progress Tracker
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Monitor your mastery of digital skills modules, track live Google Meet session milestones, submit capstone project links, and qualify for your official RtoC LABS completion credential.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Student Lookup & Demo Switcher Bar */}
      <section className="bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800 py-5 sticky top-18 z-30 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLookup(searchIdInput);
              }}
              className="flex items-center gap-2 w-full lg:w-96 text-xs"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Reg ID (e.g. RTOC-842915) or Email..."
                  value={searchIdInput}
                  onChange={(e) => setSearchIdInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer shrink-0 group flex items-center gap-1.5"
              >
                <span>Find Record</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Quick Demo Profile Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                Sample Profiles:
              </span>
              {DEMO_STUDENT_PROFILES.map((demo) => (
                <button
                  key={demo.regId}
                  onClick={() => loadDemoProfile(demo)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    currentProgress?.registrationId === demo.regId
                      ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {demo.studentName.split(' ')[0]} ({demo.programName.includes('AI') ? 'AI' : demo.programName.includes('Software') ? 'Tech' : 'Conf'})
                </button>
              ))}
            </div>

          </div>

          {lookupError && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{lookupError}</span>
            </p>
          )}
        </div>
      </section>

      {/* 3. Main Dashboard Body */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {currentProgress ? (
            <>
              {/* Student Overview & Progress Bar Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono font-bold text-[#2563EB] dark:text-[#22D3EE] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                        {currentProgress.registrationId}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Google Meet Classroom Cohort</span>
                      {currentProgress.studentEmail && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[200px]">{currentProgress.studentEmail}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                      {currentProgress.studentName}
                    </h2>

                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Enrolled: <span className="text-[#2563EB] dark:text-[#22D3EE]">{currentProgress.programName}</span>
                    </p>
                  </div>

                  {/* Attendance & Session Stats + Certificate Quick Button */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/70 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Lab Attendance</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">
                          {currentProgress.sessionsAttended} / {currentProgress.totalSessions} Sessions
                        </span>
                      </div>
                      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Cohort Schedule</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {CONFERENCE_INFO.dates}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-4 py-3 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-2 shadow-xs transition-all cursor-pointer group"
                    >
                      <Award className="w-4 h-4 group-hover:rotate-12 transition-transform text-amber-300" />
                      <span>{isAllCompleted ? 'View Certificate' : 'Preview Certificate'}</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar & Numerical Metrics */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE]" />
                      <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                        Module Completion Progress
                      </span>
                    </div>
                    <span className="font-extrabold text-sm text-[#2563EB] dark:text-[#22D3EE] font-mono">
                      {completedModules} of {totalModules} Units Completed · {progressPercent}%
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#22D3EE] to-emerald-500 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Unit 01: Foundations</span>
                    <span>Midway: Guided Lab Hands-On</span>
                    <span>Unit 08: Capstone Project</span>
                  </div>
                </div>

                {/* Completion Status Alert / Certificate Readiness */}
                {isAllCompleted ? (
                  <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 animate-icon-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold font-heading text-emerald-900 dark:text-emerald-100">
                          All Digital Skills Units Completed!
                        </h4>
                        <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                          Congratulations, {currentProgress.studentName}! You have fulfilled all 8 units. Your official Certificate of Practical Competence is ready to view, print, or download.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0 group"
                    >
                      <Award className="w-4 h-4 group-hover:rotate-12 transition-transform text-amber-300" />
                      <span>View & Download Certificate (PDF)</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span>
                      <strong>Interactive Instructions:</strong> Mark units as completed as you finish live sessions and lab milestone tasks. All changes are saved automatically.
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#2563EB] dark:text-[#22D3EE] shrink-0">
                      {totalModules - completedModules} units remaining
                    </span>
                  </div>
                )}

              </div>

              {/* Module Filter Tabs & Curriculum Units Grid */}
              <div className="space-y-4">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                      Curriculum Units & Practical Milestones
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Click the status checkbox on each card to toggle completion.
                    </p>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#0B1F3A] rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                    <button
                      onClick={() => setModuleFilter('all')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        moduleFilter === 'all' 
                          ? 'bg-[#2563EB] text-white font-semibold' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      All ({totalModules})
                    </button>
                    <button
                      onClick={() => setModuleFilter('completed')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        moduleFilter === 'completed' 
                          ? 'bg-[#2563EB] text-white font-semibold' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Completed ({completedModules})
                    </button>
                    <button
                      onClick={() => setModuleFilter('pending')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        moduleFilter === 'pending' 
                          ? 'bg-[#2563EB] text-white font-semibold' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Pending ({totalModules - completedModules})
                    </button>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredModules.map((module) => (
                    <div
                      key={module.id}
                      onClick={() => toggleModuleCompletion(module.id)}
                      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group ${
                        module.isCompleted
                          ? 'bg-white dark:bg-[#0B1F3A] border-emerald-300 dark:border-emerald-700/80 shadow-xs ring-1 ring-emerald-200/50 dark:ring-emerald-900/40'
                          : 'bg-white dark:bg-[#0B1F3A] border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/40 dark:hover:border-[#22D3EE]/40 hover:shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Unit Number & Interactive Checkbox */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Unit {String(module.unitNumber).padStart(2, '0')}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleModuleCompletion(module.id);
                            }}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                              module.isCompleted
                                ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {module.isCompleted ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pop-check" />
                                <span>Completed</span>
                              </>
                            ) : (
                              <>
                                <Circle className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                                <span>Mark Complete</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="text-base font-bold font-heading leading-snug text-slate-900 dark:text-white">
                            {module.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {module.description}
                          </p>
                        </div>

                        {/* Milestone Task */}
                        {module.milestoneTask && (
                          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                              Milestone Deliverable:
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 leading-normal">{module.milestoneTask}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills Covered Tags (Unboxed with separators) */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Skills:</span>
                        {module.skills.map((skill, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span>{skill}</span>
                            {sIdx < module.skills.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Capstone Submission & Notes Panel */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] flex items-center justify-center">
                      <Award className="w-5 h-5 animate-subtle-float" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                        Capstone Project Submission & Notes
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Document your portfolio project link and personal reflections for instructor feedback.
                      </p>
                    </div>
                  </div>

                  {saveSuccessNotice && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-md flex items-center gap-1.5 animate-in fade-in">
                      <Check className="w-3.5 h-3.5" />
                      Saved Successfully!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveNotesAndCapstone} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Capstone Project Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. EduPortal Africa or Nairobi Visual Story Package"
                        value={currentProgress.capstoneTitle || ''}
                        onChange={(e) =>
                          setCurrentProgress({ ...currentProgress, capstoneTitle: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Project Repository / Live Cloud URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/... or https://..."
                        value={currentProgress.capstoneProjectUrl || ''}
                        onChange={(e) =>
                          setCurrentProgress({ ...currentProgress, capstoneProjectUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Learning Notes & Milestone Feedback
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Note down concepts you tested, technical challenges overcome, or questions for your mentor during Google Meet office hours..."
                      value={currentProgress.studentNotes || ''}
                      onChange={(e) =>
                        setCurrentProgress({ ...currentProgress, studentNotes: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Need 1-on-1 assistance with a unit? Message your instructor on WhatsApp.
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs group"
                    >
                      <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Save Progress & Project Links</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Student Support & Google Meet Classroom Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-6 rounded-2xl bg-[#071426] dark:bg-[#030914] text-white space-y-3 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-[#22D3EE] font-semibold">
                    <Monitor className="w-4 h-4" />
                    <span>Live Virtual Classroom</span>
                  </div>
                  <h4 className="text-base font-bold font-heading">
                    Google Meet Class Link & Access
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Live sessions run on scheduled weekday evenings and weekend lab hours. Your verified meeting URL is sent to your registered WhatsApp number ({currentProgress.studentEmail || currentProgress.registrationId}).
                  </p>
                  <a
                    href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                      `Hello RtoC LABS, my name is ${currentProgress.studentName} (Reg ID: ${currentProgress.registrationId}). I am currently on Unit ${completedModules + 1} of ${currentProgress.programName} and have a question regarding my next live session.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors group"
                  >
                    <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Ask Instructor on WhatsApp (+254795756208)</span>
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-3 transition-colors duration-200">
                  <div className="flex items-center gap-2 text-xs text-[#2563EB] dark:text-[#22D3EE] font-semibold">
                    <Award className="w-4 h-4" />
                    <span>Credential Eligibility</span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    Certificate of Practical Competence
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Certificates are awarded upon achieving 100% module completion and submitting a verified capstone project repository. Backed by your actual working project code and assets.
                  </p>
                  <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Status: <span className={isAllCompleted ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
                        {isAllCompleted ? 'Eligible for Official Certificate' : `${totalModules - completedModules} Modules Remaining`}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
                    >
                      <Award className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform text-amber-300" />
                      <span>{isAllCompleted ? 'Open Certificate' : 'Preview Certificate'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-[#0B1F3A] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                No Registration Record Loaded
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Enter your Registration ID above or click one of the sample student profiles (Amina, Brian, Grace) to explore module progress tracking.
              </p>
              <button
                onClick={() => onNavigate('register')}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer"
              >
                Register for a Program Now
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Official Certificate Modal */}
      {currentProgress && (
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          studentName={currentProgress.studentName}
          programName={currentProgress.programName}
          registrationId={currentProgress.registrationId}
          capstoneTitle={currentProgress.capstoneTitle}
        />
      )}
    </div>
  );
};
