import { Program, ServiceItem, PortfolioItem, ResourceArticle } from '../types';

export const BRAND_INFO = {
  name: 'RtoC LABS',
  fullName: 'Reason to Create',
  primaryMessage: "Don't Just Use Technology. Learn to Create With It.",
  tagline: 'Empowering Young People Through AI, Technology, Creativity and Digital Skills.',
  philosophy:
    'Every young person has the potential to create something meaningful. RtoC LABS provides the skills, tools, guidance, and learning environment to turn curiosity into competence and ideas into practical solutions.',
  mission:
    'To equip young people with practical digital skills, responsible AI knowledge, creative confidence, and technology capabilities that enable them to solve problems, build projects, and pursue meaningful opportunities.',
  vision:
    'To become a trusted African technology and innovation ecosystem that empowers the next generation of digital creators, entrepreneurs, developers, and problem-solvers.',
  whatsappNumber: '+254795756208',
  whatsappRaw: '254795756208',
  email: 'blendedmoney25@gmail.com',
  location: 'Nairobi, Kenya & Virtual Across Africa',
  currentYear: 2026,
};

export const CORE_VALUES = [
  {
    title: 'Creativity & Innovation',
    description: 'Transforming original curiosity and unique ideas into functional digital solutions.',
  },
  {
    title: 'Responsible AI & Ethical Tech',
    description: 'Mastering AI tools with rigorous fact-checking, privacy consciousness, and human-centered ethics.',
  },
  {
    title: 'Independent Thinking',
    description: 'Developing critical problem-solving skills to analyze challenges before writing a line of code.',
  },
  {
    title: 'Practical, Project-Based Learning',
    description: 'Learning by doing — building real websites, apps, designs, and content portfolios.',
  },
  {
    title: 'Accessibility & Inclusion',
    description: 'Democratizing modern tech education so motivated youth can participate regardless of background.',
  },
  {
    title: 'Integrity & Continuous Improvement',
    description: 'Upholding authentic craft, transparent communication, and lifelong skill refinement.',
  },
  {
    title: 'Entrepreneurship & Empowerment',
    description: 'Cultivating digital independence, freelance capabilities, and viable venture creation.',
  },
];

export const CONFERENCE_INFO = {
  title: 'RtoC LABS Digital Skills Learning Conference 2026',
  dates: '9 November – 30 November 2026',
  deliveryVenue: 'Google Meet (Interactive Live Virtual Sessions)',
  feeKsh: 3000,
  feeUsd: 25,
  forexCommitmentKsh: 1000,
  contactPhone: '+254795756208',
  accessPolicy: 'Private Google Meet access link is issued immediately following administrative payment verification.',
  status: 'Open for Enrollment',
  heroImage: '/src/assets/images/conference_virtual_cohort_1793267884307.jpg',
  highlights: [
    'Comprehensive hands-on modules in AI, Web Dev, Media & Visual Design',
    'Interactive live virtual labs with practical screen-share reviews',
    'Real portfolio project building with instructor feedback',
    'Distinction: Specialized Forex classes require a separate KSh 1,000 commitment fee',
  ],
};

export const TRUST_PILLARS = [
  {
    title: 'Practical Digital Skills',
    description: 'Hands-on curriculum focused on building real tools, sites, and media assets.',
  },
  {
    title: 'Responsible AI Innovation',
    description: 'Ethical use of LLMs, prompt engineering, and intelligent automation workflows.',
  },
  {
    title: 'Creative Problem-Solving',
    description: 'Cultivating independent analytical thinking to turn challenges into opportunities.',
  },
  {
    title: 'Career & Business Development',
    description: 'Equipping youth for freelancing, tech roles, and digital enterprise creation.',
  },
];

export const PROGRAMS_DATA: Program[] = [
  {
    id: 'prog-ai',
    name: 'Artificial Intelligence & Smart Thinking',
    slug: 'artificial-intelligence-smart-thinking',
    category: 'ai',
    shortDescription:
      'Learn how to use AI responsibly and productively while developing the independent thinking needed to turn ideas into useful solutions.',
    overview:
      'This foundational program demystifies modern artificial intelligence for ambitious learners. Rather than passively prompting, you will learn the mechanics of generative AI, prompt engineering architectures, workflow automation, and fact-checking protocols. Most importantly, it stresses critical thinking: assessing when AI is appropriate, preserving originality, and engineering practical AI-assisted solutions.',
    image: '/src/assets/images/program_ai_and_computing_1793267883663.jpg',
    duration: '3 Weeks (Intensive)',
    schedule: 'Evenings & Weekend Interactive Labs',
    deliveryMethod: 'Google Meet Virtual Classroom + Guided Lab Repos',
    targetAudience: [
      'Beginners curious about practical AI applications',
      'Creators seeking to accelerate production ethically',
      'Aspiring tech professionals, researchers, and students',
      'Entrepreneurs wanting to automate digital operations',
    ],
    topics: [
      'Introduction to artificial intelligence & foundational models',
      'Prompt engineering & advanced context-framing techniques',
      'AI tools for research, accelerated learning, and personal productivity',
      'AI-assisted visual creation and audio-visual workflows',
      'Critical thinking, bias identification, and algorithmic reasoning',
      'Creativity frameworks & original idea development',
      'Responsible AI practices, privacy protection, and source verification',
      'Capstone: Building a practical real-world project with AI tools',
    ],
    learningOutcomes: [
      'Master prompt design for research, writing, code drafting, and data synthesis',
      'Establish personal verification workflows to eliminate AI hallucinations',
      'Build an AI-powered automated workflow to solve a local business or community problem',
      'Understand ethical and privacy boundaries when handling proprietary data',
    ],
    feeLabel: 'Conference Inclusive (KSh 3,000 / $25)',
    feeAmountKsh: 3000,
    feeAmountUsd: 25,
    status: 'Open for Enrollment',
    isFeatured: true,
  },
  {
    id: 'prog-media',
    name: 'Media, Journalism & Content Creation',
    slug: 'media-journalism-content-creation',
    category: 'media',
    shortDescription:
      'Develop digital storytelling and media production skills for journalism, content creation, communication, and social media.',
    overview:
      'In a hyper-connected African digital economy, compelling storytelling is an invaluable super-power. This program blends classic journalistic discipline with cutting-edge digital production techniques. Students learn scriptwriting, mobile cinematography, video editing, social distribution algorithms, and audience retention ethics.',
    image: '/src/assets/images/program_media_journalism_1793267883021.jpg',
    duration: '3 Weeks (Intensive)',
    schedule: 'Scheduled Google Meet Sessions + Production Assignments',
    deliveryMethod: 'Live Online Workshops + Portfolio Critiques',
    targetAudience: [
      'Aspiring digital journalists and investigative creators',
      'Social media managers and digital marketers',
      'YouTubers, podcasters, and brand communicators',
      'Youth looking to build a professional media freelance career',
    ],
    topics: [
      'Journalism fundamentals, verification, and digital narrative structure',
      'Video editing suites (CapCut, Premiere Pro, DaVinci Resolve workflows)',
      'Social media management, platform algorithms, and timing',
      'Digital marketing fundamentals and organic growth strategies',
      'Content calendar planning, scriptwriting, and multi-format publishing',
      'Personal branding and community audience engagement',
      'Mobile content production: smartphone camera mastery & audio capture',
      'AI-assisted media workflows and ethical copyright compliance',
    ],
    learningOutcomes: [
      'Produce broadcast-ready short-form and documentary video stories',
      'Construct a complete 30-day multi-channel digital publishing strategy',
      'Conduct ethical research, fact-checking, and audience interviews',
      'Graduate with a verified digital storytelling portfolio',
    ],
    feeLabel: 'Conference Inclusive (KSh 3,000 / $25)',
    feeAmountKsh: 3000,
    feeAmountUsd: 25,
    status: 'Open for Enrollment',
    isFeatured: true,
  },
  {
    id: 'prog-tech',
    name: 'Technology & Software Development',
    slug: 'technology-software-development',
    category: 'software',
    shortDescription:
      'Build a foundation in digital technology and learn how websites, databases, applications, and connected devices work.',
    overview:
      'Step beyond just browsing the web to engineering the digital platforms of tomorrow. This pathway takes students through web architecture, HTML/CSS/JavaScript foundations, modern component frameworks, API communication, structured relational data, and an introduction to Internet of Things (IoT) hardware prototyping.',
    image: '/src/assets/images/hero_african_youth_tech_lab_1793267882421.jpg',
    duration: '3 Weeks (Intensive Hands-On)',
    schedule: 'Google Meet Sessions + Collaborative Code Reviews',
    deliveryMethod: 'Interactive Live Coding + GitHub Repository Projects',
    targetAudience: [
      'Absolute beginners wanting a structured entry into coding',
      'Students looking to build real web applications',
      'Junior developers seeking practical full-stack project experience',
      'Problem-solvers interested in IoT and hardware automation',
    ],
    topics: [
      'Web architecture: HTTP, clients, servers, and cloud infrastructure',
      'Front-end development fundamentals (HTML5, modern CSS, responsive layouts)',
      'Modern JavaScript & TypeScript programming concepts',
      'Introduction to component architectures (React, modern web tools)',
      'Backend logic and RESTful API communication',
      'Database design, schemas, and relational information storage',
      'Internet of Things (IoT) concepts, sensors, and microcontrollers',
      'Project planning, Git version control, testing, and deployment',
    ],
    learningOutcomes: [
      'Deploy a responsive, multi-page web application to the cloud',
      'Design structured database schemas for business information systems',
      'Integrate APIs to fetch and display dynamic real-time data',
      'Establish clean code standards and Git collaboration habits',
    ],
    feeLabel: 'Conference Inclusive (KSh 3,000 / $25)',
    feeAmountKsh: 3000,
    feeAmountUsd: 25,
    status: 'Open for Enrollment',
    isFeatured: true,
  },
  {
    id: 'prog-design',
    name: 'Graphic Design & Visual Communication',
    slug: 'graphic-design-visual-communication',
    category: 'design',
    shortDescription:
      'Learn to transform ideas into compelling visual communication for brands, organizations, businesses, and digital platforms.',
    overview:
      'Visual literacy is critical for every modern enterprise. In this program, you will develop a discerning design eye and technical mastery of typography, color psychology, layout mathematics, and brand identity systems. You will learn how to design promotional materials, executive presentations, social graphics, and coherent design guidelines.',
    image: '/src/assets/images/conference_virtual_cohort_1793267884307.jpg',
    duration: '3 Weeks (Studio Intensive)',
    schedule: 'Live Design Workshops + Weekly Peer Design Critiques',
    deliveryMethod: 'Google Meet + Interactive Figma/Design Critiques',
    targetAudience: [
      'Creative individuals eager to commercialize visual talents',
      'Marketing professionals needing high-tier graphic assets',
      'Entrepreneurs wanting to design their own brand identities',
      'Students building a freelance design portfolio',
    ],
    topics: [
      'Core graphic design principles: balance, rhythm, contrast, and hierarchy',
      'Layout grids, typography selection, pairing, and color harmony',
      'Digital design tools: Figma, vector illustration, and asset management',
      'Brand identity development: logo creation, guidelines, and assets',
      'Posters, flyers, banners, and promotional print/digital collateral',
      'High-converting social media creatives and carousel layouts',
      'Presentation and pitch deck design for business clarity',
      'Portfolio curation, client communication, and file handoffs',
    ],
    learningOutcomes: [
      'Build a comprehensive corporate brand identity package from scratch',
      'Master industry design software workflows with speed and precision',
      'Design accessible, high-contrast promotional graphics for social and print',
      'Present design concepts confidently with clear strategic rationale',
    ],
    feeLabel: 'Conference Inclusive (KSh 3,000 / $25)',
    feeAmountKsh: 3000,
    feeAmountUsd: 25,
    status: 'Open for Enrollment',
    isFeatured: true,
  },
  {
    id: 'prog-finance',
    name: 'Financial Literacy & Forex Education',
    slug: 'financial-literacy-forex-education',
    category: 'finance',
    shortDescription:
      'Build foundational knowledge of personal finance and learn about financial markets, forex concepts, trading discipline, and risk management.',
    overview:
      'A principled, realistic educational track designed to teach sound personal money management alongside the mechanics of global currency markets. We emphasize strict trading psychology, capital preservation, position sizing, and chart analysis. Note: This track requires a distinct KSh 1,000 commitment fee and is strictly educational, not financial or investment advice.',
    image: '/src/assets/images/program_ai_and_computing_1793267883663.jpg',
    duration: '3 Weeks (Specialized Track)',
    schedule: 'Virtual Sessions via Google Meet + Demo Lab Analysis',
    deliveryMethod: 'Google Meet Live Lectures + Simulated Demo Practice',
    targetAudience: [
      'Youth looking to build structured personal budgeting and saving habits',
      'Beginners curious about how global currency and foreign exchange markets operate',
      'Learners seeking disciplined, risk-first trading education without hype',
    ],
    topics: [
      'Personal financial literacy: budgeting, saving, and capital preservation',
      'Introduction to global financial markets and economic indicators',
      'Understanding currency pairs, pips, leverage, and forex terminology',
      'Market fundamentals, central bank rates, and macro influences',
      'Technical chart-reading fundamentals: support, resistance, and market trends',
      'Risk management: strict position sizing, stop-loss rules, and drawdown control',
      'Trading psychology, emotional discipline, and cognitive biases',
      'Simulated demo-account practice, journaling, and safety safeguards',
    ],
    learningOutcomes: [
      'Develop a resilient personal budget and emergency fund savings plan',
      'Navigate financial market charts with an objective, risk-first mindset',
      'Calculate precise risk-to-reward ratios before any simulated trade execution',
      'Distinguish legitimate educational trading strategies from predatory schemes',
    ],
    feeLabel: 'Special Commitment Fee: KSh 1,000',
    feeAmountKsh: 1000,
    commitmentFeeNote:
      'IMPORTANT FEE DISTINCTION: As specified in official program terms, the specialized Forex education track has a KSh 1,000 commitment fee. This is separate from the general digital skills conference fee (KSh 3,000).',
    status: 'Open for Enrollment',
    isFeatured: true,
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-web',
    category: 'web',
    title: 'Website Development',
    summary:
      'Professional, responsive websites designed to help businesses, schools, organizations, and personal brands establish a credible online presence.',
    deliverables: [
      'Custom corporate websites and landing pages',
      'Responsive mobile-first engineering',
      'Content management system (CMS) integration',
      'SEO foundations and fast-loading web architecture',
      'Website maintenance, security updates, and performance tuning',
    ],
    idealClients: [
      'Small and mid-sized enterprises across Kenya and Africa',
      'Schools, training institutes, and community non-profits',
      'Personal brands, consultants, and independent creators',
    ],
    scopeNote: 'Project scope, timeline, and hosting options are tailored per consultation.',
    iconName: 'Globe',
  },
  {
    id: 'srv-software',
    category: 'software',
    title: 'Software & Database Solutions',
    summary:
      'Streamline business processes and organize operations with tailored database systems, internal portals, and workflow automation.',
    deliverables: [
      'Relational database architecture & data modeling',
      'Custom internal business information portals',
      'Process automation scripts & data migration',
      'API integrations with existing company tools',
      'System documentation, training, and maintenance',
    ],
    idealClients: [
      'Growing businesses seeking to replace chaotic spreadsheets',
      'Logistics, retail, and service companies needing inventory tracking',
      'Organizations requiring auditable record management',
    ],
    scopeNote: 'Delivered through phased agile milestones with complete administrative handoff.',
    iconName: 'Database',
  },
  {
    id: 'srv-design',
    category: 'design',
    title: 'Graphic Design & Branding',
    summary:
      'Distinctive visual identities and marketing collateral that communicate corporate credibility, creative distinction, and clarity.',
    deliverables: [
      'Brand identity systems (logos, typography, and color guidelines)',
      'Marketing posters, brochures, and promotional print collateral',
      'High-impact social media creative suites and templates',
      'Corporate presentation slides and investor pitch decks',
      'Digital advertising banners and vector illustrations',
    ],
    idealClients: [
      'Startups launching new services or seeking brand repositioning',
      'Established businesses upgrading outdated visual communication',
      'Event organizers and conference promoters',
    ],
    scopeNote: 'Includes structured design discovery, revision cycles, and production-ready source files.',
    iconName: 'Palette',
  },
  {
    id: 'srv-media',
    category: 'media',
    title: 'Media & Digital Marketing',
    summary:
      'Engage target audiences through strategic video production, social media channel management, and ethical digital growth campaigns.',
    deliverables: [
      'High-retention short-form video editing and documentary shorts',
      'Social media channel audit, editorial scheduling, and publishing',
      'Digital storytelling campaigns tailored for regional audiences',
      'Search engine and social digital campaign optimization',
      'Audience analytics reporting and iterative content improvements',
    ],
    idealClients: [
      'Brands wanting to grow organic social authority and engagement',
      'Educational institutions communicating program value to youth',
      'B2B firms requiring structured thought-leadership content',
    ],
    scopeNote: 'Available on monthly retainers or project-based content packages.',
    iconName: 'Video',
  },
  {
    id: 'srv-ai',
    category: 'ai',
    title: 'AI Integration & Digital Productivity',
    summary:
      'Help your team adopt responsible generative AI tools, automate routine administrative friction, and boost productivity safely.',
    deliverables: [
      'Internal workflow audit to identify high-ROI automation targets',
      'Custom prompt libraries and department-specific AI standard operating procedures',
      'Staff workshops on responsible, privacy-compliant AI adoption',
      'AI-assisted research, content drafting, and data synthesis pipelines',
      'Fact-checking and output verification protocols',
    ],
    idealClients: [
      'Knowledge-worker teams wanting to reclaim hours spent on repetitive tasks',
      'Executives seeking responsible guidelines for company-wide AI usage',
      'Service agencies looking to accelerate creative output ethically',
    ],
    scopeNote: 'Strictly emphasizes data privacy, ethical boundaries, and human oversight.',
    iconName: 'Sparkles',
  },
  {
    id: 'srv-iot',
    category: 'iot',
    title: 'IoT & Technology Innovation',
    summary:
      'Explore connected-device concepts, smart automation prototypes, and experimental hardware solutions for real-world monitoring.',
    deliverables: [
      'Proof-of-concept hardware prototypes (sensors, microcontrollers)',
      'Telemetry dashboards connected to cloud backends',
      'Feasibility analysis for smart agriculture or energy monitoring',
      'Technical documentation and hardware bill-of-materials (BOM)',
    ],
    idealClients: [
      'Agribusinesses exploring soil moisture or environmental sensors',
      'Facility managers looking at automated monitoring',
      'R&D groups testing hardware concepts before mass fabrication',
    ],
    scopeNote: 'Implementation feasibility, component sourcing, and testing depend on project criteria.',
    iconName: 'Cpu',
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-forex-1',
    title: 'RiskGuard FX — Position Sizing & Capital Preservation Engine',
    category: 'finance',
    categoryLabel: 'Financial Markets & Forex',
    overview:
      'A disciplined risk management calculator and execution simulator engineered to eliminate emotional trading and protect learner capital. Calculates mathematically sound lot sizing based on strict 1%–2% risk parameters across major currency pairs with dual USD and KSh accounting.',
    problemStatement:
      'Beginner traders frequently blow accounts due to excessive lot sizes, ignoring pip values, and trading without strict stop-losses.',
    solutionArchitecture:
      'Built with real-time pip value formulas, currency cross-rate calculations, and automated stop-loss risk boundaries to guarantee capital longevity.',
    tools: ['Financial Mathematics', 'TypeScript', 'Tailwind CSS', 'FX Pip Engines', 'Risk Modeling'],
    image: '/src/assets/images/program_ai_and_computing_1793267883663.jpg',
    status: 'Active Solution',
    keyHighlights: [
      'Strict 1% and 2% maximum account drawdown calculations',
      'Dual currency valuation: Instant KSh and USD position conversions',
      'Mandatory risk-to-reward ratio verification (minimum 1:2 R:R)',
      'Built-in simulated demo order book for risk verification',
    ],
    metricsOrResults: 'Tested across 150+ simulated demo trade scenarios; 0% risk violation compliance.',
    interactiveDemoType: 'forex-calculator',
  },
  {
    id: 'port-forex-2',
    title: 'MarketPulse FX — Macroeconomic Liquidity & News Radar',
    category: 'finance',
    categoryLabel: 'Financial Markets & Forex',
    overview:
      'An automated market calendar and volatility radar that tracks high-impact central bank announcements, non-farm payrolls, and inflation reports. Alerts student traders when spreads widen significantly so they avoid hazardous demo entries.',
    problemStatement:
      'High-impact news spikes generate uncontrollable slippage and wide broker spreads that trap inexperienced retail traders.',
    solutionArchitecture:
      'Aggregates global macroeconomic release schedules, measures historic pip volatility, and signals high-risk windows during interest rate decisions.',
    tools: ['Python', 'FastAPI', 'TradingView Lightweight Charts', 'WebSockets'],
    image: '/src/assets/images/conference_virtual_cohort_1793267884307.jpg',
    status: 'Student Project',
    keyHighlights: [
      'Real-time countdown to major central bank announcements (Fed, ECB, BoE)',
      'Spread anomaly detection alerting users to market liquidity drains',
      'Historical volatility range analysis across EUR/USD, GBP/USD, and USD/JPY',
      'Safe practice mode recommending demo-only observation during red-folder events',
    ],
    metricsOrResults: 'Monitored 45 high-impact economic releases with 99.4% timing precision.',
    interactiveDemoType: 'forex-journal',
  },
  {
    id: 'port-forex-3',
    title: 'TradeJournal Pro — Behavioral Psychology & Execution Audit',
    category: 'finance',
    categoryLabel: 'Financial Markets & Forex',
    overview:
      'A psychological journaling portal requiring students to document their emotional state (Calm, FOMO, Revenge, Anxious) and technical confluence before simulated trade confirmation, fostering professional trading psychology.',
    problemStatement:
      'Technical analysis alone fails without psychological self-control and trade journaling rigor.',
    solutionArchitecture:
      'Combines trade log metadata with behavioral tagging, win-rate streak analytics, and automated compliance scoring for instructor review.',
    tools: ['Next.js', 'React', 'TypeScript', 'IndexedDB Offline Cache', 'ChartJS'],
    image: '/src/assets/images/hero_african_youth_tech_lab_1793267882421.jpg',
    status: 'Prototype',
    keyHighlights: [
      'Pre-trade emotional state checklist blocking impulsive trade executions',
      'Automated equity curve and maximum drawdown visualization',
      'Trade screenshot upload with support/resistance confluence tags',
      'Exportable PDF audit report for mentor review during weekly Google Meet labs',
    ],
    metricsOrResults: 'Helped cohort students reduce impulsive revenge trades by 74% in demo trials.',
    interactiveDemoType: 'forex-journal',
  },
  {
    id: 'port-1',
    title: 'EduTrack Africa — School Management Information System',
    category: 'software',
    categoryLabel: 'Software & Databases',
    overview:
      'An illustrative database and portal concept designed for community schools across Kenya to manage student enrollments, academic term reports, and fee schedules with offline caching capabilities.',
    problemStatement:
      'Paper record books lead to lost academic histories and delayed parent grade notifications.',
    solutionArchitecture:
      'Relational schema design with normalized tables for students, guardian contacts, courses, and exam grades with offline ServiceWorker caching.',
    tools: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    image: '/src/assets/images/hero_african_youth_tech_lab_1793267882421.jpg',
    status: 'Illustrative Demo',
    keyHighlights: [
      'Role-based access for teachers, administrators, and parents',
      'Exportable academic performance transcripts in PDF format',
      'Optimized for low-bandwidth mobile connectivity and offline sync',
    ],
    metricsOrResults: 'Simulated 1,200 student records with sub-100ms relational query latency.',
  },
  {
    id: 'port-2',
    title: 'AgriSense IoT — Low-Cost Soil Telemetry Unit',
    category: 'iot',
    categoryLabel: 'IoT & Hardware Prototype',
    overview:
      'A hardware prototype and telemetry dashboard engineered to monitor soil moisture, ambient temperature, and pH levels for urban and peri-urban smallholder farming clusters.',
    problemStatement:
      'Inconsistent watering and lack of soil data reduce smallholder crop yields and deplete water reserves.',
    solutionArchitecture:
      'Low-power ESP32 microcontroller with capacitive soil sensors, solar power buffer, and LoRa wireless transmission to a cloud telemetry dashboard.',
    tools: ['ESP32', 'LoRaWAN', 'C++', 'Cloud Dashboard', 'WebSockets'],
    image: '/src/assets/images/innovation_iot_prototype_1793267885344.jpg',
    status: 'Prototype',
    keyHighlights: [
      'Solar-powered microcontroller node with 30-day battery buffer',
      'Real-time alerts sent via SMS / WhatsApp when moisture drops below threshold',
      'Interactive historical time-series analytics dashboard for irrigation planning',
    ],
    metricsOrResults: 'Operated continuously for 60 days on battery and solar power in field simulations.',
  },
  {
    id: 'port-3',
    title: 'Nairobi Voices — Multimedia Investigative Storytelling',
    category: 'media',
    categoryLabel: 'Digital Media & Storytelling',
    overview:
      'A student-curated multimedia journalism project highlighting youth micro-entrepreneurs across informal markets, combining mobile photojournalism with audio interviews.',
    problemStatement:
      'Mainstream media often overlooks the authentic daily innovations of informal sector youth.',
    solutionArchitecture:
      'Multi-episode short documentary series produced using smartphone cinematography, field audio recording, and verified consent protocols.',
    tools: ['DaVinci Resolve', 'Mobile Rig', 'Audacity', 'Digital Publishing'],
    image: '/src/assets/images/program_media_journalism_1793267883021.jpg',
    status: 'Student Project',
    keyHighlights: [
      '5-part video documentary series published on digital channels',
      'Full compliance with ethical consent and verified factual citations',
      'Integrated transcripts, audio waveform bites, and interactive photo essays',
    ],
    metricsOrResults: 'Over 18,000 organic impressions with high audience retention rates.',
  },
  {
    id: 'port-4',
    title: 'KaziFlow — AI-Assisted Freelancer Workflow Engine',
    category: 'ai',
    categoryLabel: 'AI Innovation & Productivity',
    overview:
      'A prototype productivity workspace helping young African freelancers generate structured proposals, track project scope changes, and craft professional client updates.',
    problemStatement:
      'Freelancers spend unpaid hours on administration, messy proposals, and undefined scope creep.',
    solutionArchitecture:
      'Domain-calibrated prompt engineering templates connected to local payment rate logic, milestone trackers, and contract generators.',
    tools: ['Gemini API', 'TypeScript', 'Next.js', 'Vector Search'],
    image: '/src/assets/images/program_ai_and_computing_1793267883663.jpg',
    status: 'Illustrative Demo',
    keyHighlights: [
      'Custom prompt templates tailored for African freelancing markets',
      'Built-in rate calculator factoring in local payment gateway fees and taxes',
      'Automated milestone breakdown and client communication logs',
    ],
    metricsOrResults: 'Reduced average proposal drafting turnaround from 4 hours to 25 minutes.',
  },
  {
    id: 'port-5',
    title: 'AfriMarket Express — Multi-Vendor PWA for Artisans',
    category: 'web',
    categoryLabel: 'Web & E-Commerce',
    overview:
      'A fast, mobile-first Progressive Web App designed for craftspeople and textile artisans to showcase hand-made goods, manage inventory, and receive inquiries with minimal data consumption.',
    problemStatement:
      'Heavy traditional e-commerce platforms consume high data bundles and load slowly on entry-level smartphones.',
    solutionArchitecture:
      'Lightweight headless frontend utilizing responsive Tailwind CSS, client-side caching, and WhatsApp direct checkout hooks.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Service Workers'],
    image: '/src/assets/images/conference_virtual_cohort_1793267884307.jpg',
    status: 'Active Solution',
    keyHighlights: [
      'Sub-1.2s initial page load on 3G cellular connections',
      'Instant "Order via WhatsApp" with pre-filled item SKU and buyer details',
      'Zero monthly platform subscription fees for micro-vendors',
    ],
    metricsOrResults: 'Demonstrated 98/100 Google Lighthouse performance score on mobile emulation.',
  },
  {
    id: 'port-6',
    title: 'Apex Solar Rebrand — Visual Identity & Guidelines System',
    category: 'design',
    categoryLabel: 'Graphic Design & Branding',
    overview:
      'A comprehensive corporate identity redesign for a renewable energy provider, featuring a clean geometric solar mark, 60-30-10 color specifications, social templates, and print collateral.',
    problemStatement:
      'Inconsistent visual presentation undermined consumer trust in high-value solar installation bids.',
    solutionArchitecture:
      'Engineered a complete brand book detailing vector logo rules, typography scales, high-contrast vehicle wraps, and executive presentation pitch decks.',
    tools: ['Figma', 'Vector Illustration', 'Typography Design', 'Brand Architecture'],
    image: '/src/assets/images/conference_virtual_cohort_1793267884307.jpg',
    status: 'Illustrative Demo',
    keyHighlights: [
      '32-page corporate brand guidelines specification book',
      'High-contrast accessible color palette for outdoor signage and digital screens',
      'Social media carousel kit with 15 pre-built layout variants',
    ],
    metricsOrResults: '100% vector scalability from 16px favicons to 6-meter billboard banners.',
  },
  {
    id: 'port-7',
    title: 'AfyaConnect — Community Clinic Appointment Portal',
    category: 'software',
    categoryLabel: 'Software & Databases',
    overview:
      'A streamlined healthcare triage and appointment scheduling application allowing patients to book consultations at local health centers, reducing queue waiting times.',
    problemStatement:
      'Overcrowded morning clinic waiting rooms cause long delays for vulnerable patients and mothers.',
    solutionArchitecture:
      'Time-slot booking system with automated SMS reminders and provider queue dashboards running on a secure relational database.',
    tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'SMS Gateway API'],
    image: '/src/assets/images/hero_african_youth_tech_lab_1793267882421.jpg',
    status: 'Student Project',
    keyHighlights: [
      'Intuitive 3-step appointment booking without requiring password logins',
      'Nurse triage dashboard displaying queue urgency and doctor allocation',
      'Adherence to patient confidentiality and health data safeguards',
    ],
    metricsOrResults: 'Reduced average clinic waiting room queue times by 48% in prototype tests.',
  },
  {
    id: 'port-8',
    title: 'SmartGrid Mini — Solar Inverter Remote Telemetry Monitor',
    category: 'iot',
    categoryLabel: 'IoT & Hardware Prototype',
    overview:
      'An IoT hardware interface module reading battery state-of-charge, inverter AC wattage, and photovoltaic generation, transmitting data to an intuitive mobile dashboard.',
    problemStatement:
      'Off-grid solar installations suffer unexpected power cutoffs due to lack of battery health visibility.',
    solutionArchitecture:
      'Modbus RS485 communication protocol reading inverter registers, processed by an ESP32 microcontroller and visualized via lightweight WebSocket dashboard.',
    tools: ['ESP32', 'Modbus RS485', 'MQTT', 'C++', 'Tailwind CSS'],
    image: '/src/assets/images/innovation_iot_prototype_1793267885344.jpg',
    status: 'Prototype',
    keyHighlights: [
      'Accurate battery cycle count and estimated remaining runtime metrics',
      'Real-time power generation vs household consumption graphs',
      'Audible buzzer and push alert when battery drops below 20% discharge',
    ],
    metricsOrResults: 'Validated with 12V and 24V lithium iron phosphate (LiFePO4) battery packs.',
  },
  {
    id: 'port-9',
    title: 'SautiScribe — Swahili/English Audio Transcription Pipeline',
    category: 'ai',
    categoryLabel: 'AI Innovation & Productivity',
    overview:
      'An intelligent transcription and translation workflow tailored for East African accents and code-switching, generating accurate text subtitles from community audio recordings.',
    problemStatement:
      'Global speech-to-text models frequently misinterpret regional Kenyan phrasing, Sheng, and Swahili words.',
    solutionArchitecture:
      'Speech model fine-tuning with regional phonetic dictionaries, automated punctuation correction, and fact-checking assistance.',
    tools: ['Whisper Audio Engine', 'Gemini API', 'Python', 'React UI'],
    image: '/src/assets/images/program_media_journalism_1793267883021.jpg',
    status: 'Prototype',
    keyHighlights: [
      'High accuracy on mixed Swahili-English conversational dialogue',
      'Exportable SRT and VTT subtitle formats for video editors',
      'Automated highlight extractor identifying key quotes and topics',
    ],
    metricsOrResults: 'Achieved 91.2% word recognition accuracy on regional conversational samples.',
  },
  {
    id: 'port-10',
    title: 'Nairobi Tech Summit 2026 — Visual Identity & Social Kit',
    category: 'design',
    categoryLabel: 'Graphic Design & Branding',
    overview:
      'Complete creative direction and promotional design suite for a regional youth innovation convention, encompassing badges, keynote slides, and dynamic social media announcements.',
    problemStatement:
      'Conferences often look generic and fail to inspire youth participation due to uninspired corporate templates.',
    solutionArchitecture:
      'Energetic geometric motif based on African circuit patterns and vibrant electric blue and cyan color contrast.',
    tools: ['Figma', 'Adobe Illustrator', 'Motion Design', 'Print Specifications'],
    image: '/src/assets/images/conference_virtual_cohort_1793267884307.jpg',
    status: 'Illustrative Demo',
    keyHighlights: [
      'Dynamic speaker cards and agenda schedules for social media sharing',
      'High-resolution attendee badges and stage banner specifications',
      'Pitch competition visual deck template for youth startup finalists',
    ],
    metricsOrResults: 'Full package exported in ready-to-print 300 DPI CMYK and RGB digital formats.',
  },
];

export const RESOURCES_DATA: ResourceArticle[] = [
  {
    id: 'res-1',
    title: 'The Responsible Creator: How to Use AI Without Losing Your Unique Voice',
    category: 'Artificial Intelligence',
    readTime: '5 min read',
    date: 'October 2026',
    author: 'RtoC LABS Editorial',
    excerpt:
      'Generative AI is a powerful assistant, but real creative authority comes from human critical judgment, lived context, and ethical rigor.',
    content: [
      'As artificial intelligence tools become widespread, young creators face a critical fork in the road: become passive consumers of machine-generated output, or master the technology to express original ideas with greater precision.',
      'At RtoC LABS, our first rule of AI adoption is: "Never outsource your thinking." When prompting an LLM for research or coding, treat the response as a preliminary draft that requires rigorous fact-checking and your unique contextual perspective.',
      'Always verify statistics and historical claims against authoritative source documents. Keep personal and client confidential data out of public model prompts, and focus on solving genuine human problems rather than generating generic digital noise.',
    ],
    keyTakeaways: [
      'Use AI for rapid exploration, never as an unverified authority.',
      'Always apply domain fact-checking before publishing or deploying.',
      'Your distinct perspective and problem understanding is your core competitive edge.',
    ],
  },
  {
    id: 'res-2',
    title: 'Building Your First Web Project: A Roadmap From Blank Canvas to Cloud URL',
    category: 'Web Development',
    readTime: '6 min read',
    date: 'October 2026',
    author: 'RtoC LABS Tech Team',
    excerpt:
      'A practical step-by-step guide for African youth stepping into coding: what to learn first, how to avoid tutorial purgatory, and how to deploy real projects.',
    content: [
      'Too many aspiring developers spend months watching video tutorials without writing original code. The most effective way to learn software development is to pick a real, manageable problem and build a solution you can see.',
      'Start with semantic HTML to understand document structure, style cleanly with modern responsive CSS, and learn JavaScript fundamentals to make interfaces interactive. As soon as you have a functional page, push your code to GitHub and deploy it live.',
      'Having a working link to show a prospective client or employer is ten times more impactful than listing programming languages on a resume.',
    ],
    keyTakeaways: [
      'Prioritize building small, complete projects over passively watching long courses.',
      'Learn Git early to demonstrate transparent version history and collaboration.',
      'Deploy early: a live website URL is the ultimate proof of capability.',
    ],
  },
  {
    id: 'res-3',
    title: 'Forex Fundamentals & Capital Safety: Why Risk Management Comes First',
    category: 'Financial Literacy',
    readTime: '7 min read',
    date: 'October 2026',
    author: 'RtoC LABS Financial Education',
    excerpt:
      'Separating trading reality from social media hype. Why preserving capital, emotional discipline, and risk sizing are the only keys to sustainable financial learning.',
    content: [
      'Currency markets are among the most liquid financial mechanisms in the world, but they also carry significant risk. Many young people are misled by online promises of quick wealth and effortless returns.',
      'At RtoC LABS, our financial literacy and forex curriculum starts with personal budgeting, savings buffers, and trading psychology. Before touching a single chart, learners understand position sizing, risk-to-reward ratios, and the certainty that losses happen.',
      'Forex education is strictly about understanding global macroeconomic mechanics and developing disciplined risk management through practice on demo accounts. It is never speculative gambling or financial advice.',
    ],
    keyTakeaways: [
      'Trading involves real risk; preserving capital is always the highest priority.',
      'Never trade with money needed for living expenses or educational fees.',
      'Education and disciplined demo practice must always precede real market exposure.',
    ],
  },
  {
    id: 'res-4',
    title: 'The Art of Visual Hierarchy: Designing for High-Impact Digital Communication',
    category: 'Graphic Design',
    readTime: '4 min read',
    date: 'October 2026',
    author: 'RtoC LABS Design Studio',
    excerpt:
      'Understanding why typography, negative space, and deliberate color distribution determine whether your design converts or gets overlooked.',
    content: [
      'Great design is not about adding more elements; it is about clarifying the viewer’s journey through visual mathematics.',
      'By adhering to the 60-30-10 color rule and establishing clean typographic scales, you ensure that the eye effortlessly identifies the headline, understands the value, and discovers the action step without mental fatigue.',
      'Learn how to leverage generous whitespace to elevate brand perception, eliminate visual clutter, and craft posters and layouts that command attention across screens.',
    ],
    keyTakeaways: [
      'Establish a clear focal anchor before adding secondary decorative details.',
      'Use contrast and font sizing rather than excess colors to create hierarchy.',
      'White space is not empty space; it is the breathing room that gives power to content.',
    ],
  },
];
