import { BranchMark } from '@/components/branch-mark'
import type { ProjectData } from '@/data/projects'

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <a
      href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--muted)] transition-colors"
    >
      {project.variant && (
        <BranchMark variant={project.variant} size={36} />
      )}
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium">{project.name}</p>
          {project.catalogId && (
            <span className="text-xs font-mono text-[var(--muted)]">
              {project.catalogId}
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--muted)] mt-1">
          {project.description}
        </p>
        <p className="text-xs font-mono text-[var(--muted)] mt-2">
          {project.tech}
        </p>
      </div>
    </a>
  )
}
