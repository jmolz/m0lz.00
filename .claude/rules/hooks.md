---
paths:
  - ".claude/hooks/**"
---

# Hook File Conventions

## Purpose

Hooks execute automatically on Claude Code lifecycle events (SessionStart, PreToolUse, PostToolUse, Stop, etc.). They are configured in `.claude/settings.json`.

## Shell Script Standards

All hooks must:

- Start with `#!/bin/bash`
- Use `set -euo pipefail` for strict error handling
- Parse the working directory from stdin JSON: `CWD=$(cat /dev/stdin 2>/dev/null | grep -o '"cwd":"[^"]*"' | head -1 | cut -d'"' -f4 || true)`
- Exit with `exit 0` for non-critical paths (don't block the session)
- Include a comment header explaining what the hook does

## Error Handling

- Hooks should NEVER crash the session — guard all operations with `|| true` or `2>/dev/null`
- Use `exit 0` as the final line to ensure non-blocking behavior
- Only use non-zero exit codes when the hook must actively prevent an action

## Output

- Hook stdout appears in the session transcript
- Use clear section markers for output: `=== Hook Name ===` and `======================`
- Keep output concise — agents will read it, not humans
- Include actionable recommendations in output (what to do about the finding)

## Registration

Hooks are registered in `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/hook-name.sh",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

## Naming

- Use kebab-case: `vet-handoff.sh`
- Name should describe the action: `vet-*`, `validate-*`, `check-*`
