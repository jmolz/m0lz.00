import type { Metadata } from 'next'

import { getAllPosts } from '@/lib/posts'
import { projects } from '@/data/projects'
import { PostCard } from '@/components/post-card'
import { BranchMark } from '@/components/branch-mark'

export const metadata: Metadata = {
  title: 'Research — m0lz',
  description:
    'Deep dives into AI engineering — benchmarks, framework comparisons, and data-driven investigations.',
}

export default function ResearchPage() {
  const posts = getAllPosts()
  const projectPosts = posts.filter((p) => p.project)

  const catalogProjects = projects.filter((p) => p.catalogId)

  const grouped = catalogProjects
    .map((project) => ({
      project,
      posts: projectPosts.filter((p) => p.project === project.catalogId),
    }))
    .filter((g) => g.posts.length > 0)

  const unlinkedPosts = projectPosts.filter(
    (p) => !catalogProjects.some((proj) => proj.catalogId === p.project),
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">Research</h1>
      <p className="text-[var(--muted)] leading-relaxed mb-8">
        Writing and research linked to specific projects. Each section
        collects posts, deep dives, and technical analysis for a project
        in the m0lz catalog.
      </p>

      {grouped.length > 0 ? (
        <div className="space-y-12">
          {grouped.map(({ project, posts: groupPosts }) => (
            <section key={project.catalogId}>
              <div className="flex items-center gap-3 mb-2">
                {project.variant && (
                  <BranchMark variant={project.variant} size={24} />
                )}
                <div>
                  <p className="text-sm font-medium">
                    {project.name}
                    <span className="text-xs font-mono text-[var(--muted)] ml-2">
                      {project.catalogId}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {project.description}
                  </p>
                </div>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4 block"
              >
                {project.url.replace('https://', '')}
              </a>

              <hr className="border-[var(--border)] border-t-[0.5px] mb-2" />

              {groupPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </section>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          No project-linked research yet.
        </p>
      )}

      {unlinkedPosts.length > 0 && (
        <section className="mt-12">
          <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
            OTHER RESEARCH
          </p>
          {unlinkedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </div>
  )
}
