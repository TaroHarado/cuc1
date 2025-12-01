# thecocoon.fun

<div align="center">

**GPU-as-a-Service for Cocoon farmers. Rent H100 instances, pay in SOL, start farming in minutes.**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Web3.js-purple?style=for-the-badge&logo=solana)](https://solana.com/)
[![Cocoon](https://img.shields.io/badge/Cocoon-TON-orange?style=for-the-badge)](https://cocoon.org/)

[Live Demo](#) • [Documentation](#) • [Report Bug](#)

</div>

---

## 🚀 Overview

**thecocoon.fun** is a Solana-facing layer built on top of [Cocoon](https://cocoon.org/) and [TON Blockchain](https://ton.org/). We bridge the gap between Solana users and Cocoon's confidential compute network, enabling seamless GPU rental for AI inference farming.

### Key Features

- 💰 **Pay in SOL** - Native Solana payments, no KYC required
- ⚡ **Instant Provisioning** - H100 GPU nodes ready in 2-5 minutes
- 🔒 **Confidential Compute** - Intel TDX + NVIDIA Confidential Compute mode
- 📊 **SOL-Denominated Dashboard** - All costs and earnings in SOL
- 🎯 **Zero Infrastructure** - Fully managed nodes, zero maintenance
- 📈 **Transparent Pricing** - Real-time calculator with SOL/USDC rates

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Solana Layer (thecocoon.fun)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │  Phantom     │  │  SOL Payment │      │
│  │   Frontend   │  │  Wallet      │  │  Handler     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SOL → TON Bridge
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cocoon Network (TON)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Cocoon     │  │  TDX Worker  │  │  Smart       │      │
│  │   Contracts  │  │  Image       │  │  Contracts  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ▲                  ▲                  ▲              │
│         └──────────────────┴──────────────────┘            │
│                    (TelegramMessenger/cocoon)                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloud Infrastructure (Scaleway)                 │
│              H100 GPU Instances with TDX Support             │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend & Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **Pure CSS** - Minimalist design system (no Tailwind dependencies)

#### Blockchain Integration
- **[@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)** - Solana blockchain interaction
- **[@solana/wallet-adapter-react](https://github.com/solana-labs/wallet-adapter)** - Wallet connection
- **Phantom Wallet** - Primary wallet support

#### Cocoon Integration
- **[TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon)** - Core Cocoon worker implementation
- **[TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts)** - TON smart contracts
- **Intel TDX** - Trust Domain Extensions for secure execution
- **NVIDIA Confidential Compute** - GPU security mode

#### Infrastructure
- **Scaleway** - H100 GPU cloud provider
- **Docker** - Container orchestration (via Cocoon)
- **TON Blockchain** - Payment and reward distribution

---

## 🔄 How It Works

### 1. **User Flow (Solana Layer)**

1. User connects Phantom wallet
2. Selects GPU plan (hourly/monthly) and provides:
   - TON wallet address (for backup)
   - Solana wallet address (for receiving earnings)
3. Pays in SOL → Transaction sent to `FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu`
4. System bridges SOL → TON automatically
5. Node provisioning begins

### 2. **Provisioning Process (Cocoon Layer)**

1. **Cloud Provision** - H100 instance allocated from Scaleway
2. **Image Deployment** - Cocoon worker TDX image downloaded and configured
3. **TDX Setup** - Intel Trust Domain Extensions enabled
4. **Confidential Compute** - NVIDIA CC mode activated
5. **Network Attestation** - RA-TLS verification
6. **Credentials Generated** - SSH access provided to user

### 3. **Farming (Cocoon Network)**

- Worker receives inference tasks from Cocoon network
- Processes AI models (e.g., Qwen/Qwen3-0.6B) in secure environment
- Rewards paid in TON to the node
- thecocoon.fun converts TON → SOL for user display
- User sees all earnings in SOL-denominated dashboard

---

## 📦 Project Structure

```
conshare/
├── core/                         # Core integration layer
│   ├── README.md                 # Core documentation (Solana + Cocoon)
│   ├── solana/                   # Solana payment & bridge
│   ├── cocoon/                   # Cocoon worker integration
│   └── provisioning/             # Node provisioning orchestrator
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── dashboard/               # User dashboard
│   │   ├── page.tsx             # Node list
│   │   └── nodes/[id]/          # Node details
│   ├── pricing/                 # Pricing calculator
│   ├── provisioning/[nodeId]/   # Provisioning status
│   └── layout.tsx               # Root layout
│
├── components/                   # React components
│   ├── layout/                  # Header, Footer, ArchesBackground
│   ├── dashboard/               # NodeList, FarmingProgress
│   └── ui/                      # Reusable UI components
│
├── modules/                     # Feature modules
│   ├── wallet/                  # Solana wallet integration
│   │   ├── WalletProvider.tsx
│   │   ├── WalletButton.tsx
│   │   └── useSolanaTransaction.ts
│   └── pricing/                 # Pricing calculator
│
├── lib/                         # Utilities & config
│   ├── config.ts                # App configuration
│   ├── types.ts                 # TypeScript types
│   ├── utils.ts                 # Helper functions
│   └── mock-api.ts              # Mock API (MVP)
│
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Phantom Wallet** browser extension
- **Solana Devnet** account (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/thecocoon.fun.git
cd thecocoon.fun

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RECIPIENT_WALLET=FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu
```

---

## 💰 Pricing

### Pay-as-you-go
- **0.04 SOL/hour** (≈ 5.5 USDC)
- **Setup fee: 0.1 SOL**

### Monthly Plan
- **25 SOL/month** (≈ 3,450 USDC)
- **15% discount** vs hourly
- **Setup fee: 0.1 SOL**

All prices include:
- H100 GPU instance rental
- Cocoon worker configuration
- TDX and Confidential Compute setup
- 24/7 monitoring and support

---

## 📚 Documentation

- **[Core Integration Layer](./core/README.md)** - Detailed documentation on Solana + Cocoon integration
- **[Architecture Guide](./core/ARCHITECTURE.md)** - System architecture and data flows
- **[Integration Guide](./core/INTEGRATION.md)** - How we integrate with Cocoon and Solana

---

## 🔗 Dependencies & Credits

### Core Technologies

- **[Cocoon](https://cocoon.org/)** - Confidential Compute Open Network
  - [Source Code](https://github.com/TelegramMessenger/cocoon)
  - [Smart Contracts](https://github.com/TelegramMessenger/cocoon-contracts)
  - [Documentation](https://cocoon.org/developers)

- **[Solana](https://solana.com/)** - High-performance blockchain
  - [Web3.js](https://solana-labs.github.io/solana-web3.js/)
  - [Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

- **[Next.js](https://nextjs.org/)** - React framework

### External Services

- **[Scaleway](https://www.scaleway.com/)** - H100 GPU cloud provider
- **[TON Blockchain](https://ton.org/)** - Payment network for Cocoon

---

## 📊 Network Statistics

- **Total Nodes**: ~100 active nodes
- **Base APY**: ~700% (decreases with network growth)
- **Current APY**: Dynamic based on node count
- **Main Client**: Telegram

*Note: APY calculations are estimates. Actual returns depend on network conditions and node performance.*

---

## 🛠️ Development

### Tech Stack Details

```json
{
  "dependencies": {
    "next": "16.0.6",
    "react": "19.2.0",
    "@solana/web3.js": "^1.98.4",
    "@solana/wallet-adapter-react": "^0.15.39",
    "framer-motion": "^12.23.24",
    "zustand": "^5.0.9"
  }
}
```

### Build

```bash
npm run build
npm start
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Code linting
- **No `any` types** - Full type safety

---

## 🔐 Security

- **Non-custodial** - Users control their wallets
- **TDX Attestation** - Verified secure execution
- **Confidential Compute** - Data encrypted at rest and in transit
- **Smart Contract Audits** - Cocoon contracts audited by Telegram team

---

## 📝 License

This project is licensed under the MIT License.

**Note**: This project uses code and infrastructure from:
- [TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon) - Apache-2.0
- [TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts) - Apache-2.0

---

## ⚠️ Risk Disclaimer

**High Risk Investment**: This service involves cryptocurrency and high-risk investments. Past performance does not guarantee future results. Only invest what you can afford to lose. Please review our Terms of Service and do your own research.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

---

## 📞 Support

- **Documentation**: [cocoon.org/developers](https://cocoon.org/developers)
- **Twitter**: [@thecocoon_fun](https://x.com/thecocoon_fun)
- **GitHub**: [github.com/thecocoonsol/thecocoon-core](https://github.com/thecocoonsol/thecocoon-core)
- **Discord**: [Join our community](#)

---

## 🙏 Acknowledgments

- **[Telegram](https://telegram.org/)** - For building Cocoon
- **[Cocoon Team](https://cocoon.org/)** - For the amazing infrastructure
- **[Solana Labs](https://solana.com/)** - For the blockchain infrastructure

---

<div align="center">

**Built with ❤️ for the Solana and Cocoon communities**

[thecocoon.fun](https://thecocoon.fun) • © 2025

</div>
