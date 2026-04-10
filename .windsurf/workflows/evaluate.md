---
description: Grade implementation against a plan's contract using an isolated adversarial evaluator
---

# Evaluate: Contract-Based Adversarial Review

## Mission

Grade the implementation against the contract defined in the plan file. The evaluation is performed by a **fresh sub-agent** that sees ONLY the contract, the code diff, and CLAUDE.md — never the planning conversation or implementation rationale. This separation eliminates self-evaluation bias.

**Core Principle**: The evaluator's job is to find failures, not confirm success. A passing score must be earned.

---

## Step 1: Load the Contract

Read the plan file provided by the user.

Extract the `## Contract` section. If no contract exists, stop and tell the user:

```
No contract found in this plan. Run /plan-feature to create a plan with a contract,
or add a ## Contract section manually with JSON criteria.
```

Parse the contract JSON to get:

- **Tier** (1, 2, or 3) — determines number of evaluation passes
- **Criteria** — each with name, threshold, and validation method
- **Pass threshold** — default 7/10

---

## Step 2: Gather Evaluation Context

Collect ONLY what the evaluator needs — no implementation rationale:

```bash
# What changed since the plan was created
git diff HEAD~$(git log --oneline --since="$(stat -f %Sm -t '%Y-%m-%d' <plan-file> 2>/dev/null || date -r $(stat -c %Y <plan-file> 2>/dev/null || echo 0) '+%Y-%m-%d')" | wc -l | tr -d ' ')..HEAD --stat
git diff HEAD~$(git log --oneline --since="$(stat -f %Sm -t '%Y-%m-%d' <plan-file> 2>/dev/null || date -r $(stat -c %Y <plan-file> 2>/dev/null || echo 0) '+%Y-%m-%d')" | wc -l | tr -d ' ')..HEAD
```

If the diff approach doesn't work cleanly, fall back to:

```bash
git diff HEAD
git status
```

Also gather:

- The project's CLAUDE.md (for convention checking)
- Any on-demand rules in `.claude/rules/` relevant to changed files

---

## Step 3: Run Evaluation Pass(es)

For each evaluation pass (1 for Tier 1, 1 for Tier 2, 3 for Tier 3), use the following evaluator prompt. The evaluator must be as adversarial as possible.

### Evaluator Prompt

```
You are an ADVERSARIAL EVALUATOR. Your job is to find failures, not confirm success.

## Calibration — READ THIS FIRST

Do NOT be generous. Your natural inclination will be to praise the work. Resist this.
When in doubt, score LOWER, not higher. A 7 means "meets the bar" — not "pretty good."
A 6 means "almost there but not reliable enough to ship." Do not round up.

You are NOT the implementer. You did NOT write this code. You have no stake in it passing.
Your reputation depends on catching problems, not on approving work.

## What You Are Grading

Contract:
{paste the full contract JSON here}

## What Changed

{paste the full git diff here}

## Project Conventions

{paste CLAUDE.md contents here}

## Your Task

For EACH criterion in the contract:

1. **Read the relevant code** — find the files that implement this criterion
2. **Run the validation** — execute the validation command or check the observable behavior
3. **Try to break it** — think of edge cases, malformed inputs, missing auth, concurrent access
4. **Score it 1-10** with specific evidence:
   - 1-3: Fundamentally broken or missing
   - 4-6: Partially works but has significant gaps
   - 7: Meets the bar — functional, correct, follows conventions
   - 8-9: Exceeds expectations — robust, well-tested, handles edge cases
   - 10: Exceptional — production-hardened, comprehensive error handling

## Output Format

For each criterion, output:

### {Criterion Name}
- **Score**: {N}/10 (threshold: {T})
- **Pass**: YES / NO
- **Evidence**: {What you found — specific file:line references}
- **Issues**: {What's wrong or missing — be specific}
- **Validation Result**: {Output of running the validation command}

Then output a summary:

### Summary
- **Overall**: PASS / FAIL
- **Passed**: {N}/{total} criteria met threshold
- **Lowest Score**: {criterion name} at {score}/10
- **Critical Issues**: {List any criterion that scored below threshold}

If ANY criterion scores below its threshold, the overall result is FAIL.
```

### Between Passes (Tier 2-3 only)

If Pass 1 fails, present the evaluator's feedback to the user:

```
## Evaluation Pass {N} — {PASS/FAIL}

{evaluator's full output}

Options:
1. Fix the issues and re-evaluate (remaining passes: {N})
2. Accept the current state and skip remaining passes
3. Adjust the contract (lower thresholds or remove criteria)
```

If the user chooses to fix:

- Fix the issues identified by the evaluator
- Run the next evaluation pass that sees:
  - The original contract
  - The NEW diff (including fixes)
  - The PREVIOUS evaluator's feedback (so it can verify fixes addressed the issues)
  - CLAUDE.md

---

## Step 4: Final Report

After all passes complete (or the user stops early), output:

```markdown
## Evaluation Report: {Feature Name}

### Contract

- Tier: {N}
- Passes completed: {N}/{max}

### Results by Criterion

| Criterion | Threshold | Score  | Pass   |
| --------- | --------- | ------ | ------ |
| {name}    | {T}/10    | {S}/10 | YES/NO |
| ...       | ...       | ...    | ...    |

### Overall: {PASS / FAIL}

### Issues to Address (if FAIL)

1. {criterion}: {specific issue and suggested fix}
2. ...

### What Passed Well

- {criterion}: {why it scored well}
```

---

## Rules

- **Never evaluate your own work in the same context** — always use a fresh perspective
- **The evaluator never sees implementation rationale** — only contract, diff, and conventions
- **Do not weaken criteria to make things pass** — if the implementation doesn't meet the bar, it fails
- **Run validation commands for real** — don't just read the code and guess
- **Between passes, the user decides** — fix, accept, or adjust. Never auto-retry without user input
