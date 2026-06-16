import {
  ComingSoon,
  NotBopIt,
  PythonRedex,
  TextClassifier,
  Website,
  IntermittentComputing,
  SustainabilityWorkshop,
  Verdra,
  SportClassifier,
  SpeedReader,
  LLMPortfolioProject,
} from '@/projects';
import type { DateLike, Project, ResumeEntry } from '@/types/components';

const projects: Project[] = [
  LLMPortfolioProject,
  SpeedReader,
  SportClassifier,
  Verdra,
  SustainabilityWorkshop,
  IntermittentComputing,
  NotBopIt,
  TextClassifier,
  PythonRedex,
  Website,
  ComingSoon,
];

const featuredProjects: Project[] = [
  LLMPortfolioProject,
  Verdra,
  IntermittentComputing,
];

const validSearches = ['projects', 'music', 'resume', 'bets', 'misc'];

const validMiscSearches = ['tic tac toe'];

const miscSearchesMap: Record<string, string> = {
  'tic tac toe': 'tic-tac-toe',
};

function getSearchLink(search: string): string | null {
  if (search === 'home') {
    return '/';
  }

  if (search === 'llm') {
    return '/llm-portfolio';
  }

  if (validSearches.includes(search.toLowerCase())) {
    return `/${search.toLowerCase()}`;
  }

  if (validMiscSearches.includes(search.toLowerCase())) {
    const endpoint = miscSearchesMap[search.toLowerCase()];
    return `/misc/${endpoint}`;
  }

  return null;
}

// TO UPDATE COLORS
// update index 0
// [color, hover, hover-border]
// [prev color + 0xBE1, prev hover + 0x1FC, same as color]
const colors = [
  ['hover:text-[#1C49FF]', 'hover:bg-[#E3E8FF]', 'hover:border-[#1C49FF]'],
  ['hover:text-[#1C55E0]', 'hover:bg-[#E3EAFB]', 'hover:border-[#1C55E0]'],
  ['hover:text-[#1C61C1]', 'hover:bg-[#E3ECF7]', 'hover:border-[#1C61C1]'],
  ['hover:text-[#1C6DA2]', 'hover:bg-[#E3EEF3]', 'hover:border-[#1C6DA2]'],
  ['hover:text-[#1C7983]', 'hover:bg-[#E3F0EF]', 'hover:border-[#1C7983]'],
  ['hover:text-[#1C8564]', 'hover:bg-[#E3F2EB]', 'hover:border-[#1C8564]'],
  ['hover:text-[#1C9145]', 'hover:bg-[#E3F4E7]', 'hover:border-[#1C9145]'],
  ['hover:text-[#1C9D26]', 'hover:bg-[#E3F6E3]', 'hover:border-[#1C9D26]'],
  ['hover:text-[#1CA907]', 'hover:bg-[#E3F8DF]', 'hover:border-[#1CA907]'],
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getProjectBySlug(slug: string) {
  return projects.find((project) => generateSlug(project.name) === slug);
}

function getProjectSlug(project: { name: string }): string {
  return generateSlug(project.name);
}

const betChartColors: Record<string, string> = {
  NFL: '#6aaef0',
  NBA: '#ff8a80',
  CBB: '#7ecb78',
  UFC: '#77aebb',
  CFB: '#e9a06f',
  NHL: '#e9c65d',
  Tennis: '#b78ae6',
  MLB: '#8b5c63',
  WNBA: '#ff8fbc',
  F1: '#3f3f3f',
  Won: '#16a34a',
  Lost: '#b91c1c',
  Cashed: '#2563eb',
};

function getBetChartColor(label: string): string {
  return betChartColors[label] ?? '#475569';
}

const TICKER_FULL_NAMES: Record<string, string> = {
  AAPL: 'Apple',
  AKON: 'Axon Enterprise',
  ALGM: 'Allegion',
  ALNY: 'Alnylam Pharmaceuticals',
  AMD: 'Advanced Micro Devices',
  AMZN: 'Amazon',
  ANET: 'Arista Networks',
  ARM: 'Arm Holdings',
  ASML: 'ASML Holding',
  AVAV: 'AeroVironment',
  AVGO: 'Broadcom',
  AXON: 'Axon Enterprise',
  'BRK.B': 'Berkshire Hathaway',
  CAT: 'Caterpillar',
  CELH: 'Celsius Holdings',
  CF: 'CF Industries',
  CNC: 'Centene',
  COHR: 'Coherent',
  COP: 'ConocoPhillips',
  CPRX: 'Catalyst Pharmaceuticals',
  FICO: 'Fair Isaac Corporation',
  FCX: 'Freeport-McMoRan',
  FDX: 'FedEx',
  FIX: 'Comfort Systems',
  GEV: 'GE Vernova',
  GOOGL: 'Alphabet',
  GS: 'Goldman Sachs',
  INTC: 'Intel',
  INTU: 'Intuit',
  ISRG: 'Intuitive Surgical',
  JPM: 'JPMorgan Chase',
  KO: 'Coca-Cola',
  LITE: 'Lumentum Holdings',
  LNG: 'Cheniere Energy',
  LLY: 'Eli Lilly',
  LYB: 'LyondellBasell Industries',
  MA: 'Mastercard',
  MDB: 'MongoDB',
  MELI: 'MercadoLibre',
  META: 'Meta',
  MSFT: 'Microsoft',
  MU: 'Micron Technology',
  NEM: 'Newmont',
  NIO: 'Nio',
  NOW: 'ServiceNow',
  NUE: 'Nucor Corp',
  NVDA: 'NVIDIA',
  ON: 'ON Semiconductor',
  OUST: 'Ouster',
  PANW: 'Palo Alto Networks',
  PEP: 'PepsiCo',
  PLTR: 'Palantir Technologies',
  QCOM: 'Qualcomm',
  SHOP: 'Shopify',
  SW: 'Smurfit WestRock',
  TMUS: 'T-Mobile',
  TPL: 'Texas Pacific Land',
  TSLA: 'Tesla',
  TSM: 'Taiwan Semiconductor Manufacturing',
  TTD: 'The Trade Desk',
  VKTX: 'Viking Therapeutics',
  VRT: 'Vertiv Holdings',
  WDC: 'Western Digital',
  WMT: 'Walmart',
  XOM: 'Exxon Mobil',
};

function getTickerFullName(ticker: string): string {
  return TICKER_FULL_NAMES[ticker] ?? ticker;
}

function formatDate(date: DateLike | 'present') {
  if (date === 'present') {
    return 'Present';
  }

  const month = months[date.month - 1].substring(0, 3);
  return `${month} ${date.year}`;
}

const resumeCategoryStyles: Record<
  ResumeEntry['category'],
  { bar: string; ring: string; dot: string }
> = {
  education: {
    bar: 'bg-purple-600',
    ring: 'ring-purple-200',
    dot: 'bg-purple-600',
  },
  work: {
    bar: 'bg-sky-700',
    ring: 'ring-sky-200',
    dot: 'bg-sky-700',
  },
  research: {
    bar: 'bg-amber-600',
    ring: 'ring-amber-200',
    dot: 'bg-amber-600',
  },
};

export {
  projects,
  featuredProjects,
  colors,
  months,
  getSearchLink,
  generateSlug,
  getProjectBySlug,
  getProjectSlug,
  getBetChartColor,
  getTickerFullName,
  formatDate,
  resumeCategoryStyles,
};
