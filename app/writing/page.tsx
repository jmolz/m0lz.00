import type { Metadata } from 'next'

import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/post-card'

export const metadata: Metadata = {
  title: 'Writing — m0lz',
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">Writing</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </p>

      <hr className="border-[var(--border)] border-t-[0.5px]" />

      {posts.length > 0 ? (
        <div className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)] mt-6">No posts yet.</p>
      )}
    </div>
  )
}
