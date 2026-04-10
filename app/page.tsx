import type { Metadata } from 'next'

import { BranchMark } from '@/components/branch-mark'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'm0lz — Technical Research & Engineering',
}

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <section className="mb-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-4">
          TECHNICAL RESEARCH & ENGINEERING
        </p>
        <h1 className="text-4xl tracking-[-1.5px] leading-tight mb-4">
          Building tools for the<br />agentic engineering stack
        </h1>
        <p className="text-[var(--muted)]">
          AI coding workflows, MCP security, and agentic systems.
          Written and shipped by Jacob Molz.
        </p>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <section className="my-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          LATEST
        </p>
        <p className="text-sm text-[var(--muted)]">No posts yet.</p>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <section className="my-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          PROJECTS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.variant}
              className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-sm"
            >
              <BranchMark variant={project.variant} size={36} />
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
