import type { MDXComponents } from 'mdx/types'

import { CodeBlock } from '@/components/code-block'

export const mdxComponents: MDXComponents = {
  pre: (props) => <CodeBlock {...props} />,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--foreground)] transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },
  h1: (props) => (
    <h1
      className="text-2xl font-medium tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-xl font-medium tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-medium tracking-tight mt-6 mb-2"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm px-1.5 py-0.5 rounded-sm bg-[var(--border)]"
      {...props}
    />
  ),
  hr: () => <hr className="border-[var(--border)] border-t-[0.5px] my-8" />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-[var(--border)] pl-4 text-[var(--muted)] my-6"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full text-sm border-collapse"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="text-left font-medium px-3 py-2 border-b border-[var(--border)]"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-3 py-2 border-b border-[var(--border)]"
      {...props}
    />
  ),
}
