import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllResearch, getResearch } from '@/lib/research'
import { getAllPosts } from '@/lib/posts'
import { projects } from '@/data/projects'
import { compileMDX } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx-components'
import { BranchMark } from '@/components/branch-mark'
import { TableOfContents } from '@/components/table-of-contents'

export async function generateStaticParams() {
  const research = getAllResearch()
  return research.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { meta } = getResearch(slug)
  return {
    title: `${meta.title} — Research — m0lz`,
    description: meta.description,
  }
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { meta, content } = getResearch(slug)
  const Content = await compileMDX(content)
  const project = projects.find((p) => p.catalogId === meta.project)
  const relatedPosts = getAllPosts().filter((p) => p.project === meta.project)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 overflow-x-hidden">
      <header className="mb-8">
        <Link
          href="/research"
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4 block"
        >
          ← Research
        </Link>

        {project && (
          <div className="flex items-center gap-3 mb-4">
            {project.variant && (
              <BranchMark variant={project.variant} size={28} />
            )}
            <div>
              <p className="text-sm font-medium">
                {project.name}
                <span className="text-xs font-mono text-[var(--muted)] ml-2">
                  {project.catalogId}
                </span>
              </p>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-medium tracking-tight mb-3">
          {meta.title}
        </h1>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          {meta.description}
        </p>

        {(meta.author || meta.date) && (
          <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-3">
            {meta.author && <span>{meta.author}</span>}
            {meta.author && meta.date && <span>·</span>}
            {meta.date && <time className="font-mono">{meta.date}</time>}
          </div>
        )}

      </header>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      <TableOfContents />

      <article className="mt-8 prose-content leading-[1.8] text-sm">
        <Content components={mdxComponents} />
      </article>

      {relatedPosts.length > 0 && (
        <>
          <hr className="border-[var(--border)] border-t-[0.5px] mt-12" />

          <section className="mt-6">
            <p className="text-xs tracking-widest text-[var(--muted)] mb-4">
              RELATED WRITING
            </p>
            <ul className="space-y-3">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group"
                  >
                    <p className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                      {post.title}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}
