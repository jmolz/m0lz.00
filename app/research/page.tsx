import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — m0lz',
  description:
    'Deep dives into AI engineering — benchmarks, framework comparisons, and data-driven investigations.',
}

export default function ResearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">Research</h1>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        Longer-form, data-driven investigations — benchmarks, framework
        comparisons, and deep technical analysis. Where Writing covers
        tutorials and engineering narratives, Research is for work that
        requires sustained measurement and evidence.
      </p>
      <p className="text-sm text-[var(--muted)]">
        First entries arriving mid-2026.
      </p>
    </div>
  )
}
