---
paths:
  - "__tests__/**"
  - "vitest.config.ts"
---

# Testing Conventions

## Framework

- **Vitest** — lightweight, fast, native TypeScript support
- Config: `vitest.config.ts` at project root
- Run: `npm run test` (single run) or `npm run test:watch` (watch mode)

## Directory Structure

```
__tests__/
└── regression/              # Cumulative regression suite
    ├── design-constraints.test.ts
    ├── theme-system.test.ts
    ├── branch-mark.test.ts
    ├── routes.test.ts
    └── content-pipeline.test.ts
```

## Regression Suite

The regression suite is **cumulative** — it grows with every shipped feature and never shrinks. Tests are organized by feature domain, not by phase.

### Rules

- **Never delete a passing regression test** unless the underlying feature is intentionally removed
- **Never weaken assertions** (e.g., changing `toBe(true)` to `toBeTruthy()`) without explicit justification
- When shipping a new feature, add regression tests covering its invariants
- Tests should verify **observable behavior and structural constraints**, not implementation details

### Test Patterns

This project uses two test patterns:

1. **File-based constraint tests** — Read source files and `grep` for patterns. Used for design system enforcement (color palette, font weights, no inline styles, no tailwind config).

2. **Module import tests** — Import component modules and verify exported types, functions, and string constants. Used for theme system (blocking script content, provider exports).

### Adding Tests

When a new feature ships:

1. Create tests in `__tests__/regression/` named `{feature-domain}.test.ts`
2. Add the test file to the regression suite runner command in `.windsurf/workflows/review.md`
3. Update the "What each test covers" table in the review workflow
4. Add protected source files to the "Source files these tests protect" list

### Current Baseline

108 tests across 5 files. All must pass before any commit.
