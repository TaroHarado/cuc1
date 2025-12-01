'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Header } from '@/components/layout/Header';
import { NodeList } from '@/components/dashboard/NodeList';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function DashboardPage() {
  const { publicKey } = useWallet();

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      <main className="container" style={{ padding: '3rem 1rem', maxWidth: '1280px', margin: '0 auto' }}>
        {!publicKey ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '28rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000000' }}>Connect Your Wallet</h2>
            <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
              Please connect your Phantom wallet to view your nodes
            </p>
            <Link href="/" className="btn btn-primary">
              Go to Home
            </Link>
          </div>
        ) : (
          <NodeList />
        )}
      </main>
    </div>
  );
}
