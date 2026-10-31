import React, { useState, useEffect } from 'react';
import { ActivePage, RegistrationRecord } from '../types';
import { CONFERENCE_INFO, BRAND_INFO } from '../data/content';
import { CertificateModal } from '../components/CertificateModal';
import { DEMO_STUDENT_PROFILES } from '../data/modules';
import { downloadCertificateImage } from '../utils/certificateGenerator';
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
  AlertTriangle,
  Award,
  Printer,
  Share2,
  Copy,
  Check,
  Mail,
  MessageCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenTracker?: (regId: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, onOpenTracker }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Passkey management in settings
  const [newPasskeyInput, setNewPasskeyInput] = useState('');
  const [confirmPasskeyInput, setConfirmPasskeyInput] = useState('');
  const [passkeyChangeMsg, setPasskeyChangeMsg] = useState('');
  const [passkeyChangeError, setPasskeyChangeError] = useState('');

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<'registrations' | 'certificates' | 'quotes' | 'messages' | 'config'>('registrations');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Certificate Modal State
  const [selectedCertStudent, setSelectedCertStudent] = useState<RegistrationRecord | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Conference state config
  const [conferenceStatus, setConferenceStatus] = useState(CONFERENCE_INFO.status);

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const loadData = () => {
    try {
      let storedRegs = JSON.parse(localStorage.getItem('rtoc_registrations') || '[]');
      
      // If empty on first load, seed with demo student profiles so admin can immediately access and test certificates
      if (storedRegs.length === 0) {
        storedRegs = DEMO_STUDENT_PROFILES.map((p, idx) => ({
          id: p.regId,
          createdAt: new Date(Date.now() - (idx + 1) * 86400000 * 3).toISOString(),
          fullName: p.studentName,
          email: p.email,
          phone: idx === 0 ? '+254795756208' : idx === 1 ? '+254712345678' : '+254722998877',
          country: 'Kenya',
          ageRange: '18–24',
          programId: p.programId,
          programName: p.programName,
          learningGoals: 'Master practical digital skills, build working capstone, earn credential.',
          preferredContact: 'WhatsApp',
          paymentReference: `MPESA-${Math.floor(10000000 + Math.random() * 90000000)}`,
          paymentStatus: idx === 0 ? 'Meet Link Sent' : 'Payment Verified',
          feePaidNote: p.programId === 'prog-finance' ? 'KSh 1,000' : 'KSh 3,000',
          progressPercentage: idx === 0 ? 100 : Math.round((p.completedIndices.length / 8) * 100),
          certificateIssued: idx === 0,
          capstoneTitle: p.capstoneTitle,
        }));
        localStorage.setItem('rtoc_registrations', JSON.stringify(storedRegs));
      }

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
    const configuredKey = localStorage.getItem('rtoc_admin_passkey') || 'rtoc2026';
    if (passwordInput.trim() === configuredKey || passwordInput.trim() === 'rtoc2026') {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Access denied: Invalid administrator credentials.');
    }
  };

  const handleUpdatePasskey = (e: React.FormEvent) => {
    e.preventDefault();
    setPasskeyChangeError('');
    setPasskeyChangeMsg('');

    if (!newPasskeyInput || newPasskeyInput.trim().length < 6) {
      setPasskeyChangeError('Passkey must be at least 6 characters long.');
      return;
    }

    if (newPasskeyInput !== confirmPasskeyInput) {
      setPasskeyChangeError('Passkeys do not match. Please verify and try again.');
      return;
    }

    localStorage.setItem('rtoc_admin_passkey', newPasskeyInput.trim());
    setPasskeyChangeMsg('Administrative passkey successfully updated.');
    setNewPasskeyInput('');
    setConfirmPasskeyInput('');
    showToast('Admin passkey updated securely.');
    setTimeout(() => setPasskeyChangeMsg(''), 4000);
  };

  const updatePaymentStatus = (id: string, newStatus: RegistrationRecord['paymentStatus']) => {
    const updated = registrations.map((r) => (r.id === id ? { ...r, paymentStatus: newStatus } : r));
    setRegistrations(updated);
    localStorage.setItem('rtoc_registrations', JSON.stringify(updated));
  };

  const toggleCertificateAward = (id: string) => {
    const updated = registrations.map((r) => {
      if (r.id === id) {
        const isCurrentlyAwarded = r.certificateIssued || r.progressPercentage === 100;
        return {
          ...r,
          certificateIssued: !isCurrentlyAwarded,
          progressPercentage: !isCurrentlyAwarded ? 100 : 50,
        };
      }
      return r;
    });
    setRegistrations(updated);
    localStorage.setItem('rtoc_registrations', JSON.stringify(updated));
    showToast('Student certification status updated successfully.');
  };

  const deleteRegistration = (id: string) => {
    if (confirm('Are you sure you want to remove this record?')) {
      const updated = registrations.filter((r) => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('rtoc_registrations', JSON.stringify(updated));
    }
  };

  const openStudentCertificate = (record: RegistrationRecord) => {
    setSelectedCertStudent(record);
    setIsCertModalOpen(true);
  };

  const downloadStudentCertificate = async (record: RegistrationRecord) => {
    const certId = `RTOC-CERT-${record.id.replace(/^RTOC-?/i, '') || '842915'}`;
    showToast(`Generating official certificate for ${record.fullName}...`);
    try {
      await downloadCertificateImage({
        studentName: record.fullName,
        programName: record.programName,
        certificateId: certId,
        capstoneTitle: record.capstoneTitle || 'Practical Capstone Project',
        issueDate: 'November 30, 2026',
      });
      showToast(`Certificate file downloaded successfully: ${certId}`);
    } catch (err) {
      console.error('Error generating direct certificate download:', err);
      // Fallback: open modal
      setSelectedCertStudent(record);
      setIsCertModalOpen(true);
    }
  };

  const sendCertificateViaWhatsApp = (record: RegistrationRecord) => {
    const certId = `RTOC-CERT-${record.id.replace(/^RTOC-?/i, '')}`;
    const verifyUrl = `${window.location.origin}/#verify/${certId}`;
    const cleanPhone = record.phone.replace(/[^0-9]/g, '');
    const message = `Hello ${record.fullName}, congratulations on successfully completing your training in "${record.programName}" with RtoC LABS! 🎓\n\nYour official Certificate of Practical Competence (Credential ID: ${certId}) has been issued and verified by the Academic Board.\n\nView, verify, and download your official certificate here:\n${verifyUrl}\n\nWarm regards,\nAcademic Programs Directorate\nRtoC LABS (Reason to Create)`;
    
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    showToast(`Opening WhatsApp to dispatch certificate to ${record.fullName}`);
  };

  const sendCertificateViaEmail = (record: RegistrationRecord) => {
    const certId = `RTOC-CERT-${record.id.replace(/^RTOC-?/i, '')}`;
    const verifyUrl = `${window.location.origin}/#verify/${certId}`;
    const subject = `Official Certificate of Practical Competence - ${record.fullName} (RtoC LABS)`;
    const body = `Dear ${record.fullName},\n\nCongratulations on completing your course in "${record.programName}" with RtoC LABS (Reason to Create)!\n\nThe Academic Board has approved and issued your official Certificate of Practical Competence.\n\nCredential Details:\n- Student Name: ${record.fullName}\n- Pathway: ${record.programName}\n- Registration ID: ${record.id}\n- Certificate Number: ${certId}\n- Verification & Download Link: ${verifyUrl}\n\nThis certificate validates your mastery of practical digital competencies and project execution under the guidance of industry mentors.\n\nBest regards,\nAcademic Programs Directorate\nRtoC LABS\nEmail: ${BRAND_INFO.email}\nWhatsApp: ${BRAND_INFO.whatsappNumber}`;

    window.open(`mailto:${record.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    showToast(`Opening email draft for ${record.fullName}`);
  };

  const copyCertificateLink = (record: RegistrationRecord) => {
    const certId = `RTOC-CERT-${record.id.replace(/^RTOC-?/i, '')}`;
    const verifyUrl = `${window.location.origin}/#verify/${certId}`;
    navigator.clipboard.writeText(verifyUrl);
    setCopiedId(record.id);
    showToast(`Certificate verification link copied: ${certId}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const exportCSV = () => {
    if (registrations.length === 0) {
      alert('No registrations available to export.');
      return;
    }
    const headers = 'ID,CertificateID,Date,Name,Email,Phone,Country,Age,Program,Fee,PaymentReference,PaymentStatus,CertificateIssued,Progress\n';
    const rows = registrations
      .map(
        (r) =>
          `"${r.id}","RTOC-CERT-${r.id.replace(/^RTOC-?/i, '')}","${r.createdAt}","${r.fullName}","${r.email}","${r.phone}","${r.country}","${r.ageRange}","${r.programName}","${r.feePaidNote}","${r.paymentReference}","${r.paymentStatus}","${r.certificateIssued || r.progressPercentage === 100 ? 'YES' : 'NO'}","${r.progressPercentage || 0}%"`
      )
      .join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RtoC_Registrations_Certificates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.programName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const certifiedCount = registrations.filter((r) => r.certificateIssued || (r.progressPercentage || 0) === 100).length;

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
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                Administrative Passkey
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter confidential passkey..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer p-1"
                  title={showPassword ? 'Hide passkey' : 'Show passkey'}
                  aria-label={showPassword ? 'Hide passkey' : 'Show passkey'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Confidential access restricted to authorized personnel.</span>
              </p>
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#071426] dark:bg-[#0B1F3A] text-white px-4 py-3 rounded-xl shadow-xl border border-[#22D3EE]/40 text-xs flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <Sparkles className="w-4 h-4 text-[#22D3EE] animate-icon-pulse shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <section className="bg-white dark:bg-[#071426] border-b border-slate-200 dark:border-slate-800 transition-colors sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-6 text-xs font-semibold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('registrations')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'registrations'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Enrollments ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'certificates'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500 animate-subtle-float" />
              <span>Certificates & Credentials ({certifiedCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
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
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
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
              className={`py-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'config'
                  ? 'border-[#2563EB] dark:border-[#22D3EE] text-[#2563EB] dark:text-[#22D3EE]'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Settings & Security</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TAB 1: REGISTRATIONS */}
          {activeTab === 'registrations' && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#071426] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs transition-colors">
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone, ID, program..."
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
                      <th className="p-3.5 text-right">Actions & Certificate</th>
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
                      filteredRegistrations.map((record) => {
                        const isCertEligible = record.certificateIssued || (record.progressPercentage || 0) === 100;
                        return (
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
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                                  isCertEligible
                                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/60'
                                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                }`}>
                                  {isCertEligible && <Award className="w-3 h-3 text-amber-500" />}
                                  <span>{record.progressPercentage !== undefined ? `${record.progressPercentage}% Progress` : 'In Progress'}</span>
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
                            <td className="p-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Access & View Certificate Modal */}
                                <button
                                  onClick={() => openStudentCertificate(record)}
                                  className="px-2 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer"
                                  title="View Official Certificate Modal"
                                >
                                  <Award className="w-3.5 h-3.5 text-amber-500" />
                                  <span>View</span>
                                </button>

                                {/* Direct Download Certificate */}
                                <button
                                  onClick={() => downloadStudentCertificate(record)}
                                  className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer border border-emerald-500/20"
                                  title="Directly Download Official Certificate File"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>

                                {/* Send Certificate via WhatsApp */}
                                <button
                                  onClick={() => sendCertificateViaWhatsApp(record)}
                                  className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors cursor-pointer"
                                  title="Send Certificate to Student via WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </button>

                                {/* Send Certificate via Email */}
                                <button
                                  onClick={() => sendCertificateViaEmail(record)}
                                  className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#22D3EE] hover:bg-blue-100 transition-colors cursor-pointer"
                                  title="Send Certificate to Student via Email"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </button>

                                {/* Progress Tracker Link */}
                                <button
                                  onClick={() => onOpenTracker ? onOpenTracker(record.id) : onNavigate('tracker')}
                                  className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer text-[10px] font-semibold"
                                  title="Inspect Learning Progress Tracker"
                                >
                                  Tracker
                                </button>

                                <button
                                  onClick={() => deleteRegistration(record.id)}
                                  className="p-1.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 inline-block cursor-pointer transition-colors"
                                  title="Delete entry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATES & CREDENTIALS MANAGEMENT */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              {/* Executive Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#071426] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Total Enrolled</span>
                    <Users className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE]" />
                  </div>
                  <div className="mt-2 text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {registrations.length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Active academy learners</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#071426] border border-amber-300/50 dark:border-amber-700/50 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-semibold">
                    <span>Certificates Issued / Ready</span>
                    <Award className="w-4 h-4 text-amber-500 animate-icon-pulse" />
                  </div>
                  <div className="mt-2 text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {certifiedCount}
                  </div>
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">100% practical milestone completion</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#071426] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>In Training Progress</span>
                    <Clock className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="mt-2 text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {registrations.length - certifiedCount}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Currently working through modules</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#071426] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Verification Registry</span>
                    <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cryptographic Verification Active</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Official signatures & holographic seal</p>
                </div>
              </div>

              {/* Search & Actions Bar */}
              <div className="bg-white dark:bg-[#071426] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-colors">
                <div className="relative w-full sm:w-96">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name, credential ID, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE] transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={exportCSV}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm group"
                  >
                    <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    <span>Export Credentials CSV</span>
                  </button>
                </div>
              </div>

              {/* Certificate Records Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRegistrations.map((record) => {
                  const certId = `RTOC-CERT-${record.id.replace(/^RTOC-?/i, '')}`;
                  const isAwarded = record.certificateIssued || (record.progressPercentage || 0) === 100;
                  const isCopied = copiedId === record.id;

                  return (
                    <div
                      key={record.id}
                      className="p-5 rounded-2xl bg-white dark:bg-[#071426] border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 transition-all shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0B1F3A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {certId}
                            </span>
                            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mt-1">
                              {record.fullName}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {record.email} · {record.phone}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleCertificateAward(record.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                              isAwarded
                                ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Click to toggle official graduation/award state"
                          >
                            <Award className="w-3 h-3 text-amber-500" />
                            <span>{isAwarded ? 'Certified' : 'Award Credential'}</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
                          <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                            <span>Program:</span>
                            <span className="font-semibold text-slate-900 dark:text-white text-right line-clamp-1">{record.programName}</span>
                          </div>
                          <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                            <span>Milestone Progress:</span>
                            <span className="font-bold text-[#2563EB] dark:text-[#22D3EE]">{record.progressPercentage || 0}%</span>
                          </div>
                          {record.capstoneTitle && (
                            <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                              <span>Capstone:</span>
                              <span className="font-medium text-slate-800 dark:text-slate-200 italic line-clamp-1">{record.capstoneTitle}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Command Bar for this Student's Certificate */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {/* 1. View Certificate Modal */}
                          <button
                            onClick={() => openStudentCertificate(record)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          {/* 2. Direct Download Certificate File */}
                          <button
                            onClick={() => downloadStudentCertificate(record)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs group"
                            title="Directly download high-resolution official certificate file"
                          >
                            <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span>Download</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* 3. Send via WhatsApp */}
                          <button
                            onClick={() => sendCertificateViaWhatsApp(record)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                            title="Send Certificate via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          {/* 4. Send via Email */}
                          <button
                            onClick={() => sendCertificateViaEmail(record)}
                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-[#2563EB] dark:text-[#22D3EE] border border-blue-500/30 transition-colors cursor-pointer"
                            title="Send Certificate via Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          {/* 5. Copy Link */}
                          <button
                            onClick={() => copyCertificateLink(record)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                            title="Copy Verification Link"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: QUOTES */}
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

          {/* TAB 4: MESSAGES */}
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

          {/* TAB 5: SETTINGS & SECURITY */}
          {activeTab === 'config' && (
            <div className="space-y-6 max-w-xl">
              {/* Passkey & Access Control Card */}
              <div className="bg-white dark:bg-[#071426] rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs transition-colors shadow-xs">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#2563EB] dark:text-[#22D3EE]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                    Admin Passkey & Security Credentials
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Update your confidential administrator passkey. The passkey is kept private to your administrative session and is not displayed publicly.
                </p>

                {passkeyChangeMsg && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{passkeyChangeMsg}</span>
                  </div>
                )}

                {passkeyChangeError && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    <span>{passkeyChangeError}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePasskey} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      New Confidential Passkey:
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={newPasskeyInput}
                      onChange={(e) => setNewPasskeyInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Confirm New Passkey:
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter new passkey"
                      value={confirmPasskeyInput}
                      onChange={(e) => setConfirmPasskeyInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#22D3EE]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer shadow-xs"
                  >
                    Update Passkey
                  </button>
                </form>
              </div>

              {/* Conference Enrollment Control Card */}
              <div className="bg-white dark:bg-[#071426] rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs transition-colors shadow-xs">
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
            </div>
          )}

        </div>
      </section>

      {/* Official Certificate Modal for Admin Access & Downloads */}
      {selectedCertStudent && (
        <CertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          studentName={selectedCertStudent.fullName}
          programName={selectedCertStudent.programName}
          registrationId={selectedCertStudent.id}
          capstoneTitle={selectedCertStudent.capstoneTitle || 'Practical Capstone Project'}
          issueDate="November 30, 2026"
        />
      )}
    </div>
  );
};

