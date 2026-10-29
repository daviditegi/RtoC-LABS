export type ProgramCategory = 'all' | 'ai' | 'media' | 'software' | 'design' | 'finance';

export interface Program {
  id: string;
  name: string;
  slug: string;
  category: ProgramCategory;
  shortDescription: string;
  overview: string;
  image: string;
  duration: string;
  schedule: string;
  deliveryMethod: string;
  targetAudience: string[];
  topics: string[];
  learningOutcomes: string[];
  feeLabel: string;
  feeAmountKsh: number;
  feeAmountUsd?: number;
  commitmentFeeNote?: string;
  status: 'Open for Enrollment' | 'Upcoming' | 'Closed';
  isFeatured?: boolean;
}

export type ServiceCategory = 'web' | 'software' | 'design' | 'media' | 'ai' | 'iot';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  summary: string;
  deliverables: string[];
  idealClients: string[];
  scopeNote: string;
  iconName: string;
}

export type PortfolioCategory = 'all' | 'finance' | 'web' | 'software' | 'ai' | 'design' | 'media' | 'iot';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  overview: string;
  problemStatement?: string;
  solutionArchitecture?: string;
  tools: string[];
  image: string;
  status: 'Prototype' | 'Student Project' | 'Illustrative Demo' | 'Active Solution';
  keyHighlights: string[];
  metricsOrResults?: string;
  interactiveDemoType?: 'forex-calculator' | 'forex-journal' | 'generic';
  publicDemoUrl?: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface RegistrationRecord {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  ageRange: string;
  programId: string;
  programName: string;
  learningGoals: string;
  preferredContact: 'WhatsApp' | 'Email' | 'Phone';
  paymentReference?: string;
  paymentStatus: 'Pending Verification' | 'Payment Verified' | 'Meet Link Sent';
  feePaidNote: string;
  progressPercentage?: number;
}

export interface SkillModule {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  skills: string[];
  isCompleted: boolean;
  completedAt?: string;
  milestoneTask?: string;
}

export interface StudentProgressRecord {
  registrationId: string;
  studentName: string;
  studentEmail: string;
  programId: string;
  programName: string;
  modules: SkillModule[];
  capstoneTitle: string;
  capstoneProjectUrl: string;
  studentNotes: string;
  sessionsAttended: number;
  totalSessions: number;
  lastUpdated: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  inquiryType: 'Training' | 'Tech Service' | 'Partnership' | 'General';
  message: string;
}

export type ActivePage = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'program-detail' 
  | 'services' 
  | 'portfolio' 
  | 'resources' 
  | 'contact' 
  | 'register' 
  | 'tracker'
  | 'admin'
  | 'privacy' 
  | 'terms';
