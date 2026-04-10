---
paths:
  - ".claude/commands/**"
---

# Command File Conventions

## File Format

Every command file MUST have YAML frontmatter with at minimum a `description` field:

```yaml
---
description: Short description of what this command does
---
```

Add `argument-hint` when the command accepts a user argument via `$ARGUMENTS`:

```yaml
---
description: Do something with a plan
argument-hint: <path-to-plan.md>
---
```

## Structure

- Start with an H1 title after the frontmatter
- Use numbered steps or phases for sequential workflows
- Use H3 (`###`) for sub-steps within a phase
- Wrap shell commands in fenced `bash` code blocks
- Use `$ARGUMENTS` to reference user-provided input

## Template References

Use the `@path/to/file` syntax to include template content inline:

```
@.claude/templates/plan-template.md
```

This tells Claude to read and use the referenced file as the output structure.

## Cross-References

When a command references another command (e.g., `/evaluate` referencing `/plan-feature`), use the slash-command format: `/command-name`.

## Rules for Command Content

- Commands must be self-contained — an agent with no prior context should be able to follow the steps
- Include explicit validation steps (what to check, what commands to run)
- Include an output format section when the command produces structured output
- List anti-patterns or "Rules" at the end when behavior constraints are important
- Use **bold** for critical warnings and constraints
- Keep commands under 250 lines — split into sub-commands if larger

## Naming

- Use kebab-case for filenames: `my-command.md`
- Prefix example/template commands with underscore: `_example-command.md`

## Synchronization

When a command is created or updated, ensure the corresponding Windsurf workflow at `.windsurf/workflows/{same-name}.md` is also updated to stay in sync. Key differences to account for:

- Workflows use `description` only in frontmatter (no `argument-hint`)
- Workflows cannot use `$ARGUMENTS` — replace with instructions to accept user input
- Workflows cannot use `@path` includes — replace with explicit "read the template at `path`" instructions
- Remove Claude Code-specific features (sub-agents, Codex plugin references) and adapt for Windsurf
