'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Header } from '@/components/layout/Header';
import { PricingCalculator } from '@/modules/pricing/PricingCalculator';
import { useSolanaTransaction } from '@/modules/wallet/useSolanaTransaction';
import { Card } from '@/components/ui/Card';
import { createNode } from '@/lib/mock-api';
import type { PricingCalculation } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const { publicKey } = useWallet();
  const { sendPayment, status, resetStatus } = useSolanaTransaction();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRent = async (calculation: PricingCalculation, tonWallet: string, solanaWallet: string) => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!tonWallet.trim() || !solanaWallet.trim()) {
      alert('Please provide both TON and Solana wallet addresses');
      return;
    }

    setIsProcessing(true);
    resetStatus();

    try {
      // Send SOL payment
      const result = await sendPayment(calculation.totalPriceSOL);

      if (result?.success) {
        // Create node (mock - in production this would be done on backend)
        const node = await createNode({
          gpus: calculation.gpus,
          plan: calculation.planType,
          tonWallet: tonWallet.trim(),
          solanaWallet: solanaWallet.trim(),
        });

        // Redirect to provisioning page
        router.push(`/provisioning/${node.id}`);
      } else {
        alert('Transaction failed: ' + (result?.error || 'Unknown error'));
        setIsProcessing(false);
      }
    } catch (error: any) {
      alert('Error: ' + (error.message || 'Unknown error'));
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      <main className="container" style={{ padding: '3rem 1rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#000000' }}>
            Pricing & Calculator
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#666666' }}>
            Calculate your costs and rent H100 GPUs in minutes
          </p>
        </div>

        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          <PricingCalculator onRent={handleRent} />

          {/* Transaction Status */}
          {status.status !== 'idle' && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#000000' }}>Transaction Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: status.status === 'confirmed'
                        ? '#22c55e'
                        : status.status === 'error'
                        ? '#ef4444'
                        : '#f59e0b',
                      animation: status.status !== 'confirmed' && status.status !== 'error' ? 'pulse 2s infinite' : 'none',
                    }}
                  />
                  <span style={{ color: '#000000', textTransform: 'capitalize' }}>{status.status.replace('_', ' ')}</span>
                </div>
                {status.error && (
                  <p style={{ fontSize: '0.875rem', color: '#ef4444' }}>{status.error}</p>
                )}
                {status.signature && (
                  <p style={{ fontSize: '0.875rem', color: '#666666', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    Signature: {status.signature}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#000000' }}>Transparent Pricing</h3>
              <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                All prices are calculated in real-time. Pay as you go: 0.04 SOL/hour (5.5 USDC) or Monthly: 25 SOL (3,450 USDC). Setup fee: 0.1 SOL.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#000000' }}>Instant Provisioning</h3>
              <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                Your node is provisioned and configured automatically. Start farming within minutes of payment confirmation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
