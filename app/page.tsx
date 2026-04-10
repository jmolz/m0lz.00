import type { Metadata } from 'next'

import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/post-card'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'm0lz — Technical Research & Engineering',
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)
  const catalogProjects = projects.filter((p) => p.variant)

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
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--muted)]">No posts yet.</p>
        )}
      </section>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <section className="my-12">
        <p className="text-xs tracking-widest text-[var(--muted)] mb-6">
          PROJECTS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {catalogProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
