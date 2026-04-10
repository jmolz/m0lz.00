import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — m0lz',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl tracking-tight mb-4">About</h1>
      <p className="text-sm text-[var(--muted)]">Coming soon.</p>
    </div>
  )
}
