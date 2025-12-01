import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format number as currency
 */
export function formatCurrency(
  amount: number,
  currency: 'USDC' | 'USDT' | 'EUR' | 'USD' | 'SOL' = 'USDC',
  decimals: number = 2
): string {
  if (currency === 'SOL') {
    return formatSOL(amount, decimals);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'USDC' || currency === 'USDT' ? 'USD' : currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format SOL amount
 */
export function formatSOL(amount: number, decimals: number = 4): string {
  return `${amount.toFixed(decimals)} SOL`;
}

/**
 * Format USDC amount
 */
export function formatUSDC(amount: number, decimals: number = 2): string {
  return `${amount.toFixed(decimals)} USDC`;
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(d);
}

/**
 * Truncate wallet address
 */
export function truncateAddress(address: string, start: number = 4, end: number = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Calculate price in SOL from USDC
 */
export function calculatePriceInSOL(priceUSDC: number, solRate: number): number {
  return priceUSDC / solRate;
}

/**
 * Calculate price in USDC from SOL
 */
export function calculatePriceInUSDC(priceSOL: number, solRate: number): number {
  return priceSOL * solRate;
}

/**
 * Calculate total price with setup fee
 */
export function calculateTotalPrice(basePriceSOL: number, setupFeeSOL: number): {
  base: number;
  setupFee: number;
  total: number;
} {
  return {
    base: basePriceSOL,
    setupFee: setupFeeSOL,
    total: basePriceSOL + setupFeeSOL,
  };
}
