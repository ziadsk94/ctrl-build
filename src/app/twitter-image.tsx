import { ImageResponse } from 'next/og'

// Route segment config
export const dynamic = 'force-static'

// Image metadata
export const alt = 'CTRL+BUILD - Digital Architecture & Design Studio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1E1E1E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F9F9F7',
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1E1E1E',
            marginBottom: 40,
            border: '4px solid #F9F9F7',
            borderRadius: '12px',
            background: '#F9F9F7',
          }}
        >
          CTRL+BUILD
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          CTRL+BUILD
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#3A4B40',
            textAlign: 'center',
          }}
        >
          Digital Architecture & Design Studio
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#A1A1A5',
            marginTop: 20,
            textAlign: 'center',
        }}
        >
          Structure creates freedom
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
