import type { Metadata } from 'next'

import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/project-card'

export const metadata: Metadata = {
  title: 'Projects — m0lz',
  description:
    'Projects and tools by Jacob Molz — public open-source work and private products.',
}

export default function ProjectsPage() {
  const publicProjects = projects.filter((p) => p.public)
  const privateProjects = projects.filter((p) => !p.public)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">Projects</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        {projects.length} projects
      </p>

      <section className="mb-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          PUBLIC
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {publicProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <section className="mt-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          PRIVATE
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {privateProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
