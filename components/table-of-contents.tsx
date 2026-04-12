'use client'

import { useState, useEffect, useRef } from 'react'

interface TocItem {
  id: string
  text: string
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const headings = article.querySelectorAll('h2[id]')
    if (headings.length === 0) return

    const tocItems: TocItem[] = Array.from(headings).map((el) => ({
      id: el.id,
      text: el.textContent || '',
    }))
    setItems(tocItems)
    setActiveId(tocItems[0].id)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    )

    headings.forEach((heading) => {
      observerRef.current?.observe(heading)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  if (items.length === 0) return null

  return (
    <nav
      className="hidden xl:block fixed top-24 right-[max(1rem,calc((100vw-48rem)/2-14rem))] w-48 max-h-[calc(100vh-8rem)] overflow-y-auto text-xs toc-scroll"
    >
      <ul className="border-l border-[var(--border)] space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block transition-colors leading-snug pl-3 ${
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
  )
}
