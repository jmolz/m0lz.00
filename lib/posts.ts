import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
  canonical?: string
  companion_repo?: string
  medium_url?: string
  devto_url?: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: number
}

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const slugs = fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const posts = slugs
    .map((slug) => {
      const filePath = path.join(POSTS_DIR, slug, 'index.mdx')
      if (!fs.existsSync(filePath)) return null

      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const frontmatter = data as PostFrontmatter

      if (!frontmatter.published) return null
      if (!frontmatter.title) throw new Error(`Missing title in ${slug}`)
      if (!frontmatter.date) throw new Error(`Missing date in ${slug}`)

      const readingTime = Math.ceil(content.split(/\s+/).length / 200)

      return {
        ...frontmatter,
        slug,
        readingTime,
      } as PostMeta
    })
    .filter((post): post is PostMeta => post !== null)

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPost(slug: string): { meta: PostMeta; content: string } {
  const filePath = path.join(POSTS_DIR, slug, 'index.mdx')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  if (!frontmatter.published) {
    throw new Error(`Post "${slug}" is not published`)
  }

  const readingTime = Math.ceil(content.split(/\s+/).length / 200)

  return {
    meta: {
      ...frontmatter,
      slug,
      readingTime,
    },
    content,
  }
}

export function getAdjacentPosts(
  slug: string,
): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
