---
paths:
  - "**"
---

# Project-Wide Conventions

## What This Project Is

This is **m0lz.dev** — a monochrome Next.js 16 blog and portfolio site. It is a static site with no database, no runtime data fetching, and no SSR. Every page is pre-rendered at build time. The blog agent (m0lz.01) publishes content by committing MDX files to this repo.

## AI Layer Structure

```
.claude/
├── commands/        # Claude Code slash commands
├── docs/            # Deep reference documentation (on-demand)
├── hooks/           # Lifecycle hooks (shell scripts)
├── plans/           # Implementation plans (generated, not checked in)
├── rules/           # Auto-loaded context rules (path-scoped)
├── settings.json    # Hook registration and Claude Code config
└── templates/       # Output structure templates for commands
.windsurf/
└── workflows/       # Windsurf equivalents of Claude commands
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Command files | kebab-case `.md` | `plan-feature.md` |
| Workflow files | kebab-case `.md` (match command name) | `plan-feature.md` |
| Rule files | kebab-case `.md` | `commands.md` |
| Template files | PascalCase or kebab-case `.md` | `PRD-template.md` |
| Doc files | UPPER-CASE or kebab-case `.md` | `PLAYBOOK.md` |
| Hook scripts | kebab-case `.sh` | `vet-handoff.sh` |
| Skill directories | kebab-case | `code-review/` |
| Example/template files | Prefix with `_` | `_example-frontend.md` |

## File Format Standards

- All `.md` files use standard Markdown with YAML frontmatter where required
- Use fenced code blocks with language identifiers for all code examples
- Use tables for structured reference data
- Use horizontal rules `---` to separate major sections
- Use HTML comments `<!-- -->` for instructions in templates only

## Cross-Platform Parity

This toolkit supports both **Claude Code** and **Windsurf**. When modifying commands or workflows:

1. Every `.claude/commands/*.md` must have a matching `.windsurf/workflows/*.md`
2. Changes to one must be propagated to the other
3. Platform-specific features must be adapted, not removed
4. The logical flow and step numbering should stay aligned

## Version Control

- Commands, rules, templates, docs, and workflows are all version-controlled
- Plans (`.claude/plans/`) are generated artifacts — commit only when they serve as project record
- The `_example-*` prefixed files are reference templates — do not customize them for a specific project
- When modifying AI layer files, include a `Context:` section in the commit body

## Quality Standards

- Every file must be self-contained enough to be useful without reading other files
- Every command/workflow must include validation steps
- Every rule must have correct `paths:` frontmatter targeting relevant file patterns
- Every template must have descriptive placeholders (no empty sections)
- Documentation must include concrete examples, not just abstract descriptions
