import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

const geistRegular = fs.readFileSync(
  path.join(
    process.cwd(),
    'node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf',
  ),
)

const geistMedium = fs.readFileSync(
  path.join(
    process.cwd(),
    'node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf',
  ),
)

const branchMarkSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.78" y="1.78" width="60.44" height="60.44" rx="7.11" fill="#ffffff"/>
  <line x1="24.32" y1="8.89" x2="24.32" y2="55.11" stroke="#000000" stroke-width="3.56" stroke-linecap="round"/>
  <line x1="39.68" y1="8.89" x2="39.68" y2="55.11" stroke="#000000" stroke-width="3.56" stroke-linecap="round"/>
  <line x1="24.32" y1="22.09" x2="10.09" y2="22.09" stroke="#000000" stroke-width="3.56" stroke-linecap="round"/>
  <line x1="39.68" y1="38.31" x2="53.91" y2="38.31" stroke="#000000" stroke-width="3.56" stroke-linecap="round"/>
</svg>`

const branchMarkDataUri = `data:image/svg+xml;base64,${Buffer.from(branchMarkSvg).toString('base64')}`

export async function createOGImage({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000000',
          padding: '60px',
        }}
      >
        <img
          src={branchMarkDataUri}
          width={64}
          height={64}
          style={{ marginBottom: '40px' }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontFamily: 'Geist Medium',
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                fontSize: 20,
                fontFamily: 'Geist Regular',
                color: '#a3a3a3',
                marginTop: '16px',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: 16,
            fontFamily: 'Geist Regular',
            color: '#a3a3a3',
          }}
        >
          m0lz.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist Regular',
          data: geistRegular,
          weight: 400 as const,
        },
        {
          name: 'Geist Medium',
          data: geistMedium,
          weight: 500 as const,
        },
      ],
    },
  )
}
