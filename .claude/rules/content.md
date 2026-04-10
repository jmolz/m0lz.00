---
paths:
  - "content/**"
  - "lib/mdx.ts"
  - "lib/posts.ts"
  - "lib/og.tsx"
  - "data/**"
---

# Content & MDX Conventions

## Post Directory Structure

Each post lives in its own directory under `/content/posts/`:

```
content/posts/{slug}/
├── index.mdx        # The post content
└── assets/          # Images and other media (optional)
    ├── diagram.png
    └── screenshot.webp
```

## Frontmatter Schema

Every MDX post must include this frontmatter:

```yaml
---
title: "Post title"
description: "One-line description for SEO and post cards"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
canonical: "https://m0lz.dev/writing/{slug}"
companion_repo: ""      # Optional GitHub URL
medium_url: ""          # Populated by blog agent after cross-post
devto_url: ""           # Populated by blog agent after cross-post
published: true         # Set to false for drafts
---
```

Required fields: `title`, `description`, `date`, `tags`, `published`
Optional fields: `canonical`, `companion_repo`, `medium_url`, `devto_url`

## MDX Processing Pipeline

The pipeline uses `@mdx-js/mdx` `evaluate()` with `rehype-pretty-code`:

```
MDX file → gray-matter (strip frontmatter) → @mdx-js/mdx evaluate() → rehype-pretty-code (Shiki) → React components → Static HTML
```

Key configuration:
- Shiki dual themes: `min-dark` / `min-light` — swapped via `.dark` CSS class on `<html>`
- `keepBackground: false` — code block backgrounds use `var(--background)` instead of Shiki theme backgrounds
- File name tabs: supported via meta string (e.g., ` ```tsx title="app/page.tsx" `)
- Copy button: always present on code blocks, with try/catch for clipboard permission denial
- `remark-gfm` enabled for tables, strikethrough, autolinks

## Post Utilities (`lib/posts.ts`)

This module handles:
- Listing all published posts (filter `published: true`)
- Sorting by date (reverse chronological)
- Generating slugs from directory names
- Computing reading time from word count
- Providing prev/next post navigation data

## Project Data (`data/projects.ts`)

Project cards are defined as a typed array. Two categories:

1. **m0lz catalog** — projects with `catalogId` (e.g., `m0lz.02`) and a `variant` (BranchMark variant)
2. **Other projects** — projects with just a name, description, URL, and tech stack

Each project entry must include: `name`, `description`, `url`, `tech`
m0lz projects additionally include: `catalogId`, `variant`

## OG Image Generation

Open Graph images are generated via a route handler at `/og`:
- Include the branch mark (personal variant) + post title
- Monochrome design matching the site
- Geist font rendered in the image
- Accept `title` as a query parameter

## RSS Feed

Generated at build time via a route handler at `/feed.xml`:
- Standard RSS 2.0 format
- Include all published posts with title, description, date, and link
- Site description and metadata in the channel element
- Validate with an RSS validator before shipping

## Content Rules

- The blog agent (m0lz.01) commits MDX files to `/content/posts/`. This repo does not generate content — it only renders it.
- Never manually edit `medium_url` or `devto_url` frontmatter — the blog agent manages these.
- Posts with `published: false` must not appear in listings, RSS, or sitemap.
- All images must have alt text.
- Code blocks must specify a language for syntax highlighting.
