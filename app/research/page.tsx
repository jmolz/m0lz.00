import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllResearch } from '@/lib/research'
import { projects } from '@/data/projects'
import { BranchMark } from '@/components/branch-mark'

export const metadata: Metadata = {
  title: 'Research — m0lz',
  description:
    'Deep dives into AI engineering — benchmarks, framework comparisons, and data-driven investigations.',
}

export default function ResearchIndexPage() {
  const research = getAllResearch()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">Research</h1>
      <p className="text-[var(--muted)] leading-relaxed mb-8">
        Technical research, deep dives, and analysis for projects in the
        m0lz catalog. Each project collects its research papers,
        benchmark methodology, and architectural investigations in one
        place.
      </p>

      {research.length > 0 ? (
        <div className="space-y-10">
          {research.map((r) => {
            const project = projects.find((p) => p.name === r.project)

            return (
              <Link
                key={r.slug}
                href={`/research/${r.slug}`}
                className="block p-6 border border-[var(--border)] rounded-sm hover:border-[var(--muted)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {project?.variant && (
                    <BranchMark variant={project.variant} size={28} />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {r.title}
                      {project?.variant && (
                        <span className="text-xs font-mono text-[var(--muted)] ml-2">
                          {project.name}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {r.description}
                    </p>
                  </div>
                </div>

                {r.sections && r.sections.length > 0 && (
                  <>
                    <hr className="border-[var(--border)] border-t-[0.5px] my-3" />
                    <p className="text-xs tracking-widest text-[var(--muted)] mb-2">
                      {r.sections.length} PAPERS
                    </p>
                    <ul className="space-y-1">
                      {r.sections.map((section) => (
                        <li
                          key={section.id}
                          className="text-xs text-[var(--muted)]"
                        >
                          {section.title}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          No research published yet.
        </p>
      )}
    </div>
  )
}
