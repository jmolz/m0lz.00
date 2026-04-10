'use client'

import { useRef, useState } from 'react'

export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      const text = preRef.current?.textContent ?? ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access denied — fail silently
    }
  }

  return (
    <div className="relative group my-6">
      <button
        onClick={copy}
        className="absolute right-3 top-3 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border)] rounded-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}
