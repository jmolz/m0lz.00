# Product Requirements Document: m0lz.dev

## Executive Summary

m0lz.dev is a monochrome, developer-focused technical blog and portfolio site built with Next.js 16. It showcases technical research, open-source projects, and engineering writing by Jacob Molz. The site serves as the canonical home for all m0lz catalog projects and public work.

The design is intentionally austere — black and white only, no decorative elements, no accent colors. Typography, spacing, and content hierarchy do all the work. A developer visiting the site should immediately feel "this person cares about craft."

The blog agent (m0lz.01) is a separate project that will publish content to this site by committing MDX files directly to the repo. This PRD covers only the blog site itself.

**MVP Goal:** A fully static, production-grade blog site with zero posts, all project cards populated, branch mark identity system, dark/light mode, RSS feed, and Lighthouse 100/100/100/100.

---

## Target Users

### Primary Persona: Engineering Hiring Manager

- **Who:** Technical leaders evaluating candidates for senior/staff AI engineering roles
- **Technical Level:** Developer
- **Key Need:** Quickly assess depth of technical thinking and shipping velocity
- **Pain Point:** Most developer portfolios are template-heavy and content-light

### Secondary Persona: Developer Community

- **Who:** Engineers interested in AI coding workflows, MCP security, and agentic systems
- **Technical Level:** Developer
- **Key Need:** Practical, evidence-backed technical content
- **Pain Point:** Most AI content is hype-driven, not engineering-driven

---

## MVP Scope

### In Scope

✅ **Core Pages**
- [ ] Landing page (hero + latest posts + project cards)
- [ ] Writing index page (`/writing` — all posts, reverse chronological)
- [ ] Individual post pages (`/writing/[slug]` — MDX rendering)
- [ ] Projects page (`/projects` — all public project cards)
- [ ] Research page (`/research` — placeholder for future deep dives)
- [ ] About page (`/about` — bio, experience, contact)
- [ ] RSS feed (`/feed.xml`)

✅ **Design System**
- [ ] Branch mark SVG identity system (personal, PICE, MCP-Guard, Blog Agent variants)
- [ ] Monochrome color system (black/white + muted + border — 4 tokens total)
- [ ] Geist Sans + Geist Mono typography (400 + 500 weights only)
- [ ] Dark mode default with light mode toggle
- [ ] Responsive layout (mobile-first)

✅ **Technical**
- [ ] Next.js 15 App Router with full static generation
- [ ] MDX pipeline via `next-mdx-remote` + `rehype-pretty-code`
- [ ] Auto-generated Open Graph images with branch mark + post title
- [ ] SEO metadata via `next/metadata`
- [ ] Vercel deployment with zero-config

✅ **Content Infrastructure**
- [ ] MDX content directory at `/content/posts/`
- [ ] Post frontmatter schema
- [ ] Project data file with all project cards
- [ ] Empty state handling (site launches with zero posts)

### Out of Scope

❌ Blog agent integration (m0lz.01 — separate repo, separate PRD)
❌ Comments, reactions, or share buttons
❌ Email signup or newsletter
❌ CMS or admin panel
❌ Custom analytics dashboard (Vercel analytics covers it)
❌ Cross-posting to Medium/Dev.to (blog agent responsibility)
❌ Search functionality
❌ Companion repo generation

---

## User Stories

1. As a hiring manager, I want to see a clean project portfolio, so that I can quickly assess technical breadth and depth.
2. As a developer, I want to read well-formatted technical posts with syntax-highlighted code, so that I can learn from practical engineering content.
3. As an RSS subscriber, I want a feed URL, so that I can follow new posts in my reader.
4. As a visitor on mobile, I want a responsive layout, so that the content reads well on any device.
5. As a visitor who prefers light mode, I want a theme toggle, so that I can read comfortably.

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | Framework (App Router, static generation) | 16 (v16.2.3) |
| TypeScript | Primary language | 5.x |
| Tailwind CSS | Utility-first styling, monochrome system | 4 |
| next-mdx-remote | MDX processing for blog posts | latest |
| rehype-pretty-code | Shiki-powered syntax highlighting | latest |
| Geist + Geist Mono | Typography via `next/font` | latest |
| Vercel | Hosting, edge network, auto-deploys | — |

---

## Architecture

### Directory Structure

```
m0lz.00/
├── app/
│   ├── layout.tsx                # Root layout, fonts, theme provider
│   ├── page.tsx                  # Landing page
│   ├── writing/
│   │   ├── page.tsx              # All posts index
│   │   └── [slug]/
│   │       └── page.tsx          # Individual post
│   ├── projects/
│   │   └── page.tsx              # Project cards grid
│   ├── research/
│   │   └── page.tsx              # Research index (placeholder)
│   ├── about/
│   │   └── page.tsx              # Bio, experience, contact
│   ├── feed.xml/
│   │   └── route.ts              # RSS feed generation
│   └── og/
│       └── route.tsx             # OG image generation
├── components/
│   ├── nav.tsx                   # Branch mark + "m0lz" wordmark + nav links
│   ├── footer.tsx                # "Jacob Molz" + social links
│   ├── post-card.tsx             # Post listing item
│   ├── project-card.tsx          # Project card component
│   ├── mdx-components.tsx        # Custom MDX component overrides
│   ├── code-block.tsx            # Shiki-powered code rendering
│   ├── branch-mark.tsx           # SVG logo component with variant prop
│   └── theme-toggle.tsx          # Dark/light mode switch
├── content/
│   └── posts/                    # MDX files (empty at launch)
├── data/
│   └── projects.ts               # Project card data
├── lib/
│   ├── mdx.ts                    # MDX processing with next-mdx-remote
│   ├── posts.ts                  # Post listing, sorting, filtering
│   └── og.tsx                    # Open Graph image generation
├── public/
│   └── favicon.svg               # Branch mark (personal variant)
├── styles/
│   └── globals.css               # Tailwind base + monochrome tokens
├── .claude/                      # AI layer (shared foundation)
├── .windsurf/                    # Windsurf workflows
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

### Data Flow

All content is static — no database, no API calls at runtime:

```
MDX files in /content/posts/ → next-mdx-remote at build time → Static HTML
Project data in /data/projects.ts → project-card components → Static HTML
```

### Key Design Decisions

- **Static generation only** — every page pre-rendered at build time. No SSR, no ISR.
- **MDX over a CMS** — content lives in git. The blog agent (m0lz.01) commits MDX files directly.
- **Monochrome constraint** — enforced via 4 CSS custom properties. Syntax highlighting is the sole exception.
- **No JavaScript-heavy features** — no comments, search, or dynamic content. Keeps bundle minimal.

---

## Core Features

### Feature 1: Branch Mark Identity System

The logo is a generative identity system based on git branch iconography.

**Structure:** Two vertical parallel lines (trunks) inside a rounded square. Short horizontal lines (branches) extend left or right from either trunk at varying vertical positions.

- The trunks are the constant — every mark variant has them
- The branches are the variable — each m0lz project gets a unique pattern

**Variants to implement:**

| Variant | Branch Pattern | Rationale |
|---------|---------------|-----------|
| Personal (m0lz) | 1 left branch on left trunk, 1 right branch on right trunk, offset vertically | Simplest mark. The parent identity. Nav + favicon. |
| Blog Agent (m0lz.01) | 1 left branch on left trunk, 2 right branches on right trunk | Research in, draft + publish out |
| PICE (m0lz.02) | 2 left branches on left trunk, 1 right branch on right trunk | 3 branches = 3 phases (plan, implement, evaluate) |
| MCP-Guard (m0lz.03) | 1 left + 1 right branch, mirrored at same height | Symmetry = proxy intercept |

**Rendering rules:**
- Light mode: Black rounded square, white trunks and branches
- Dark mode: White rounded square, black trunks and branches
- Stroke weight: 2px at 36x36, scales proportionally
- Must be legible at 16px (favicon) through 64px+ (social cards)

Implementation: `branch-mark.tsx` component accepts a `variant` prop.

### Feature 2: Landing Page

Top to bottom:

1. **Nav bar** — Branch mark (personal) + "m0lz" wordmark left. "Writing", "Projects", "Research", "About" links right. Minimal height.
2. **Hero section** — Small caps category label ("TECHNICAL RESEARCH & ENGINEERING"). Large headline (38px, -1.5px letter-spacing). Subhead (16px, muted) describing the blog's focus. No CTA, no email signup.
3. **Divider** — 0.5px horizontal rule.
4. **Latest posts** — "LATEST" label (12px, muted, letter-spaced). Posts listed as: date (left, muted) | title + description + tags. Max 5 posts. Empty state message when no posts exist.
5. **Divider**
6. **Projects** — "PROJECTS" label. 2-column grid of project cards. Each card: branch mark variant (m0lz projects) or generic icon (non-m0lz) + name + one-line description + key metric.
7. **Footer** — "Jacob Molz" left. GitHub, LinkedIn, RSS links right.

### Feature 3: Post Pages

- Post title (28px, medium weight)
- Date + reading time + tags (muted, small)
- Author byline: "Jacob Molz"
- Divider
- MDX content area — max-width 680px, generous line-height (1.8), proper heading hierarchy
- Code blocks: full-width breakout from content column, Geist Mono, copy button, optional file name tab
- At bottom: "Next post" / "Previous post" navigation
- No comments, no reactions, no share buttons

### Feature 4: Projects Page

Grid of all public projects, divided into sections:

**m0lz catalog** (projects with branch mark variants):

| ID | Description | URL | Tech |
|----|-------------|-----|------|
| m0lz.02 | Structured AI coding workflow orchestrator with dual-model adversarial evaluation | github.com/jmolz/pice-framework | Rust |
| m0lz.03 | Security proxy daemon for MCP servers — auth, rate limiting, PII detection, permissions, audit logging | github.com/jmolz/mcp-guard | TypeScript |

**Other public projects** (no branch mark, generic icon or no icon):

| Project | Description | URL | Tech |
|---------|-------------|-----|------|
| Alpaka | Value chain intelligence for real estate — Scope 3 carbon emissions ML modeling, supply chain optimization | alpaka.ai | Python ML + TypeScript |
| Ready Text | Waitlist texting & customer alert platform for restaurants and businesses | ready-text.com | Laravel/PHP |
| Case Pilot | AI-powered legal case management for pro se litigants | github.com/jmolz/case-pilot | JavaScript |
| Bloom | AI-powered revenue discovery for service businesses | meetbloom.io | TypeScript/Next.js |
| Investor Matchmaker | Python-based investor-founder matchmaking for Startup Week | github.com/Raleigh-Durham-Startup-Week/investor-matchmaker | Python |

### Feature 5: About Page

- Brief bio derived from GitHub profile: AI Product Engineer & Technical Founder
- 15+ shipped products, 7,100+ GitHub contributions/year
- Previously: 15 years B2B SaaS leadership (VP/SVP/CSO) at 24/7 Software, CleanAir.ai
- Education: MBA — Nova Southeastern University, BSBA Entrepreneurship — UCF
- Links: GitHub, LinkedIn
- Mention of PICE framework and the m0lz catalog system

### Feature 6: MDX Pipeline

**Frontmatter schema:**

```yaml
---
title: "Post title"
description: "One-line description for SEO and post cards"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
canonical: "https://m0lz.dev/writing/slug"
companion_repo: ""      # Optional GitHub URL
medium_url: ""          # Populated by blog agent after cross-post
devto_url: ""           # Populated by blog agent after cross-post
published: true
---
```

**MDX features:**
- Syntax highlighting via rehype-pretty-code (Shiki)
- Monochrome-leaning Shiki theme (e.g., `vitesse-dark`/`vitesse-light` or custom minimal)
- Custom components: code blocks with file name tabs, callout boxes
- Images via standard markdown syntax, stored alongside MDX in `/content/posts/[slug]/assets/`

### Feature 7: Theme System

**Color tokens (CSS custom properties):**

```css
--foreground: #000000 (light) / #ffffff (dark)
--background: #ffffff (light) / #000000 (dark)
--muted: #737373 (light) / #a3a3a3 (dark)
--border: #e5e5e5 (light) / #262626 (dark)
```

No other colors in the UI. The design is symmetric — swapping foreground and background is the entire theme switch. Dark mode is the default. Toggle persists via `localStorage`.

---

## API Specification

No API endpoints. The site is fully static. The only "endpoint" is the RSS feed, generated as a static route at build time.

---

## Security & Configuration

### Authentication

None. This is a public static site with no user accounts.

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `VERCEL_TOKEN` | Deploy status polling (optional, Vercel auto-deploys from git) | No |

### Deployment

- Push to `main` branch triggers Vercel auto-deploy
- All pages statically generated at build time
- Edge network distribution via Vercel
- Domain: m0lz.dev

---

## Implementation Phases

### Phase 1: Foundation
**Goal:** Scaffolded Next.js 16 project with design system, routing, and empty pages
- [ ] Initialize Next.js 16 with App Router, TypeScript, Tailwind CSS 4
- [ ] Configure Geist + Geist Mono fonts via `next/font`
- [ ] Set up monochrome color tokens in `globals.css`
- [ ] Build `branch-mark.tsx` SVG component (all 4 variants)
- [ ] Build `nav.tsx` (branch mark + "m0lz" + nav links)
- [ ] Build `footer.tsx` ("Jacob Molz" + social links)
- [ ] Build `theme-toggle.tsx` (dark/light, localStorage persistence)
- [ ] Create root `layout.tsx` with theme provider
- [ ] Create all route stubs (`/`, `/writing`, `/projects`, `/research`, `/about`)
- [ ] Deploy to Vercel, verify builds
**Validation:** Site deploys, all routes resolve, dark/light toggle works, branch marks render correctly at all sizes

### Phase 2: Content Infrastructure
**Goal:** MDX pipeline working, post pages renderable, project data populated
- [ ] Set up `next-mdx-remote` + `rehype-pretty-code` pipeline
- [ ] Create `lib/mdx.ts` and `lib/posts.ts` for post processing
- [ ] Define post frontmatter schema and TypeScript types
- [ ] Build `mdx-components.tsx` custom overrides
- [ ] Build `code-block.tsx` with copy button and file name tab
- [ ] Create `data/projects.ts` with all project cards
- [ ] Build `project-card.tsx` component
- [ ] Build `post-card.tsx` component
- [ ] Create a test MDX post to validate the pipeline (can delete later)
**Validation:** Test post renders with syntax highlighting, project data types check, code blocks have copy buttons

### Phase 3: Page Implementation
**Goal:** All pages fully built and styled
- [ ] Landing page: hero + latest posts + project cards + empty state
- [ ] Writing index: post list with date, title, description, tags
- [ ] Post page: full MDX rendering, prev/next navigation, reading time
- [ ] Projects page: sectioned grid (m0lz catalog + other projects)
- [ ] Research page: placeholder with "coming soon" messaging
- [ ] About page: bio, stats, education, links
**Validation:** All pages match design spec, responsive on mobile, no layout shift

### Phase 4: Polish & Deploy
**Goal:** Production-ready with SEO, OG images, RSS, and performance
- [ ] Build OG image generation route (`/og`) with branch mark + title
- [ ] Configure `next/metadata` for all pages (title, description, OG)
- [ ] Build RSS feed generation at `/feed.xml`
- [ ] Generate `favicon.svg` from branch mark (personal variant)
- [ ] Lighthouse audit — target 100/100/100/100
- [ ] Bundle size audit — target <100KB JS
- [ ] Test all pages at mobile, tablet, desktop breakpoints
- [ ] Final Vercel deploy with m0lz.dev domain
**Validation:** Lighthouse 100/100/100/100, FCP <1s, zero layout shift, RSS validates, OG images render on social platforms

---

## Success Criteria

- [ ] Lighthouse 100/100/100/100 on all pages
- [ ] First Contentful Paint <1s
- [ ] Total JS bundle <100KB
- [ ] Zero layout shift
- [ ] All pages statically generated (no SSR/ISR)
- [ ] Dark/light mode works with no flash of wrong theme
- [ ] Branch marks render correctly at 16px through 64px+
- [ ] Project cards display all 9 projects with correct links
- [ ] RSS feed validates
- [ ] OG images generate correctly for social sharing
- [ ] Site is fully functional with zero posts (proper empty states)
- [ ] MDX pipeline renders syntax-highlighted code with copy buttons

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| m0lz.dev domain unavailable | High | Medium | Check availability immediately; fallback to m0lz.io or m0lz.sh |
| Geist font licensing issues | Medium | Low | Geist is open-source (SIL), verify license allows web use |
| next-mdx-remote breaking changes | Medium | Low | Pin version, test pipeline in Phase 2 before building pages |
| OG image generation complexity | Low | Medium | Start simple (text + mark), iterate after launch |
| Bundle exceeding 100KB | Medium | Low | No client-side libraries beyond React; audit early in Phase 4 |

---

## Assumptions

The following assumptions were made during PRD creation and need validation:

1. **Domain**: m0lz.dev is purchased ✅ — not yet associated with a Vercel project
2. **Vercel account**: Free tier is sufficient for a static blog
3. **No m0lz catalog IDs for non-m0lz projects**: Alpaka, Ready Text, Case Pilot, Bloom, and Investor Matchmaker keep their own names and do not receive branch mark variants
4. **Blog agent integration is deferred**: m0lz.01 will commit MDX files to `/content/posts/` but that workflow is out of scope for this PRD
5. **Research page is a placeholder**: No research content exists at launch; the page exists for future use
6. **The branch mark mockup** (shown for blog agent) is the design direction for all variants — same rounded square, trunk, and branch visual language
