/**
 * Parijat Interiors — Site Configuration & Content
 * 
 * Update studio contact details and business numbers here.
 */

// Configure studio WhatsApp number (format: country code without + followed by digits, e.g. '919876543210')
// When left blank (''), the UI informs users to configure the number and provides the enquiry form as fallback.
export const BUSINESS_WHATSAPP_NUMBER: string = '';

export const business = {
  name: 'Parijat Interiors',
  tagline: 'Every space has a story. Let’s make yours beautiful.',
  supporting: 'Thoughtfully designed interiors for the way you live and work.',
  region: 'Maharashtra, India',
  serving: 'Maharashtra · Enquiries across India',
  instagram: 'https://www.instagram.com/parijatinteriors/',
  instagramHandle: '@parijatinteriors',
  logo: '/images/parijat-logo.png',
  logoOriginal: '/images/parijat-logo-original.png',
  canonicalUrl: 'https://parijatinteriors.com',
};

export const images = {
  hero: 'https://images.pexels.com/photos/7148779/pexels-photo-7148779.jpeg?auto=compress&cs=tinysrgb&w=1800',
  intro: 'https://images.pexels.com/photos/27059631/pexels-photo-27059631.jpeg?auto=compress&cs=tinysrgb&w=1200',
  philosophy: 'https://images.pexels.com/photos/6580381/pexels-photo-6580381.jpeg?auto=compress&cs=tinysrgb&w=1400',
};

export type MysaSlide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  alt: string;
};

export const mysaDermaProject = {
  eyebrow: 'FEATURED COMMERCIAL PROJECT',
  title: 'MYSA Derma — Clinic Interiors',
  category: 'Healthcare & Clinical Interiors',
  location: 'Maharashtra',
  description:
    'A thoughtfully designed clinic environment where warm lighting, considered details, and functional spaces come together to create a welcoming experience for patients.',
  slides: [
    {
      id: 'consultation',
      image: '/images/mysa-derma-consultation.png',
      title: 'Consultation Suite & Wave Lighting',
      subtitle: 'Doctor Consultation Room',
      description:
        'Bespoke curved executive desk with warm fluted wood surround, integrated ambient back-lit wave architectural wall feature, geometric ceiling profile lighting, and refined consultation seating.',
      alt: 'MYSA Derma consultation room with custom curved desk, ambient wave lighting feature, and illuminated clinic branding',
    },
    {
      id: 'seating',
      image: '/images/mysa-derma-seating.png',
      title: 'Clinic Seating & Architectural Signage',
      subtitle: 'Patient Waiting Lounge',
      description:
        'Upholstered contemporary lounge seating crowned by an illuminated soft mint back-panel, vertical acoustic fluting, and precision three-dimensional golden brass MYSA Derma branding.',
      alt: 'MYSA Derma waiting lounge seating with illuminated mint wall panel and golden brass 3D clinic logo',
    },
    {
      id: 'reception',
      image: '/images/mysa-derma-reception.png',
      title: 'Clinic Corridor & Reception Perspective',
      subtitle: 'Welcome & Patient Transit Corridor',
      description:
        'Linear perspective corridor illuminated by continuous recessed profile lighting, clean tiled reception counter with blush vertical panel accents, and acoustic glass partition doors.',
      alt: 'MYSA Derma clinic reception desk and corridor with continuous ceiling profile lights and glass consultation partition doors',
    },
  ] as MysaSlide[],
};

export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  wide?: boolean;
};

export const curatedProjects: Project[] = [
  {
    title: 'Living, thoughtfully',
    category: 'Contemporary Living',
    description: 'Warm natural materials, filtered daylight, and intuitive spatial flow for everyday ease.',
    image: 'https://images.pexels.com/photos/27059631/pexels-photo-27059631.jpeg?auto=compress&cs=tinysrgb&w=1100',
    alt: 'Warm contemporary living room with sculptural seating, natural wood accents, and warm ambient lighting',
    wide: true,
  },
  {
    title: 'The material edit',
    category: 'Private Residence',
    description: 'A restrained architectural palette calibrated for calm, rest, and tactile comfort.',
    image: 'https://images.pexels.com/photos/34880918/pexels-photo-34880918.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Minimalist living lounge with textured plaster walls, architectural stone fireplace, and neutral seating',
  },
  {
    title: 'Everyday rituals',
    category: 'Kitchen Architecture',
    description: 'Ergonomic kitchen design harmonizing practical storage with timeless timber joinery.',
    image: 'https://images.pexels.com/photos/12250759/pexels-photo-12250759.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Modern architectural kitchen with natural wood cabinetry and generous central quartz island',
  },
  {
    title: 'Serene sanctuary',
    category: 'Master Bedroom Suite',
    description: 'Clean geometry, seamless concealed storage, and layered textiles for restorative rest.',
    image: 'https://images.pexels.com/photos/30211379/pexels-photo-30211379.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Serene bedroom with tailored linen bedding, minimalist bedside lighting, and warm neutral tones',
  },
];

export const services = [
  {
    number: '01',
    title: 'Residential Interiors',
    description: 'Thoughtful home interiors designed around daily routines, natural comfort, and personal style.',
  },
  {
    number: '02',
    title: 'Commercial Interiors',
    description: 'Modern, functional spaces for clinics, workspaces, and professional business environments.',
  },
  {
    number: '03',
    title: 'Interior Design Consultation',
    description: 'Focused design guidance to clarify space planning, lighting schemes, and material direction.',
  },
  {
    number: '04',
    title: 'Full Home Interior Execution',
    description: 'Coordinated interior implementation from concept drawings through final site handover.',
  },
  {
    number: '05',
    title: 'Modular Kitchens & Wardrobes',
    description: 'Precision storage, ergonomic cabinetry, and kitchen spaces engineered for daily durability.',
  },
  {
    number: '06',
    title: 'Turnkey Interior Projects',
    description: 'End-to-end design and on-site project management delivering complete move-in ready interiors.',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'Clarifying your space, daily routines, functional needs, and design priorities.',
  },
  {
    number: '02',
    title: 'Discuss',
    description: 'Aligning on design direction, material palettes, finish options, and project budgets.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Detailed architectural layouts, 3D visualizations, and finalized specifications.',
  },
  {
    number: '04',
    title: 'Execute',
    description: 'On-site craftsmanship, quality coordination, and turnkey delivery to the agreed plan.',
  },
];
