import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '../..')

function grep(pattern: string, includes: string[], dirs: string[]): string {
  const includeFlags = includes.map((i) => `--include="${i}"`).join(' ')
  const dirPaths = dirs.map((d) => path.join(ROOT, d)).join(' ')
  try {
    return execSync(
      `grep -rn '${pattern}' ${includeFlags} ${dirPaths} 2>/dev/null`,
      { encoding: 'utf-8' },
    )
  } catch {
    return ''
  }
}

describe('Design Constraints', () => {
  describe('Monochrome constraint', () => {
    it('uses only allowed hex colors in .tsx files', () => {
      const allowed = [
        '#000000',
        '#ffffff',
        '#737373',
        '#a3a3a3',
        '#e5e5e5',
        '#262626',
      ]
      const raw = grep(
        '#[0-9a-fA-F]\\{3,8\\}',
        ['*.tsx'],
        ['app', 'components'],
      )
      const lines = raw.split('\n').filter(Boolean)
      const violations = lines.filter(
        (line) => !allowed.some((color) => line.includes(color)),
      )
      expect(violations).toEqual([])
    })

    it('uses only allowed hex colors in .css files', () => {
      const allowed = [
        '#000000',
        '#ffffff',
        '#737373',
        '#a3a3a3',
        '#e5e5e5',
        '#262626',
        '#86efac33',
        '#065f4633',
      ]
      const raw = grep('#[0-9a-fA-F]\\{3,8\\}', ['*.css'], ['app', 'styles'])
      const lines = raw.split('\n').filter(Boolean)
      const violations = lines.filter(
        (line) => !allowed.some((color) => line.includes(color)),
      )
      expect(violations).toEqual([])
    })
  })

  describe('Font weight constraint', () => {
    it('does not use font-semibold (600)', () => {
      const result = grep('font-semibold', ['*.tsx', '*.css'], [
        'app',
        'components',
      ])
      expect(result).toBe('')
    })

    it('does not use font-bold (700)', () => {
      const result = grep('font-bold', ['*.tsx', '*.css'], [
        'app',
        'components',
      ])
      expect(result).toBe('')
    })

    it('does not use font-weight: 600', () => {
      const result = grep('font-weight:\\s*600', ['*.tsx', '*.css'], [
        'app',
        'components',
      ])
      expect(result).toBe('')
    })

    it('does not use font-weight: 700', () => {
      const result = grep('font-weight:\\s*700', ['*.tsx', '*.css'], [
        'app',
        'components',
      ])
      expect(result).toBe('')
    })
  })

  describe('Tailwind v4 CSS-based config', () => {
    it('does not have a tailwind.config.ts file', () => {
      expect(fs.existsSync(path.join(ROOT, 'tailwind.config.ts'))).toBe(false)
    })

    it('does not have a tailwind.config.js file', () => {
      expect(fs.existsSync(path.join(ROOT, 'tailwind.config.js'))).toBe(false)
    })

    it('does not have a tailwind.config.mjs file', () => {
      expect(fs.existsSync(path.join(ROOT, 'tailwind.config.mjs'))).toBe(false)
    })
  })

  describe('No inline styles', () => {
    it('does not use inline style attributes in component files', () => {
      const result = grep('style=', ['*.tsx'], ['components'])
      expect(result).toBe('')
    })

    it('does not use inline style attributes in page files', () => {
      const result = grep('style=', ['*.tsx'], ['app'])
      expect(result).toBe('')
    })
  })

  describe('CSS tokens', () => {
    it('defines all 4 required custom properties in :root', () => {
      const css = fs.readFileSync(
        path.join(ROOT, 'app/globals.css'),
        'utf-8',
      )
      expect(css).toContain('--foreground:')
      expect(css).toContain('--background:')
      expect(css).toContain('--muted:')
      expect(css).toContain('--border:')
    })

    it('defines all 4 required custom properties in .dark', () => {
      const css = fs.readFileSync(
        path.join(ROOT, 'app/globals.css'),
        'utf-8',
      )
      const darkBlock = css.slice(css.indexOf('.dark'))
      expect(darkBlock).toContain('--foreground:')
      expect(darkBlock).toContain('--background:')
      expect(darkBlock).toContain('--muted:')
      expect(darkBlock).toContain('--border:')
    })
  })

  describe('ESLint config', () => {
    it('registers the react-hooks plugin', () => {
      const config = fs.readFileSync(
        path.join(ROOT, 'eslint.config.mjs'),
        'utf-8',
      )
      expect(config).toContain('eslint-plugin-react-hooks')
      expect(config).toMatch(/['"]react-hooks['"]\s*:\s*reactHooks/)
    })

    it('enforces react-hooks/rules-of-hooks as an error', () => {
      const config = fs.readFileSync(
        path.join(ROOT, 'eslint.config.mjs'),
        'utf-8',
      )
      expect(config).toMatch(
        /['"]react-hooks\/rules-of-hooks['"]\s*:\s*['"]error['"]/,
      )
    })

    it('enforces react-hooks/exhaustive-deps as an error', () => {
      const config = fs.readFileSync(
        path.join(ROOT, 'eslint.config.mjs'),
        'utf-8',
      )
      expect(config).toMatch(
        /['"]react-hooks\/exhaustive-deps['"]\s*:\s*['"]error['"]/,
      )
    })
  })
})
