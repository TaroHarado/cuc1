/**
 * Solana Payment Handler
 * 
 * Handles all Solana blockchain payment transactions for thecocoon.fun
 * 
 * This module is part of the Solana layer that bridges user payments
 * to the Cocoon network infrastructure.
 */

import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SOLANA_CONFIG } from '../../lib/config';

export interface PaymentResult {
  success: boolean;
  signature?: string;
  error?: string;
}

/**
 * Send SOL payment to thecocoon.fun recipient wallet
 * 
 * @param fromPublicKey - User's Solana wallet public key
 * @param amountSOL - Amount to send in SOL
 * @param connection - Solana connection instance
 * @param sendTransaction - Function to send transaction (from wallet adapter)
 * 
 * @returns Payment result with signature or error
 */
export async function sendSolPayment(
  fromPublicKey: PublicKey,
  amountSOL: number,
  connection: Connection,
  sendTransaction: (tx: Transaction, connection: Connection) => Promise<string>
): Promise<PaymentResult> {
  try {
    // Recipient wallet: FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu
    const recipientPublicKey = new PublicKey(SOLANA_CONFIG.RECIPIENT_PUBLIC_KEY);
    const lamports = amountSOL * LAMPORTS_PER_SOL;

    // Create transfer transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPublicKey,
        toPubkey: recipientPublicKey,
        lamports,
      })
    );

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPublicKey;

    // Send transaction
    const signature = await sendTransaction(transaction, connection);

    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');

    return {
      success: true,
      signature,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Transaction failed',
    };
  }
}

/**
 * Verify transaction status
 */
export async function verifyTransaction(
  signature: string,
  connection: Connection
): Promise<boolean> {
  try {
    const status = await connection.getSignatureStatus(signature);
    return status.value?.confirmationStatus === 'confirmed';
  } catch {
    return false;
  }
}

