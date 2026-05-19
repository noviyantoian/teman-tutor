import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Teman Tutor — Les Privat 1-on-1 ke Rumah';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0A1E3D 0%, #112a55 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: 'rgba(245, 197, 24, 0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: 'rgba(245, 197, 24, 0.08)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#F5C518',
              color: '#0A1E3D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>Teman Tutor</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 960,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <span>Les Privat</span>
            <span style={{ color: '#F5C518' }}>1-on-1</span>
            <span>ke Rumah</span>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: '#CBD5E1', maxWidth: 960 }}>
            Tutor terseleksi · SD, SMP, SMA · Persiapan PTN · Bahasa & Musik
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 24px',
              borderRadius: 9999,
              background: '#F5C518',
              color: '#0A1E3D',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Mulai Rp169.000 / sesi
          </div>
          <div style={{ fontSize: 24, color: '#94A3B8' }}>temantutor.id</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
