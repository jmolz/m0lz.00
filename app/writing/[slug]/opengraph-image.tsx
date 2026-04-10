import { createOGImage } from '@/lib/og'
import { getAllPosts, getPost } from '@/lib/posts'

export const dynamic = 'force-static'
export const alt = 'm0lz — Post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { meta } = getPost(slug)

  return createOGImage({
    title: meta.title,
    subtitle: meta.date,
  })
}
