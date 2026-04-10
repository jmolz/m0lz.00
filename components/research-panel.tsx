'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'

interface ResearchPanelProps {
  slug: string
  title: string
  sections: { id: string; title: string }[]
  children: ReactNode
}

export function ResearchPanel({
  slug,
  title,
  sections,
  children,
}: ResearchPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mt-3 mb-1 cursor-pointer"
      >
        RESEARCH ↗
      </button>
      <ul className="space-y-0.5">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-left cursor-pointer"
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-[var(--background)]/60 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[var(--background)] border-l border-[var(--border)] overflow-y-auto">
            <div className="px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs tracking-widest text-[var(--muted)]">
                  RESEARCH
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/research/${slug}`}
                    className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Open full page →
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-lg cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <h2 className="text-lg font-medium tracking-tight mb-6">
                {title}
              </h2>

              <article className="prose-content leading-[1.8] text-sm">
                {children}
              </article>
            </div>
          </div>
        </>
      )}
    </>
  )
}
