import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ResearchSection {
  id: string
  title: string
}

export interface ResearchFrontmatter {
  title: string
  description: string
  project: string
  sections: ResearchSection[]
}

export interface ResearchMeta extends ResearchFrontmatter {
  slug: string
}

const RESEARCH_DIR = path.join(process.cwd(), 'content/research')

export function getAllResearch(): ResearchMeta[] {
  if (!fs.existsSync(RESEARCH_DIR)) return []

  const slugs = fs
    .readdirSync(RESEARCH_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  return slugs
    .map((slug) => {
      const filePath = path.join(RESEARCH_DIR, slug, 'index.mdx')
      if (!fs.existsSync(filePath)) return null

      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      const frontmatter = data as ResearchFrontmatter

      if (!frontmatter.title) return null

      return {
        ...frontmatter,
        slug,
      } as ResearchMeta
    })
    .filter((r): r is ResearchMeta => r !== null)
}

export function getResearch(slug: string): { meta: ResearchMeta; content: string } {
  const filePath = path.join(RESEARCH_DIR, slug, 'index.mdx')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as ResearchFrontmatter

  return {
    meta: {
      ...frontmatter,
      slug,
    },
    content,
  }
}
