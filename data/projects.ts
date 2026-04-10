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
    description: 'This site',
    url: 'https://m0lz.dev',
    tech: 'Next.js / TypeScript',
    catalogId: 'm0lz.00',
    variant: 'personal',
  },
  {
    name: 'm0lz.01 — Blog Agent',
    description: 'Autonomous blog content agent',
    url: 'https://github.com/jmolz/blog-agent',
    tech: 'TypeScript',
    catalogId: 'm0lz.01',
    variant: 'blog-agent',
  },
  {
    name: 'm0lz.02 — PICE',
    description: 'Structured AI coding workflow orchestrator with dual-model adversarial evaluation',
    url: 'https://github.com/jmolz/pice-framework',
    tech: 'Rust',
    catalogId: 'm0lz.02',
    variant: 'pice',
  },
  {
    name: 'm0lz.03 — MCP-Guard',
    description: 'Security proxy daemon for MCP servers — auth, rate limiting, PII detection, permissions, audit logging',
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
    description: 'AI-powered legal case management for pro se litigants',
    url: 'https://github.com/jmolz/case-pilot',
    tech: 'JavaScript',
  },
  {
    name: 'Bloom',
    description: 'AI-powered revenue discovery for service businesses',
    url: 'https://meetbloom.io',
    tech: 'TypeScript/Next.js',
  },
  {
    name: 'Investor Matchmaker',
    description: 'Python-based investor-founder matchmaking for Startup Week',
    url: 'https://github.com/Raleigh-Durham-Startup-Week/investor-matchmaker',
    tech: 'Python',
  },
]
