import type { Metadata } from 'next'

import { BranchMark } from '@/components/branch-mark'

export const metadata: Metadata = {
  title: 'About — m0lz',
  description:
    'Jacob Molz — AI Product Engineer & Technical Founder. 15+ shipped products, 7,100+ GitHub contributions/year.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">About</h1>
      <p className="text-[var(--muted)] leading-relaxed">
        Jacob Molz — AI Product Engineer & Technical Founder. Building
        tools for the agentic engineering stack: AI coding workflows, MCP
        security, and structured development frameworks.
      </p>

      <hr className="border-[var(--border)] border-t-[0.5px] my-10" />

      <section>
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          BACKGROUND
        </p>
        <div className="space-y-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-[var(--muted)] sm:w-40 shrink-0">
              Shipping
            </span>
            <span>15+ products shipped, 7,100+ GitHub contributions/year</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-[var(--muted)] sm:w-40 shrink-0">
              Previously
            </span>
            <span>
              15 years B2B SaaS leadership (VP/SVP/CSO) at 24/7 Software,
              CleanAir.ai
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-[var(--muted)] sm:w-40 shrink-0">
              Current focus
            </span>
            <span>
              Agentic systems, MCP security, AI coding workflows, and Alpaka
            </span>
          </div>
        </div>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px] my-10" />

      <section>
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          EDUCATION
        </p>
        <div className="space-y-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-[var(--muted)] sm:w-40 shrink-0">MBA</span>
            <span>Nova Southeastern University</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-[var(--muted)] sm:w-40 shrink-0">
              BSBA Entrepreneurship
            </span>
            <span>University of Central Florida</span>
          </div>
        </div>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px] my-10" />

      <section>
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          M0LZ CATALOG
        </p>
        <p className="text-sm text-[var(--muted)] mb-6">
          Numbered projects under a shared identity system. Each gets a unique
          branch mark — a generative logo based on git branch iconography.
        </p>
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <BranchMark variant="personal" size={24} />
            <span>
              <span className="font-medium">m0lz.00</span> — This site
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BranchMark variant="blog-agent" size={24} />
            <span>
              <span className="font-medium">m0lz.01</span> — Blog Agent
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BranchMark variant="pice" size={24} />
            <span>
              <span className="font-medium">m0lz.02</span> — PICE Framework
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BranchMark variant="mcp-guard" size={24} />
            <span>
              <span className="font-medium">m0lz.03</span> — MCP-Guard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BranchMark variant="case-pilot" size={24} />
            <span>
              <span className="font-medium">m0lz.04</span> — Case Pilot
            </span>
          </div>
        </div>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px] my-10" />

      <section>
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          CONNECT
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/jmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jacobmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--foreground)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}
