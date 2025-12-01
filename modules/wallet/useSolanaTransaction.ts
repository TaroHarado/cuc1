'use client';

import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { SOLANA_CONFIG } from '@/lib/config';
import type { TransactionStatus } from '@/lib/types';

export function useSolanaTransaction() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [status, setStatus] = useState<TransactionStatus>({ status: 'idle' });

  const sendPayment = useCallback(
    async (amountSOL: number, recipientAddress?: string) => {
      if (!publicKey || !sendTransaction) {
        setStatus({
          status: 'error',
          error: 'Wallet not connected',
        });
        return;
      }

      try {
        setStatus({ status: 'preparing' });

        const recipientPubkey = recipientAddress || SOLANA_CONFIG.RECIPIENT_PUBLIC_KEY;
        const lamports = amountSOL * LAMPORTS_PER_SOL;
        const recipient = new PublicKey(recipientPubkey);

        // Create transaction
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports,
          })
        );

        // Get recent blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        setStatus({ status: 'awaiting_signature' });

        // Send transaction
        const signature = await sendTransaction(transaction, connection);

        setStatus({ status: 'confirmed', signature });

        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');

        return { success: true, signature };
      } catch (error: any) {
        setStatus({
          status: 'error',
          error: error?.message || 'Transaction failed',
        });
        return { success: false, error: error?.message };
      }
    },
    [publicKey, sendTransaction, connection]
  );

  const resetStatus = useCallback(() => {
    setStatus({ status: 'idle' });
  }, []);

  return {
    sendPayment,
    status,
    resetStatus,
  };
}

