import type { BranchMarkProps } from '@/components/branch-mark'

export interface ProjectData {
  variant: BranchMarkProps['variant']
  name: string
  description: string
}

export const projects: ProjectData[] = [
  {
    variant: 'personal',
    name: 'm0lz.dev',
    description: 'This site',
  },
  {
    variant: 'blog-agent',
    name: 'm0lz.01 — Blog Agent',
    description: 'Autonomous blog content agent',
  },
  {
    variant: 'pice',
    name: 'm0lz.02 — PICE',
    description: 'Structured AI coding workflow',
  },
  {
    variant: 'mcp-guard',
    name: 'm0lz.03 — MCP-Guard',
    description: 'MCP security proxy daemon',
  },
]
