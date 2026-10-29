import { SkillModule, StudentProgressRecord } from '../types';

export const PROGRAM_MODULES: Record<string, Omit<SkillModule, 'isCompleted' | 'completedAt'>[]> = {
  'prog-ai': [
    {
      id: 'ai-mod-1',
      unitNumber: 1,
      title: 'AI Foundations & Modern Model Architectures',
      description: 'Understanding LLMs, transformers, neural representations, and how generative models generate responses.',
      skills: ['Model Mechanics', 'Context Windows', 'Tokenization', 'Latent Space'],
      milestoneTask: 'Compare prompt variations across zero-shot and few-shot inference',
    },
    {
      id: 'ai-mod-2',
      unitNumber: 2,
      title: 'Prompt Engineering & Context Calibration',
      description: 'Mastering role prompting, system instructions, XML tags, structured JSON outputs, and iterative prompt debugging.',
      skills: ['System Instructions', 'Few-shot Examples', 'Output Formatting', 'Chain-of-Thought'],
      milestoneTask: 'Build a repeatable prompt template for complex data extraction',
    },
    {
      id: 'ai-mod-3',
      unitNumber: 3,
      title: 'AI-Assisted Research & Knowledge Synthesis',
      description: 'Accelerating academic and industry research without hallucination risks or bias blind spots.',
      skills: ['Source Verification', 'Fact Checking', 'Document Synthesis', 'Semantic Search'],
      milestoneTask: 'Draft an annotated briefing paper with verified primary source citations',
    },
    {
      id: 'ai-mod-4',
      unitNumber: 4,
      title: 'Generative Visual & Creative Workflows',
      description: 'Harnessing generative image models, aspect ratio discipline, negative prompts, and camera lighting directions.',
      skills: ['Image Generation', 'Prompt Recipes', 'Editorial Aesthetics', 'Aspect Ratios'],
      milestoneTask: 'Generate a cohesive 4-asset editorial illustration series',
    },
    {
      id: 'ai-mod-5',
      unitNumber: 5,
      title: 'Critical Thinking & Algorithmic Reasoning',
      description: 'Cultivating independent thought: evaluating AI outputs critically rather than accepting them as truth.',
      skills: ['Logical Fallacy Detection', 'Bias Auditing', 'Human-in-the-Loop', 'Ethical Governance'],
      milestoneTask: 'Audit an AI-generated business report and document factual discrepancies',
    },
    {
      id: 'ai-mod-6',
      unitNumber: 6,
      title: 'Privacy Safeguards & Responsible Adoption',
      description: 'Protecting personal information, proprietary enterprise secrets, and complying with data privacy laws.',
      skills: ['Kenya DPA Compliance', 'Data Anonymization', 'PII Safeguarding', 'Ethical AI'],
      milestoneTask: 'Formulate an AI usage policy document for a local business',
    },
    {
      id: 'ai-mod-7',
      unitNumber: 7,
      title: 'Workflow Automation & Agentic Pipelines',
      description: 'Connecting AI models into daily productivity pipelines, spreadsheets, and developer workflows.',
      skills: ['API Integration', 'Automated Workflows', 'Task Execution', 'Function Calling'],
      milestoneTask: 'Set up an automated workflow that summarizes incoming requests',
    },
    {
      id: 'ai-mod-8',
      unitNumber: 8,
      title: 'Capstone AI Practical Solution',
      description: 'Designing and deploying an original AI-powered tool solving a tangible African community or business challenge.',
      skills: ['End-to-End Delivery', 'Project Presentation', 'GitHub Documentation'],
      milestoneTask: 'Submit capstone prototype link, prompt architecture, and video demo',
    },
  ],
  'prog-tech': [
    {
      id: 'tech-mod-1',
      unitNumber: 1,
      title: 'Web Architecture & Modern Developer Environment',
      description: 'How the internet works: DNS, HTTP/HTTPS, client-server models, VS Code, Git terminal, and GitHub repositories.',
      skills: ['Git Version Control', 'Terminal Mastery', 'HTTP Lifecycle', 'Repository Management'],
      milestoneTask: 'Initialize a clean Git repository and push an initial commit to GitHub',
    },
    {
      id: 'tech-mod-2',
      unitNumber: 2,
      title: 'Semantic HTML5, Responsive Layouts & Tailwind CSS',
      description: 'Crafting accessible semantic markup, responsive grid mathematics, flexbox containers, and mobile design.',
      skills: ['Semantic HTML', 'Flexbox & CSS Grid', 'Tailwind Utility Math', 'Accessibility WCAG'],
      milestoneTask: 'Code a responsive single-page marketing layout without layout overflow',
    },
    {
      id: 'tech-mod-3',
      unitNumber: 3,
      title: 'Modern JavaScript & TypeScript Programming',
      description: 'Variables, arrow functions, DOM manipulation, arrays/objects, type annotations, and asynchronous programming.',
      skills: ['TypeScript Interfaces', 'Async/Await', 'Array Methods', 'Type Safety'],
      milestoneTask: 'Build an interactive client-side calculator with strict TypeScript types',
    },
    {
      id: 'tech-mod-4',
      unitNumber: 4,
      title: 'Component Architecture & State Management (React)',
      description: 'Building interactive modern interfaces with React hooks (useState, useEffect, useMemo) and reusable components.',
      skills: ['React Hooks', 'Component Lifecycle', 'State Lifting', 'Modular UI'],
      milestoneTask: 'Create an interactive filterable product directory in React',
    },
    {
      id: 'tech-mod-5',
      unitNumber: 5,
      title: 'RESTful API Communication & Live Data Fetching',
      description: 'Connecting client interfaces to remote servers, handling JSON payloads, loading spinners, and error boundaries.',
      skills: ['Fetch / Axios', 'Error Handling', 'Loading States', 'API Auth Headers'],
      milestoneTask: 'Connect a React application to a public REST API and display data',
    },
    {
      id: 'tech-mod-6',
      unitNumber: 6,
      title: 'Database Architecture & Relational Schema Design',
      description: 'Designing normalized tables, primary/foreign keys, relational queries, and information storage systems.',
      skills: ['SQL Queries', 'Schema Normalization', 'Entity Relations', 'Data Integrity'],
      milestoneTask: 'Design a 4-table relational database schema for a school or retail business',
    },
    {
      id: 'tech-mod-7',
      unitNumber: 7,
      title: 'IoT Microcontrollers & Hardware Telemetry Basics',
      description: 'Connecting sensors to microcontrollers (ESP32/Arduino) and streaming live telemetry to cloud dashboards.',
      skills: ['Microcontrollers', 'Sensor Interfacing', 'Serial Telemetry', 'Cloud Dashboards'],
      milestoneTask: 'Simulate or build a soil moisture/temperature telemetry reading node',
    },
    {
      id: 'tech-mod-8',
      unitNumber: 8,
      title: 'Capstone Full-Stack Application Deployment',
      description: 'Packaging, testing, and deploying a functional web application to the cloud with custom domain and verified URL.',
      skills: ['Cloud Deployment', 'Vite/Node Bundling', 'CI/CD Basics', 'Live URL Verification'],
      milestoneTask: 'Deploy your capstone project live and submit repository + URL',
    },
  ],
  'prog-media': [
    {
      id: 'med-mod-1',
      unitNumber: 1,
      title: 'Digital Journalism Foundations & Source Verification',
      description: 'Ethical journalism, inverted pyramid structure, cross-referencing claims, and interview techniques.',
      skills: ['Source Verification', 'Media Ethics', 'Interview Protocol', 'Fact Checking'],
      milestoneTask: 'Conduct an interview and produce a verified 400-word feature story',
    },
    {
      id: 'med-mod-2',
      unitNumber: 2,
      title: 'Digital Storytelling, Scriptwriting & Sequencing',
      description: 'Hooking modern digital audiences, crafting compelling story arcs, and audio-visual script formatting.',
      skills: ['Hook Writing', 'Narrative Pacing', 'AV Scripts', 'Audience Psychology'],
      milestoneTask: 'Write a full 60-second video script with visual cue breakdowns',
    },
    {
      id: 'med-mod-3',
      unitNumber: 3,
      title: 'Mobile Production: Smartphone Camera & Audio Capture',
      description: 'Mastering mobile cinematography, rule of thirds, natural lighting, lavalier microphones, and clean audio levels.',
      skills: ['Mobile Framing', 'Lighting Setup', 'Lavalier Audio', 'B-Roll Capture'],
      milestoneTask: 'Record a high-definition 2-minute interview with crisp exterior B-roll',
    },
    {
      id: 'med-mod-4',
      unitNumber: 4,
      title: 'Non-Linear Video Editing & Post-Production Suites',
      description: 'Working with timeline cuts, J/L cuts, color grading, sound design, and subtitle synchronization in Premiere/CapCut.',
      skills: ['Timeline Pacing', 'Color Grading', 'Audio Ducking', 'Dynamic Subtitles'],
      milestoneTask: 'Edit a 90-second documentary short with sound design and color grading',
    },
    {
      id: 'med-mod-5',
      unitNumber: 5,
      title: 'Social Media Algorithms & Multi-Platform Distribution',
      description: 'Understanding retention curves, thumbnail design, metadata keywords, and format optimization.',
      skills: ['Retention Analytics', 'Thumbnail Strategy', 'Platform Timing', 'SEO Meta'],
      milestoneTask: 'Design a 30-day multi-channel publishing calendar',
    },
    {
      id: 'med-mod-6',
      unitNumber: 6,
      title: 'Branding, Community Engagement & Digital Marketing',
      description: 'Building an authentic personal brand, managing audience commentary, and running organic digital campaigns.',
      skills: ['Personal Branding', 'Audience Trust', 'Community Moderation', 'Email Newsletters'],
      milestoneTask: 'Launch a niche editorial newsletter or social series with brand guide',
    },
    {
      id: 'med-mod-7',
      unitNumber: 7,
      title: 'AI-Assisted Media Workflows & Copyright Compliance',
      description: 'Using AI tools ethically for transcriptions, captioning, and ideation without violating copyright laws.',
      skills: ['Automated Transcription', 'Fair Use Doctrine', 'Creative Commons', 'Ethical AI Media'],
      milestoneTask: 'Document an automated transcription and captioning workflow pipeline',
    },
    {
      id: 'med-mod-8',
      unitNumber: 8,
      title: 'Capstone Multimedia Journalism Package',
      description: 'Producing an end-to-end multimedia investigative story combining video, photo essay, and written commentary.',
      skills: ['Documentary Production', 'Portfolio Delivery', 'Public Storytelling'],
      milestoneTask: 'Publish your multimedia capstone package and submit project dossier',
    },
  ],
  'prog-design': [
    {
      id: 'des-mod-1',
      unitNumber: 1,
      title: 'Core Design Foundations: Hierarchy, Balance & Rhythm',
      description: 'Understanding visual weight, negative space, reading patterns (Z and F patterns), and structural contrast.',
      skills: ['Visual Weight', 'Focal Anchors', 'Negative Space', 'Contrast Principles'],
      milestoneTask: 'Redesign a cluttered flyer into a clean, balanced composition',
    },
    {
      id: 'des-mod-2',
      unitNumber: 2,
      title: 'Typography Mastery, Pairing & Hierarchy Mathematics',
      description: 'Serif vs Sans vs Monospace, type scales (Major Third, Golden Ratio), line-heights, tracking, and legibility.',
      skills: ['Type Scale Math', 'Font Pairing', 'Measure (ch)', 'Tabular Numerals'],
      milestoneTask: 'Build a complete typographic specimen sheet with display and body pairs',
    },
    {
      id: 'des-mod-3',
      unitNumber: 3,
      title: 'Color Theory & The 60-30-10 Spatial Rule',
      description: 'Dominant canvas neutrals, structural surfaces, and disciplined accent color budgets for digital products.',
      skills: ['Color Psychology', '60-30-10 Rule', 'WCAG AA Contrast', 'Hex & HSL Math'],
      milestoneTask: 'Create an accessible corporate color palette tested with contrast ratios',
    },
    {
      id: 'des-mod-4',
      unitNumber: 4,
      title: 'Vector Design Tools & Figma Professional Workflows',
      description: 'Auto layout, nested components, design tokens, vector paths, pen tool precision, and responsive frames.',
      skills: ['Figma Auto Layout', 'Components & Variants', 'Design Tokens', 'Vector Pen Tool'],
      milestoneTask: 'Construct a reusable UI design kit with 5 responsive components',
    },
    {
      id: 'des-mod-5',
      unitNumber: 5,
      title: 'Brand Identity Systems & Visual Guidelines',
      description: 'Designing logos, wordmarks, stationery, brand guidelines books, and scalable vector export packages.',
      skills: ['Logo Crafting', 'Brand Guidelines', 'Asset Packaging', 'Vector SVG Export'],
      milestoneTask: 'Design a complete logo system (wordmark + abstract insignia)',
    },
    {
      id: 'des-mod-6',
      unitNumber: 6,
      title: 'High-Converting Social Media Creatives & Post Collateral',
      description: 'Crafting multi-slide Instagram/LinkedIn carousels, event posters, and promotional graphics that command attention.',
      skills: ['Carousel Storyboarding', 'Poster Design', 'Mobile Thumb-Stoppers', 'Visual Flow'],
      milestoneTask: 'Design a 5-slide educational social carousel with consistent brand assets',
    },
    {
      id: 'des-mod-7',
      unitNumber: 7,
      title: 'Corporate Presentation & Investor Pitch Deck Design',
      description: 'Transforming dense corporate data and financial charts into elegant, convincing visual slides.',
      skills: ['Slide Architecture', 'Data Visualization', 'Executive Clarity', 'Slide Layouts'],
      milestoneTask: 'Design an 8-slide executive pitch deck adhering to brand typography',
    },
    {
      id: 'des-mod-8',
      unitNumber: 8,
      title: 'Capstone Brand Identity & Design Portfolio',
      description: 'Developing a complete brand identity package for a commercial enterprise, curated in a professional case study.',
      skills: ['Portfolio Curation', 'Case Study Documentation', 'Design Handoff'],
      milestoneTask: 'Submit a complete brand guidelines PDF and Figma portfolio link',
    },
  ],
  'prog-finance': [
    {
      id: 'fin-mod-1',
      unitNumber: 1,
      title: 'Personal Financial Literacy & Emergency Capital Planning',
      description: 'Budgeting principles, living expenses buffers, debt management, and the psychology of capital preservation.',
      skills: ['Personal Budgeting', 'Emergency Reserves', 'Cashflow Auditing', 'Savings Discipline'],
      milestoneTask: 'Construct a 12-month personal cashflow budget and emergency fund plan',
    },
    {
      id: 'fin-mod-2',
      unitNumber: 2,
      title: 'Global Financial Markets Architecture & Asset Classes',
      description: 'How international currency exchange, equities, commodities, and bond markets interact globally.',
      skills: ['Market Ecosystem', 'Central Banks', 'Macro Liquidity', 'Asset Class Dynamics'],
      milestoneTask: 'Map out the participants in the global FX interbank marketplace',
    },
    {
      id: 'fin-mod-3',
      unitNumber: 3,
      title: 'Currency Pairs, Pips, Leverage & Spread Mathematics',
      description: 'Understanding major/minor pairs, spread costs, lot sizing, margin requirements, and leverage risks.',
      skills: ['Pip Calculation', 'Leverage Physics', 'Spread Analysis', 'Margin Safety'],
      milestoneTask: 'Calculate exact dollar-risk on 3 different currency pair trade setups',
    },
    {
      id: 'fin-mod-4',
      unitNumber: 4,
      title: 'Macroeconomic Indicators & Interest Rate Policies',
      description: 'Non-farm payrolls, inflation (CPI), central bank decisions, and interest rate differentials.',
      skills: ['Economic Calendar', 'Inflation Data', 'Central Bank Policy', 'Market Sentiment'],
      milestoneTask: 'Analyze the impact of a recent central bank interest rate announcement',
    },
    {
      id: 'fin-mod-5',
      unitNumber: 5,
      title: 'Technical Chart Analysis: Support, Resistance & Trend Structure',
      description: 'Candlestick anatomy, market structure (higher highs/lows), horizontal key levels, and multi-timeframe analysis.',
      skills: ['Market Structure', 'Key Support/Resistance', 'Multi-Timeframe Analysis', 'Chart Reading'],
      milestoneTask: 'Identify and mark market structure and daily key levels on two currency pairs',
    },
    {
      id: 'fin-mod-6',
      unitNumber: 6,
      title: 'Disciplined Risk Management & The 1% Position Rule',
      description: 'Never risking more than 1–2% of capital per idea; setting hard stop-losses and understanding risk-to-reward ratios.',
      skills: ['1% Risk Rule', 'Stop-Loss Placement', 'Risk-Reward Ratios', 'Drawdown Control'],
      milestoneTask: 'Create an automated position-sizing spreadsheet with mandatory stop-losses',
    },
    {
      id: 'fin-mod-7',
      unitNumber: 7,
      title: 'Trading Psychology, Cognitive Biases & Emotional Discipline',
      description: 'Overcoming FOMO, revenge trading, cognitive confirmation bias, and accepting losses as an unavoidable cost of business.',
      skills: ['Emotional Self-Regulation', 'Trading Discipline', 'Loss Acceptance', 'Bias Awareness'],
      milestoneTask: 'Draft a personal trading code of conduct and emotional circuit-breaker rules',
    },
    {
      id: 'fin-mod-8',
      unitNumber: 8,
      title: 'Capstone Simulated Demo Practice & Trading Journal Audit',
      description: 'Executing 20 simulated trades strictly on a demo account with complete journal documentation and risk adherence.',
      skills: ['Trade Journaling', 'Demo Discipline', 'Audit Compliance', 'Risk Reporting'],
      milestoneTask: 'Submit a verified 20-trade demo journal showing 100% adherence to risk rules',
    },
  ],
  'conference-general': [
    {
      id: 'conf-mod-1',
      unitNumber: 1,
      title: 'Digital Economy Foundations: The Shift from User to Creator',
      description: 'Orientation to digital creation across Kenya and Africa: tools, opportunities, and mindset shifts.',
      skills: ['Creator Mindset', 'Digital Economy Landscape', 'Tool Setup'],
      milestoneTask: 'Set up development workspace and define 90-day learning roadmap',
    },
    {
      id: 'conf-mod-2',
      unitNumber: 2,
      title: 'Responsible AI Workflows for Research & Daily Productivity',
      description: 'Prompt engineering architectures, source verification, and productivity acceleration with LLMs.',
      skills: ['Prompt Engineering', 'Verification', 'Productivity Pipelines'],
      milestoneTask: 'Create a personal prompt library for research and drafting',
    },
    {
      id: 'conf-mod-3',
      unitNumber: 3,
      title: 'Modern Web Architecture & Building Your First Cloud Page',
      description: 'HTML5, modern responsive styling, Git version control, and deploying live websites to cloud URLs.',
      skills: ['Web Architecture', 'Responsive Layout', 'Cloud Deployment'],
      milestoneTask: 'Deploy an original responsive personal profile website to the cloud',
    },
    {
      id: 'conf-mod-4',
      unitNumber: 4,
      title: 'Visual Design Literacy & Corporate Brand Systems',
      description: 'Typography rules, negative space, color palettes, and crafting digital collateral.',
      skills: ['Typographic Hierarchy', 'Brand Aesthetics', 'Visual Collateral'],
      milestoneTask: 'Design a digital marketing poster adhering to 60-30-10 color math',
    },
    {
      id: 'conf-mod-5',
      unitNumber: 5,
      title: 'Digital Media Production & Video Storytelling',
      description: 'Mobile video filming, editing suites, audio capture, and narrative pacing for digital channels.',
      skills: ['Mobile Storytelling', 'Video Editing', 'Audio Ducking'],
      milestoneTask: 'Produce a 60-second edited digital video pitch with clear audio',
    },
    {
      id: 'conf-mod-6',
      unitNumber: 6,
      title: 'Personal Financial Literacy & Capital Safety',
      description: 'Personal budgeting, digital financial literacy, currency market concepts, and risk awareness.',
      skills: ['Financial Literacy', 'Risk Management', 'Market Awareness'],
      milestoneTask: 'Complete the personal risk management assessment',
    },
    {
      id: 'conf-mod-7',
      unitNumber: 7,
      title: 'Digital Freelancing, Client Scopes & Remote Work Ethics',
      description: 'Structuring service proposals, contract scoping, client communication, and international payment basics.',
      skills: ['Client Scoping', 'Proposal Pitching', 'Professional Ethics'],
      milestoneTask: 'Draft a standard client service agreement and quotation template',
    },
    {
      id: 'conf-mod-8',
      unitNumber: 8,
      title: 'Capstone Project Exhibition & Peer Review',
      description: 'Final exhibition of student projects built during the conference with live instructor evaluation.',
      skills: ['Project Presentation', 'Peer Review', 'Portfolio Handoff'],
      milestoneTask: 'Submit capstone project repository, live URL, and reflective summary',
    },
  ],
};

// Helper to initialize or retrieve progress for a registration
export function getOrCreateStudentProgress(
  regId: string,
  programId: string,
  studentName: string,
  studentEmail: string,
  programName: string
): StudentProgressRecord {
  const storageKey = `rtoc_progress_${regId}`;
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      return JSON.parse(existing);
    }
  } catch {
    // fallback
  }

  // Look up module templates
  const templateKey = PROGRAM_MODULES[programId] ? programId : 'conference-general';
  const templates = PROGRAM_MODULES[templateKey] || PROGRAM_MODULES['conference-general'];

  const initialModules: SkillModule[] = templates.map((tmpl, idx) => ({
    ...tmpl,
    isCompleted: idx === 0, // default first unit as completed orientation
    completedAt: idx === 0 ? new Date().toISOString() : undefined,
  }));

  const initialRecord: StudentProgressRecord = {
    registrationId: regId,
    studentName: studentName || 'Registered Student',
    studentEmail: studentEmail || '',
    programId: programId || 'conference-general',
    programName: programName || 'RtoC LABS Training Program',
    modules: initialModules,
    capstoneTitle: '',
    capstoneProjectUrl: '',
    studentNotes: '',
    sessionsAttended: 1,
    totalSessions: 12,
    lastUpdated: new Date().toISOString(),
  };

  saveStudentProgress(initialRecord);
  return initialRecord;
}

export function saveStudentProgress(record: StudentProgressRecord): void {
  try {
    const storageKey = `rtoc_progress_${record.registrationId}`;
    localStorage.setItem(storageKey, JSON.stringify(record));

    // Also update progress percentage in master registrations list if found
    const allRegs = JSON.parse(localStorage.getItem('rtoc_registrations') || '[]');
    const total = record.modules.length;
    const completed = record.modules.filter((m) => m.isCompleted).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const updatedRegs = allRegs.map((r: any) => {
      if (r.id === record.registrationId) {
        return { ...r, progressPercentage: percentage };
      }
      return r;
    });
    localStorage.setItem('rtoc_registrations', JSON.stringify(updatedRegs));
  } catch {
    // storage error handling
  }
}

// Sample demonstration accounts so visitors can explore the Learning Progress Tracker immediately
export const DEMO_STUDENT_PROFILES = [
  {
    regId: 'RTOC-842915',
    studentName: 'Amina Wangari',
    email: 'amina.wangari@example.com',
    programId: 'prog-ai',
    programName: 'Artificial Intelligence & Smart Thinking',
    completedIndices: [0, 1, 2, 3, 4],
    capstoneTitle: 'AgriQuery — Voice AI Assistant for Smallholder Farmers',
    capstoneUrl: 'https://github.com/rtoc-students/agri-query-ai',
    notes: 'Completed prompt calibration exercises; currently testing audio model synthesis with local Swahili phrasing.',
    sessionsAttended: 8,
    totalSessions: 12,
  },
  {
    regId: 'RTOC-519302',
    studentName: 'Brian Mutua',
    email: 'brian.mutua@example.com',
    programId: 'prog-tech',
    programName: 'Technology & Software Development',
    completedIndices: [0, 1, 2, 3, 4, 5],
    capstoneTitle: 'SchoolTrack Africa — Minimalist Academic Transcripts Portal',
    capstoneUrl: 'https://github.com/rtoc-students/schooltrack-portal',
    notes: 'Backend REST API connected; schema migrations verified. Next: IoT telemetry demo module.',
    sessionsAttended: 9,
    totalSessions: 12,
  },
  {
    regId: 'RTOC-304812',
    studentName: 'Grace Achieng',
    email: 'grace.achieng@example.com',
    programId: 'conference-general',
    programName: 'RtoC LABS Digital Skills Learning Conference 2026',
    completedIndices: [0, 1, 2],
    capstoneTitle: 'Nairobi Artisans — Visual Branding & Digital Story Suite',
    capstoneUrl: '',
    notes: 'Attended Google Meet live lecture on prompt architecture and typography scales. Working on flyer layout.',
    sessionsAttended: 4,
    totalSessions: 12,
  },
];
