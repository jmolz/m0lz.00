import Link from 'next/link'

import { BranchMark } from '@/components/branch-mark'
import { NavLinks } from '@/components/nav-links'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto w-full">
      <Link href="/" className="flex items-center gap-2">
        <BranchMark variant="personal" size={28} />
        <span className="text-sm font-medium text-[var(--foreground)]">
          m0lz
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <NavLinks links={links} />
        <ThemeToggle />
      </div>
    </nav>
  )
}
