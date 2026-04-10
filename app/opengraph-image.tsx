import { createOGImage } from '@/lib/og'

export const dynamic = 'force-static'
export const alt = 'm0lz — Technical Research & Engineering'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return createOGImage({
    title: 'm0lz',
    subtitle: 'Technical Research & Engineering',
  })
}
