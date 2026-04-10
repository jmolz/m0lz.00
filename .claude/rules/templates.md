---
paths:
  - ".claude/templates/**"
---

# Template File Conventions

## Purpose

Templates define the **output structure** for commands. They are referenced via `@.claude/templates/filename.md` in command files and provide the skeleton that agents fill in with real data.

## Placeholder Syntax

Use curly braces for placeholders that the agent fills in:

```markdown
{Project description and purpose}
{1-2 sentences: what we're trying to accomplish}
```

Use pipe-separated options for constrained choices:

```markdown
**Type**: New Capability / Enhancement / Refactor / Bug Fix
**Complexity**: Low / Medium / High
```

## Instructional Comments

Use HTML comments for instructions that should NOT appear in the output:

```markdown
<!-- What is this project? One paragraph. -->
<!-- CUSTOMIZE: Replace with your project's actual commands -->
```

## Structure Rules

- Start with an H1 title using a placeholder: `# Feature: {Feature Name}`
- Use `---` horizontal rules to separate major sections
- Include all required sections — omitting a section means it won't appear in output
- Use checkbox lists `- [ ]` for actionable items and criteria
- Use tables for structured reference data

## Naming

- Use PascalCase or kebab-case matching the output filename:
  - `CLAUDE-template.md` → generates `CLAUDE.md`
  - `plan-template.md` → generates plan files
  - `PRD-template.md` → generates `PRD.md`
  - `HANDOFF-template.md` → generates `HANDOFF.md`

## Quality Checks

Every template must:

- Be usable without reading any other file
- Have every section filled in with descriptive placeholders (no empty sections)
- Include validation criteria where applicable
- Match the conventions documented in CLAUDE.md and project rules
