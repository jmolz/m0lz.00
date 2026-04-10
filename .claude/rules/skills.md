---
paths:
  - ".claude/skills/**"
---

# Skills Directory Conventions

## Purpose

Skills in `.claude/skills/` provide specialized knowledge and capabilities that Claude Code can invoke. Each skill is a self-contained directory with its own resources. The skill `description` in frontmatter is the **primary triggering mechanism** — Claude decides whether to consult a skill based on this field.

## Directory Structure

Each skill follows this layout:

```
skill-name/
├── SKILL.md              # Main skill definition (required)
├── scripts/              # Executable code for deterministic/repetitive tasks (optional)
├── references/           # Docs loaded into context as needed (optional)
├── assets/               # Files used in output — templates, icons, fonts (optional)
├── agents/               # Instructions for specialized subagents (optional)
└── examples/             # Example files for the skill (optional)
```

## Naming

- Use kebab-case for skill directory names: `agent-development`, `code-review`
- The directory name becomes the skill identifier and must match the `name` field in frontmatter

## SKILL.md Frontmatter

Required fields:

```yaml
---
name: skill-name
description: "Detailed description of what the skill does AND when to trigger it. Include specific trigger phrases, contexts, and use cases."
---
```

Optional fields: `license`, `compatibility`

### Description Writing

The `description` field is critical — it determines when Claude activates the skill:

- Include **what the skill does** AND **specific trigger contexts**
- List explicit trigger phrases: `"Triggers: 'review', 'code review', 'check this code', 'PR review'"`
- Be slightly "pushy" — Claude tends to under-trigger, so err toward broader activation
- Include near-miss scenarios where the skill should still activate
- Keep under ~100 words (always in context as metadata)

## Progressive Disclosure

Skills use a three-level loading system:

1. **Metadata** (name + description) — Always in context (~100 words)
2. **SKILL.md body** — Loaded when skill triggers (<500 lines ideal)
3. **Bundled resources** — Loaded as needed (scripts can execute without loading into context)

## SKILL.md Body Structure

- Start with an H1 title after the frontmatter
- Include a "When to Use" section clarifying activation context
- Use numbered steps for sequential processes
- Include concrete examples with input/output pairs
- Use tables for symptom → cause mappings or reference data
- Include "Anti-Patterns" section for common mistakes
- End with output format specification if the skill produces structured output

## Content Rules

- Skills must be self-contained — all necessary context lives within the skill directory
- Keep SKILL.md under 500 lines; if approaching this limit, move detail to `references/` files with clear pointers
- For large reference files (>300 lines), include a table of contents
- When a skill supports multiple domains/frameworks, organize by variant in `references/` (e.g., `aws.md`, `gcp.md`)
- Reference files clearly from SKILL.md with guidance on when to read them
- Scripts must be executable and documented
- Use imperative form in instructions
