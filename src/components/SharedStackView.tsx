'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { bricks } from '@/data/bricks';
import { deserializeStack } from '@/lib/serialize';
import { DollarSign, Layers, Users, Zap, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { calculateMonthlyCost } from '@/lib/calculator';

interface Props {
  compressedData: string;
  locale: string;
}

export default function SharedStackView({ compressedData, locale }: Props) {
  const t = useTranslations('Index');
  const tBricks = useTranslations('Bricks');
  const state = deserializeStack(compressedData);
  
  if (!state) return null;

  const selectedBricks = bricks.filter(b => state.i.includes(b.id));
  const totalCost = selectedBricks.reduce((sum, b) => 
    sum + calculateMonthlyCost(b.pricing, { mau: state.m, avgUsagePerUser: state.u }, b.baseUsage), 0
  );

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem 8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '800px', width: '100%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Shared Architecture
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '1rem' }}>
            AI Stack <span style={{ color: 'rgba(255,255,255,0.3)' }}>Blueprint</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
            시뮬레이션된 견적서와 아키텍처를 확인해보세요.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Total Monthly Cost</div>
            <div className="mono" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff' }}>
              ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Simulation MAU</div>
            <div className="mono" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff' }}>
              {state.m.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Bricks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          {selectedBricks.map((brick, idx) => {
            const cost = calculateMonthlyCost(brick.pricing, { mau: state.m, avgUsagePerUser: state.u }, brick.baseUsage);
            return (
              <motion.div 
                key={brick.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{ padding: '1.5rem 2rem', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Layers size={20} color={brick.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>{brick.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{brick.category}</div>
                  </div>
                </div>
                <div className="mono" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>
                  ${cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            href={`/${locale}?s=${compressedData}`}
            style={{ flex: 1, padding: '1.25rem', borderRadius: '16px', background: '#fff', color: '#000', textAlign: 'center', textDecoration: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            이 스택 수정하기 <ArrowRight size={18} />
          </Link>
          <Link 
            href={`/${locale}`}
            style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: '800', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Home size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
