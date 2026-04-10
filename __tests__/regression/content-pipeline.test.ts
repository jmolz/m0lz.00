import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { getAllPosts, getPost, getAdjacentPosts } from '@/lib/posts'
import { projects } from '@/data/projects'

const ROOT = path.resolve(__dirname, '../..')

describe('Post Utilities (lib/posts.ts)', () => {
  it('lib/posts.ts exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'lib/posts.ts'))).toBe(true)
  })

  it('exports getAllPosts, getPost, getAdjacentPosts', () => {
    const content = fs.readFileSync(path.join(ROOT, 'lib/posts.ts'), 'utf-8')
    expect(content).toContain('export function getAllPosts')
    expect(content).toContain('export function getPost')
    expect(content).toContain('export function getAdjacentPosts')
  })

  it('exports PostFrontmatter and PostMeta types', () => {
    const content = fs.readFileSync(path.join(ROOT, 'lib/posts.ts'), 'utf-8')
    expect(content).toContain('export interface PostFrontmatter')
    expect(content).toContain('export interface PostMeta')
  })

  it('getAllPosts returns array sorted by date descending', () => {
    const posts = getAllPosts()
    expect(Array.isArray(posts)).toBe(true)
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].date).getTime(),
      )
    }
  })

  it('getAllPosts filters out unpublished posts', () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect(post.published).toBe(true)
    }
  })

  it('getPost returns frontmatter and content separately', () => {
    const posts = getAllPosts()
    if (posts.length === 0) return
    const { meta, content } = getPost(posts[0].slug)
    expect(meta).toBeDefined()
    expect(meta.title).toBeTruthy()
    expect(typeof content).toBe('string')
    expect(content.length).toBeGreaterThan(0)
  })

  it('reading time is computed (>= 1 minute)', () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect(post.readingTime).toBeGreaterThanOrEqual(1)
    }
  })

  it('slug matches directory name', () => {
    const postsDir = path.join(ROOT, 'content/posts')
    if (!fs.existsSync(postsDir)) return
    const slugs = fs
      .readdirSync(postsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)

    const posts = getAllPosts()
    for (const post of posts) {
      expect(slugs).toContain(post.slug)
    }
  })

  it('getPost throws for unpublished slug', () => {
    const postsDir = path.join(ROOT, 'content/posts')
    if (!fs.existsSync(postsDir)) return

    const slugs = fs
      .readdirSync(postsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)

    for (const slug of slugs) {
      const filePath = path.join(postsDir, slug, 'index.mdx')
      if (!fs.existsSync(filePath)) continue
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      if (!data.published) {
        expect(() => getPost(slug)).toThrow('not published')
      }
    }
  })

  it('getAdjacentPosts returns prev and next as PostMeta or null', () => {
    const posts = getAllPosts()
    if (posts.length === 0) return
    const { prev, next } = getAdjacentPosts(posts[0].slug)
    if (posts.length === 1) {
      expect(prev).toBeNull()
      expect(next).toBeNull()
    }
    if (prev) expect(prev.slug).toBeTruthy()
    if (next) expect(next.slug).toBeTruthy()
  })
})

describe('MDX Compilation (lib/mdx.ts)', () => {
  it('lib/mdx.ts exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'lib/mdx.ts'))).toBe(true)
  })

  it('exports compileMDX function', () => {
    const content = fs.readFileSync(path.join(ROOT, 'lib/mdx.ts'), 'utf-8')
    expect(content).toContain('export async function compileMDX')
  })
})

describe('Frontmatter Schema', () => {
  it('test post has all required fields', () => {
    const mdxPath = path.join(ROOT, 'content/posts/hello-world/index.mdx')
    expect(fs.existsSync(mdxPath)).toBe(true)
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { data } = matter(raw)
    expect(data.title).toBeTruthy()
    expect(data.description).toBeTruthy()
    expect(data.date).toBeTruthy()
    expect(data.tags).toBeTruthy()
    expect(data.published).toBe(true)
  })

  it('date format is YYYY-MM-DD', () => {
    const mdxPath = path.join(ROOT, 'content/posts/hello-world/index.mdx')
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { data } = matter(raw)
    expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('tags is an array of strings', () => {
    const mdxPath = path.join(ROOT, 'content/posts/hello-world/index.mdx')
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { data } = matter(raw)
    expect(Array.isArray(data.tags)).toBe(true)
    for (const tag of data.tags) {
      expect(typeof tag).toBe('string')
    }
  })
})

describe('Project Data', () => {
  it('all 9 projects present', () => {
    expect(projects.length).toBe(9)
  })

  it('m0lz catalog projects have variant field', () => {
    const catalogProjects = projects.filter((p) => p.variant)
    expect(catalogProjects.length).toBe(4)
  })

  it('all projects have name, description, url, tech', () => {
    for (const project of projects) {
      expect(project.name).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.url).toBeTruthy()
      expect(project.tech).toBeTruthy()
    }
  })

  it('no duplicate project names', () => {
    const names = projects.map((p) => p.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('Component Exports', () => {
  it('post-card.tsx exports PostCard', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'components/post-card.tsx'),
      'utf-8',
    )
    expect(content).toContain('export function PostCard')
  })

  it('project-card.tsx exports ProjectCard', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'components/project-card.tsx'),
      'utf-8',
    )
    expect(content).toContain('export function ProjectCard')
  })

  it('code-block.tsx exports CodeBlock', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'components/code-block.tsx'),
      'utf-8',
    )
    expect(content).toContain('export function CodeBlock')
  })

  it('mdx-components.tsx exports mdxComponents', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'components/mdx-components.tsx'),
      'utf-8',
    )
    expect(content).toContain('export const mdxComponents')
  })
})

describe('Dynamic Post Route', () => {
  it('app/writing/[slug]/page.tsx exists', () => {
    expect(
      fs.existsSync(path.join(ROOT, 'app/writing/[slug]/page.tsx')),
    ).toBe(true)
  })

  it('has default export and generateStaticParams', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/writing/[slug]/page.tsx'),
      'utf-8',
    )
    expect(content).toMatch(/export default/)
    expect(content).toContain('generateStaticParams')
  })

  it('awaits params (Next.js 16 async API)', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/writing/[slug]/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('await params')
  })

  it('post page conditionally renders prev/next nav', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/writing/[slug]/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('(prev || next)')
  })
})

describe('Page Wiring', () => {
  it('writing index uses getAllPosts and PostCard', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/writing/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('getAllPosts')
    expect(content).toContain('PostCard')
  })

  it('projects page has two sections: catalog and other', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/projects/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('M0LZ CATALOG')
    expect(content).toContain('OTHER PROJECTS')
    expect(content).toContain('ProjectCard')
  })

  it('landing page uses PostCard and ProjectCard', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('PostCard')
    expect(content).toContain('ProjectCard')
    expect(content).toContain('getAllPosts')
  })

  it('landing page limits latest posts to 5', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('.slice(0, 5)')
  })
})

describe('About & Research Pages', () => {
  it('about page has bio content', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/about/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('AI Product Engineer')
  })

  it('about page has background section', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/about/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('BACKGROUND')
  })

  it('about page has education section', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/about/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('EDUCATION')
  })

  it('about page links to GitHub and LinkedIn', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/about/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('github.com/jmolz')
    expect(content).toContain('linkedin.com/in/jacobmolz')
  })

  it('about page has metadata description', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/about/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('description')
    expect(content).not.toMatch(/description:\s*['"]?\s*['"]?\s*,/)
  })

  it('research page has descriptive placeholder (not bare Coming soon)', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/research/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('data-driven')
    expect(content).not.toMatch(
      />\s*Coming soon\.\s*<\/p>\s*<\/div>\s*\)\s*\}/,
    )
  })

  it('research page has metadata description', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/research/page.tsx'),
      'utf-8',
    )
    expect(content).toContain('description')
    expect(content).not.toMatch(/description:\s*['"]?\s*['"]?\s*,/)
  })

  it('all page routes have metadata descriptions', () => {
    const pages = [
      'app/page.tsx',
      'app/writing/page.tsx',
      'app/projects/page.tsx',
      'app/research/page.tsx',
      'app/about/page.tsx',
    ]
    for (const page of pages) {
      const content = fs.readFileSync(path.join(ROOT, page), 'utf-8')
      expect(content).toContain('description')
    }
  })
})

describe('OG Images & RSS', () => {
  it('lib/og.tsx exists and exports createOGImage', () => {
    const content = fs.readFileSync(path.join(ROOT, 'lib/og.tsx'), 'utf-8')
    expect(content).toContain('export async function createOGImage')
  })

  it('site default opengraph-image exists', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/opengraph-image.tsx'),
      'utf-8',
    )
    expect(content).toContain('size')
    expect(content).toContain('contentType')
  })

  it('post opengraph-image exists with generateStaticParams', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/writing/[slug]/opengraph-image.tsx'),
      'utf-8',
    )
    expect(content).toContain('generateStaticParams')
  })

  it('RSS route handler exists and exports GET', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/feed.xml/route.ts'),
      'utf-8',
    )
    expect(content).toContain('export async function GET')
  })

  it('RSS route handler does not read from Request', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/feed.xml/route.ts'),
      'utf-8',
    )
    expect(content).not.toMatch(/function GET\s*\(\s*(req|request)/)
  })

  it('layout has metadataBase', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/layout.tsx'),
      'utf-8',
    )
    expect(content).toContain('metadataBase')
  })

  it('layout has openGraph config', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/layout.tsx'),
      'utf-8',
    )
    expect(content).toContain('openGraph')
  })

  it('layout has twitter config', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/layout.tsx'),
      'utf-8',
    )
    expect(content).toContain('twitter')
  })
})

describe('Code Block Styling', () => {
  it('globals.css has rehype-pretty-code dual theme rules', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/globals.css'),
      'utf-8',
    )
    expect(content).toContain('data-rehype-pretty-code')
    expect(content).toContain("data-theme='light'")
    expect(content).toContain("data-theme='dark'")
  })

  it('globals.css has code block container styles', () => {
    const content = fs.readFileSync(
      path.join(ROOT, 'app/globals.css'),
      'utf-8',
    )
    expect(content).toContain('data-rehype-pretty-code-title')
    expect(content).toContain('pre code')
  })
})
