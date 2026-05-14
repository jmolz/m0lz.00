export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span>Jacob Molz</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-end">
          <a
            href="https://github.com/jmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/~jacobmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            NPM
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
            href="https://news.ycombinator.com/user?id=jmolz12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Hacker News
          </a>
          <a
            href="https://medium.com/@jacobmolz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Medium
          </a>
          <a
            href="https://dev.to/m0lz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Dev.to
          </a>
          <a
            href="https://m0lz.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Substack
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
