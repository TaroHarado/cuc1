/**
 * Type definitions for thecocoon.fun
 */

export type NodeStatus = 'provisioning' | 'running' | 'expired' | 'stopped';

export type BillingPlan = 'hourly' | 'monthly';

export interface Node {
  id: string;
  name: string;
  provider: string;
  status: NodeStatus;
  plan: BillingPlan;
  gpus: number;
  priceSOL: number;
  priceUSDC: number;
  setupFeeSOL: number;
  createdAt: string;
  expiresAt: string | null;
  credentials?: NodeCredentials;
  cocoonStatus?: CocoonStatus;
  tonWallet?: string;
  solanaWallet?: string;
}

export interface NodeCredentials {
  hostname: string;
  ip: string;
  sshUser: string;
  sshPassword: string;
  sshPort: number;
}

export interface CocoonStatus {
  isRunning: boolean;
  lastHeartbeat: string;
  cpuUsage: number;
  gpuUsage: number;
  tasksProcessed: number;
  earningsTON: number;
  earningsSOL: number; // Converted from TON
  currentTask?: FarmingTask;
}

export interface FarmingTask {
  id: string;
  type: 'inference' | 'training';
  model: string;
  status: 'waiting' | 'processing' | 'completed';
  startedAt: string;
  completedAt?: string;
  rewardTON: number;
}

export interface PricingCalculation {
  gpus: number;
  planType: 'hourly' | 'monthly';
  basePriceSOL: number;
  basePriceUSDC: number;
  setupFeeSOL: number;
  totalPriceSOL: number;
  totalPriceUSDC: number;
}

export interface TransactionStatus {
  status: 'idle' | 'preparing' | 'awaiting_signature' | 'confirmed' | 'error';
  error?: string;
  signature?: string;
}

export interface NodeCreationParams {
  gpus: number;
  plan: BillingPlan;
  tonWallet: string;
  solanaWallet: string;
}
