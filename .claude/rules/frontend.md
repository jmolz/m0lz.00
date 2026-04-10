---
paths:
  - "app/**"
  - "components/**"
  - "data/**"
---

# Frontend Conventions

## Component Structure

- All components live in `components/` as flat files (no nested directories unless shared sub-components emerge)
- Page components live in `app/` following Next.js App Router conventions
- Every component file exports a single named component (except page/layout which use default exports)
- Co-locate component-specific types in the same file

## Next.js 16 Specifics

### Async Request APIs

In Next.js 16, `params`, `searchParams`, `cookies`, and `headers` are all async. Always await them:

```tsx
// Correct — Next.js 16
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // ...
}

// Wrong — will throw at runtime
export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params // Error: params is a Promise
}
```

### Proxy (formerly Middleware)

Next.js 16 renamed `middleware.ts` to `proxy.ts`. If routing logic is needed, use `proxy.ts` at the project root with the `proxy` named export. The runtime is Node.js (not edge).

### Static Generation

All pages must be statically renderable. Use `generateStaticParams()` for dynamic routes:

```tsx
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

## Design System

### Color Tokens

Only 4 CSS custom properties exist. No other colors are allowed in the UI:

```css
--foreground: #000000 (light) / #ffffff (dark)
--background: #ffffff (light) / #000000 (dark)
--muted: #737373 (light) / #a3a3a3 (dark)
--border: #e5e5e5 (light) / #262626 (dark)
```

Syntax highlighting in code blocks is the sole exception — uses `min-dark` / `min-light` dual Shiki themes.

### Typography

- **Geist Sans**: Body text, headings. Weights: 400 (regular), 500 (medium). Never 600 or 700.
- **Geist Mono**: Code blocks, inline code, technical metadata. Same weight restrictions.
- No other fonts. Load via `next/font`.

### Theme

- Dark mode is the default
- Light mode available via toggle
- The design is symmetric — swapping `--foreground` and `--background` is the entire theme switch
- Persist preference in `localStorage`
- Prevent flash of wrong theme with a blocking `<script>` in `<head>`

#### Theme Implementation Pattern

The theme system uses a "dark-first inversion" pattern:

1. **Static HTML** bakes `class="dark"` into the `<html>` tag at build time
2. **Blocking script** (in `<head>`) only *removes* `dark` if `localStorage.theme === 'light'` — never adds
3. **ThemeProvider** validates `localStorage` values (anything other than `'light'` falls back to `'dark'`)
4. **`suppressHydrationWarning`** on `<html>` prevents React hydration mismatch

This guarantees zero flash: CSS dark tokens apply immediately from the static HTML, before any JS runs.

### Layout Rules

- Content max-width: 680px for prose
- Code blocks: full-width breakout from content column
- Generous line-height: 1.8 for body text
- No hero images, color splashes, gradients, or decorative elements
- Use `0.5px` horizontal rules as section dividers

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Navigation collapses to a minimal layout on mobile
- Project cards go from 2-column to single-column
- All text remains readable without horizontal scrolling

## Branch Mark Component

The `branch-mark.tsx` component renders the generative logo system:

- Accepts a `variant` prop: `'personal'`, `'blog-agent'`, `'pice'`, `'mcp-guard'`
- Accepts a `size` prop for scaling (must be legible from 16px to 64px+)
- Automatically adapts colors to current theme (foreground/background swap)
- Renders as inline SVG for crisp scaling

## Client Components

Interactive features that require browser APIs use `'use client'` components. Follow these patterns:

- Place `'use client'` as the very first line of the file
- Keep client components minimal — extract as much logic as possible into server components or shared utilities
- Use `useEffect` cleanup to prevent memory leaks (e.g., `IntersectionObserver.disconnect()`, event listener removal)
- Client components render `null` or minimal content on mount, then hydrate with interactive state

### Existing Client Components

| Component | Purpose | Browser API |
|-----------|---------|-------------|
| `theme-toggle.tsx` | Dark/light mode switch | `localStorage` |
| `theme-provider.tsx` | Theme context + blocking script | `localStorage`, `document.documentElement` |
| `nav-links.tsx` | Active link state + mobile menu | `usePathname()` |
| `table-of-contents.tsx` | Floating TOC with scroll tracking | `IntersectionObserver`, `document.querySelectorAll` |
| `code-block.tsx` | Copy-to-clipboard on code blocks | `navigator.clipboard` |

## Styling Rules

- Use Tailwind utility classes exclusively — no custom CSS except in `globals.css` for tokens and `rehype-pretty-code` styling
- Do NOT use Tailwind `dark:` variants — theme colors come from CSS custom properties that swap via the `.dark` class on `<html>`. Use `text-[var(--foreground)]`, `bg-[var(--background)]`, etc.
- No `!important` overrides
- No inline styles — use Tailwind arbitrary values (e.g., `tracking-[-1.5px]`) instead
- Spacing follows Tailwind's default scale (4px increments)
