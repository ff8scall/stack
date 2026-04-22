import { ImageResponse } from 'next/og';
import { deserializeStack } from '@/lib/serialize';
import { bricks } from '@/data/bricks';
import { calculateTotalCost, formatCurrency } from '@/lib/calculator';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const s = searchParams.get('s'); // Direct data if available

    let stackData = s;

    if (slug && !stackData) {
      // Edge 환경에서 Supabase 호출 (주의: 환경변수 설정 필요)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const response = await fetch(`${supabaseUrl}/rest/v1/shared_stacks?slug=eq.${slug}&select=stack_data`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        const result = await response.json();
        if (result && result[0]) {
          stackData = result[0].stack_data;
        }
      }
    }

    if (!stackData) {
      return new Response('Stack not found', { status: 404 });
    }

    const state = deserializeStack(stackData);
    if (!state) return new Response('Invalid data', { status: 400 });

    const selectedBricks = bricks.filter(b => state.i.includes(b.id));
    const totalCost = calculateTotalCost(selectedBricks, { mau: state.m, avgUsagePerUser: state.u });
    const currency = state.c || 'USD';

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
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)',
            padding: '40px',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', position: 'absolute', top: 40, left: 40, fontSize: 24, fontWeight: 900 }}>
            LEGO<span style={{ opacity: 0.4 }}>stack</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 2 }}>
              Estimated Monthly Cost
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div style={{ fontSize: 80, fontWeight: 900 }}>
                {formatCurrency(totalCost, currency)}
              </div>
              <div style={{ fontSize: 30, opacity: 0.5 }}>/mo</div>
            </div>
            
            <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
              <div style={{ padding: '8px 16px', borderRadius: 12, background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', fontSize: 16, fontWeight: 600 }}>
                MAU {state.m.toLocaleString()}
              </div>
              <div style={{ padding: '8px 16px', borderRadius: 12, background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', fontSize: 16, fontWeight: 600 }}>
                Usage {state.u} units
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 40, maxWidth: 800 }}>
            {selectedBricks.slice(0, 8).map(brick => (
              <div key={brick.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: brick.color }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{brick.name}</span>
              </div>
            ))}
            {selectedBricks.length > 8 && <div style={{ fontSize: 14, opacity: 0.4 }}>+ {selectedBricks.length - 8} more</div>}
          </div>

          <div style={{ position: 'absolute', bottom: 40, fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>
            Build your AI Stack at stack.lego-sia.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
