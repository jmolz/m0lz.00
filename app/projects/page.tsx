import type { Metadata } from 'next'

import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/project-card'

export const metadata: Metadata = {
  title: 'Projects — m0lz',
  description:
    'Open-source projects and tools by Jacob Molz — the m0lz catalog and other shipped products.',
}

export default function ProjectsPage() {
  const catalogProjects = projects.filter((p) => p.variant)
  const otherProjects = projects.filter((p) => !p.variant)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">Projects</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        {projects.length} projects
      </p>

      <section className="mb-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          M0LZ CATALOG
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {catalogProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <section className="mt-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          OTHER PROJECTS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
