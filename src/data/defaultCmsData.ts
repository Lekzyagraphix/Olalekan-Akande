import type {
  ProfileData,
  Project,
  SeoPageConfig,
  ServiceItem,
  SiteSettings,
} from '../types/cms';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'AKANDE OLALEKAN',
  creativeIdentity: 'LEKZY GRAPHICS',
  monogram: 'AO',
  logoUrl: '',
  primaryColor: '#E31B23',
  blackColor: '#111111',
  whiteColor: '#FFFFFF',
  headingFont: 'Sora',
  bodyFont: 'Manrope',
  contactEmail: 'olalekanakande007@gmail.com',
  whatsappNumber: '+2348162541505',
  behanceUrl: 'https://www.behance.net/lagraphix',
  instagramUrl: 'https://www.instagram.com/lekzy_a_graphics/',
  pinterestUrl: 'https://www.pinterest.com/Lekzy_a_graphics/',
  linkedinUrl: '',
  announcementEnabled: true,
  announcementText:
    'AVAILABLE FOR SELECT FREELANCE PROJECTS AND REMOTE OPPORTUNITIES. LET’S CONNECT.',
  heroLabel: "HELLO, I'M AKANDE OLALEKAN.",
  heroHeadline:
    'I DESIGN DIGITAL EXPERIENCES, BUILD BRANDS AND CREATE SOLUTIONS THAT MATTER.',
  heroHighlightWords: 'DIGITAL EXPERIENCES, BRANDS, MATTER',
  heroSupportingText:
    "I'm Akande Olalekan, a multidisciplinary digital creative specializing in product design, brand identity, visual communication and web design.\n\nI work with businesses, startups and individuals to transform ideas into meaningful digital experiences and compelling visual identities.\n\nWith a combination of creativity, strategic thinking and technical understanding, I create designs that don't just look good but communicate clearly, solve problems and help brands connect with their audiences.",
  heroLocationText: 'Based in Lagos, Nigeria.',
  heroAvailabilityRemote: 'Available for Remote Projects Worldwide.',
  heroAvailabilityTypes: 'Open to Freelance, Contract and Full-Time Opportunities.',
  footerHeadline: 'IDEAS INTO DESIGN. DESIGN INTO IMPACT.',
  footerDescription:
    "I'm Akande Olalekan, a multidisciplinary designer creating meaningful brand identities, digital experiences and creative solutions for businesses and individuals.",
  footerCtaTitle: 'HAVE A PROJECT IN MIND?',
  footerCtaSubtitle: "Let's make something meaningful together.",
  footerCopyright: '© 2026 Akande Olalekan. All rights reserved.',
  statsItems: [
    { value: '6+ Years', label: 'Creative Experience' },
    { value: 'Multi-Sector', label: 'Industries Served' },
    { value: 'Full-Scope', label: 'Branding, Design & Web Development' },
    { value: 'Worldwide', label: 'Remote Collaborations' },
  ],
  budgetRangesNgn: [
    '₦150,000 – ₦300,000',
    '₦300,000 – ₦600,000',
    '₦600,000 – ₦1,200,000',
    '₦1,200,000+',
  ],
  budgetRangesUsd: [
    '$300 – $750',
    '$750 – $1,500',
    '$1,500 – $3,500',
    '$3,500+',
  ],
  budgetRangesGbp: [
    '£250 – £600',
    '£600 – £1,200',
    '£1,200 – £2,800',
    '£2,800+',
  ],
};

export const DEFAULT_PROFILE: ProfileData = {
  fullName: 'Akande Olalekan',
  creativeIdentity: 'Lekzy Graphics',
  professionalTitle: 'Multidisciplinary Designer & Digital Creative',
  location: 'Lagos, Nigeria',
  availabilitySummary:
    "I'm interested in working with forward-thinking businesses, creative agencies, startups and organisations that value thoughtful design and digital innovation.\n\nI'm open to remote opportunities, freelance collaborations, contract engagements and suitable full-time roles, particularly within the UK, Europe, Africa and international markets.",
  portraitUrl: '/assets/aistudio/LAG_Invoice_pp_5e452efd.png',
  cvUrl: '',
  cvFileName: '',
  aboutHeadline: 'CREATING WITH PURPOSE. DESIGNING WITH INTENTION.',
  aboutIntro:
    "I'm Akande Olalekan, a multidisciplinary designer and digital creative with a passion for visual communication, digital experiences and creative problem-solving.\n\nI help businesses, startups and individuals bring their ideas to life through thoughtful design, strategic branding and functional digital solutions.\n\nMy journey in the creative industry has allowed me to work across different areas of design, giving me the opportunity to understand how visual communication, technology and business objectives come together.\n\nToday, I combine my creative background with technical skills to deliver solutions that help brands communicate better, build credibility and create meaningful connections with their audiences.",
  storyHeadline: 'A JOURNEY DRIVEN BY CREATIVITY AND CURIOSITY.',
  storyContent:
    "My journey into design started with an interest in creativity, visual communication and the possibilities of turning ideas into something people can see, understand and interact with.\n\nOver time, that interest developed into a professional career. I began exploring graphic design, learning how to use design tools, understanding visual hierarchy and developing the ability to communicate messages through compelling visuals.\n\nAs my experience grew, I became interested in more than just creating graphics. I wanted to understand how brands are built, how businesses communicate with their audiences and how digital experiences influence the way people interact with products and services.\n\nThis curiosity led me into brand identity design, social media design, website design and eventually product design.\n\nWorking with clients across different industries has exposed me to different business challenges and creative requirements. Each project has strengthened my ability to think critically, interpret briefs, develop ideas and deliver solutions that align with specific objectives.\n\nI enjoy the balance between creativity and functionality. Whether I'm designing a brand identity, creating a campaign or developing a website, my goal is always to make the outcome visually engaging, useful and purposeful.\n\nI'm still learning, exploring and improving, because I believe becoming a better designer is a continuous process.",
  philosophyHeadline: 'I BELIEVE GOOD DESIGN SHOULD DO MORE THAN LOOK GOOD.',
  beyondHeadline: 'ALWAYS EXPLORING. ALWAYS GROWING.',
  beyondContent:
    "Outside the actual design process, I'm interested in the intersection of creativity, technology, entrepreneurship and business development.\n\nI enjoy exploring new digital tools, understanding emerging design trends, experimenting with creative ideas and learning how technology can make work more efficient.\n\nI also value collaboration and the opportunity to work with people who are building something meaningful.\n\nFor me, growth is not just about acquiring new skills. It's about becoming more intentional, improving how I think and developing the ability to contribute more value through my work.",
  experiences: [
    {
      id: 'head-of-creative-design',
      role: 'Head of Creative Design',
      period: 'October 2024 – Present',
      company: 'Creative Leadership & Digital Practice',
      responsibilities: [
        'Leading creative design direction across projects.',
        'Developing brand identities and marketing materials.',
        'Creating visual content for digital platforms.',
        'Coordinating design tasks and creative deliverables.',
        'Working with team members to maintain visual consistency.',
        'Contributing to website design and development.',
        'Ensuring projects align with client requirements and brand standards.',
      ],
    },
    {
      id: 'freelance-graphic-web-designer',
      role: 'Freelance Graphic & Web Designer',
      period: '2020 – Present',
      company: 'Lekzy Graphics (Independent Practice)',
      responsibilities: [
        'Designing visual identities and marketing materials.',
        'Creating social media content and promotional campaigns.',
        'Designing and developing business websites.',
        'Working directly with clients to understand project requirements.',
        'Managing creative projects from concept to delivery.',
        'Providing digital design solutions across different industries.',
      ],
    },
  ],
  skillCategories: [
    {
      id: 'design-creative-tools',
      title: 'Design & Creative Tools',
      items: ['Adobe Photoshop', 'Adobe Illustrator', 'CorelDRAW', 'Figma'],
    },
    {
      id: 'website-digital-tools',
      title: 'Website & Digital Tools',
      items: ['WordPress', 'Elementor', 'WooCommerce', 'ShopLentor'],
    },
    {
      id: 'product-interface-design',
      title: 'Product & Interface Design',
      items: ['UI Design', 'Wireframing', 'Prototyping', 'Responsive Design'],
    },
    {
      id: 'productivity-collaboration',
      title: 'Productivity & Collaboration',
      items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Microsoft 365'],
    },
  ],
  education: [
    {
      id: 'bsc-math',
      degree: 'B.Sc. Mathematical Science',
      institution: 'Adekunle Ajasin University',
      date: 'September 2018',
    },
    {
      id: 'cert-graphic-web',
      degree: 'Certificate in Graphic & Web Design',
      institution: 'CareerEdge Institute, Ibadan',
      date: 'November 2020',
    },
    {
      id: 'nysc',
      degree: 'NYSC Discharge Certificate',
      institution: 'National Youth Service Corps',
      date: 'October 2019',
    },
    {
      id: 'cert-computer-basics',
      degree: 'Certificate in Computer Basics & Microsoft Office',
      institution: 'Covenant Computer Institute',
      date: 'March 2015',
    },
  ],
  coreCompetencies: [
    'Creative Problem-Solving',
    'Visual Communication',
    'Design Thinking',
    'Brand Consistency',
    'Layout and Composition',
    'Typography and Colour Theory',
    'Client Communication',
    'Project Coordination',
    'Creative Direction',
    'Attention to Detail',
    'Time Management',
    'Collaboration',
  ],
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'brand-identity',
    number: '01',
    title: 'Brand Identity & Visual Design',
    headline: 'BUILD A BRAND PEOPLE RECOGNISE AND REMEMBER.',
    shortDescription:
      'Creating distinctive visual identities that give brands a consistent, professional and memorable presence.',
    description:
      'Your brand is more than a logo. It is the visual language, personality and experience that shape how people perceive your business.\n\nI help businesses develop consistent and meaningful visual identities that reflect their values, communicate their positioning and create a recognisable presence.',
    deliverables: [
      'Logo Design and Development',
      'Brand Identity Systems',
      'Brand Colour Palettes',
      'Typography Selection',
      'Brand Guidelines',
      'Business Cards and Stationery',
      'Marketing Collateral',
      'Brand Application Mockups',
      'Visual Brand Consistency',
    ],
    idealFor: 'Ideal for startups, new businesses, rebranding companies and organisations.',
    category: 'BRANDING',
    imageUrl: '',
    published: true,
    sortOrder: 1,
  },
  {
    id: 'graphic-social-design',
    number: '02',
    title: 'Graphic & Social Media Design',
    headline: 'VISUAL COMMUNICATION THAT GETS ATTENTION.',
    shortDescription:
      'Designing compelling visual content that captures attention, communicates messages and supports marketing campaigns.',
    description:
      'In a competitive digital environment, how your brand communicates visually matters.\n\nI create strategic graphic designs and social media creatives that help brands communicate their messages, promote products and services, and maintain a consistent online presence.',
    deliverables: [
      'Social Media Post Designs',
      'Instagram Carousel Designs',
      'Promotional Flyers',
      'Campaign Creatives',
      'Event Graphics',
      'Advertising Designs',
      'Product Promotional Graphics',
      'Digital Marketing Materials',
    ],
    idealFor: 'Ideal for businesses, marketing teams, event organisers, agencies and personal brands.',
    category: 'GRAPHIC DESIGN',
    imageUrl: '',
    published: true,
    sortOrder: 2,
  },
  {
    id: 'website-design-dev',
    number: '03',
    title: 'Website Design & Development',
    headline: 'WEBSITES THAT MAKE YOUR BUSINESS WORK BETTER ONLINE.',
    shortDescription:
      'Designing and developing responsive, user-friendly websites that help businesses establish credibility, showcase their offerings and connect with customers.',
    description:
      'A website should do more than provide information. It should represent your business professionally, guide visitors and make it easier for people to engage with your products or services.\n\nI design and develop responsive websites that combine visual presentation, usability and functionality.',
    deliverables: [
      'Business Website Design',
      'WordPress Website Development',
      'E-commerce Website Development',
      'Landing Page Design',
      'Website Redesign',
      'Responsive Mobile and Desktop Layouts',
      'Website Content Arrangement',
      'WooCommerce Integration',
      'Elementor Implementation',
      'Basic SEO Structure',
      'Website Maintenance and Updates',
    ],
    idealFor: 'Ideal for small businesses, startups, service providers, retailers, consultants and organisations.',
    category: 'WEBSITE DESIGN',
    imageUrl: '',
    published: true,
    sortOrder: 3,
  },
  {
    id: 'product-ui-ux',
    number: '04',
    title: 'Product Design & UI/UX',
    headline: 'CREATING DIGITAL EXPERIENCES AROUND REAL USER NEEDS.',
    shortDescription:
      'Creating thoughtful digital interfaces and user experiences with a focus on usability, structure and intuitive interaction.',
    description:
      'Digital products should be easy to understand, intuitive to navigate and designed around the people who use them.\n\nMy approach to product and interface design focuses on understanding the purpose of a product and translating its requirements into clear, functional and engaging digital experiences.',
    deliverables: [
      'User Interface Design',
      'User Experience Planning',
      'Wireframing',
      'User Flows',
      'Website and Mobile App Interfaces',
      'Interactive Prototyping',
      'Dashboard Design',
      'Design Systems and Components',
      'Responsive Interface Layouts',
    ],
    idealFor: 'Ideal for startups, technology companies, founders, product teams and businesses developing digital platforms.',
    category: 'UI/UX DESIGN',
    imageUrl: '',
    published: true,
    sortOrder: 4,
  },
];

export interface ManagedSocialChannel {
  id: string;
  name: string;
  handle: string;
  platform: 'Instagram';
  focus: string;
  url: string;
}

export const MANAGED_SOCIAL_PAGES: ManagedSocialChannel[] = [
  {
    id: 'genius-travels-ig',
    name: 'Genius Travels',
    handle: '@genius__travels',
    platform: 'Instagram',
    focus: 'Travel packages, destination campaigns & booking creatives',
    url: 'https://www.instagram.com/genius__travels/',
  },
  {
    id: 'lekzy-graphics-ig',
    name: 'Lekzy Graphics',
    handle: '@lekzy_a_graphics',
    platform: 'Instagram',
    focus: 'Brand identity showcases, UI concepts & studio portfolio feed',
    url: 'https://www.instagram.com/lekzy_a_graphics/',
  },
  {
    id: 'dominion-vss-ig',
    name: 'Dominion Vascular Surgical Specialists',
    handle: '@dominionvss',
    platform: 'Instagram',
    focus: 'Healthcare education, vascular awareness & clinical campaigns',
    url: 'https://www.instagram.com/dominionvss/',
  },
  {
    id: 'bavic-properties-ig',
    name: 'Bavic Properties',
    handle: '@bavicproperties',
    platform: 'Instagram',
    focus: 'Real estate listings, property campaigns & investor updates',
    url: 'https://www.instagram.com/bavicproperties/',
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'delightful-juices',
    slug: 'delightful-juices',
    title: 'Delightful Juices',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'E-commerce Website Design & Development',
    shortDescription:
      'A digital storefront created for a beverage brand, focused on presenting its products, communicating its brand story and supporting online and wholesale enquiries.',
    overview:
      'Delightful Juices required an inviting, structured digital storefront capable of showcasing its beverage range, highlighting ingredient freshness, and making both retail orders and wholesale enquiries seamless.',
    client: 'Delightful Juices',
    industry: 'Food & Beverage',
    servicesProvided: [
      'E-commerce Website Design',
      'WooCommerce & Shop Setup',
      'Product Page Structuring',
      'Responsive Mobile Experience',
    ],
    duration: 'Project Scope Managed End-to-End',
    year: '2024',
    background:
      'As a growing beverage brand, Delightful Juices needed an online presence that matched the care behind its products and provided clear pathways for direct buyers and wholesale partners.',
    challenge:
      'Organising product categories, nutritional story points, and wholesale enquiry workflows into a fast, uncluttered storefront that works smoothly across mobile and desktop devices.',
    creativeApproach:
      'Built an editorial product-first layout with clear visual hierarchy, clean product imagery framing, direct call-to-action flows, and mobile-friendly browsing.',
    process:
      'Discovery and content mapping, storefront wireframing, visual design direction, responsive e-commerce build, and structured pre-launch quality checks.',
    outcome:
      'Delivered a cohesive, responsive e-commerce website that presents the Delightful Juices catalogue clearly and supports both customer orders and wholesale enquiries.',
    contribution:
      'Led website architecture, responsive UI layout, product showcase design, and e-commerce implementation.',
    coverImageUrl: '/assets/portfolio/delightful-juices.jpg',
    galleryImages: [],
    liveUrl: 'https://delightfuljuices.com/',
    featured: true,
    status: 'published',
    sortOrder: 1,
  },
  {
    id: 'atr-tourism',
    slug: 'atr-tourism',
    title: 'ATR Tourism',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'Travel & Tourism Website Design',
    shortDescription:
      'A responsive travel and tourism website built to showcase curated travel experiences, destinations, and hospitality services with streamlined booking and enquiry pathways.',
    overview:
      'Designed and developed the web platform for ATR Tourism to give travellers an inspiring, organised space to explore destinations, tour packages, and direct travel consultation.',
    client: 'ATR Tourism',
    industry: 'Travel & Tourism',
    servicesProvided: [
      'Website Design & Development',
      'Destination & Package Architecture',
      'Responsive Mobile Layout',
      'Booking Enquiry Integration',
    ],
    duration: 'End-to-End Web Build',
    year: '2025',
    background:
      'ATR Tourism needed a modern web presence that captures the excitement of travel while keeping itinerary details and consultation requests simple for international visitors.',
    challenge:
      'Presenting diverse destination packages and travel services clearly without cluttering navigation or slowing down mobile browsing.',
    creativeApproach:
      'Structured clean destination cards, clear service sections, and prominent enquiry calls-to-action tailored for leisure and group travellers.',
    process:
      'Requirements discovery, sitemap architecture, visual UI design, responsive web build, and cross-device testing.',
    outcome:
      'Launched a fast, responsive tourism website that communicates ATR Tourism offerings professionally and encourages direct customer bookings.',
    contribution:
      'Handled website UI design, content structuring, responsive layout implementation, and live deployment.',
    coverImageUrl: '/assets/portfolio/atr-tourism.jpg',
    galleryImages: [],
    liveUrl: 'https://atrtourism.com/',
    featured: true,
    status: 'published',
    sortOrder: 2,
  },
  {
    id: 'zillion-royalty',
    slug: 'zillion-royalty',
    title: 'Zillion Royalty',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'Financial Services Website Design',
    shortDescription:
      'A sleek, authoritative financial services website designed for ZillionRoyalty LLC to present tailored asset security and holistic financial growth solutions.',
    overview:
      'Crafted an authoritative digital presence for ZillionRoyalty LLC centred on tailored financial solutions, asset security, client application workflows, and executive trust.',
    client: 'ZillionRoyalty LLC',
    industry: 'Financial Services & Asset Advisory',
    servicesProvided: [
      'Website Design & Development',
      'Brand Digital Positioning',
      'Application Form Integration',
      'Responsive Desktop & Mobile Layout',
    ],
    duration: 'End-to-End Web Build',
    year: '2025',
    background:
      'ZillionRoyalty LLC sought an elevated digital home that reflects professionalism, builds immediate confidence with clients, and streamlines financial service enquiries and applications.',
    challenge:
      'Balancing refined visual presence with clear financial advisory messaging and effortless access to the online application form.',
    creativeApproach:
      'Paired dark architectural photography and crisp gold accents with disciplined typographic hierarchy and prominent onboarding calls-to-action.',
    process:
      'Brand alignment review, wireframe layout, visual styling, responsive web development, and launch verification.',
    outcome:
      'Delivered a polished, responsive corporate website tailored to support ZillionRoyalty LLC’s advisory services and online credibility.',
    contribution:
      'Led visual layout design, content architecture, and full responsive website development.',
    coverImageUrl: '/assets/portfolio/zillion-royalty.jpg',
    galleryImages: [],
    liveUrl: 'https://zillionroyalty.com/',
    featured: true,
    status: 'published',
    sortOrder: 3,
  },
  {
    id: 'new-ace-properties',
    slug: 'new-ace-properties',
    title: 'New Ace Properties',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'Real Estate & Construction Website Design',
    shortDescription:
      'A real estate and property development web platform built for New Ace Properties to showcase projects, craftsmanship, and direct buyer quote requests.',
    overview:
      'Designed and built an organised property and construction showcase website for New Ace Properties, enabling prospective buyers and clients to explore completed projects and request quotes effortlessly.',
    client: 'New Ace Properties',
    industry: 'Real Estate & Property Development',
    servicesProvided: [
      'Real Estate Website Design',
      'Project Showcase Architecture',
      'Mobile-First UI Layout',
      'Lead Capture & Quote Setup',
    ],
    duration: 'End-to-End Web Build',
    year: '2025',
    background:
      'New Ace Properties needed a trustworthy digital platform where prospective homeowners and investors can inspect developments, review craftsmanship, and request project quotes.',
    challenge:
      'Organising residential developments, project galleries, and quote enquiries cleanly so listings remain scannable on both smartphones and desktop monitors.',
    creativeApproach:
      'Created bold visual hero framing with clear project navigation, direct social channels, and high-visibility quote touchpoints.',
    process:
      'Discovery and listing taxonomy, wireframe planning, visual design, responsive build, and pre-launch optimisation.',
    outcome:
      'Delivered a credible, responsive real estate website that strengthens New Ace Properties’ digital footprint and streamlines buyer enquiries.',
    contribution:
      'Website architecture, UI design, property showcase formatting, and responsive development.',
    coverImageUrl: '/assets/portfolio/new-ace-properties.jpg',
    galleryImages: [],
    liveUrl: 'https://newaceproperties.com/',
    featured: true,
    status: 'published',
    sortOrder: 4,
  },
  {
    id: 'bulkhead-global',
    slug: 'bulkhead-global',
    title: 'Bulkhead Global',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'Construction, Engineering & Real Estate Website',
    shortDescription:
      'A structured corporate website crafted for Bulkhead Global Service Limited showcasing design, build, real estate management, cost engineering, and interior decoration.',
    overview:
      'Built a clean, business-focused website for Bulkhead Global Service Limited, presenting construction, real estate management, cost engineering, and interior decoration services with clarity.',
    client: 'Bulkhead Global Service Limited',
    industry: 'Construction, Cost Engineering & Real Estate',
    servicesProvided: [
      'Corporate Website Design',
      'Service & Project Gallery Architecture',
      'Responsive Frontend Implementation',
      'Quote & Consultation Pathways',
    ],
    duration: 'End-to-End Web Build',
    year: '2025',
    background:
      'Bulkhead Global Service Limited required an executive-grade web presence to showcase architectural projects, interior decoration services, and multidisciplinary engineering capabilities.',
    challenge:
      'Presenting design/build, cost engineering, and interior decoration in a structured, approachable interface with direct quote pathways.',
    creativeApproach:
      'Applied architectural hero imagery, disciplined service breakdowns, a dedicated project gallery, and clear call-to-action sections.',
    process:
      'Stakeholder discovery, content structuring, responsive UI design, website build, and performance checks.',
    outcome:
      'Launched a dependable corporate website that gives Bulkhead Global Service Limited a clear and credible digital front door.',
    contribution:
      'Designed layout structure, corporate UI presentation, and responsive web implementation.',
    coverImageUrl: '/assets/portfolio/bulkhead-global.jpg',
    galleryImages: [],
    liveUrl: 'https://bulkheadglobal.com/',
    featured: true,
    status: 'published',
    sortOrder: 5,
  },
  {
    id: 'leyi-herbs-market',
    slug: 'leyi-herbs-market',
    title: 'Leyi Herbs Market',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'E-commerce Website Design',
    shortDescription:
      'An online marketplace project focused on presenting herbal products through an organised shopping experience, product discovery and e-commerce functionality.',
    overview:
      'An organised e-commerce marketplace experience designed for Leyi Herbs Market to simplify product discovery, category browsing, and online purchasing.',
    client: 'Leyi Herbs Market',
    industry: 'Retail & E-commerce',
    servicesProvided: [
      'E-commerce Website Design',
      'Information Architecture',
      'Product Discovery UX',
      'Responsive Storefront Layout',
    ],
    duration: 'End-to-End Web Build',
    year: '2024',
    background:
      'Leyi Herbs Market needed an accessible digital storefront where customers can browse diverse herbal offerings without confusion.',
    challenge:
      'Structuring a multi-product catalogue so shoppers can filter, compare, and navigate from product discovery to checkout effortlessly.',
    creativeApproach:
      'Prioritised clear taxonomy, scannable product cards, intuitive navigation paths, and responsive layout structure across devices.',
    process:
      'Catalogue planning, wireframing, storefront visual design, WordPress/WooCommerce implementation, and responsiveness testing.',
    outcome:
      'Delivered a structured online herbal marketplace built around usability, product clarity, and smooth browsing.',
    contribution:
      'UX structure, visual storefront design, and responsive e-commerce build.',
    coverImageUrl: '/assets/portfolio/leyi-herbs-market.jpg',
    galleryImages: [],
    liveUrl: 'http://leyiherbsmarket.com/',
    featured: true,
    status: 'published',
    sortOrder: 6,
  },
  {
    id: 'nelacon',
    slug: 'nelacon',
    title: 'Nelacon',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'Contracting & Construction Website Design',
    shortDescription:
      'A responsive business website built for Nelacon Contracting Services in Toronto, Canada, presenting construction expertise, project portfolio, and instant quotation enquiries.',
    overview:
      'Designed and implemented the website for Nelacon Contracting Services in Toronto, ON, Canada to present residential and commercial contracting work clearly with direct quotation flows.',
    client: 'Nelacon Contracting Services',
    industry: 'Contracting & Construction (Toronto, Canada)',
    servicesProvided: [
      'Website Design & Development',
      'Service & Project Structuring',
      'Responsive Desktop & Mobile UI',
      'Quotation Request Flow',
    ],
    duration: 'End-to-End Web Build',
    year: '2025',
    background:
      'Nelacon Contracting Services sought a clean, trustworthy online presence tailored to Toronto clients seeking high-quality construction delivered on time and on budget.',
    challenge:
      'Structuring contracting capabilities, completed projects, and quotation requests into an approachable, high-trust web interface.',
    creativeApproach:
      'Combined clean architectural photography and green brand accents with crisp navigation and prominent quotation calls-to-action.',
    process:
      'Discovery briefing, sitemap planning, UI layout design, responsive build, and browser verification.',
    outcome:
      'Delivered a modern, responsive contracting website helping Nelacon showcase projects and connect with Toronto clients.',
    contribution:
      'Led visual website design, page layout architecture, and responsive web development.',
    coverImageUrl: '/assets/portfolio/nelacon.jpg',
    galleryImages: [],
    liveUrl: 'https://nelacon.ca/',
    featured: false,
    status: 'published',
    sortOrder: 7,
  },
  {
    id: 'goshen-support',
    slug: 'goshen-support',
    title: 'Goshen Support',
    filterCategory: 'WEBSITE DESIGN',
    categoryLabel: 'Healthcare Staffing & Social Services Website',
    shortDescription:
      'A welcoming, accessible website built for Goshen Support Services Inc., a social services and healthcare staffing agency, to communicate care programs and simplify direct enquiries.',
    overview:
      'Developed an accessible digital platform for Goshen Support Services Inc. focused on healthcare staffing, social services, clear program navigation, and immediate phone/web contact.',
    client: 'Goshen Support Services Inc.',
    industry: 'Social Services & Healthcare Staffing',
    servicesProvided: [
      'Website Design & Development',
      'Accessible Typography & Layout',
      'Agency Service Architecture',
      'Responsive Web Implementation',
    ],
    duration: 'End-to-End Web Build',
    year: '2025',
    background:
      'Goshen Support Services Inc. needed a reliable, approachable website to present its healthcare staffing and social support capabilities to families and institutional partners.',
    challenge:
      'Ensuring agency services, resources, and direct phone enquiry access remain effortless to read across desktop and mobile devices.',
    creativeApproach:
      'Designed a calm, trustworthy healthcare layout with clean navigation, resources access, and prominent direct contact actions.',
    process:
      'Discovery review, content clarity mapping, UI design, responsive development, and accessibility checks.',
    outcome:
      'Created a clear, people-first agency website supporting healthcare staffing and social service enquiries.',
    contribution:
      'Website UI/UX direction, content structuring, and responsive web development.',
    coverImageUrl: '/assets/portfolio/goshen-support.jpg',
    galleryImages: [],
    liveUrl: 'https://goshensupport.com/',
    featured: false,
    status: 'published',
    sortOrder: 8,
  },
  {
    id: 'dominion-vascular-surgical-specialists',
    slug: 'dominion-vascular-surgical-specialists',
    title: 'Dominion Vascular Surgical Specialists',
    filterCategory: 'GRAPHIC DESIGN',
    categoryLabel: 'Graphic Design & Instagram Page Management',
    shortDescription:
      'Healthcare communication creatives and ongoing Instagram page management designed to help a specialist medical practice communicate its services, educate audiences and promote patient engagement.',
    overview:
      'A suite of medical communication graphics, patient-education campaigns, and managed Instagram content crafted for Dominion Vascular Surgical Specialists (@dominionvss) to present specialised vascular care with clinical clarity.',
    client: 'Dominion Vascular Surgical Specialists',
    industry: 'Healthcare & Medical Services',
    servicesProvided: [
      'Instagram Page Management (@dominionvss)',
      'Healthcare Graphic Design',
      'Patient Awareness Campaigns',
      'Social Media Creatives',
    ],
    duration: 'Ongoing Campaign & Page Management',
    year: '2024',
    background:
      'Specialist medical practices depend on trust, legibility, and clear patient education. Every visual asset and Instagram post needed to feel reassuring, authoritative, and easy to read.',
    challenge:
      'Translating specialised vascular procedures and clinical topics into accessible visual creatives without overwhelming readers or diluting medical credibility.',
    creativeApproach:
      'Established a disciplined, high-contrast typographic and layout system that pairs concise medical copy with calm, structured visual framing across Instagram.',
    process:
      'Brief review with clinical messaging, layout exploration, multi-format graphic production for Instagram channels, and iterative refinement.',
    outcome:
      'Produced a consistent library of healthcare awareness graphics and maintained a cohesive Instagram presence aligned with clinical standards.',
    contribution:
      'Art direction, graphic design, social media content formatting, and Instagram page management.',
    coverImageUrl: '',
    galleryImages: [],
    liveUrl: 'https://www.instagram.com/dominionvss/',
    featured: false,
    status: 'published',
    sortOrder: 9,
  },
  {
    id: 'genius-travels',
    slug: 'genius-travels',
    title: 'Genius Travels',
    filterCategory: 'SOCIAL MEDIA',
    categoryLabel: 'Social Media Management & Travel Campaigns',
    shortDescription:
      'Promotional marketing creatives and managed Instagram presence (@genius__travels) for a travel brand, designed to showcase destinations, communicate packages and drive booking enquiries.',
    overview:
      'Promotional visual campaigns and ongoing Instagram page management for Genius Travels to highlight destinations, package details, and booking enquiries in competitive digital feeds.',
    client: 'Genius Travels',
    industry: 'Travel & Tourism',
    servicesProvided: [
      'Instagram Page Management (@genius__travels)',
      'Social Media Campaign Design',
      'Promotional Flyers',
      'Destination Showcase Layouts',
    ],
    duration: 'Ongoing Social Media Management',
    year: '2024',
    background:
      'Genius Travels needed cohesive promotional visuals and active social media management that quickly communicate trip highlights, pricing clarity, and contact channels.',
    challenge:
      'Balancing rich destination imagery with structured itinerary details, dates, and calls to action inside compact social media formats.',
    creativeApproach:
      'Created bold typographic overlays, modular package templates, and clear enquiry prompts that keep the @genius__travels Instagram grid sharp and consistent.',
    process:
      'Audience review, visual direction, modular campaign template creation, content scheduling, and asset delivery optimised for Instagram.',
    outcome:
      'Delivered a unified suite of travel promotional creatives and consistent Instagram feed presentation ready for seasonal campaigns.',
    contribution:
      'Creative direction, Instagram page management, social media graphic design, and promotional layout systems.',
    coverImageUrl: '',
    galleryImages: [],
    liveUrl: 'https://www.instagram.com/genius__travels/',
    featured: false,
    status: 'published',
    sortOrder: 10,
  },
  {
    id: 'bavic-properties',
    slug: 'bavic-properties',
    title: 'Bavic Properties',
    filterCategory: 'GRAPHIC DESIGN',
    categoryLabel: 'Real Estate Campaigns & Instagram Management',
    shortDescription:
      'Real estate marketing collateral and Instagram page management (@bavicproperties) developed to communicate property offerings, promotional campaigns and investor updates.',
    overview:
      'Marketing collateral, property campaign designs, and managed Instagram visual communication produced for Bavic Properties to present residential and investment opportunities with clarity.',
    client: 'Bavic Properties',
    industry: 'Real Estate & Property',
    servicesProvided: [
      'Instagram Page Management (@bavicproperties)',
      'Real Estate Campaign Design',
      'Promotional Flyers & Collateral',
      'Brand Consistency',
    ],
    duration: 'Ongoing Campaign & Social Support',
    year: '2024',
    background:
      'Real estate buyers look for credibility and transparent information. Bavic Properties required structured marketing visuals and steady social management for active listings and brand announcements.',
    challenge:
      'Presenting property features, locations, payment plans, and contact details clearly across mobile social feeds and promotional materials.',
    creativeApproach:
      'Combined clean architectural grid spacing with strong typographic hierarchy so key property propositions read immediately.',
    process:
      'Requirement discovery, layout prototyping, social feed adaptation, and consistent publishing support.',
    outcome:
      'Delivered polished real estate campaign materials and a cohesive Instagram presence strengthening brand credibility.',
    contribution:
      'Visual concept development, graphic design, Instagram content design, and social page management.',
    coverImageUrl: '',
    galleryImages: [],
    liveUrl: 'https://www.instagram.com/bavicproperties/',
    featured: false,
    status: 'published',
    sortOrder: 11,
  },
  {
    id: 'lekzy-graphics-social',
    slug: 'lekzy-graphics-social',
    title: 'Lekzy Graphics',
    filterCategory: 'SOCIAL MEDIA',
    categoryLabel: 'Creative Studio Instagram & Brand Showcase',
    shortDescription:
      'My personal creative brand page (@lekzy_a_graphics) curating brand identity projects, visual communication pieces, web launches and creative process highlights.',
    overview:
      'The official Instagram hub for Lekzy Graphics, where visual identity work, campaign designs, and client web projects are curated and shared with founders, agencies, and businesses.',
    client: 'Lekzy Graphics (Personal Studio)',
    industry: 'Design & Creative Direction',
    servicesProvided: [
      'Instagram Page Management (@lekzy_a_graphics)',
      'Portfolio Curation & Carousels',
      'Brand Identity Showcases',
      'Creative Direction',
    ],
    duration: 'Ongoing Studio Presence',
    year: '2025',
    background:
      'Serving as a living visual archive and discovery channel for Lekzy Graphics, the Instagram page showcases finished brand work alongside digital design updates.',
    challenge:
      'Maintaining a distinct, cohesive studio aesthetic across diverse client industries from healthcare and real estate to e-commerce.',
    creativeApproach:
      'Curated structured project carousels, case mockups, and bold studio typography reflecting the Lekzy Graphics identity.',
    process:
      'Project documentation, carousel layout design, presentation mockups, and ongoing portfolio curation.',
    outcome:
      'Established a clear, recognisable Instagram portfolio channel connecting prospective clients with direct studio work.',
    contribution:
      'End-to-end creative direction, graphic design, content curation, and page management.',
    coverImageUrl: '',
    galleryImages: [],
    liveUrl: 'https://www.instagram.com/lekzy_a_graphics/',
    featured: false,
    status: 'published',
    sortOrder: 12,
  },
  {
    id: 'elite-treat-chop',
    slug: 'elite-treat-chop',
    title: 'Elite Treat Chop',
    filterCategory: 'UI/UX DESIGN',
    categoryLabel: 'Website Design & Digital Experience',
    shortDescription:
      'A food business website project focused on presenting menu offerings, creating a seamless browsing experience and providing an organised platform for customer engagement.',
    overview:
      'A food business website and digital experience project designed for Elite Treat Chop to showcase menu items clearly and streamline customer orders and event enquiries.',
    client: 'Elite Treat Chop',
    industry: 'Food & Beverage',
    servicesProvided: [
      'Website Design',
      'Digital Experience & UI/UX',
      'Menu Presentation Architecture',
      'Mobile-First Responsiveness',
    ],
    duration: 'End-to-End Project',
    year: '2024',
    background:
      'Elite Treat Chop needed a dedicated digital home to present its culinary offerings professionally and make it simple for customers to explore options and get in touch.',
    challenge:
      'Organising menu items, platter options, and enquiry channels into an inviting, fast-loading web experience.',
    creativeApproach:
      'Crafted a clean, appetite-driven editorial layout with clear menu grouping, strong mobile usability, and prominent enquiry pathways.',
    process:
      'Discovery, user flow mapping, interface design, responsive website build, and final refinement.',
    outcome:
      'Delivered an engaging, organised food business website designed for smooth customer browsing and clear communication.',
    contribution:
      'UI/UX direction, website layout design, and digital experience implementation.',
    coverImageUrl: '',
    galleryImages: [],
    liveUrl: '',
    featured: false,
    status: 'published',
    sortOrder: 13,
  },
];

export const DEFAULT_SEO_PAGES: Record<string, SeoPageConfig> = {
  home: {
    pageKey: 'home',
    title: 'Akande Olalekan (Lekzy) | Product, Brand & Web Designer',
    description:
      'Akande Olalekan is a multidisciplinary designer specialising in brand identity, graphic design, social media design, website development and digital experiences. Based in Nigeria, available worldwide.',
    keywords:
      'Akande Olalekan, Lekzy Graphics, Freelance Product Designer, Brand Identity Designer, Graphic Designer in Nigeria, Web Designer in Nigeria, WordPress Website Designer, Social Media Designer, Digital Creative, Remote Graphic Designer',
    ogImageUrl: '',
  },
  about: {
    pageKey: 'about',
    title: 'About Me | Akande Olalekan (Lekzy)',
    description:
      'Learn about Akande Olalekan, a multidisciplinary designer and digital creative focused on purposeful visual communication, branding, and digital experiences.',
    keywords: 'Akande Olalekan, Lekzy, About, Multidisciplinary Designer, Lagos Nigeria',
    ogImageUrl: '',
  },
  services: {
    pageKey: 'services',
    title: 'Services | Akande Olalekan (Lekzy)',
    description:
      'Creative and digital solutions including Brand Identity, Graphic & Social Media Design, Website Design & Development, and Product Design / UI/UX.',
    keywords: 'Brand Identity, Graphic Design, Social Media Design, WordPress Development, UI/UX Design',
    ogImageUrl: '',
  },
  portfolio: {
    pageKey: 'portfolio',
    title: 'Portfolio | Akande Olalekan (Lekzy)',
    description:
      'Selected work across brand identity, graphic design, social media campaigns, e-commerce websites, and digital experiences.',
    keywords: 'Design Portfolio, Case Studies, Lekzy Graphics, Website Design, Brand Identity',
    ogImageUrl: '',
  },
  process: {
    pageKey: 'process',
    title: 'My Process | Akande Olalekan (Lekzy)',
    description:
      'A clear, structured five-stage design and development process built on discovery, strategy, execution, refinement, and delivery.',
    keywords: 'Design Process, Creative Workflow, Product Design Process, Web Development Process',
    ogImageUrl: '',
  },
  experience: {
    pageKey: 'experience',
    title: 'Experience & Skills | Akande Olalekan (Lekzy)',
    description:
      'Professional experience, technical design and web tools, education, and core competencies of Akande Olalekan.',
    keywords: 'Experience, Figma, Adobe Photoshop, Adobe Illustrator, WordPress, Elementor, WooCommerce',
    ogImageUrl: '',
  },
  contact: {
    pageKey: 'contact',
    title: 'Contact | Akande Olalekan (Lekzy)',
    description:
      'Start a project or discuss remote, freelance, contract, or full-time opportunities with Akande Olalekan.',
    keywords: 'Contact Designer, Hire Product Designer, Project Inquiry, Akande Olalekan',
    ogImageUrl: '',
  },
  privacy: {
    pageKey: 'privacy',
    title: 'Privacy Policy | Akande Olalekan (Lekzy)',
    description: 'Privacy policy and data handling practices for Akande Olalekan portfolio website.',
    keywords: 'Privacy Policy, Akande Olalekan',
    ogImageUrl: '',
  },
};

export const WHY_WORK_WITH_ME = [
  {
    number: '01',
    title: 'Purpose-Driven Creativity',
    description: 'Every design decision should serve a purpose.',
  },
  {
    number: '02',
    title: 'Attention to Detail',
    description: 'Careful consideration of typography, colour, layout and functionality.',
  },
  {
    number: '03',
    title: 'Understanding Business Needs',
    description: 'Creative solutions that support real business objectives.',
  },
  {
    number: '04',
    title: 'Continuous Improvement',
    description: 'Staying curious, learning and improving my craft.',
  },
  {
    number: '05',
    title: 'Collaboration & Communication',
    description: 'Clear communication and constructive collaboration.',
  },
];

export const PROCESS_PREVIEW_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understanding your goals, audience and requirements.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Defining the creative direction and project structure.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Developing concepts, layouts and visual solutions.',
  },
  {
    number: '04',
    title: 'Refinement',
    description: 'Reviewing feedback and making necessary improvements.',
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'Finalising and delivering the completed project.',
  },
];

export const FULL_PROCESS_STAGES = [
  {
    number: '01',
    title: 'DISCOVERY & UNDERSTANDING',
    description:
      'Every project starts with a conversation. I take time to understand your business, objectives, target audience, expectations and project requirements.',
    deliverable: 'Project brief and requirements.',
  },
  {
    number: '02',
    title: 'RESEARCH & DIRECTION',
    description:
      'After understanding the project, I explore relevant references, visual directions and possible solutions. This helps establish a clear creative direction before execution.',
    deliverable: 'Creative direction and project plan.',
  },
  {
    number: '03',
    title: 'DESIGN & DEVELOPMENT',
    description:
      'This is where ideas begin to take shape. I work on the actual designs, layouts, interfaces or website implementation, depending on the project.',
    deliverable: 'Initial concepts, designs or development preview.',
  },
  {
    number: '04',
    title: 'REVIEW & REFINEMENT',
    description:
      'I present the work for review, receive feedback and make the agreed adjustments to ensure the outcome aligns with the project requirements.',
    deliverable: 'Refined and approved project.',
  },
  {
    number: '05',
    title: 'FINAL DELIVERY',
    description:
      'Once everything is approved, I prepare and deliver the final files, assets or website, depending on the agreed scope.',
    deliverable: 'Completed project and agreed handover materials.',
  },
];

export const CLARITY_PRINCIPLES = [
  'Clear communication throughout the project.',
  'Defined project scope and expectations.',
  'Attention to design quality and detail.',
  'Structured feedback and revision stages.',
  'Agreed timelines and delivery milestones.',
  'Professional handling of project materials.',
];

export const INDUSTRIES = [
  'Healthcare & Medical Services',
  'Travel & Tourism',
  'Real Estate & Property',
  'Food & Beverage',
  'Retail & E-commerce',
  'Technology & Startups',
  'Events & Entertainment',
  'Professional Services',
];

export const FAQS = [
  {
    question: 'What services do you offer?',
    answer:
      'I offer brand identity design, graphic design, social media design, website design and development, and digital interface design.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Yes. I work with clients across different locations and am open to remote projects and collaborations worldwide.',
  },
  {
    question: 'Can I hire you for a single project?',
    answer:
      'Absolutely. I accept individual projects as well as ongoing creative engagements, depending on availability and project requirements.',
  },
  {
    question: 'Do you offer ongoing design support?',
    answer:
      'Yes. I can provide ongoing design and website support through agreed monthly or project-based arrangements.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Simply contact me with details about your project. We'll discuss your requirements, timeline and budget before agreeing on the next steps.",
  },
  {
    question: 'How long does a project take?',
    answer:
      'Timelines depend on the nature and complexity of the project. A timeline will be agreed upon after reviewing your requirements.',
  },
];

export const DESIGN_PHILOSOPHY = [
  {
    title: 'CLARITY',
    description: 'A good design should communicate its message without unnecessary complexity.',
  },
  {
    title: 'FUNCTIONALITY',
    description: 'Visual appeal should work alongside usability and purpose.',
  },
  {
    title: 'CONSISTENCY',
    description: 'Strong design systems create recognisable and trustworthy brand experiences.',
  },
];
