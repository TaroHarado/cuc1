# thecocoon.fun Core

<div align="center">

**Solana Layer for Cocoon Network - Bridging SOL payments to TON-based confidential compute**

[![Solana](https://img.shields.io/badge/Solana-Web3.js-purple?style=for-the-badge&logo=solana)](https://solana.com/)
[![Cocoon](https://img.shields.io/badge/Cocoon-TON-orange?style=for-the-badge)](https://cocoon.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Documentation](#) • [Report Issue](#) • [Contribute](#)

</div>

---

## 📋 Overview

**thecocoon.fun Core** is the integration layer that bridges Solana payments with the [Cocoon Network](https://cocoon.org/) infrastructure. This module handles:

- **SOL → TON Bridge** - Converting Solana payments to TON for Cocoon worker rentals
- **Payment Processing** - Solana transaction handling and verification
- **Node Provisioning** - Orchestrating H100 GPU instance setup with Cocoon workers
- **Earnings Conversion** - Converting TON rewards back to SOL for user display

### Built On

- **[TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon)** - Core Cocoon worker implementation
- **[TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts)** - TON smart contracts
- **[Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)** - Solana blockchain interaction

---

## 🏗️ Architecture

### Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    thecocoon.fun Core                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Solana Payment Layer                       │     │
│  │  • Wallet connection (Phantom)                     │     │
│  │  • SOL transaction creation                        │     │
│  │  • Payment verification                            │     │
│  │  • Recipient: FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4Yf │     │
│  └────────────────────────────────────────────────────┘     │
│                            │                                 │
│                            │ SOL Payment                     │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │         SOL → TON Bridge Service                    │     │
│  │  • Exchange SOL for TON                             │     │
│  │  • TON wallet management                            │     │
│  │  • Rate conversion (SOL/USDC → TON)                 │     │
│  └────────────────────────────────────────────────────┘     │
│                            │                                 │
│                            │ TON Payment                     │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Cocoon Integration Layer                    │     │
│  │  • Worker image deployment                         │     │
│  │  • TDX configuration                               │     │
│  │  • Confidential Compute setup                     │     │
│  │  • Smart contract interaction                      │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Uses
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Cocoon Network (External)                       │
│                                                              │
│  📦 TelegramMessenger/cocoon                                │
│     • Worker implementation                                 │
│     • TDX image generation                                  │
│     • RA-TLS attestation                                     │
│                                                              │
│  📦 TelegramMessenger/cocoon-contracts                       │
│     • TON smart contracts                                    │
│     • Payment system                                         │
│     • Reward distribution                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Core Components

### 1. Solana Payment Handler

**Location**: `modules/wallet/useSolanaTransaction.ts`

Handles all Solana blockchain interactions:

```typescript
// Key features:
- sendPayment(amountSOL: number) → Transaction
- Status tracking (idle → preparing → awaiting_signature → confirmed)
- Error handling and retry logic
- Transaction signature verification
```

**Recipient Wallet**: `FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu`

### 2. SOL → TON Bridge

**Location**: `lib/bridge/` (to be implemented)

Converts Solana payments to TON for Cocoon network:

- **Exchange Rate**: Dynamic SOL/USDC → TON conversion
- **Wallet Management**: TON wallet creation/management
- **Transaction Monitoring**: TON transaction status tracking

### 3. Cocoon Worker Orchestrator

**Location**: `lib/cocoon/orchestrator.ts` (to be implemented)

Manages Cocoon worker lifecycle:

- **Image Deployment**: Downloads and configures Cocoon worker TDX image
- **TDX Setup**: Configures Intel Trust Domain Extensions
- **CC Mode**: Enables NVIDIA Confidential Compute
- **Attestation**: Verifies RA-TLS certificates
- **Smart Contract**: Interacts with Cocoon TON contracts

### 4. Node Provisioning Service

**Location**: `lib/provisioning/` (to be implemented)

Orchestrates cloud infrastructure:

- **Cloud Provider API**: Scaleway H100 instance allocation
- **Worker Configuration**: Cocoon worker setup
- **Credential Generation**: SSH keys and access tokens
- **Status Monitoring**: Real-time provisioning status

---

## 🔗 Dependencies

### Cocoon Network

| Component | Repository | License | Usage |
|-----------|-----------|---------|-------|
| **Cocoon Core** | [TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon) | Apache-2.0 | Worker implementation, TDX images |
| **Smart Contracts** | [TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts) | Apache-2.0 | TON payment and reward contracts |

### Solana

| Package | Version | Usage |
|---------|---------|-------|
| `@solana/web3.js` | ^1.98.4 | Blockchain interaction |
| `@solana/wallet-adapter-react` | ^0.15.39 | Wallet connection |
| `@solana/wallet-adapter-wallets` | ^0.19.37 | Wallet providers |

---

## 🚀 Integration Points

### 1. Cocoon Worker Image

**Source**: [cocoon-worker-release-latest.tar.xz](https://ci.cocoon.org/cocoon-worker-release-latest.tar.xz)

```typescript
// Deployment flow:
1. Download worker distribution
2. Extract TDX image (prod)
3. Configure with user's TON wallet
4. Deploy to H100 instance
5. Enable TDX and Confidential Compute
6. Verify attestation
```

### 2. Cocoon Smart Contracts

**Source**: [TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts)

```typescript
// Contract interaction:
- Payment contract: Handle TON payments for worker rental
- Reward contract: Distribute TON rewards to workers
- Registry contract: Worker registration and verification
```

### 3. Solana Payment Flow

```typescript
// Payment process:
1. User initiates payment in SOL
2. Transaction sent to Solana network
3. Payment confirmed on Solana
4. SOL → TON bridge activated
5. TON sent to Cocoon payment contract
6. Worker provisioning begins
```

---

## 📊 Data Flow

### Payment Flow

```
User (Phantom) 
  → SOL Payment (Solana)
  → Bridge Service
  → TON Payment (TON Blockchain)
  → Cocoon Payment Contract
  → Worker Provisioning
```

### Earnings Flow

```
Cocoon Worker
  → TON Rewards (TON Blockchain)
  → Bridge Service
  → SOL Conversion (for display)
  → User Dashboard (SOL-denominated)
```

---

## 🔧 Configuration

### Solana Network

```typescript
// lib/config.ts
export const SOLANA_CONFIG = {
  network: 'devnet' | 'mainnet-beta',
  RECIPIENT_PUBLIC_KEY: 'FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu',
}
```

### Cocoon Integration

```typescript
// lib/config.ts
export const COCOON_CONFIG = {
  ESTIMATED_TOTAL_NODES: 100,
  MAIN_CLIENT: 'Telegram',
  BASE_RETURN_MULTIPLIER: 7,
  APY_DECAY_FACTOR: 0.95,
}
```

### Pricing

```typescript
// lib/config.ts
export const PRICING_CONFIG = {
  BASE_PRICE_PER_HOUR_SOL: 0.04,
  BASE_PRICE_PER_HOUR_USDC: 5.5,
  MONTHLY_PRICE_SOL: 25,
  MONTHLY_PRICE_USDC: 3450,
  SETUP_FEE_SOL: 0.1,
  SOL_USDC_RATE: 137.5,
}
```

---

## 📚 Documentation Links

### Cocoon

- **Main Site**: [cocoon.org](https://cocoon.org/)
- **Developer Docs**: [cocoon.org/developers](https://cocoon.org/developers)
- **Architecture**: [cocoon.org/developers#architecture](https://cocoon.org/developers#architecture)
- **Downloads**: [cocoon.org/downloads](https://cocoon.org/downloads)

### Repositories

- **Core**: [github.com/TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon)
- **Contracts**: [github.com/TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts)

### Solana

- **Web3.js Docs**: [solana-labs.github.io/solana-web3.js](https://solana-labs.github.io/solana-web3.js/)
- **Wallet Adapter**: [github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)

---

## 🛠️ Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Testing

```bash
# Run tests
npm test

# Type checking
npx tsc --noEmit
```

---

## 📝 License

This project is licensed under the **MIT License**.

### Third-Party Licenses

- **Cocoon Core**: [Apache-2.0](https://github.com/TelegramMessenger/cocoon/blob/main/LICENSE)
- **Cocoon Contracts**: [Apache-2.0](https://github.com/TelegramMessenger/cocoon-contracts/blob/main/LICENSE)

---

## ⚠️ Disclaimer

**High Risk**: This software involves cryptocurrency transactions and high-risk investments. Use at your own risk. Past performance does not guarantee future results.

---

## 🙏 Acknowledgments

- **[Telegram](https://telegram.org/)** - For building Cocoon
- **[Cocoon Team](https://cocoon.org/)** - For the amazing infrastructure
- **[Solana Labs](https://solana.com/)** - For the blockchain infrastructure

---

<div align="center">

**Part of [thecocoon.fun](https://thecocoon.fun)**

[Website](#) • [Twitter](https://x.com/thecocoon_fun) • [GitHub](https://github.com/thecocoonsol/thecocoon-core)

</div>

