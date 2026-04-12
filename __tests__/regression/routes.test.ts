import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '../..')

describe('Route Stubs', () => {
  const routes = [
    { path: 'app/page.tsx', name: '/' },
    { path: 'app/writing/page.tsx', name: '/writing' },
    { path: 'app/projects/page.tsx', name: '/projects' },
    { path: 'app/research/page.tsx', name: '/research' },
    { path: 'app/about/page.tsx', name: '/about' },
  ]

  it.each(routes)('$name route file exists ($path)', ({ path: routePath }) => {
    expect(fs.existsSync(path.join(ROOT, routePath))).toBe(true)
  })

  it.each(routes)(
    '$name exports a default function',
    ({ path: routePath }) => {
      const content = fs.readFileSync(path.join(ROOT, routePath), 'utf-8')
      expect(content).toMatch(/export default function/)
    },
  )

  describe('Root layout', () => {
    it('layout.tsx exists', () => {
      expect(fs.existsSync(path.join(ROOT, 'app/layout.tsx'))).toBe(true)
    })

    it('layout exports a default function', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toMatch(/export default function/)
    })

    it('layout imports Geist fonts', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toContain('GeistSans')
      expect(content).toContain('GeistMono')
    })

    it('layout imports ThemeProvider', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toContain('ThemeProvider')
    })

    it('layout imports Nav and Footer', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toContain('Nav')
      expect(content).toContain('Footer')
    })

    it('layout has html lang="en"', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toContain('lang="en"')
    })
  })

  describe('Navigation', () => {
    it('nav.tsx exists', () => {
      expect(fs.existsSync(path.join(ROOT, 'components/nav.tsx'))).toBe(true)
    })

    it('nav links to all routes', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/nav.tsx'),
        'utf-8',
      )
      expect(content).toContain('/writing')
      expect(content).toContain('/projects')
      expect(content).toContain('/research')
      expect(content).toContain('/about')
    })

    it('nav includes BranchMark', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/nav.tsx'),
        'utf-8',
      )
      expect(content).toContain('BranchMark')
    })

    it('nav includes ThemeToggle', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/nav.tsx'),
        'utf-8',
      )
      expect(content).toContain('ThemeToggle')
    })
  })

  describe('Footer', () => {
    it('footer.tsx exists', () => {
      expect(
        fs.existsSync(path.join(ROOT, 'components/footer.tsx')),
      ).toBe(true)
    })

    it('footer includes GitHub link', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/footer.tsx'),
        'utf-8',
      )
      expect(content).toContain('github.com')
    })

    it('footer includes RSS link', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/footer.tsx'),
        'utf-8',
      )
      expect(content).toContain('feed.xml')
    })
  })

  describe('Table of Contents', () => {
    it('table-of-contents.tsx exists', () => {
      expect(
        fs.existsSync(path.join(ROOT, 'components/table-of-contents.tsx')),
      ).toBe(true)
    })

    it('component is a client component', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/table-of-contents.tsx'),
        'utf-8',
      )
      expect(content).toContain("'use client'")
    })

    it('component uses IntersectionObserver', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/table-of-contents.tsx'),
        'utf-8',
      )
      expect(content).toContain('IntersectionObserver')
    })

    it('MDX pipeline imports rehype-slug', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'lib/mdx.ts'),
        'utf-8',
      )
      expect(content).toContain('rehype-slug')
    })

    it('globals.css has scroll-behavior smooth', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/globals.css'),
        'utf-8',
      )
      expect(content).toContain('scroll-behavior: smooth')
    })

    it('component uses only monochrome color tokens', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/table-of-contents.tsx'),
        'utf-8',
      )
      expect(content).toContain('var(--foreground)')
      expect(content).toContain('var(--muted)')
      expect(content).toContain('var(--border)')
      expect(content).not.toMatch(/#[0-9a-fA-F]{3,6}/)
    })

    it('component is hidden on narrow viewports', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/table-of-contents.tsx'),
        'utf-8',
      )
      expect(content).toMatch(/hidden\s+xl:block/)
    })

    it('TOC queries h2 headings only, not h3', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/table-of-contents.tsx'),
        'utf-8',
      )
      expect(content).toContain("h2[id]")
      expect(content).not.toContain("h3[id]")
    })

    it('prose content prevents horizontal overflow', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/globals.css'),
        'utf-8',
      )
      expect(content).toContain('overflow-wrap: break-word')
    })
  })

  describe('Research Panel', () => {
    it('research-panel.tsx exists', () => {
      expect(
        fs.existsSync(path.join(ROOT, 'components/research-panel.tsx')),
      ).toBe(true)
    })

    it('component is a client component', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toContain("'use client'")
    })

    it('panel-scoped TOC uses scrollContainerRef as IntersectionObserver root', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toContain('IntersectionObserver')
      expect(content).toMatch(/root:\s*scrollContainerRef/)
    })

    it('panel is wide enough for a two-column layout', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toMatch(/max-w-(3xl|4xl|5xl|6xl|7xl)/)
    })

    it('panel scroll container reuses the .toc-scroll class', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toContain('toc-scroll')
    })

    it('panel TOC is hidden below lg breakpoint', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toMatch(/hidden\s+lg:block/)
    })

    it('does not render the viewport-scoped TableOfContents inside the panel', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).not.toContain('<TableOfContents')
    })

    it('component uses only monochrome color tokens', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toContain('var(--foreground)')
      expect(content).toContain('var(--muted)')
      expect(content).toContain('var(--border)')
      expect(content).not.toMatch(/#[0-9a-fA-F]{3,6}/)
      expect(content).not.toMatch(/\bdark:/)
    })

    it('panel TOC queries h2 headings only, not h3', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toContain("h2[id]")
      expect(content).not.toContain("h3[id]")
    })

    it('panel TOC uses viewport-relative max-height for independent scrolling', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'components/research-panel.tsx'),
        'utf-8',
      )
      expect(content).toContain('calc(100vh')
      expect(content).not.toContain('max-h-full')
    })
  })

  describe('Metadata', () => {
    it('layout exports metadata with title', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toContain("title:")
    })

    it('layout metadata includes favicon', () => {
      const content = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(content).toContain('favicon.svg')
    })
  })
})
