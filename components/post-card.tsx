import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="flex gap-6 py-3 group"
    >
      <time className="text-xs font-mono text-[var(--muted)] shrink-0 pt-0.5">
        {post.date}
      </time>
      <div>
        <p className="text-sm font-medium text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
          {post.title}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <p className="text-xs text-[var(--muted)] mt-1">
            {post.tags.join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}
