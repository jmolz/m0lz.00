# Handoff: Research Sources Section

**Date:** 2026-04-10
**Branch:** main
**Last Commit:** d8d9e61 feat(research): add author and date metadata to research pages

## Goal

Add formal sources/references sections to research pages so readers can see the underlying research papers and connect the dots.

## Recently Completed (This Session)

- [x] Added `author` and `date` optional fields to `ResearchFrontmatter` interface in `lib/research.ts`
- [x] Rendered byline (author · date) in research page header in `app/research/[slug]/page.tsx`
- [x] Added author/date frontmatter to both PICE and MCP-Guard research documents

## In Progress / Next Steps

- [ ] Add formal "## Sources" section to `content/research/pice/index.mdx` — extract all inline citations (Gregor et al. ICST 2025, Kuhn et al. ICLR 2023, Kim et al. ICML 2025, etc.) and format as a references list at the end
- [ ] Add formal "## Sources" section to `content/research/mcp-guard/index.mdx` — extract the 2 arXiv citations (MCPSecBench, MSB) and format properly
- [ ] Add "Sources" entry to the `sections` array in both research frontmatters so it appears in the TOC

## Key Decisions

- **Sources as MDX content, not frontmatter**: Sources should render as a regular MDX heading section at the end of each document so it appears in the Table of Contents and can include links, not as a frontmatter array.

## Dead Ends (Don't Repeat These)

- None yet

## Files Changed

- `lib/research.ts` — Added optional `author?: string` and `date?: string` fields to `ResearchFrontmatter`
- `app/research/[slug]/page.tsx` — Added byline rendering with conditional display for author/date
- `content/research/pice/index.mdx` — Added `author: "Jacob Molz"` and `date: "2026-04-10"` to frontmatter
- `content/research/mcp-guard/index.mdx` — Added `author: "Jacob Molz"` and `date: "2026-04-10"` to frontmatter

## Current State

- **Tests:** 123 passing (baseline)
- **Build:** Working (21/21 routes)
- **Lint/Types:** Clean
- **Manual verification:** Bylines render on research pages

## Context for Next Session

The user wants research papers to show their sources so readers can connect the dots. The byline is done. Next is adding a formal references section at the end of each research document. PICE has many inline citations scattered throughout (academic papers, arXiv papers, industry studies) that need to be extracted and formatted as a proper bibliography. MCP-Guard has 2 arXiv links that should be formatted similarly.

**Recommended first action:** Read through `content/research/pice/index.mdx` to identify all cited works (look for patterns like "et al.", conference names, arXiv IDs, years), then add a "## Sources" section at the end with properly formatted citations.
