<p align="center">
  <img src="public/branch-mark.svg" width="48" height="48" alt="m0lz.00 branch mark — personal variant">
</p>

<h1 align="center">m0lz.00</h1>

<p align="center">
  <strong>m0lz.dev</strong> — Monochrome developer blog & portfolio<br>
  <a href="https://m0lz.dev">m0lz.dev</a>
</p>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/github/license/jmolz/m0lz.00?style=flat-square&labelColor=404040&color=171717"></a>
  &nbsp;
  <a href="https://m0lz.dev"><img alt="Site status" src="https://img.shields.io/website?url=https%3A%2F%2Fm0lz.dev&style=flat-square&label=m0lz.dev&labelColor=404040&up_color=171717&down_color=171717&up_message=live&down_message=down"></a>
  &nbsp;
  <a href="https://nextjs.org"><img alt="Next.js version" src="https://img.shields.io/github/package-json/dependency-version/jmolz/m0lz.00/next?style=flat-square&label=next&labelColor=404040&color=171717"></a>
</p>

---

## Overview

Static-only blog and portfolio site. Austere black/white design with a generative branch mark identity system. Content published by the [m0lz.01 blog agent](https://github.com/jmolz/m0lz.01) via MDX commits — this repo renders, it doesn't generate.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Styling | Tailwind CSS 4, 4 monochrome color tokens |
| Content | MDX via `@mdx-js/mdx`, `rehype-pretty-code` (Shiki) |
| Fonts | Geist Sans (400, 500) |
| Testing | Vitest — 162 regression tests |
| Deploy | Vercel (static) |

## Development

```bash
npm install
npm run dev       # Start dev server on localhost:3000
npm run build     # Static export to out/
npm run test      # Run 162 regression tests
npm run lint      # ESLint
npm run format    # Prettier
```

## Project Structure

```
app/                    Next.js App Router pages
├── layout.tsx          Root layout, fonts, theme
├── page.tsx            Landing page
├── writing/            Blog posts (index + [slug])
├── projects/           Project cards grid
├── research/           Research index
├── about/              Bio, experience, contact
├── feed.xml/           RSS 2.0 feed
└── opengraph-image.tsx OG image generation
components/             Shared React components
content/posts/          MDX blog posts (committed by blog agent)
lib/                    Utilities (MDX pipeline, posts, OG images)
data/                   Project card data
__tests__/regression/   Cumulative regression suite
```

## Design System

Four colors. Two font weights. No exceptions.

```
--foreground  #000 / #fff
--background  #fff / #000
--muted       #737373 / #a3a3a3
--border      #e5e5e5 / #262626
```

Dark mode is the default. Theme toggle swaps foreground and background — that's the entire theme system.

## Branch Mark

m0lz.00 uses the **personal** variant — two vertical trunks with one left branch and one right branch. Each project in the m0lz catalog has a unique branch pattern:

| Catalog ID | Variant | Pattern |
|-----------|---------|---------|
| m0lz.00 | `personal` | ╠═ left branch, ═╣ right branch |
| m0lz.01 | `blog-agent` | ╠═ left branch, ═╣═╣ two right branches |
| m0lz.02 | `pice` | ╠═╠═ two left branches, ═╣ right branch |
| m0lz.03 | `mcp-guard` | ╠═ centered left, ═╣ centered right |

## Catalog

This is **m0lz.00** — the foundation site. Part of the m0lz project catalog:

- **m0lz.00** — This site ([m0lz.dev](https://m0lz.dev))
- **m0lz.01** — automated content publishing
- **m0lz.02** — AI coding workflow orchestrator
- **m0lz.03** — MCP security proxy daemon

## License

MIT
