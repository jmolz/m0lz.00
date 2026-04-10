# PRD — jmolz Blog Site & Blog Agent

## Overview

Two open-source projects that work together:

1. **jmolz.dev** — A monochrome, developer-focused technical blog built with Next.js
2. **blog-agent** — A local CLI tool that orchestrates the full research-to-publish pipeline for blog posts, built on the PICE framework

The goal is to maximize visibility for technical research and open-source projects (PICE, MCP-Guard, and future work) in front of engineering hiring managers and the developer community. The blog agent is itself an open-source portfolio piece.

---

## Naming Convention — The m0lz Catalog

All projects ship under the `m0lz` prefix — a distinctive, grep-able identifier that signals shared authorship across every repo, npm package, and blog post. The zero is intentional: it reads like a hex address or memory offset, reinforcing the systems-engineering identity. One spelling everywhere — repos, packages, CLIs, blog, social cards. No special characters, no ASCII fallbacks, no inconsistency.

### ID Structure

`m0lz.{category}{sequence}` — category is a single hex digit, sequence is a lowercase hex character.

| Category | Range | Description |
|----------|-------|-------------|
| `0x` (00-09) | Meta / platform | The tools that build and ship everything else |
| `0x` (0a-0f) | Infrastructure / developer tools | CLI tools, servers, systems software |
| `1x` | Local AI / desktop apps | On-device ML, native apps, offline-first |
| `2x+` | Reserved for future categories | |

### Current Catalog

| ID | Project | Status |
|----|---------|--------|
| `m0lz.00` | jmolz.dev (blog site) | Building |
| `m0lz.01` | Blog agent | Building |
| `m0lz.02` | Structured AI coding workflow orchestrator | Shipped |
| `m0lz.03` | Security proxy for MCP servers | Shipped |
| `m0lz.0a` | Zero-config S3 server | Planned |
| `m0lz.0b` | Shell blast-radius previewer | Planned |
| `m0lz.0c` | NAND-to-CPU browser game | Planned |
| `m0lz.0d` | Hand-written HTTP/2 server in C | Planned |
| `m0lz.0e` | Self-hosted Calendly alternative | Planned |
| `m0lz.0f` | Single-binary observability stack | Planned |
| `m0lz.1a` | Local voice translation (Mac) | Planned |
| `m0lz.1b` | Local AI knowledge base | Planned |

### The ID Is the Name

The m0lz ID is not a label applied on top of a separate project name — it **is** the project name. There are no secondary names. `m0lz.02` is not "also known as PICE." It is `m0lz.02`, described as "Structured AI coding workflow orchestrator with dual-model adversarial evaluation."

This means:
- **Repo names:** `m0lz.02`, `m0lz.03`, `m0lz.0a`, etc.
- **npm packages:** `@m0lz/02`, `@m0lz/0a`, etc.
- **Cargo crates:** `m0lz-02`, `m0lz-0a`, etc. (crates use hyphens, no dots)
- **CLI binaries:** `m0lz-02`, `m0lz-0a`, etc. (e.g., `npx @m0lz/02 init`)
- **README headers:** `# m0lz.02` followed by the one-line description
- **Blog site project cards:** The m0lz ID as the title, description below, branch mark variant beside it
- **OG images / social cards:** `m0lz.0f` + one-liner

The name carries zero semantic load. It communicates authorship ("this is from that person") and catalog position ("this is part of a system"). The one-line description does all the explaining.

### Migrating Existing Projects (PICE → m0lz.02, MCP-Guard → m0lz.03)

1. **Rename GitHub repos** — `jmolz/pice-framework` → `jmolz/m0lz.02`, `jmolz/mcp-guard` → `jmolz/m0lz.03`. GitHub auto-redirects old URLs indefinitely.
2. **Publish new npm packages** — `@m0lz/02` and `@m0lz/03`. Keep old packages (`@jacobmolz/pice`, `@jacobmolz/mcpguard`) as deprecated shells that point to the new names.
3. **Update Cargo crate names** — Publish `m0lz-02` crate, `yanked` notice on old `pice-cli` crate.
4. **Update READMEs** — New header format: `# m0lz.02` + description. Add a "formerly known as PICE" note in the first paragraph for SEO continuity during transition.
5. **Update all cross-references** — Blog posts, CLAUDE.md files, CI badges, docs.

### Naming Rules

- Each project gets its own git branch mark variant (see Brand Identity below).
- The catalog is append-only — IDs are never reused or reassigned.
- The hex numbering is intentional: developers read it as a version table or memory map, which reinforces the systems-engineering identity.

---

## Project 1: jmolz.dev (Blog Site)

### Design Philosophy

- **Monochrome only.** Black and white. No accent colors. The content speaks for itself.
- **Dark mode default.** Light mode available via toggle. In dark mode: white text on black. In light mode: black text on white. The design is symmetric — swapping foreground and background is the entire theme switch.
- **Technically modern.** A developer visiting the site should immediately feel "this person cares about craft." Clean typography, generous whitespace, fast load times, zero clutter.
- **No hero images, no color splashes, no decorative elements.** Typography, spacing, and content hierarchy do all the work.

### Brand Identity

#### Logo Mark — Git Branch System

The logo is a generative identity system based on git branch iconography:

- **Structure:** Two vertical parallel lines (trunks) inside a rounded square. Short horizontal lines (branches) extend left or right from either trunk at varying vertical positions.
- **The trunks are the constant.** Every mark in the system has them. They are the visual signature that ties all projects together.
- **The branches are the variable.** Each project gets a unique branch pattern — position, count, and side encode meaning about what the project does.

**Mark variants:**

| Asset | Branch pattern | Rationale |
|-------|---------------|-----------|
| jmolz (personal) | 1 left branch on left trunk, 1 right branch on right trunk, offset vertically | Simplest mark. The parent identity. |
| PICE | 2 left branches on left trunk, 1 right branch on right trunk | 3 branches = 3 phases (plan, implement, evaluate) |
| MCP-Guard | 1 left branch on left trunk, 1 right branch on right trunk, mirrored at same height | Symmetry = proxy intercept (terminate, inspect, re-originate) |
| Blog Agent | 1 left branch on left trunk, 2 right branches on right trunk | Research in, draft + publish out |

**Rendering:**
- Light mode: Black rounded square, white trunks and branches
- Dark mode: White rounded square, black trunks and branches
- Stroke weight: 2px at 36x36, scales proportionally
- Must be legible at 16px (favicon) through 64px+ (social cards)

#### Typography

- **Primary:** Geist Sans (via `next/font/google` or `next/font/local`)
- **Monospace:** Geist Mono (for code blocks, inline code, technical metadata)
- **No other fonts.** Two weights only: 400 (regular) and 500 (medium). Never 600 or 700.

#### Color System

```
--foreground: #000000 (light mode) / #ffffff (dark mode)
--background: #ffffff (light mode) / #000000 (dark mode)
--muted: #737373 (light mode) / #a3a3a3 (dark mode)
--border: #e5e5e5 (light mode) / #262626 (dark mode)
```

No other colors anywhere in the UI. Syntax highlighting in code blocks is the only exception — use a monochrome-leaning Shiki theme (e.g., `vitesse-dark` / `vitesse-light` or a custom minimal theme).

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | Industry standard, static generation, great DX |
| MDX pipeline | `next-mdx-remote` + `rehype-pretty-code` | Full control, no unmaintained abstractions. Shiki-powered syntax highlighting. |
| Styling | Tailwind CSS 4 | Utility-first, easy monochrome system, `dark:` variants |
| Fonts | Geist + Geist Mono via `next/font` | Optimized loading on Vercel, developer-native aesthetic |
| Hosting | Vercel | Zero-config Next.js deploys, edge network, analytics |
| Content | MDX files in `/content/posts/` | Git-native, agent can commit directly, no CMS dependency |
| RSS | Generated at build time | `/feed.xml` — developers expect this |
| SEO | `next/metadata` + Open Graph images | Auto-generated OG images with the branch mark + post title |

### Site Structure

```
/                    → Landing page (hero + latest posts + projects)
/writing             → All posts, reverse chronological
/writing/[slug]      → Individual post
/projects            → Project cards (PICE, MCP-Guard, Blog Agent, future)
/research            → Research papers and deep dives
/about               → Bio, experience, contact
/feed.xml            → RSS feed
```

### Landing Page Layout

Top to bottom:

1. **Nav bar** — Branch mark + "jmolz" wordmark left. "Writing", "Projects", "Research", "About" links right. Minimal height.
2. **Hero section** — Small caps category label ("TECHNICAL RESEARCH & ENGINEERING"). Large headline (38px, -1.5px letter-spacing): "Building infrastructure for AI coding quality." Subhead (16px, muted): one sentence describing the blog's focus. No CTA button, no email signup — just the statement.
3. **Divider** — 0.5px horizontal rule.
4. **Latest posts** — "LATEST" label (12px, muted, letter-spaced). Posts listed as: date (left, muted) | title + description + tags (indented right). Max 5 posts on landing page.
5. **Divider**
6. **Projects** — "PROJECTS" label. 2-column grid of project cards. Each card: project branch mark variant + name + one-line description + key metric (e.g., "217 tests passing", "97% detection rate").
7. **Footer** — Name left. GitHub, LinkedIn, RSS links right.

### Post Page Layout

- Post title (28px, medium weight)
- Date + reading time + tags (muted, small)
- Divider
- MDX content area — max-width 680px, generous line-height (1.8), proper heading hierarchy
- Code blocks: full-width breakout from content column, Geist Mono, line numbers optional, copy button, file name tab if specified
- At bottom: "Next post" / "Previous post" navigation
- No comments, no reactions, no share buttons

### Post MDX Frontmatter Schema

```yaml
---
title: "Dual-model adversarial evaluation eliminates single-model blind spots"
description: "When you ask the same AI that wrote your code to review it..."
date: "2026-04-09"
tags: ["ai-quality", "evaluation", "pice"]
canonical: "https://jmolz.dev/writing/dual-model-evaluation"
companion_repo: "https://github.com/jmolz/dual-model-eval-demo"
medium_url: ""      # Populated by agent after cross-post
devto_url: ""       # Populated by agent after cross-post
published: true
---
```

### Performance Targets

- Lighthouse: 100/100/100/100
- First Contentful Paint: <1s
- Total bundle: <100KB JS
- Zero layout shift
- All pages statically generated at build time

---

## Project 2: blog-agent (CLI Tool)

### Overview

A local TypeScript CLI that orchestrates the full lifecycle of a technical blog post: research → draft → companion repo → publish → cross-post → promote. Built on the PICE framework (dog-fooding). Open-source.

The agent runs on the author's machine using their own API keys. No server, no SaaS, no ongoing cost beyond API usage.

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Runtime | Node.js / TypeScript | Matches PICE provider ecosystem, AI SDKs are JS-first |
| CLI framework | Commander.js | Lightweight, well-documented, no magic |
| AI provider | Anthropic SDK (Claude) | Primary model for research and writing |
| Web search | Anthropic tool use (web search) or Tavily API | Source gathering during research phase |
| Publishing APIs | Dev.to (Forem) API, Medium API (deprecated but functional), GitHub Octokit | Cross-posting and companion repo creation. Dev.to is the primary reliable target. Medium API is unsupported — see fallback strategy below. |
| Config | `.blogrc.yaml` in project root | API keys, site repo path, default settings |
| State | Local SQLite (`.blog-agent/state.db`) | Track post status, publish history, metrics |
| Framework | PICE | Plan = research, Implement = draft, Evaluate = quality check |

### CLI Commands

#### `blog init`

Scaffold the blog-agent config in the current directory.

- Creates `.blogrc.yaml` with placeholder API keys and site repo path
- Creates `.blog-agent/` directory for state and drafts
- Validates that the site repo exists at the configured path

#### `blog research <topic>`

Deep research phase. Interactive.

- Takes a topic string or a topic brief file
- Calls Claude with web search enabled to gather sources, data, prior art
- Enters an interactive back-and-forth session where you refine the research direction
- Outputs a structured research document to `.blog-agent/research/<slug>.md`
- Research doc includes: thesis, key findings, sources with URLs, data points, open questions
- PICE phase: **Plan**

#### `blog draft [slug]`

Writing phase. Interactive.

- Loads the research document for the given slug (or most recent)
- Collaborates with you to write the post in MDX format
- Iterates: generates draft → you give feedback → revises → repeat
- Handles MDX component usage (code blocks, callouts, embedded demos)
- Outputs final MDX to `.blog-agent/drafts/<slug>.mdx`
- Generates frontmatter from research metadata
- PICE phase: **Implement**

#### `blog repo <slug>`

Companion repository generation. Optional.

- Reads the draft to identify code artifacts, demos, benchmarks, or test suites referenced in the post
- Scaffolds a GitHub repository with: README, source code, tests, CI config, LICENSE
- Does NOT push — creates locally for your review
- Outputs to `.blog-agent/repos/<slug>/`
- You review, then `blog publish` handles the GitHub creation

#### `blog evaluate <slug>`

Quality check before publishing. Automated.

- Runs the PICE evaluation phase against the draft
- Checks: factual claims have sources, code blocks are syntactically valid, frontmatter is complete, reading level is appropriate, no broken links in companion repo references
- Adversarial review: challenges the thesis, checks for logical gaps, identifies claims that need stronger evidence
- Outputs pass/fail with detailed feedback
- Must pass before `blog publish` will execute
- PICE phase: **Evaluate**

#### `blog publish <slug>`

The full publish pipeline. Sequential.

1. **Verify** — Confirm evaluation passed. Abort if not.
2. **Site deploy** — Copy MDX + assets to site repo `/content/posts/<slug>/`. Commit. Push to main. Vercel auto-deploys.
3. **Wait for deploy** — Poll Vercel deployment API until the post URL is live. This is the canonical URL.
4. **Cross-post to Medium** — Use Medium API to create post with `canonicalUrl` set to site URL. Convert MDX to Medium-compatible markdown. Store Medium URL in frontmatter.
5. **Cross-post to Dev.to** — Use Forem API to create article with `canonical_url` set to site URL. Store Dev.to URL in frontmatter.
6. **Companion repo** — If `.blog-agent/repos/<slug>/` exists: create GitHub repo via Octokit, push code, set description and URL pointing to the blog post.
7. **Update frontmatter** — Commit updated frontmatter (with Medium/Dev.to/repo URLs) back to site repo.
8. **Promote** — Generate social post variants:
   - LinkedIn: professional summary with key takeaway + link
   - X/Twitter: thread-style summary (3-5 tweets) with link
   - Output to `.blog-agent/social/<slug>/` for your review before posting

#### `blog status`

Show state of all posts in the pipeline.

```
$ blog status

  slug                        phase        status
  dual-model-evaluation       published    live on 3 platforms
  mcp-security-layer          drafted      awaiting evaluation
  seam-analysis               researching  3 sources gathered
```

#### `blog metrics`

Aggregate publish metrics across all posts.

- Posts published count
- Platform distribution (site, Medium, Dev.to)
- Companion repos created
- Average research-to-publish time
- Evaluation pass/fail rates

### Configuration (`.blogrc.yaml`)

```yaml
site:
  repo_path: "../jmolz.dev"
  base_url: "https://jmolz.dev"
  content_dir: "content/posts"

author:
  name: "Jacob Molz"
  github: "jmolz"
  medium: "@jmolz"
  devto: "jmolz"

ai:
  provider: "anthropic"
  model: "claude-sonnet-4-6"
  research_model: "claude-opus-4-6"

publish:
  medium: true
  devto: true
  github_repos: true
  social_drafts: true

evaluation:
  require_pass: true
  min_sources: 3
  max_reading_level: 12
```

### Medium API Fallback Strategy

Medium's official publishing API was archived in March 2023 and is no longer maintained by Medium. However, it remains functional as of April 2026. The agent should treat Medium as an unreliable integration:

1. **Attempt API publish first** — Use the integration token and `POST /v1/users/{userId}/posts` endpoint with `canonicalUrl` set to the site URL. Accept markdown content format.
2. **On failure, generate pasteable output** — If the API returns an error (auth failure, endpoint removed, rate limit), the agent should:
   - Generate Medium-compatible markdown (strip MDX components, convert to standard markdown)
   - Save to `.blog-agent/social/<slug>/medium-paste.md`
   - Log a warning: "Medium API failed. Formatted markdown saved for manual paste."
   - Open the Medium new story URL in the user's browser if `--open` flag is set
3. **Never block the pipeline** — Medium failure should not prevent Dev.to cross-post, companion repo creation, or social post generation from completing.

Dev.to (Forem API) is the primary and fully reliable cross-post target. It is free, actively maintained, and has a stable `canonical_url` field.

### Cost Estimates

| Item | Cost | Notes |
|------|------|-------|
| Dev.to API | Free | No paid tiers, publish via API key |
| Medium API | Free | Integration token, but unsupported — could break |
| GitHub API | Free | Public repos via personal access token |
| Vercel hosting | Free | Free tier covers a blog easily |
| Domain (jmolz.dev) | ~$12/year | .dev domains via Google/Cloudflare |
| Anthropic API (Claude) | ~$10-20/month | Research + writing usage, varies by post volume |
| **Total** | **~$11-21/month** | Almost entirely API usage for Claude |

### Environment Variables

```
ANTHROPIC_API_KEY=     # Required — Claude for research + writing
MEDIUM_TOKEN=          # Required if medium publishing enabled
DEVTO_API_KEY=         # Required if dev.to publishing enabled
GITHUB_TOKEN=          # Required if companion repos enabled
VERCEL_TOKEN=          # Optional — for deploy status polling
```

### State Management

SQLite database at `.blog-agent/state.db`:

```sql
posts (
  slug TEXT PRIMARY KEY,
  title TEXT,
  topic TEXT,
  phase TEXT,           -- research | draft | evaluate | publish | published
  created_at DATETIME,
  updated_at DATETIME,
  published_at DATETIME,
  site_url TEXT,
  medium_url TEXT,
  devto_url TEXT,
  repo_url TEXT,
  evaluation_score REAL,
  evaluation_passed BOOLEAN
)

sources (
  id INTEGER PRIMARY KEY,
  post_slug TEXT REFERENCES posts(slug),
  url TEXT,
  title TEXT,
  excerpt TEXT,
  accessed_at DATETIME
)

metrics (
  id INTEGER PRIMARY KEY,
  post_slug TEXT REFERENCES posts(slug),
  event TEXT,
  value TEXT,
  timestamp DATETIME
)
```

### PICE Integration

The blog agent is built as a PICE provider, dog-fooding the framework:

| PICE Phase | Blog Agent Phase | What Happens |
|------------|-----------------|--------------|
| Plan | `blog research` | Deep research, source gathering, thesis development, contract = "what this post will prove" |
| Implement | `blog draft` + `blog repo` | Write the MDX, generate companion code |
| Evaluate | `blog evaluate` | Quality check against the research contract — are claims supported, is the argument sound |

The evaluation contract is auto-generated from the research phase. Example criteria:

```json
{
  "criteria": [
    { "name": "Thesis supported by evidence", "threshold": 7 },
    { "name": "All code examples run without errors", "threshold": 8 },
    { "name": "Sources cited for empirical claims", "threshold": 8 },
    { "name": "No logical gaps in argument", "threshold": 7 },
    { "name": "Companion repo has passing CI", "threshold": 8 }
  ]
}
```

---

## Open Source Strategy

Both projects are MIT licensed and published under the `jmolz` GitHub org.

### blog-agent repo structure

```
blog-agent/
├── src/
│   ├── cli/              # Command definitions
│   ├── research/         # Research orchestration
│   ├── draft/            # MDX generation + collaboration
│   ├── repo/             # Companion repo scaffolding
│   ├── publish/          # Cross-posting pipeline
│   ├── evaluate/         # PICE evaluation integration
│   ├── social/           # Social post generation
│   ├── providers/        # AI provider abstraction
│   └── db/               # SQLite state management
├── templates/
│   ├── repo/             # Companion repo templates (README, CI, etc.)
│   └── social/           # Social post templates per platform
├── tests/
├── package.json
├── tsconfig.json
├── .blogrc.example.yaml
└── README.md
```

### jmolz.dev repo structure

```
jmolz.dev/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   ├── writing/
│   │   ├── page.tsx          # All posts
│   │   └── [slug]/
│   │       └── page.tsx      # Individual post
│   ├── projects/
│   │   └── page.tsx
│   ├── research/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── post-card.tsx
│   ├── project-card.tsx
│   ├── mdx-components.tsx    # Custom MDX component overrides
│   ├── code-block.tsx        # Shiki-powered code rendering
│   ├── branch-mark.tsx       # SVG logo component with variant prop
│   └── theme-toggle.tsx
├── content/
│   └── posts/                # MDX files committed by blog-agent
│       └── dual-model-evaluation/
│           ├── index.mdx
│           └── assets/
├── lib/
│   ├── mdx.ts                # MDX processing with next-mdx-remote
│   ├── posts.ts              # Post listing, sorting, filtering
│   └── og.tsx                # Open Graph image generation
├── public/
│   ├── favicon.svg           # Branch mark
│   └── fonts/
├── styles/
│   └── globals.css           # Tailwind base + monochrome tokens
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## First Post

Title: "I built a blog agent using my own AI coding framework — here's what happened"

This post documents the process of building the blog agent on PICE, includes the architecture diagram, benchmarks research-to-publish time, and links to both repos. It's the proof that the system works, written by the system itself.

---

## Success Metrics

- Site loads in <1s, Lighthouse 100 across the board
- First 5 posts published within 30 days of site launch
- Each post live on 3 platforms (site + Medium + Dev.to) within 1 hour of `blog publish`
- Blog agent installable via `npm install -g @jmolz/blog-agent` by others
- At least 1 companion repo per technical post
- Agent repo has full test coverage and CI
