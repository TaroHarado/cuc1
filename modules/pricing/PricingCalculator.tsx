'use client';

import { useState, useMemo } from 'react';
import { PRICING_CONFIG } from '@/lib/config';
import { calculatePriceInUSDC, calculateTotalPrice, formatCurrency, formatSOL, formatUSDC } from '@/lib/utils';
import type { PricingCalculation } from '@/lib/types';

interface PricingCalculatorProps {
  onRent?: (calculation: PricingCalculation, tonWallet: string, solanaWallet: string) => void;
  compact?: boolean;
}

export function PricingCalculator({ onRent, compact = false }: PricingCalculatorProps) {
  const [gpus, setGpus] = useState(1);
  const [planType, setPlanType] = useState<'hourly' | 'monthly'>('hourly');
  const [tonWallet, setTonWallet] = useState('');
  const [solanaWallet, setSolanaWallet] = useState('');

  const calculation = useMemo<PricingCalculation>(() => {
    const basePriceSOL = planType === 'hourly' 
      ? PRICING_CONFIG.BASE_PRICE_PER_HOUR_SOL * gpus
      : PRICING_CONFIG.MONTHLY_PRICE_SOL * gpus;

    const basePriceUSDC = planType === 'hourly'
      ? PRICING_CONFIG.BASE_PRICE_PER_HOUR_USDC * gpus
      : PRICING_CONFIG.MONTHLY_PRICE_USDC * gpus;

    const { total: totalPriceSOL } = calculateTotalPrice(
      basePriceSOL,
      PRICING_CONFIG.SETUP_FEE_SOL
    );

    const totalPriceUSDC = basePriceUSDC + (PRICING_CONFIG.SETUP_FEE_SOL * PRICING_CONFIG.SOL_USDC_RATE);

    return {
      gpus,
      planType,
      basePriceSOL,
      basePriceUSDC,
      setupFeeSOL: PRICING_CONFIG.SETUP_FEE_SOL,
      totalPriceSOL,
      totalPriceUSDC,
    };
  }, [gpus, planType]);

  const percentage = ((gpus - 1) / (8 - 1)) * 100;

  const handleRent = () => {
    if (!tonWallet.trim() || !solanaWallet.trim()) {
      alert('Please provide both TON and Solana wallet addresses');
      return;
    }
    if (onRent) {
      onRent(calculation, tonWallet, solanaWallet);
    }
  };

  return (
    <div className="calculator">
      <div className="space-y-6">
        {/* GPUs Slider */}
        <div className="slider-container">
          <div className="slider-label">
            <span>Number of GPUs</span>
            <span>{gpus}</span>
          </div>
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${percentage}%` }}></div>
            <input
              type="range"
              min={1}
              max={8}
              value={gpus}
              step={1}
              onChange={(e) => setGpus(Number(e.target.value))}
              className="slider-input"
            />
          </div>
        </div>

        {/* Plan Type */}
        <div className="toggle">
          <button
            onClick={() => setPlanType('hourly')}
            className={`toggle-button ${planType === 'hourly' ? 'active' : ''}`}
          >
            Pay as you go
          </button>
          <button
            onClick={() => setPlanType('monthly')}
            className={`toggle-button ${planType === 'monthly' ? 'active' : ''}`}
          >
            Monthly Plan
          </button>
        </div>

        {/* Wallet inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#666666', marginBottom: '0.5rem' }}>
              TON Wallet Address (for backup)
            </label>
            <input
              type="text"
              value={tonWallet}
              onChange={(e) => setTonWallet(e.target.value)}
              placeholder="EQD..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                color: '#000000',
                fontSize: '0.875rem',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#666666', marginBottom: '0.5rem' }}>
              Solana Wallet Address (for receiving earnings)
            </label>
            <input
              type="text"
              value={solanaWallet}
              onChange={(e) => setSolanaWallet(e.target.value)}
              placeholder="Your Solana address..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                color: '#000000',
                fontSize: '0.875rem',
              }}
            />
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="price-breakdown">
          <div className="price-row">
            <span className="price-row-label">Base Price:</span>
            <span className="price-row-value">
              {formatSOL(calculation.basePriceSOL)} / {formatUSDC(calculation.basePriceUSDC)}
            </span>
          </div>
          <div className="price-row">
            <span className="price-row-label">Setup Fee:</span>
            <span className="price-row-value">
              {formatSOL(calculation.setupFeeSOL)} / {formatUSDC(calculation.setupFeeSOL * PRICING_CONFIG.SOL_USDC_RATE)}
            </span>
          </div>
          <div className="price-total">
            <span className="price-total-label">Total:</span>
            <div className="price-total-value">
              <div className="price-total-sol">
                {formatSOL(calculation.totalPriceSOL)}
              </div>
              <div className="price-total-eur">
                ≈ {formatUSDC(calculation.totalPriceUSDC)}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {onRent && (
          <button
            onClick={handleRent}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Rent with Phantom
          </button>
        )}
      </div>
    </div>
  );
}
