# Architecture Overview

## System Components

### 1. Solana Payment Layer

**Purpose**: Handle all Solana blockchain interactions

**Components**:
- `WalletProvider` - Manages wallet connections (Phantom)
- `useSolanaTransaction` - Transaction creation and sending
- `WalletButton` - UI component for wallet connection

**Key Functions**:
```typescript
sendPayment(amountSOL: number) → {
  success: boolean,
  signature?: string,
  error?: string
}
```

**Payment Recipient**: `FwaL3h4imn3zdh5Tty4FcERrurWHaKEh4YfhoCTQhFSu`

---

### 2. SOL → TON Bridge

**Purpose**: Convert Solana payments to TON for Cocoon network

**Implementation** (to be built):
- Exchange service (SOL → TON)
- TON wallet management
- Rate conversion tracking
- Transaction monitoring

**Flow**:
```
SOL Payment (Solana)
  → Bridge Service
  → TON Payment (TON Blockchain)
  → Cocoon Payment Contract
```

---

### 3. Cocoon Integration

**Purpose**: Deploy and manage Cocoon workers

**Uses**:
- [TelegramMessenger/cocoon](https://github.com/TelegramMessenger/cocoon) - Worker implementation
- [TelegramMessenger/cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts) - Smart contracts

**Process**:
1. Download Cocoon worker image
2. Configure TDX environment
3. Enable Confidential Compute
4. Deploy to H100 instance
5. Register with Cocoon network
6. Start farming

---

### 4. Node Provisioning

**Purpose**: Orchestrate cloud infrastructure setup

**Steps**:
1. Allocate H100 instance (Scaleway)
2. Install base OS and drivers
3. Deploy Cocoon worker image
4. Configure TDX and CC mode
5. Generate credentials
6. Verify attestation
7. Start worker service

---

## Data Flow Diagrams

### Payment Flow

```
┌─────────────┐
│   User     │
│ (Phantom)   │
└──────┬──────┘
       │ SOL Payment
       ▼
┌─────────────────┐
│ Solana Network  │
│  Transaction    │
└──────┬──────────┘
       │ Confirmed
       ▼
┌─────────────────┐
│  SOL→TON Bridge │
└──────┬──────────┘
       │ TON Payment
       ▼
┌─────────────────┐
│  TON Blockchain │
│ Payment Contract│
└──────┬──────────┘
       │ Trigger
       ▼
┌─────────────────┐
│   Provisioning  │
│     Service     │
└─────────────────┘
```

### Earnings Flow

```
┌─────────────────┐
│ Cocoon Worker   │
│  (Processing)   │
└──────┬──────────┘
       │ TON Rewards
       ▼
┌─────────────────┐
│  TON Blockchain │
│ Reward Contract │
└──────┬──────────┘
       │ TON → SOL
       ▼
┌─────────────────┐
│  Bridge Service │
│  (Conversion)   │
└──────┬──────────┘
       │ SOL Value
       ▼
┌─────────────────┐
│ User Dashboard  │
│ (SOL Display)   │
└─────────────────┘
```

---

## Integration Points

### Cocoon Worker Deployment

**Source**: [Cocoon Worker Release](https://ci.cocoon.org/cocoon-worker-release-latest.tar.xz)

**Configuration**:
- TON wallet address (for rewards)
- Solana wallet address (for display)
- Node name and metadata
- GPU configuration

### Smart Contract Interaction

**Contracts** (from [cocoon-contracts](https://github.com/TelegramMessenger/cocoon-contracts)):
- Payment contract - Handle TON payments
- Worker registry - Register new workers
- Reward distribution - Distribute TON rewards

### Cloud Infrastructure

**Provider**: Scaleway
- H100 GPU instances
- TDX-enabled hardware
- Confidential Compute support

---

## Security Considerations

1. **Non-custodial**: Users control their wallets
2. **TDX Attestation**: Verified secure execution
3. **Confidential Compute**: Data encrypted at rest and in transit
4. **Smart Contract Audits**: Cocoon contracts audited by Telegram

---

## Future Enhancements

- [ ] Real-time SOL/TON exchange rate API
- [ ] Automated bridge service
- [ ] Multi-wallet support
- [ ] Advanced monitoring and analytics
- [ ] API for third-party integrations

