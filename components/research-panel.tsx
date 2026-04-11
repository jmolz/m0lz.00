'use client'

import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react'
import Link from 'next/link'

interface ResearchPanelProps {
  slug: string
  title: string
  sections: { id: string; title: string }[]
  children: ReactNode
}

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export function ResearchPanel({
  slug,
  title,
  sections,
  children,
}: ResearchPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Escape key + body scroll lock
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

  // Panel-scoped TOC — IntersectionObserver rooted on the scroll container.
  // Re-runs when `slug` changes so the TOC rebuilds if a different research
  // doc is ever swapped into the same mounted panel.
  useEffect(() => {
    if (!isOpen) return
    const container = scrollContainerRef.current
    if (!container) return

    const article = container.querySelector('article')
    if (!article) return

    const headings = article.querySelectorAll('h2[id], h3[id]')
    const tocItems: TocItem[] = Array.from(headings).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }))
    setItems(tocItems)

    if (tocItems.length === 0) return
    setActiveId(tocItems[0].id)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    )
    observerRef.current = observer

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      observer.disconnect()
    }
  }, [isOpen, slug])

  const handleTocClick = (
    e: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault()
    const container = scrollContainerRef.current
    if (!container) return
    const target = container.querySelector<HTMLElement>(
      `#${CSS.escape(id)}`,
    )
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

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
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-5xl bg-[var(--background)] border-l border-[var(--border)]">
            <div
              ref={scrollContainerRef}
              className="h-full overflow-y-auto toc-scroll"
            >
              <div className="flex gap-8 px-8 py-8">
                <div className="flex-1 min-w-0 max-w-2xl">
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

                {items.length > 0 && (
                  <nav className="hidden lg:block sticky top-0 self-start w-48 max-h-full overflow-y-auto toc-scroll pt-[2.5rem] text-xs">
                    <ul className="border-l border-[var(--border)] space-y-1.5">
                      {items.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            onClick={(e) => handleTocClick(e, item.id)}
                            className={`block transition-colors leading-snug ${
                              item.level === 3 ? 'pl-6' : 'pl-3'
                            } ${
                              activeId === item.id
                                ? 'text-[var(--foreground)]'
                                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                            }`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
