import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts, getPost, getAdjacentPosts } from '@/lib/posts'
import { getAllResearch } from '@/lib/research'
import { projects } from '@/data/projects'
import { compileMDX } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx-components'
import { BranchMark } from '@/components/branch-mark'
import { TableOfContents } from '@/components/table-of-contents'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { meta } = getPost(slug)
  return {
    title: `${meta.title} — m0lz`,
    description: meta.description,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { meta, content } = getPost(slug)
  const Content = await compileMDX(content)
  const { prev, next } = getAdjacentPosts(slug)

  const project = meta.project
    ? projects.find((p) => p.catalogId === meta.project)
    : null
  const research = meta.project
    ? getAllResearch().find((r) => r.project === meta.project)
    : null

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight mb-3">
          {meta.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <time className="font-mono">{meta.date}</time>
          <span>·</span>
          <span>{meta.readingTime} min read</span>
          {meta.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{meta.tags.join(', ')}</span>
            </>
          )}
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">Jacob Molz</p>

        {(project || research) && (
          <div className="mt-4 p-4 border border-[var(--border)] rounded-sm">
            {project && (
              <div className="flex items-center gap-2 mb-2">
                {project.variant && (
                  <BranchMark variant={project.variant} size={16} />
                )}
                <span className="text-xs font-medium">
                  {project.name}
                  <span className="font-mono text-[var(--muted)] ml-2">
                    {project.catalogId}
                  </span>
                </span>
              </div>
            )}

            <a
              href={project?.url || meta.companion_repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors block mb-2"
            >
              {(project?.url || meta.companion_repo || '').replace('https://', '')}
            </a>

            {research && research.sections && research.sections.length > 0 && (
              <>
                <p className="text-xs tracking-widest text-[var(--muted)] mt-3 mb-1">
                  RESEARCH
                </p>
                <ul className="space-y-0.5">
                  {research.sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`/research/${research.slug}#${section.id}`}
                        className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </header>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <TableOfContents />

      <article className="mt-8 prose-content leading-[1.8] text-sm">
        <Content components={mdxComponents} />
      </article>

      {(prev || next) && (
        <>
          <hr className="border-[var(--border)] border-t-[0.5px] mt-12" />

          <nav className="flex justify-between mt-6 text-sm">
            {prev ? (
              <Link
                href={`/writing/${prev.slug}`}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/writing/${next.slug}`}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </>
      )}
    </div>
  )
}
