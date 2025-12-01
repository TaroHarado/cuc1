/**
 * Configuration constants for thecocoon.fun
 */

// Pricing configuration (based on Cocoon network)
export const PRICING_CONFIG = {
  // Base price per hour in SOL
  BASE_PRICE_PER_HOUR_SOL: 0.04,
  // Base price per hour in USDC
  BASE_PRICE_PER_HOUR_USDC: 5.5,
  // Monthly price in SOL
  MONTHLY_PRICE_SOL: 25,
  // Monthly price in USDC
  MONTHLY_PRICE_USDC: 3450,
  // Setup/configuration fee in SOL
  SETUP_FEE_SOL: 0.1,
  // thecocoon service fee (percentage markup)
  SERVICE_FEE_PERCENT: 0, // No service fee on base price, setup fee is separate
  // SOL/USDC exchange rate (should be updated from API in production)
  SOL_USDC_RATE: 137.5, // 0.04 SOL = 5.5 USDC, so 1 SOL = 137.5 USDC
} as const;

// Solana network configuration
export const SOLANA_CONFIG = {
  // Use devnet for MVP, change to 'mainnet-beta' for production
  network: 'devnet' as 'devnet' | 'mainnet-beta',
  // Recipient wallet address for payments
  RECIPIENT_PUBLIC_KEY: 'FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu',
} as const;

// Node configuration
export const NODE_CONFIG = {
  MIN_GPUS: 1,
  MAX_GPUS: 8,
  DEFAULT_GPUS: 1,
  PROVIDER_NAME: 'Scaleway',
  GPU_MODEL: 'H100',
} as const;

// Cocoon network configuration
export const COCOON_CONFIG = {
  // Estimated total nodes in network (from documentation)
  ESTIMATED_TOTAL_NODES: 100,
  // Main client (Telegram)
  MAIN_CLIENT: 'Telegram',
  // Base APY multiplier (7x return on investment)
  BASE_RETURN_MULTIPLIER: 7,
  // APY decreases as more nodes join
  APY_DECAY_FACTOR: 0.95, // Each additional node reduces APY by 5%
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 0.3,
  TRANSITION_DURATION: 0.2,
} as const;

/**
 * Calculate dynamic APY based on number of nodes
 * APY decreases as more nodes join the network
 */
export function calculateAPY(nodeCount: number): number {
  const baseAPY = COCOON_CONFIG.BASE_RETURN_MULTIPLIER * 100; // 700% base
  const decay = Math.pow(COCOON_CONFIG.APY_DECAY_FACTOR, nodeCount - 1);
  return baseAPY * decay;
}
