import { ImageResponse } from 'next/og';
import { bricks } from '@/data/bricks';
import { calculateEfficiencyScore } from '@/lib/calculator';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brickId = searchParams.get('brick');
    const compare = searchParams.get('compare'); // vs 조합용

    if (brickId) {
      const brick = bricks.find((b) => b.id === brickId);
      if (!brick) return new Response('Not Found', { status: 404 });

      const efficiency = calculateEfficiencyScore(brick.performance, brick.pricing);

      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#050505',
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 2%, transparent 0%)',
              backgroundSize: '50px 50px',
              color: '#fff',
              fontFamily: 'sans-serif',
              padding: '40px',
            }}
          >
            {/* Logo */}
            <div style={{ position: 'absolute', top: 40, left: 40, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 24, height: 24, backgroundColor: '#fff', borderRadius: 4 }} />
              <span style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: '-0.05em' }}>LegoStack</span>
            </div>

            {/* Main Card */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '40px',
                padding: '60px',
                width: '90%',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 24,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${brick.color}`,
                  }}
                >
                  <div style={{ width: 50, height: 50, backgroundColor: brick.color, borderRadius: 10 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h1 style={{ fontSize: 64, fontWeight: 'bold', margin: 0, letterSpacing: '-0.05em' }}>{brick.name}</h1>
                  <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{brick.category} Infrastructure</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>COST PERFORMANCE</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: 80, fontWeight: '900', color: '#10b981' }}>{efficiency}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 24, color: '#10b981', fontWeight: 'bold' }}>Excellent</span>
                      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)' }}>Value Score</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={{ padding: '8px 20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', fontSize: 24, fontWeight: 'bold' }}>
                    DX: {brick.dxScore}
                  </div>
                  <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>Real-time Analysis by LegoStack</div>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Default Fallback (LegoStack General)
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            color: '#fff',
          }}
        >
          <h1 style={{ fontSize: 100 }}>LegoStack</h1>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
