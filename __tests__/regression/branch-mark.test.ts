import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '../..')

describe('Branch Mark', () => {
  const source = fs.readFileSync(
    path.join(ROOT, 'components/branch-mark.tsx'),
    'utf-8',
  )

  describe('Variant definitions', () => {
    const variants = ['personal', 'blog-agent', 'pice', 'mcp-guard'] as const

    it.each(variants)('defines the "%s" variant', (variant) => {
      expect(source).toContain(`'${variant}'`)
    })

    it('has exactly 4 variants in the type union', () => {
      const typeMatch = source.match(
        /variant:\s*(['"][^'"]+['"]\s*\|\s*)*['"][^'"]+['"]/,
      )
      expect(typeMatch).toBeTruthy()
      const variantCount = typeMatch![0].split('|').length
      expect(variantCount).toBe(4)
    })
  })

  describe('Distinct patterns', () => {
    it('personal has 2 branches', () => {
      const personalBlock = extractVariantBlock(source, 'personal')
      const branchCount = (personalBlock.match(/trunk:/g) || []).length
      expect(branchCount).toBe(2)
    })

    it('blog-agent has 3 branches', () => {
      const block = extractVariantBlock(source, "'blog-agent'")
      const branchCount = (block.match(/trunk:/g) || []).length
      expect(branchCount).toBe(3)
    })

    it('pice has 3 branches', () => {
      const block = extractVariantBlock(source, 'pice')
      const branchCount = (block.match(/trunk:/g) || []).length
      expect(branchCount).toBe(3)
    })

    it('mcp-guard has 2 branches', () => {
      const block = extractVariantBlock(source, "'mcp-guard'")
      const branchCount = (block.match(/trunk:/g) || []).length
      expect(branchCount).toBe(2)
    })

    it('personal and mcp-guard have different y positions', () => {
      const personalBlock = extractVariantBlock(source, 'personal')
      const mcpBlock = extractVariantBlock(source, "'mcp-guard'")
      const personalYs = extractYValues(personalBlock)
      const mcpYs = extractYValues(mcpBlock)
      expect(personalYs).not.toEqual(mcpYs)
    })
  })

  describe('Proportional scaling', () => {
    it('strokeWidth scales with size', () => {
      expect(source).toMatch(/sw\s*=\s*\(2\s*\/\s*36\)\s*\*\s*size/)
    })

    it('corner radius scales with size', () => {
      expect(source).toMatch(/r\s*=\s*\(4\s*\/\s*36\)\s*\*\s*size/)
    })

    it('branch length scales with size', () => {
      expect(source).toMatch(/branchLen\s*=\s*\(8\s*\/\s*36\)\s*\*\s*size/)
    })

    it('default size is 36', () => {
      expect(source).toMatch(/size\s*=\s*36/)
    })
  })

  describe('Theme awareness', () => {
    it('uses currentColor for the fill', () => {
      expect(source).toContain('fill="currentColor"')
    })

    it('uses var(--background) for strokes', () => {
      expect(source).toContain('stroke="var(--background)"')
    })
  })

  describe('Favicon', () => {
    it('favicon.svg exists', () => {
      expect(
        fs.existsSync(path.join(ROOT, 'public/favicon.svg')),
      ).toBe(true)
    })

    it('favicon.svg is a valid SVG', () => {
      const svg = fs.readFileSync(
        path.join(ROOT, 'public/favicon.svg'),
        'utf-8',
      )
      expect(svg).toContain('<svg')
      expect(svg).toContain('</svg>')
    })

    it('favicon.svg uses 16x16 viewBox', () => {
      const svg = fs.readFileSync(
        path.join(ROOT, 'public/favicon.svg'),
        'utf-8',
      )
      expect(svg).toContain('viewBox="0 0 16 16"')
    })
  })
})

function extractVariantBlock(source: string, variant: string): string {
  const idx = source.indexOf(variant + ':')
  if (idx === -1) {
    const altIdx = source.indexOf(variant + ']')
    if (altIdx === -1) return ''
    const start = altIdx
    const end = source.indexOf('],', start)
    return source.slice(start, end + 2)
  }
  const start = idx
  const end = source.indexOf('],', start)
  return source.slice(start, end + 2)
}

function extractYValues(block: string): number[] {
  const matches = block.match(/y:\s*([\d.]+)/g) || []
  return matches.map((m) => parseFloat(m.replace('y:', '').trim()))
}
