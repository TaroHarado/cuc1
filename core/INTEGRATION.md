# Cocoon Integration Guide

## How We Use Cocoon

### 1. Worker Image Deployment

**Source**: [TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon)

We use the official Cocoon worker distribution:

```bash
# Download worker image
wget https://ci.cocoon.org/cocoon-worker-release-latest.tar.xz

# Extract and configure
tar -xf cocoon-worker-release-latest.tar.xz
cd cocoon-worker-release

# Configure with user's TON wallet
./configure --ton-wallet <user-ton-wallet>

# Deploy to H100 instance
./deploy.sh
```

**Key Components Used**:
- TDX guest image (`images/prod/`)
- Cocoon worker binary
- Launch scripts
- Configuration templates

---

### 2. Smart Contract Integration

**Source**: [TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts)

We interact with Cocoon's TON smart contracts:

```typescript
// Payment contract interaction
const paymentContract = new CocoonPaymentContract({
  address: COCOON_PAYMENT_CONTRACT_ADDRESS,
  wallet: tonWallet,
});

// Register worker
await paymentContract.registerWorker({
  nodeId: node.id,
  tonWallet: userTonWallet,
  attestation: tdxAttestation,
});

// Handle payments
await paymentContract.payForWorker({
  nodeId: node.id,
  amount: tonAmount,
  duration: durationInHours,
});
```

**Contracts Used**:
- Payment contract - Handle worker rental payments
- Worker registry - Register and verify workers
- Reward contract - Distribute TON rewards

---

### 3. TDX and Confidential Compute

**Configuration** (from Cocoon docs):

```bash
# Enable TDX
sudo tdx-setup enable

# Configure Confidential Compute
nvidia-smi -i 0 -cc on

# Verify attestation
cocoon-attest verify
```

**Security Features**:
- Intel TDX - Trust Domain Extensions
- NVIDIA Confidential Compute - GPU encryption
- RA-TLS - Remote attestation over TLS
- Image verification - Verified worker images

---

## Solana Layer Implementation

### Where Solana is Added

**1. Payment Processing** (`modules/wallet/useSolanaTransaction.ts`)

```typescript
// Solana-specific code
export function useSolanaTransaction() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  
  const sendPayment = async (amountSOL: number) => {
    // Create Solana transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: RECIPIENT_PUBLIC_KEY,
        lamports: amountSOL * LAMPORTS_PER_SOL,
      })
    );
    
    // Send to Solana network
    const signature = await sendTransaction(transaction, connection);
    return { success: true, signature };
  };
}
```

**2. SOL → TON Bridge** (to be implemented)

```typescript
// Bridge service
export class SolToTonBridge {
  async convert(amountSOL: number): Promise<number> {
    // 1. Get SOL/USDC rate
    const solRate = await getSolUsdcRate();
    const usdcAmount = amountSOL * solRate;
    
    // 2. Get USDC/TON rate
    const tonRate = await getUsdcTonRate();
    const tonAmount = usdcAmount / tonRate;
    
    // 3. Send TON to Cocoon payment contract
    await sendTonToCocoon(tonAmount);
    
    return tonAmount;
  }
}
```

**3. Earnings Display** (`components/dashboard/FarmingProgress.tsx`)

```typescript
// Convert TON earnings to SOL for display
const earningsSOL = convertTonToSol(earningsTON);
// Display in SOL-denominated dashboard
```

---

## File Structure

```
core/
├── README.md              # This file
├── ARCHITECTURE.md        # Architecture details
├── INTEGRATION.md         # Integration guide
│
├── solana/                # Solana layer
│   ├── payment.ts         # Payment processing
│   ├── bridge.ts         # SOL → TON bridge
│   └── wallet.ts         # Wallet management
│
├── cocoon/                # Cocoon integration
│   ├── worker.ts         # Worker deployment
│   ├── contracts.ts     # Smart contract interaction
│   └── attestation.ts   # TDX attestation
│
└── provisioning/         # Node provisioning
    ├── cloud.ts         # Cloud provider API
    ├── orchestrator.ts  # Provisioning orchestration
    └── monitoring.ts   # Status monitoring
```

---

## Dependencies

### Cocoon (External)

- **Worker Image**: Downloaded from Cocoon CI
- **Smart Contracts**: Deployed on TON blockchain
- **Documentation**: [cocoon.org/developers](https://cocoon.org/developers)

### Solana (Our Implementation)

- **Web3.js**: Solana blockchain interaction
- **Wallet Adapter**: Wallet connection
- **Transaction Builder**: Payment creation

---

## Configuration

### Environment Variables

```env
# Solana
SOLANA_NETWORK=devnet
SOLANA_RECIPIENT=FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu

# Cocoon
COCOON_WORKER_IMAGE_URL=https://ci.cocoon.org/cocoon-worker-release-latest.tar.xz
COCOON_PAYMENT_CONTRACT=<TON_CONTRACT_ADDRESS>

# Bridge
SOL_TON_EXCHANGE_API=<EXCHANGE_API_URL>
```

---

## Testing

### Local Development

```bash
# Test Solana payments (devnet)
npm run test:solana

# Test Cocoon integration (mock)
npm run test:cocoon

# Test full flow
npm run test:integration
```

---

## Deployment

### Production Checklist

- [ ] Update Solana network to `mainnet-beta`
- [ ] Verify recipient wallet address
- [ ] Configure Cocoon production contracts
- [ ] Set up SOL → TON bridge service
- [ ] Enable monitoring and alerts
- [ ] Configure rate limits and security

---

## Support

- **Cocoon Docs**: [cocoon.org/developers](https://cocoon.org/developers)
- **Solana Docs**: [docs.solana.com](https://docs.solana.com/)
- **Issues**: [GitHub Issues](#)

