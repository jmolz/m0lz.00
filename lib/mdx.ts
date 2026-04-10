import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import type { MDXContent } from 'mdx/types'

export async function compileMDX(source: string): Promise<MDXContent> {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: 'min-dark', light: 'min-light' },
          keepBackground: false,
        },
      ],
    ],
  })
  return Content
}
