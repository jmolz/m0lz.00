---
description: Review code changes for bugs, security issues, and improvements — includes cumulative regression suite
---

# Code Review

Perform a thorough code review of the current changes AND run the cumulative regression suite to ensure all previously built features still work.

## Phase 0: Contract Check

Before starting the standard review, check if the most recent plan has a contract:

```bash
# Find the most recently modified plan file
ls -t .claude/plans/*.md 2>/dev/null | head -1
```

If a plan file exists, read its `## Contract` section. If a contract is found:

1. Note the tier and criteria in the review output
2. After Phase 3 (Code Review), add a **Phase 3.5: Contract Evaluation** that grades the implementation against the contract (see `/evaluate` for the full evaluator protocol)
3. Include the contract evaluation results in the final output

If no contract exists, skip this and proceed normally. The contract evaluation is additive — it does not replace the standard code review phases.

---

## Phase 0.5: Database Migration Check

This project is a static site with no database. Skip this phase.

```
Schema Drift: N/A (static site, no database)
New Migrations: N/A
Action: N/A
```

## Phase 1: Regression Suite

Run these tests FIRST to verify that all previously shipped features are intact. This suite grows with every feature — when you ship a feature, add its tests here. If any fail, flag them as **Critical** and investigate before proceeding with the code review.

```bash
# Run all regression suite tests
npm run test -- \
  __tests__/regression/design-constraints.test.ts \
  __tests__/regression/theme-system.test.ts \
  __tests__/regression/branch-mark.test.ts \
  __tests__/regression/routes.test.ts \
  __tests__/regression/content-pipeline.test.ts
```

### What each test covers

**Phase 1 — Foundation (2026-04-10)**

| Test File | Feature | What It Validates |
| --- | --- | --- |
| `design-constraints.test.ts` (16 tests) | Design System + ESLint Config | Monochrome-only colors, no font-weight 600/700, no tailwind.config.*, no inline styles, CSS tokens defined, ESLint config registers react-hooks plugin and enforces rules-of-hooks + exhaustive-deps as errors |
| `theme-system.test.ts` (10 tests) | Theme System | Blocking script logic, dark class baked into HTML, suppressHydrationWarning, CSS light/dark tokens, ThemeProvider/useTheme exports |
| `branch-mark.test.ts` (19 tests) | Branch Mark | All 4 variants defined with distinct patterns, proportional scaling math, currentColor/var(--background) theme awareness, favicon exists and valid |
| `routes.test.ts` (44 tests) | Routes & Layout + TOC + Research Panel | All 5 route stubs exist with default exports, layout has fonts/theme/nav/footer, nav links to all routes, footer has GitHub/RSS links, metadata configured, floating TOC (component exists, client directive, IntersectionObserver, rehype-slug, scroll-behavior, monochrome tokens, responsive hiding, h2-only heading queries, no h3), prose content overflow prevention (`overflow-wrap: break-word`), research panel (exists, client directive, panel-scoped IntersectionObserver with `root: scrollContainerRef`, `max-w-5xl` for two-column layout, `.toc-scroll` class reuse, hidden below `lg:` breakpoint, no embedded `<TableOfContents>`, monochrome tokens + no `dark:` variants, h2-only heading queries, viewport-relative `max-h-[calc(100vh-4rem)]` for independent scrolling) |

**Phase 2 — Content Infrastructure (2026-04-10)**

| Test File | Feature | What It Validates |
| --- | --- | --- |
| `content-pipeline.test.ts` (49 tests) | Content Pipeline | Post utilities (getAllPosts sort/filter, getPost, getAdjacentPosts, readingTime, slug matching, unpublished throw), MDX compilation exports, frontmatter schema (required fields, date format, tags array), project data (9 projects, 4 catalog variants, required fields, no duplicates), component exports (PostCard, ProjectCard, CodeBlock, mdxComponents), dynamic post route (exists, generateStaticParams, async params, conditional nav), page wiring (writing index, projects sections, landing page PostCard/ProjectCard, post limit), code block CSS (dual theme, title tabs), about page content (bio, background, education, GitHub/LinkedIn links, metadata), research placeholder (descriptive, not bare), all pages metadata descriptions, OG image infrastructure (lib/og, opengraph-image convention, generateStaticParams), RSS feed (route handler, static-compatible GET, no Request dependency), enhanced layout metadata (metadataBase, openGraph, twitter) |

### Source files these tests protect

- `app/globals.css` — Tailwind import, monochrome color tokens, dark/light theme definitions
- `eslint.config.mjs` — ESLint flat config with `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps` enabled as errors
- `app/layout.tsx` — Root layout with Geist fonts, ThemeProvider, Nav, Footer, blocking theme script
- `app/page.tsx` — Landing page with hero, latest posts, project cards
- `app/writing/page.tsx` — Writing route stub
- `app/projects/page.tsx` — Projects route stub
- `app/research/page.tsx` — Research route stub
- `app/about/page.tsx` — About route stub
- `components/theme-provider.tsx` — ThemeProvider context, useTheme hook, blocking themeScript
- `components/theme-toggle.tsx` — Dark/light mode toggle button
- `components/branch-mark.tsx` — SVG branch mark with 4 variants and proportional scaling
- `components/nav.tsx` — Site navigation with BranchMark, NavLinks, ThemeToggle
- `components/nav-links.tsx` — Client nav links with active state and mobile menu
- `components/footer.tsx` — Footer with GitHub, LinkedIn, RSS links
- `public/favicon.svg` — Personal branch mark favicon
- `lib/posts.ts` — Post types (PostFrontmatter, PostMeta), getAllPosts, getPost, getAdjacentPosts, reading time
- `lib/mdx.ts` — MDX compilation pipeline with rehype-pretty-code dual theme
- `components/code-block.tsx` — Code block wrapper with copy button
- `components/mdx-components.tsx` — Custom MDX component overrides (pre, a, h1-h3, code, hr, blockquote, table)
- `components/post-card.tsx` — Post listing card with date, title, description, tags
- `components/project-card.tsx` — Project card with optional BranchMark for catalog projects
- `data/projects.ts` — 9 projects with name, description, url, tech, optional variant/catalogId
- `app/writing/[slug]/page.tsx` — Individual post page with MDX rendering, generateStaticParams
- `content/posts/hello-world/index.mdx` — Test post exercising full MDX pipeline
- `lib/og.tsx` — OG image shared layout, font loading, branch mark SVG helper
- `app/opengraph-image.tsx` — Site default OG image (1200x630)
- `app/writing/[slug]/opengraph-image.tsx` — Per-post OG images with generateStaticParams
- `app/feed.xml/route.ts` — RSS 2.0 feed generation (static-compatible GET)
- `components/table-of-contents.tsx` — Floating TOC with IntersectionObserver scroll tracking
- `components/research-panel.tsx` — Slide-out research panel with panel-scoped sticky TOC, custom scrollbar, and two-column desktop layout
- `app/research/[slug]/page.tsx` — Per-project research page with TOC integration
- `app/writing/[slug]/page.tsx` — Individual post page with TOC integration and ResearchPanel consumer

### Expected results

All tests should pass. If any fail after your changes:

1. Check if you modified the source files listed above
2. Read the failing test to understand what behavior it expects
3. Fix your code to preserve the expected behavior, or update the test if the behavior change is intentional

### Updating the regression suite

After running the regression suite and before finishing the review, check if any test files touched in this session are NOT already in the suite above. To find them:

```bash
# Compare test files modified in uncommitted changes against the suite list
git diff --name-only HEAD -- '__tests__/**'
```

For each test file that exercises a newly shipped or migrated feature and is NOT already in the regression suite:

1. **Add it to the test runner command** in the bash block above
2. **Add a row to the "What each test covers" table** with: file name, test count, feature name, what it validates
3. **Add any new source files to the "Source files these tests protect" list**
4. **Add a line to the output format** checklist in Phase 4

Also check all test directories — test files may live in multiple locations (e.g., `tests/`, `__tests__/`, `spec/`, `e2e/`).

This ensures the suite is always exhaustive: every feature we ship gets regression-protected automatically.

## Phase 2: Full Validation

After regression tests pass, run the full suite:

```bash
npm run lint
npm run test
npm run build
```

Expected baseline: 0 lint errors, 138 tests passing (5 files), build succeeds with 21 static routes

## Phase 3: Code Review of Current Changes

```bash
git diff HEAD
git status
```

If reviewing a specific commit, check it out or diff against it.

### Focus Areas

1. **Logic errors** and incorrect behavior
2. **Edge cases** that aren't handled
3. **Null/undefined reference** issues
4. **Race conditions** or concurrency issues
5. **Security vulnerabilities**
6. **Resource management** — leaks, unclosed connections
7. **API contract violations**
8. **Caching bugs** — staleness, bad keys, invalid invalidation, ineffective caching
9. **Pattern violations** — check CLAUDE.md and .claude/rules/ for project conventions

### Rules

- Report pre-existing bugs found near the changed code — code quality matters everywhere
- Do NOT report speculative or low-confidence issues — conclusions must be based on actual code understanding
- If reviewing a specific git commit, note that local code may differ from that commit

## Phase 4: Output Format

### Migration Status

```
Schema Drift: NONE / DETECTED (tables/columns affected)
New Migrations: [list files] or NONE
Action: Run migration generate then apply, or N/A
```

### Regression Suite Results

```
Regression Suite: PASS / FAIL

{Milestone name}:
  - {Feature name} ({N} tests): PASS / FAIL
  - {Feature name} ({N} tests): PASS / FAIL

Full Suite: X passing, Y failing
Lint: {error count} errors, {warning count} warnings
Build: PASS / FAIL
```

### Contract Evaluation (if applicable)

```
Contract: {feature name} — Tier {N}
Evaluator: Isolated (no implementation context)

| Criterion | Threshold | Score | Pass |
|-----------|-----------|-------|------|
| {name} | {T}/10 | {S}/10 | YES/NO |

Overall: PASS / FAIL
```

If no contract was found in the plan, output: `Contract: N/A — no contract in plan`

### Code Review Findings

Group findings by severity:

**Critical** — Must fix before merge (bugs, security, data loss)

- `file:line` — description of the issue and recommended fix

**Warning** — Should fix (performance, maintainability, pattern violations)

- `file:line` — description and suggestion

**Suggestion** — Consider improving (readability, minor optimizations)

- `file:line` — description and suggestion

**Positive** — What's done well (reinforce good patterns)

- Description of what was done right
