---
paths:
  - ".windsurf/workflows/**"
---

# Windsurf Workflow Conventions

## File Format

Every workflow file MUST have YAML frontmatter with a `description` field:

```yaml
---
description: Short description of what this workflow does
---
```

No other frontmatter fields are supported by Windsurf workflows.

## Structure

- Start with an H1 title after the frontmatter
- Mirror the structure of the corresponding `.claude/commands/` file
- Use numbered steps or phases for sequential workflows
- Wrap shell commands in fenced `bash` code blocks

## Differences from Claude Commands

Windsurf workflows have several limitations compared to Claude commands:

| Feature | Claude Command | Windsurf Workflow |
|---------|---------------|-------------------|
| Arguments | `$ARGUMENTS` | Describe input as user-provided |
| File includes | `@path/to/file` | "Read the template at `path`" |
| Sub-agents | Supported | Not available — use "research in parallel" language |
| Codex plugin | `/codex:*` commands | Remove or describe as external review |
| `argument-hint` | Supported in frontmatter | Not supported |

## Synchronization

Each workflow MUST have a corresponding command in `.claude/commands/` and vice versa. When editing either:

1. Make the substantive change in the source file
2. Propagate to the counterpart, adapting for platform differences
3. Keep the logical flow and step numbering aligned

## Naming

- Use kebab-case matching the command name: `plan-feature.md`
- The filename (minus `.md`) becomes the slash command: `/plan-feature`

## Content Rules

- Workflows must be self-contained — a Windsurf agent with no prior context should be able to follow the steps
- Include explicit bash commands for validation
- Prefer platform-agnostic instructions over Claude-specific terminology
- Use "research in parallel" instead of "spawn sub-agents"
