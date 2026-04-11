---
name: code-review
description: "Use this skill when reviewing code changes, pull requests, or when asked to check code quality. Triggers: 'review', 'code review', 'check this code', 'PR review', 'look over my changes', 'audit'. Provides a structured review checklist covering correctness, security, performance, readability, and testing — plus the m0lz.dev project-specific regression suite harness."
---

# Code Review Skill

## When to Use
The agent should read this skill when reviewing code changes, auditing existing code, or evaluating a PR in the m0lz.dev codebase.

## Review Process

### 1. Understand the Change
- Read the diff or files being reviewed
- Understand the intent — what problem does this solve?
- Check if there's a related plan (`.claude/plans/*.md`), issue, or PR description
- If the most recent plan has a `## Contract` section, grade the implementation against it as an additive phase (see `/evaluate`)

### 2. Correctness
- Does the code do what it claims to do?
- Are edge cases handled? (null, empty, boundary values, concurrent access)
- Are error paths handled gracefully? (no swallowed errors, meaningful messages)
- Does it match the patterns in CLAUDE.md and `.claude/rules/*.md`?

### 3. Security
- No hardcoded secrets, API keys, or credentials
- User input is validated and sanitized
- Database queries are parameterized (N/A for m0lz.dev — static site, no DB)
- No sensitive data in logs or error messages
- Dependencies are from trusted sources

### 4. Performance
- No unnecessary re-renders (frontend)
- No blocking operations on the main thread
- Bundle size stays under the 100KB JS budget (m0lz.dev constraint)
- Expensive computations are memoized where appropriate

### 5. Readability
- Names are descriptive and consistent with codebase conventions
- Functions are focused (single responsibility)
- No overly clever code — prefer clarity over brevity
- Comments explain WHY, not WHAT (the code should explain what)
- No dead code or commented-out blocks

### 6. Testing
- New logic has corresponding regression tests in `__tests__/regression/`
- Tests cover happy path, edge cases, and error cases
- Tests are independent (no shared mutable state)
- Assertions are specific (not just "it didn't throw")
- The cumulative regression suite grows with every shipped feature — it never shrinks

### 7. Architecture
- Changes respect existing module boundaries
- No circular dependencies introduced
- New abstractions are justified (not premature)
- Public API surface is minimal

---

## m0lz.dev Regression Suite (Project-Specific Testing Harness)

This codebase uses a **cumulative regression suite** pattern. Every shipped feature adds tests that protect its invariants forever. Before concluding any review, run the full suite.

### Runner Command

```bash
npm run test -- \
  __tests__/regression/design-constraints.test.ts \
  __tests__/regression/theme-system.test.ts \
  __tests__/regression/branch-mark.test.ts \
  __tests__/regression/routes.test.ts \
  __tests__/regression/content-pipeline.test.ts
```

### Suite Inventory (as of 2026-04-10 — Research Panel shipped)

| Test File | Tests | Domain | What It Locks In |
|---|---|---|---|
| `design-constraints.test.ts` | 16 | Design System + ESLint Config | Monochrome-only palette, no font-weight 600/700, no `tailwind.config.*`, no inline styles, CSS tokens defined, ESLint config registers `eslint-plugin-react-hooks` and enforces `rules-of-hooks` + `exhaustive-deps` as errors |
| `theme-system.test.ts` | 10 | Theme System | Blocking theme script logic, `dark` class baked into HTML, `suppressHydrationWarning`, CSS light/dark tokens, `ThemeProvider`/`useTheme` exports |
| `branch-mark.test.ts` | 19 | Branch Mark | All 4 variants with distinct patterns, proportional scaling math, `currentColor` / `var(--background)` theme awareness, favicon exists and valid |
| `routes.test.ts` | **40** | Routes & Layout + TOC + **Research Panel** | Route stubs, layout (fonts, theme, nav, footer), nav links, footer links, metadata, floating TOC, research panel (panel-scoped `IntersectionObserver` with `root: scrollContainerRef`, `max-w-5xl` two-column layout, `.toc-scroll` reuse, `hidden lg:block` responsive guard, no embedded `<TableOfContents>`, monochrome tokens + no `dark:` variants) |
| `content-pipeline.test.ts` | 49 | Content Pipeline | Post utilities, MDX compilation, frontmatter schema, project data, component exports, dynamic post route, page wiring, code block CSS, about page content, research placeholder, metadata descriptions, OG images, RSS feed, layout metadata |

**Baseline: 134 tests across 5 files.** All must pass before any commit.

### Source Files These Tests Protect

**Foundation:** `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/{writing,projects,research,about}/page.tsx`, `components/{theme-provider,theme-toggle,branch-mark,nav,nav-links,footer}.tsx`, `public/favicon.svg`

**Content Pipeline:** `lib/{posts,mdx,og}.ts`, `components/{code-block,mdx-components,post-card,project-card}.tsx`, `data/projects.ts`, `app/writing/[slug]/page.tsx`, `app/opengraph-image.tsx`, `app/writing/[slug]/opengraph-image.tsx`, `app/feed.xml/route.ts`

**TOC + Research Panel:** `components/table-of-contents.tsx`, `components/research-panel.tsx`, `app/research/[slug]/page.tsx`, `app/writing/[slug]/page.tsx`

### Expanding the Suite

When a new feature ships:

1. Add regression tests in `__tests__/regression/{domain}.test.ts` (existing file) or create a new file for a new domain
2. Update the "Suite Inventory" table above with new test count and coverage description
3. Add new source files to the "Source Files These Tests Protect" list
4. Mirror the updates in `.claude/commands/review.md` AND `.windsurf/workflows/review.md` (parity rule)
5. If creating a new test file, add it to the runner command in both review files

**Never weaken or delete a passing regression test** unless the underlying feature is intentionally removed. The suite's value comes from its monotonic growth.

---

## Project-Specific Client-Component Pitfalls (m0lz.dev React 19.2)

This codebase is >99% static server components. The handful of `'use client'` components have concentrated risk — these are the traps to look for:

### Effect Dependency Staleness
- An effect that reads props via closure MUST list those props (or a stable proxy) in its dep array
- Prefer stable primitives (`slug: string`) over reference types (`children: ReactNode`) in dep arrays — ReactNode changes reference every parent render, causing effect churn
- **`react-hooks/exhaustive-deps` is enforced as an error** in `eslint.config.mjs` and runs on every `npm run lint`. The rule flags *missing* deps (correctness bugs) but never *extra* deps, so "watch" patterns like `[isOpen, slug]` — where `slug` drives re-runs but isn't read inside the body — remain legal and useful
- A regression test in `design-constraints.test.ts` locks in that both `rules-of-hooks` and `exhaustive-deps` stay registered as errors — nobody can silently disable them without failing the suite

### IntersectionObserver Cleanup
- Capture the observer in a local variable before stashing in a ref: `const observer = new IntersectionObserver(...); observerRef.current = observer`
- Use the local variable in the cleanup (`return () => observer.disconnect()`), not the ref — the ref may point to a newer observer by the time cleanup fires
- Cleanup must live on EVERY path that created the observer. Prefer a single happy-path exit that assigns `setItems` unconditionally and early-returns before observer creation when the headings list is empty

### Sticky Positioning Inside Flex Containers
- `position: sticky` requires the element to have a defined height bounded by its scroll ancestor
- A flex child defaults to stretch-to-row-height, which breaks sticky. Always add `self-start` to a sticky child inside a flex row
- The scroll ancestor (not the viewport) is what sticky pins against — verify you're not accidentally pinning to the wrong container

### Body Scroll Lock + Nested Scroll Containers
- When a modal/panel sets `document.body.style.overflow = 'hidden'`, ensure its own scroll container has `overflow-y-auto` and an explicit height
- For TOC anchor clicks inside such a panel, use `preventDefault()` + `element.scrollIntoView()` (which resolves to the nearest scrollable ancestor). Never rely on native `href="#id"` — it scrolls the viewport, not the panel

### Monochrome Token Discipline
- Only 4 color tokens exist: `var(--foreground)`, `var(--background)`, `var(--muted)`, `var(--border)`
- NEVER use Tailwind `dark:` variants — theme swaps via the `.dark` class on `<html>` and the CSS custom properties alone
- NEVER introduce hex literals in component files (they're only allowed in `app/globals.css` for the tokens themselves and toc-thumb)
- Fonts: Geist Sans / Geist Mono, weights 400 and 500 only. No 600, no 700.

### Next.js 16 Async APIs
- `params`, `searchParams`, `cookies`, `headers` are all `Promise`s — always `await` them
- Middleware is now `proxy.ts`, not `middleware.ts`
- All pages must be statically renderable (`output: 'export'`)

---

## Output Format

Provide findings grouped by severity:

**Critical** — Must fix before merge (bugs, security issues, data loss risks)

- `file:line` — description of the issue and recommended fix

**Warning** — Should fix (performance, maintainability, pattern violations)

- `file:line` — description and suggestion

**Suggestion** — Consider improving (readability, minor optimizations)

- `file:line` — description and suggestion

**Positive** — What's done well (reinforces good patterns)

- Description of what was done right

If a plan contract exists, append a `Contract Evaluation` section with per-criterion scores (see `/evaluate` for the evaluator protocol).
