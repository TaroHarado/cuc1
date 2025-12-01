'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { truncateAddress } from '@/lib/utils';

export function WalletButton() {
  const { wallet, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!publicKey) {
    return (
      <button onClick={handleConnect} disabled={connecting} className="btn btn-primary">
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ 
        padding: '0.5rem 1rem', 
        borderRadius: '0.5rem', 
        background: '#f5f5f5',
        border: '1px solid #e5e5e5',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#000000'
      }}>
        {truncateAddress(publicKey.toBase58())}
      </div>
      <button onClick={handleDisconnect} className="btn btn-outline btn-sm">
        Disconnect
      </button>
    </div>
  );
}
