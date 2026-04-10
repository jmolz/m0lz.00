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
