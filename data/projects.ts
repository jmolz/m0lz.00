import type { BranchMarkProps } from '@/components/branch-mark'

export interface ProjectData {
  name: string
  description: string
  url: string
  tech: string
  catalogId?: string
  variant?: BranchMarkProps['variant']
}

export const projects: ProjectData[] = [
  {
    name: 'm0lz.dev',
    description: 'Monochrome developer blog & portfolio. Static-only Next.js 16 site with MDX content pipeline, generative branch mark identity system, and dark/light theme.',
    url: 'https://github.com/jmolz/m0lz.00',
    tech: 'Next.js / TypeScript',
    catalogId: 'm0lz.00',
    variant: 'personal',
  },
  {
    name: 'PICE',
    description: 'Structured AI coding workflow orchestrator. Plan → Implement → Contract-Evaluate with dual-model adversarial evaluation, WISC context management, and tiered verification.',
    url: 'https://github.com/jmolz/pice-framework',
    tech: 'Rust / TypeScript',
    catalogId: 'm0lz.02',
    variant: 'pice',
  },
  {
    name: 'MCP-Guard',
    description: 'Security proxy daemon for MCP servers. Authentication, rate limiting, PII detection, permission scoping, audit logging. 97% detection rate across 7,095 attack scenarios.',
    url: 'https://github.com/jmolz/mcp-guard',
    tech: 'TypeScript',
    catalogId: 'm0lz.03',
    variant: 'mcp-guard',
  },
  {
    name: 'Alpaka',
    description: 'Value chain intelligence for real estate — Scope 3 carbon emissions ML modeling, supply chain optimization',
    url: 'https://alpaka.ai',
    tech: 'Python ML + TypeScript',
  },
  {
    name: 'Ready Text',
    description: 'Waitlist texting & customer alert platform for restaurants and businesses',
    url: 'https://ready-text.com',
    tech: 'Laravel/PHP',
  },
  {
    name: 'Case Pilot',
    description: 'AI-powered legal case management for pro se litigants. Court filing monitor, deadline tracker, citation verification, red team analysis, and DOCX export. Local-first, privacy-focused.',
    url: 'https://github.com/jmolz/case-pilot',
    tech: 'JavaScript / Claude API',
  },
  {
    name: 'Bloom',
    description: 'AI-powered revenue discovery for service businesses',
    url: 'https://meetbloom.io',
    tech: 'TypeScript/Next.js',
  },
  {
    name: 'Investor Matchmaker',
    description: 'Investor-founder meeting scheduler for Startup Week. Greedy bipartite matching across investment type, business type, and sector with Excel I/O.',
    url: 'https://github.com/Raleigh-Durham-Startup-Week/investor-matchmaker',
    tech: 'Python',
  },
]
