---
description: Standard workflow for building, testing, committing and deploying m0lz.00 changes
---

# Commit and Deploy Workflow

## Pre-Commit Validation

Run these checks in order. Fix failures before proceeding.

### 1. Lint

```bash
npm run lint
```

### 2. Regression tests

```bash
npm run test
```

Expected: 116 tests passing across 5 files. All must pass before committing.

### 3. Build

```bash
npm run build
```

Expected: Clean static export with all routes pre-rendered. No warnings.

## Documentation Updates

Before committing, check if any of these need updating:

1. **README.md** — Update if commands, structure, or tech stack changed
2. **CLAUDE.md** — Update if project conventions, test counts, or structure changed
3. **`.claude/rules/`** — Update if patterns or conventions changed
4. **`.windsurf/workflows/review.md`** and **`.claude/commands/review.md`** — Update if test files, counts, or source files changed (must stay in sync)

## Commit

Use the `/commit` workflow for message format. Key rules:

- **Tags:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`
- **Scope:** `feat(ui)`, `fix(content)`, `docs(readme)`, `chore(deploy)`
- **Context section** required if AI layer files changed (CLAUDE.md, .claude/, .windsurf/)

## Deploy

```bash
git push origin main
```

**Vercel** auto-deploys on push to `main`. Static site builds in ~1-2 minutes.

## Verify

```bash
git status
# Expected: "nothing to commit, working tree clean"
```

After deploy, verify at [m0lz.dev](https://m0lz.dev):
- All routes load (/, /writing, /projects, /research, /about)
- Dark/light toggle works
- OG images render (test via [opengraph.xyz](https://www.opengraph.xyz/))
- RSS feed validates at /feed.xml
