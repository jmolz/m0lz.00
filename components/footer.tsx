export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span>Jacob Molz</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jacobmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/feed.xml"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}
