import React, { useState, useEffect } from 'react';
import { ActivePage, RegistrationRecord } from '../types';
import { CONFERENCE_INFO, BRAND_INFO } from '../data/content';
import { 
  Lock, 
  ShieldCheck, 
  Download, 
  CheckCircle, 
  Clock, 
  Search, 
  Trash2, 
  Send, 
  Filter, 
  Users, 
  FileText, 
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenTracker?: (regId: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, onOpenTracker }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<'registrations' | 'quotes' | 'messages' | 'config'>('registrations');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Conference state config
  const [conferenceStatus, setConferenceStatus] = useState(CONFERENCE_INFO.status);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedRegs = JSON.parse(localStorage.getItem('rtoc_registrations') || '[]');
      const storedQuotes = JSON.parse(localStorage.getItem('rtoc_quotes') || '[]');
      const storedMsgs = JSON.parse(localStorage.getItem('rtoc_messages') || '[]');
      setRegistrations(storedRegs);
      setQuotes(storedQuotes);
      setMessages(storedMsgs);
    } catch {
      // ignore
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'rtoc2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials. (Hint: enter rtoc2026)');
    }
  };

  const updatePaymentStatus = (id: string, newStatus: RegistrationRecord['paymentStatus']) => {
    const updated = registrations.map((r) => (r.id === id ? { ...r, paymentStatus: newStatus } : r));
    setRegistrations(updated);
    localStorage.setItem('rtoc_registrations', JSON.stringify(updated));
  };

  const deleteRegistration = (id: string) => {
    if (confirm('Are you sure you want to remove this record?')) {
      const updated = registrations.filter((r) => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('rtoc_registrations', JSON.stringify(updated));
    }
  };

  const exportCSV = () => {
    if (registrations.length === 0) {
      alert('No registrations available to export.');
      return;
    }
    const headers = 'ID,Date,Name,Email,Phone,Country,Age,Program,Fee,PaymentReference,PaymentStatus\n';
    const rows = registrations
      .map(
        (r) =>
          `"${r.id}","${r.createdAt}","${r.fullName}","${r.email}","${r.phone}","${r.country}","${r.ageRange}","${r.programName}","${r.feePaidNote}","${r.paymentReference}","${r.paymentStatus}"`
      )
      .join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RtoC_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-[#071426] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 transition-colors">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#071426] dark:bg-[#0B1F3A] text-[#22D3EE] mx-auto flex items-center justify-center animate-subtle-float">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              RtoC LABS Administrative Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Authorized administrator access to manage enrollments and payments.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {authError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Admin Access Key
              </label>
              <input
                type="password"
                placeholder="Enter password (e.g. rtoc2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
              />
              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                Standard administrative passkey: <code className="text-[#2563EB] dark:text-[#22D3EE] font-bold">rtoc2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer shadow-sm"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white underline cursor-pointer transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0 min-h-screen bg-[#F5F8FC] dark:bg-[#050D1A] transition-colors">
      {/* Admin Header */}
      <section className="bg-[#071426] dark:bg-[#030914] text-white py-8 border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#22D3EE]">
              <ShieldCheck className="w-4 h-4 animate-icon-pulse" />
              <span>Administrative Operations Console</span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-white mt-0.5">
              RtoC LABS Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm group"
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('registrations')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'registrations'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Enrollments ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'quotes'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Service Quotes ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'messages'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Inquiries ({messages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'config'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Conference Controls</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === 'registrations' && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#071426] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs transition-colors">
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-slate-500 dark:text-slate-400">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white text-xs transition-colors"
                  >
                    <option value="all" className="dark:bg-[#0B1F3A]">All Statuses</option>
                    <option value="Pending Verification" className="dark:bg-[#0B1F3A]">Pending Verification</option>
                    <option value="Payment Verified" className="dark:bg-[#0B1F3A]">Payment Verified</option>
                    <option value="Meet Link Sent" className="dark:bg-[#0B1F3A]">Meet Link Sent</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-[#071426] rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs transition-colors">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#0B1F3A] text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">ID / Date</th>
                      <th className="p-3.5">Applicant Details</th>
                      <th className="p-3.5">Program Track</th>
                      <th className="p-3.5">Payment Ref</th>
                      <th className="p-3.5">Verification Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400 dark:text-slate-500">
                          No student registrations found.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="font-mono font-bold text-slate-900 dark:text-white block">{record.id}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {new Date(record.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 dark:text-white block">{record.fullName}</span>
                            <span className="text-slate-500 dark:text-slate-400 block">{record.email}</span>
                            <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{record.phone} ({record.country})</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-slate-800 dark:text-slate-100 block line-clamp-1">{record.programName}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[#2563EB] dark:text-[#22D3EE] font-bold text-[11px]">{record.feePaidNote}</span>
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded">
                                {record.progressPercentage !== undefined ? `${record.progressPercentage}% Progress` : 'In Progress'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap font-mono text-[11px] text-slate-700 dark:text-slate-300">
                            {record.paymentReference}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <select
                              value={record.paymentStatus}
                              onChange={(e) => updatePaymentStatus(record.id, e.target.value as any)}
                              className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${
                                record.paymentStatus === 'Meet Link Sent'
                                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                                  : record.paymentStatus === 'Payment Verified'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                              }`}
                            >
                              <option value="Pending Verification" className="dark:bg-[#0B1F3A]">Pending Verification</option>
                              <option value="Payment Verified" className="dark:bg-[#0B1F3A]">Payment Verified</option>
                              <option value="Meet Link Sent" className="dark:bg-[#0B1F3A]">Meet Link Sent</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => onOpenTracker ? onOpenTracker(record.id) : onNavigate('tracker')}
                              className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#22D3EE] hover:bg-blue-100 dark:hover:bg-blue-900 inline-block text-[10px] font-semibold cursor-pointer"
                              title="Inspect Student Progress Tracker"
                            >
                              Tracker
                            </button>
                            <a
                              href={`https://wa.me/${record.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${record.fullName}, this is RtoC LABS. Regarding your registration ${record.id} for ${record.programName}...`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 inline-block"
                              title="Message student on WhatsApp"
                            >
                              WA
                            </a>
                            <button
                              onClick={() => deleteRegistration(record.id)}
                              className="p-1.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 inline-block cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="bg-white dark:bg-[#071426] rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Client Service Quotation Requests ({quotes.length})
              </h3>
              {quotes.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">No service quotations submitted yet.</p>
              ) : (
                <div className="space-y-3">
                  {quotes.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-2 text-xs transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{q.fullName}</span>
                          {q.company && <span className="text-slate-500 dark:text-slate-400 ml-2">({q.company})</span>}
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5">{q.email} · {q.phone}</p>
                        </div>
                        <span className="bg-blue-100 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#22D3EE] font-bold px-2 py-0.5 rounded text-[11px]">
                          {q.service} ({q.scope})
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-[#071426] p-2.5 rounded border border-slate-100 dark:border-slate-700/80">
                        {q.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white dark:bg-[#071426] rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Contact Messages ({messages.length})
              </h3>
              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">No contact inquiries submitted yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 space-y-2 text-xs transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">{m.fullName}</span>
                          <span className="text-slate-500 dark:text-slate-400 ml-2">{m.email} · {m.phone}</span>
                        </div>
                        <span className="text-purple-600 dark:text-purple-300 font-semibold bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded text-[11px]">
                          {m.inquiryType}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-[#071426] p-2.5 rounded border border-slate-100 dark:border-slate-700/80">
                        {m.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'config' && (
            <div className="bg-white dark:bg-[#071426] rounded-xl border border-slate-200 dark:border-slate-800 p-6 max-w-xl space-y-4 text-xs transition-colors">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Conference Enrollment Status
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Control the current availability status of the RtoC LABS Digital Skills Conference.
              </p>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Enrollment Status:
                </label>
                <select
                  value={conferenceStatus}
                  onChange={(e) => setConferenceStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white"
                >
                  <option value="Open for Enrollment" className="dark:bg-[#0B1F3A]">Open for Enrollment</option>
                  <option value="Registration Closed" className="dark:bg-[#0B1F3A]">Registration Closed</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200">
                Conference dates: <strong>{CONFERENCE_INFO.dates}</strong> via Google Meet.
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
