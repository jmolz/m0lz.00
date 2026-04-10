import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts, getPost, getAdjacentPosts } from '@/lib/posts'
import { compileMDX } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx-components'

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
      </header>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

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
