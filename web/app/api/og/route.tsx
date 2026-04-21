import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              background: '#7c3aed',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            B
          </div>
          <span style={{ color: '#737373', fontSize: '32px' }}>Blair — AI CMO</span>
        </div>
        <div
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#f5f5f5',
            textAlign: 'center',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}
        >
          Brief once.
          <br />
          Use forever.
        </div>
        <div style={{ fontSize: '28px', color: '#525252', textAlign: 'center' }}>
          Your AI Chief Marketing Officer
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
