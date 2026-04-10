import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '../..')

describe('Theme System', () => {
  describe('Blocking script', () => {
    it('exports a themeScript string', async () => {
      const mod = await import('@/components/theme-provider')
      expect(typeof mod.themeScript).toBe('string')
      expect(mod.themeScript.length).toBeGreaterThan(0)
    })

    it('blocking script defaults to dark mode', async () => {
      const { themeScript } = await import('@/components/theme-provider')
      expect(themeScript).toContain("localStorage.getItem('theme')")
      expect(themeScript).toContain("'light'")
      expect(themeScript).toContain("classList.remove('dark')")
    })

    it('blocking script only removes dark class for light mode (does not add)', async () => {
      const { themeScript } = await import('@/components/theme-provider')
      expect(themeScript).not.toContain("classList.add('dark')")
    })
  })

  describe('Static HTML', () => {
    it('layout bakes dark class into <html> element', () => {
      const layout = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(layout).toMatch(/className=\{`dark\s/)
    })

    it('layout includes suppressHydrationWarning', () => {
      const layout = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(layout).toContain('suppressHydrationWarning')
    })

    it('layout injects themeScript via dangerouslySetInnerHTML', () => {
      const layout = fs.readFileSync(
        path.join(ROOT, 'app/layout.tsx'),
        'utf-8',
      )
      expect(layout).toContain('dangerouslySetInnerHTML')
      expect(layout).toContain('themeScript')
    })
  })

  describe('CSS theme tokens', () => {
    it(':root defines light-mode colors', () => {
      const css = fs.readFileSync(
        path.join(ROOT, 'app/globals.css'),
        'utf-8',
      )
      const rootBlock = css.slice(
        css.indexOf(':root'),
        css.indexOf('}', css.indexOf(':root')) + 1,
      )
      expect(rootBlock).toContain('--foreground: #000000')
      expect(rootBlock).toContain('--background: #ffffff')
    })

    it('.dark defines dark-mode colors', () => {
      const css = fs.readFileSync(
        path.join(ROOT, 'app/globals.css'),
        'utf-8',
      )
      const darkBlock = css.slice(
        css.indexOf('.dark'),
        css.indexOf('}', css.indexOf('.dark')) + 1,
      )
      expect(darkBlock).toContain('--foreground: #ffffff')
      expect(darkBlock).toContain('--background: #000000')
    })
  })

  describe('ThemeProvider exports', () => {
    it('exports ThemeProvider component', async () => {
      const mod = await import('@/components/theme-provider')
      expect(typeof mod.ThemeProvider).toBe('function')
    })

    it('exports useTheme hook', async () => {
      const mod = await import('@/components/theme-provider')
      expect(typeof mod.useTheme).toBe('function')
    })
  })
})
