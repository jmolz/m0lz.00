'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinksProps {
  links: { href: string; label: string }[]
}

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <>
      <div className="hidden sm:flex items-center gap-6">
        {links.map(({ href, label }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                isActive
                  ? 'text-[var(--foreground)]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>

      <MobileMenu links={links} pathname={pathname} />
    </>
  )
}

function MobileMenu({
  links,
  pathname,
}: {
  links: { href: string; label: string }[]
  pathname: string
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }

  return (
    <div className="sm:hidden">
      <details ref={detailsRef} className="group relative">
        <summary className="list-none cursor-pointer text-[var(--muted)] hover:text-[var(--foreground)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="group-open:hidden"
          >
            <line x1="2" y1="4" x2="14" y2="4" />
            <line x1="2" y1="8" x2="14" y2="8" />
            <line x1="2" y1="12" x2="14" y2="12" />
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="hidden group-open:block"
          >
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </summary>
        <div className="absolute right-0 top-8 bg-[var(--background)] border border-[var(--border)] rounded-sm py-2 min-w-[140px] z-50">
          {links.map(({ href, label }) => {
            const isActive =
              pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </details>
    </div>
  )
}
