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

Expected: 148 tests passing across 5 files. All must pass before committing.

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

## Determine Context (Worktree or Main)

```bash
git branch --show-current
git worktree list
```

Determine if you're in a **worktree** (feature branch) or on **main**. The remaining phases adapt based on this.

## Commit

Use the `/commit` workflow for message format. Key rules:

- **Tags:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`
- **Scope:** `feat(ui)`, `fix(content)`, `docs(readme)`, `chore(deploy)`
- **Context section** required if AI layer files changed (CLAUDE.md, .claude/, .windsurf/)

## Merge to Main (Worktree Only)

**Skip this phase if already on main.**

If you committed on a feature branch in a worktree, merge it into main:

```bash
FEATURE_BRANCH=$(git branch --show-current)
WORKTREE_PATH=$(pwd)
MAIN_REPO=$(git worktree list | head -1 | awk '{print $1}')
cd "$MAIN_REPO"
git checkout main
git pull origin main
git merge "$FEATURE_BRANCH"
```

If the merge has conflicts:

1. Resolve conflicts — favor the feature branch for new code, preserve main for unrelated changes
2. Run the full validation suite again after resolving
3. Commit the merge resolution

## Deploy

```bash
# Push from the main repo directory (not the worktree)
git push origin main
```

**Vercel** auto-deploys on push to `main`. Static site builds in ~1-2 minutes.

## Clean Up Worktree (Worktree Only)

**Skip this phase if you were already on main.**

After a successful merge and push, remove the worktree and feature branch:

```bash
git worktree remove "$WORKTREE_PATH"
git branch -d "$FEATURE_BRANCH"
```

Verify cleanup:

```bash
git worktree list
git branch
git status
```

If `git branch -d` refuses (branch not fully merged), investigate — do NOT force-delete with `-D` without understanding why.

## Verify

```bash
git log --oneline -5
git status
# Expected: on main, clean tree, feature commits visible in log
```

After deploy, verify at [m0lz.dev](https://m0lz.dev):
- All routes load (/, /writing, /projects, /research, /about)
- Dark/light toggle works
- OG images render (test via [opengraph.xyz](https://www.opengraph.xyz/))
- RSS feed validates at /feed.xml
