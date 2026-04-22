'use client';

import { useStackStore } from '@/store/useStackStore';
import { bricks } from '@/data/bricks';
import { calculateMonthlyCost, calculateTotalCost, formatCurrency } from '@/lib/calculator';
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Box } from 'lucide-react';

export default function CalculatorBar() {
  const { selectedBrickIds, mau, setMau, avgUsagePerUser, currency, setCurrency } = useStackStore();
  const [total, setTotal] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedBricks = bricks.filter(b => selectedBrickIds.includes(b.id));

  useEffect(() => {
    const cost = calculateTotalCost(selectedBricks, { mau, avgUsagePerUser });
    setTotal(cost);
  }, [selectedBrickIds, mau, avgUsagePerUser]);

  if (selectedBrickIds.length === 0) return null;

  return (
    <div className={`glass ${isExpanded ? 'expanded' : ''}`} style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '1.5rem 2.5rem',
      borderRadius: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      zIndex: 1000,
      width: 'calc(100% - 2rem)',
      maxWidth: '900px',
      animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'max-height, transform'
    }}>
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .glass {
          max-height: 110px;
          overflow: hidden;
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass.expanded {
          max-height: 600px;
        }
        @media (max-width: 768px) {
          .glass {
            padding: 1.25rem 1.5rem !important;
            max-height: 90px;
          }
          .glass.expanded {
            max-height: 80vh;
            overflow-y: auto;
          }
          .top-row {
            flex-direction: column;
            gap: 1rem !important;
          }
          .total-section {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1rem;
            width: 100%;
          }
        }
        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
        }
        .currency-toggle {
          display: flex;
          background: rgba(255,255,255,0.05);
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
        }
        .currency-toggle button {
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .currency-toggle button.active {
          background: #fff;
          color: #000;
        }
        .currency-toggle button:not(.active) {
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
        }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          margin-top: -6px;
          box-shadow: 0 0 10px rgba(255,255,255,0.3);
        }
      `}</style>
      
      {/* Main Content Row */}
      <div className="top-row" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
        {/* MAU Section */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Active Users (MAU)</span>
              <div className="currency-toggle">
                <button className={currency === 'USD' ? 'active' : ''} onClick={() => setCurrency('USD')}>USD</button>
                <button className={currency === 'KRW' ? 'active' : ''} onClick={() => setCurrency('KRW')}>KRW</button>
              </div>
            </div>
            <input 
              type="number"
              value={mau}
              onChange={(e) => setMau(Number(e.target.value))}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '700',
                textAlign: 'right',
                width: '100px',
                outline: 'none'
              }}
            />
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000000" 
            step="1000"
            value={mau}
            onChange={(e) => setMau(Number(e.target.value))}
          />
        </div>
        
        {/* Total Cost Section */}
        <div className="total-section" style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '3rem', textAlign: 'right', position: 'relative' }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.4rem', fontWeight: '600', textTransform: 'uppercase' }}>
            Est. Monthly Total
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.03em', display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '4px' }}>
            {formatCurrency(total, currency)}
            <span style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400' }}>/mo</span>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              position: 'absolute',
              top: '-0.5rem',
              right: '-1.5rem',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer'
            }}
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Breakdown Section */}
      {isExpanded && (
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Box size={16} /> Stack Cost Breakdown
          </h4>
          <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {selectedBricks.map(brick => {
              const brickCost = calculateMonthlyCost(brick.pricing, { mau, avgUsagePerUser }, brick.baseUsage);
              return (
                <div key={brick.id} className="breakdown-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: brick.color }} />
                    <span style={{ fontWeight: '500' }}>{brick.name}</span>
                  </div>
                  <span style={{ fontWeight: '700', color: brickCost > 0 ? '#fff' : 'rgba(255, 255, 255, 0.3)' }}>
                    {formatCurrency(brickCost, currency)}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
            💡 Tip: Prices are estimates based on average usage. Some tools may have additional costs for bandwidth or storage overages.
          </div>
        </div>
      )}
    </div>
  );
}
