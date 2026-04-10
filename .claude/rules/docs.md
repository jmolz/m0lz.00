---
paths:
  - ".claude/docs/**"
---

# Documentation File Conventions

## Purpose

Docs in `.claude/docs/` provide heavy reference material that is NOT auto-loaded into context. Agents read these on-demand when deep knowledge is needed — typically during `/prime`, `/plan-feature`, or via sub-agent research.

## Types of Docs

| Type | Naming | Purpose |
|------|--------|---------|
| Playbook | `PLAYBOOK.md` | Quick-reference for workflows and processes |
| Guide | `*-GUIDE.md` | Step-by-step instructions for specific scenarios |
| Architecture | `*-architecture.md` | Deep-dive system design reference |
| Example/Template | `_example-*.md` | Prefixed with `_` to indicate it's a starting point |

## Structure

- Start with an H1 title
- Include a brief purpose statement at the top
- Use tables for reference data and comparisons
- Use fenced code blocks for example commands and prompts
- Use checklists `- [ ]` for actionable steps
- Use horizontal rules `---` between major sections

## Content Rules

- Docs must be self-contained — they may be read by a sub-agent with no other context
- Include concrete examples, not just abstract descriptions
- Prefer tables over prose for structured comparisons
- Include "anti-patterns" sections to prevent common mistakes
- Keep docs under 600 lines — split if larger

## Naming

- Use UPPER-CASE for primary reference docs: `PLAYBOOK.md`, `BROWNFIELD-GUIDE.md`
- Use lowercase kebab-case for topic-specific docs: `api-patterns.md`
- Prefix examples/templates with underscore: `_example-architecture.md`
