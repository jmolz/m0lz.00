# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

m0lz.00 is **m0lz.dev** — a monochrome, developer-focused technical blog and portfolio site. Built with Next.js 16, Tailwind CSS 4, and MDX. The design is intentionally austere: black and white only, no accent colors, no decorative elements. Typography, spacing, and content hierarchy do all the work. The blog agent (m0lz.01) is a separate repo that publishes content by committing MDX files here.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript 5.x | Primary language |
| Next.js 16 (v16.2.3) | App Router, static generation, Turbopack |
| React 19.2 | UI library (View Transitions, React Compiler support) |
| Tailwind CSS 4 | Utility-first styling, monochrome design system |
| @mdx-js/mdx | MDX compilation for blog posts |
| rehype-pretty-code | Shiki-powered syntax highlighting in code blocks |
| Geist + Geist Mono | Typography via `next/font` |
| Vercel | Hosting, edge network, auto-deploys |

---

## Commands

```bash
# Development
npm run dev                # Start dev server (Turbopack is default in Next.js 16)

# Build
npm run build              # Production build (static generation)

# Test
npm run test               # Run test suite
npm run test:watch         # Watch mode

# Lint & Format
npm run lint               # ESLint (flat config in Next.js 16)
npm run format             # Prettier

# Full Validation (run before every commit)
npm run lint && npx tsc --noEmit && npm run test && npm run build
```

---

## Project Structure

```text
m0lz.00/
├── README.md               # Project documentation with branch mark
├── LICENSE                  # MIT license
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout, fonts, theme provider
│   ├── page.tsx            # Landing page
│   ├── writing/            # Blog posts (index + [slug])
│   ├── projects/           # Project cards grid
│   ├── research/           # Research index (placeholder)
│   ├── about/              # Bio, experience, contact
│   ├── globals.css         # Tailwind base + monochrome tokens
│   ├── feed.xml/           # RSS feed (static route handler)
│   └── opengraph-image.tsx # Site default OG image
├── components/             # Shared React components
│   ├── branch-mark.tsx     # SVG logo with variant prop
│   ├── nav.tsx             # Site navigation
│   ├── footer.tsx          # Site footer
│   ├── theme-toggle.tsx    # Dark/light mode switch
│   ├── post-card.tsx       # Post listing item
│   ├── project-card.tsx    # Project card
│   ├── code-block.tsx      # Shiki code rendering + copy button
│   ├── mdx-components.tsx  # Custom MDX overrides
│   └── table-of-contents.tsx     # Floating TOC with IntersectionObserver
├── content/
│   └── posts/              # MDX blog posts (committed by blog agent)
│       └── {slug}/
│           ├── index.mdx
│           └── assets/
├── data/
│   └── projects.ts         # Project card data
├── lib/
│   ├── mdx.ts              # MDX processing pipeline
│   ├── posts.ts            # Post listing, sorting, filtering
│   └── og.tsx              # OG image generation logic
├── public/
│   ├── favicon.svg          # Branch mark favicon (16px, personal variant)
│   └── branch-mark.svg     # Branch mark for README (48px, personal variant)
├── __tests__/              # Vitest regression and unit tests
│   └── regression/         # Cumulative regression suite
├── .claude/                # AI layer (shared foundation + project overrides)
├── .windsurf/              # Windsurf workflows
├── next.config.ts
├── vitest.config.ts
├── package.json
└── tsconfig.json
```

---

## Architecture

**Static site with zero runtime data fetching.** Every page is pre-rendered at build time. No SSR, no ISR, no database, no API calls at runtime.

Data flow:

```text
MDX files in /content/posts/ → @mdx-js/mdx evaluate() at build → Static HTML pages
Project data in /data/projects.ts → project-card components → Static HTML pages
```

The blog agent (m0lz.01, separate repo) publishes posts by committing MDX files to `/content/posts/` and pushing to `main`. Vercel auto-deploys on push.

---

## Code Patterns

### Naming

- Files: `kebab-case.tsx` for components, `kebab-case.ts` for utilities
- Components: `PascalCase` (e.g., `BranchMark`, `PostCard`)
- Functions: `camelCase`
- Types/Interfaces: `PascalCase` with descriptive names (e.g., `PostFrontmatter`, `ProjectData`)
- Constants: `UPPER_SNAKE_CASE` for true constants, `camelCase` for config objects

### Imports

- Use `@/` path alias for project root imports
- Group imports: React/Next → external packages → internal modules → types
- Prefer named exports over default exports (except for page/layout components which Next.js requires as default)

### Error Handling

- Use React Error Boundaries for component-level errors
- Static site — most errors are build-time, not runtime
- Validate MDX frontmatter at build time with TypeScript types

### Logging

- No runtime logging needed (static site)
- Build-time warnings for missing frontmatter fields or invalid MDX

---

## Testing

- **Framework**: Vitest (lightweight, Vite-compatible, good TypeScript support)
- **Location**: `__tests__/regression/` for cumulative regression suite
- **Run**: `npm run test` (138 tests, 5 files)
- **Regression suite**: Grows with every shipped feature, never shrinks. See `.claude/rules/testing.md` for conventions.
- **Current coverage**: Design constraints (16), theme system (10), branch mark (19), routes & layout (44), content pipeline (49)

---

## Validation (Pre-Commit)

Run these before every commit:

```bash
npm run lint               # ESLint
npx tsc --noEmit           # Type checking
npm run test               # Tests
npm run build              # Build (catches SSG errors)
```

---

## On-Demand Context

When working on specific areas, read the corresponding reference:

| Area | File | When |
|------|------|------|
| Components & design system | `.claude/rules/frontend.md` | Working on UI components, styling, theme |
| MDX content pipeline | `.claude/rules/content.md` | Working on post rendering, frontmatter, MDX processing |
| Testing & regression suite | `.claude/rules/testing.md` | Adding tests, modifying regression suite |
| AI layer conventions | `.claude/rules/general.md` | Modifying commands, rules, templates, workflows |
| PICE workflow | `.claude/docs/PLAYBOOK.md` | Planning features, running evaluations |
| Brownfield integration | `.claude/docs/BROWNFIELD-GUIDE.md` | Working with existing codebases |

For the full PRD: `PRD.md` (project root)

---

## GitHub & Deployment

- **Repo**: `git@github.com:jmolz/m0lz.00.git` (public, MIT license)
- **Branch protection**: `main` — no force pushes, no deletions, enforced for admins
- **Deploy**: `git push origin main` → Vercel auto-deploys (static build ~1-2 min)
- **Domain**: `https://m0lz.dev`
- **Tagging**: Annotated tags (`v0.1.0`) for releases. Tag after completing a phase or shipping a significant feature.

---

## Key Rules

- **Monochrome only** — 4 color tokens: `--foreground`, `--background`, `--muted`, `--border`. No other colors in the UI. Syntax highlighting is the sole exception.
- **Static generation only** — every page must be statically renderable. No `use client` except for theme toggle and interactive components that enhance (not gate) content.
- **Next.js 16 async APIs** — `params`, `searchParams`, `cookies`, `headers` must be awaited. Synchronous access is removed in Next.js 16.
- **`proxy.ts` not `middleware.ts`** — Next.js 16 renamed middleware to proxy. Use `proxy.ts` at the project root if routing logic is needed.
- **Two fonts, two weights** — Geist Sans (400, 500) and Geist Mono (400, 500). No other fonts. Never use weight 600 or 700.
- **No decorative elements** — no hero images, color splashes, gradients, or ornamental UI. Typography and spacing do all the work.
- **Bundle budget** — total JS must stay under 100KB. No heavy client-side libraries.
- **Cross-platform parity** — every `.claude/commands/*.md` must have a matching `.windsurf/workflows/*.md`. Changes to one must be propagated to the other.
