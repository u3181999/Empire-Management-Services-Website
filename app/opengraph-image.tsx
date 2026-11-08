import { ImageResponse } from 'next/og'

export const alt = 'Empire Management Services — Commercial Cleaning Canberra'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#102a43',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 8, color: '#d4a017', fontWeight: 700 }}>
          EMPIRE MANAGEMENT SERVICES
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 28, lineHeight: 1.1 }}>
          Professional Commercial Cleaning
        </div>
        <div style={{ fontSize: 34, marginTop: 32, color: '#d9e2ec' }}>
          Canberra &amp; NSW · 30+ years · 80+ clients
        </div>
      </div>
    ),
    size
  )
}
