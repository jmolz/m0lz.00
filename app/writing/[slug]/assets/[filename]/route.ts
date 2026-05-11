import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'
export const dynamicParams = false

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

const CONTENT_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

export function generateStaticParams() {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const assetsDir = path.join(POSTS_DIR, entry.name, 'assets')
      if (!fs.existsSync(assetsDir)) return []

      return fs
        .readdirSync(assetsDir, { withFileTypes: true })
        .filter((asset) => asset.isFile())
        .map((asset) => ({
          slug: entry.name,
          filename: asset.name,
        }))
    })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; filename: string }> },
) {
  const { slug, filename } = await params
  if (
    slug.length === 0 ||
    slug.includes('/') ||
    slug.includes('\\') ||
    slug.includes('..') ||
    filename.length === 0 ||
    filename.includes('/') ||
    filename.includes('\\') ||
    filename.includes('..')
  ) {
    return new Response('Not found', { status: 404 })
  }

  const assetsDir = path.resolve(POSTS_DIR, slug, 'assets')
  const assetPath = path.resolve(assetsDir, filename)
  if (!assetPath.startsWith(`${assetsDir}${path.sep}`)) {
    return new Response('Not found', { status: 404 })
  }

  if (!fs.existsSync(assetPath)) {
    return new Response('Not found', { status: 404 })
  }

  const bytes = fs.readFileSync(assetPath)
  const contentType =
    CONTENT_TYPES[path.extname(filename).toLowerCase()] ??
    'application/octet-stream'

  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
