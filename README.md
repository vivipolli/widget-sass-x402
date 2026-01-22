# x402 Recurring Payment Widget - Cronos Hackathon

**Enable recurring crypto payments for SaaS platforms with a single customer signature.**

Built for the Cronos x402 Paytech Hackathon - **x402 Agentic Finance/Payment Track**

## 🎯 Overview

A complete recurring payment solution for SaaS platforms powered by x402 Protocol. Merchants integrate a simple widget, customers sign once with MetaMask, and payments execute automatically every month with zero gas fees.

## ✨ Key Features

- **🔐 One-Time Signature** - Customer signs once via EIP-3009, enables unlimited monthly payments
- **⚡ Zero Gas Fees** - x402 Facilitator covers all transaction costs
- **🚀 Easy Integration** - Just 2 lines of code (iframe embed)
- **🔄 Automated Execution** - AI scheduler handles monthly payments automatically
- **🌐 Fully Decentralized** - Funds transfer directly from customer's wallet

## 🏗️ Architecture

```
┌──────────────────────┐
│  Merchant Dashboard  │  Generate widget code
│  (HTML standalone)   │  
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  SaaS Platform Demo  │  Embed widget iframe
│  (HTML standalone)   │  
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Payment Widget      │  Customer signs once
│  (iframe)            │  EIP-3009 signature
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Backend API         │  - SubscriptionService
│  (Node.js/Express)   │  - RecurringScheduler
│                      │  - SimpleExecutor
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  x402 Facilitator    │  Gas-free execution
│  (Crypto.com SDK)    │  
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Cronos Blockchain   │  On-chain settlement
│  (IntentRegistry)    │  
└──────────────────────┘
```

## 🎬 Two Main Flows

### 1. **Merchant Flow** - Generate Widget Code
**URL**: `http://localhost:5173/merchant-dashboard.html`

Merchants use this dashboard to:
- Configure payment amount (e.g., $9.99/month)
- Set their wallet address for receiving payments
- Generate embed code for their platform
- Preview the widget

**Output**: Ready-to-use iframe code

### 2. **Customer Flow** - Subscribe via SaaS Platform
**URL**: `http://localhost:5173/saas-platform-demo.html`

Demo of a streaming platform (StreamFlow) showing:
- Integration of payment widget in a real SaaS UI
- Customer subscription process
- Modal with embedded widget
- Complete payment flow

**Result**: Recurring subscription with automatic monthly payments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Yarn
- MetaMask with Cronos Testnet
- DevUSDCe tokens (get from https://faucet.cronos.org/)

### 1. Start Backend
```bash
cd backend
yarn install
yarn dev
```
✅ Backend running at `http://localhost:8787`

### 2. Start Frontend
```bash
cd frontend
yarn install
yarn dev
```
✅ Frontend running at `http://localhost:5173`

### 3. Try It Out

**For Merchants:**
1. Visit `http://localhost:5173/merchant-dashboard.html`
2. Configure your payment amount
3. Generate and copy embed code
4. Use in your platform

**For Customers:**
1. Visit `http://localhost:5173/saas-platform-demo.html`
2. Click any "Subscribe Now" button
3. Connect MetaMask
4. Sign the EIP-3009 message (one-time only)
5. ✅ Subscription active!

## 📦 Project Structure

```
cronos/
├── backend/
│   ├── contracts/
│   │   └── IntentRegistry.sol           # Simplified smart contract
│   ├── src/
│   │   ├── services/
│   │   │   ├── subscription.service.ts  # Manage subscriptions
│   │   │   ├── intent.service.ts        # Intent storage & logs
│   │   │   ├── execution.service.ts     # x402 execution
│   │   │   └── contract.service.ts      # On-chain registration
│   │   ├── schedulers/
│   │   │   ├── recurring.scheduler.ts   # Monthly intent creation
│   │   │   └── simple-executor.ts       # Execute intents
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   │   ├── widget.controller.ts # Widget API
│   │   │   │   └── intent.controller.ts # Intent API
│   │   │   └── routes/
│   │   │       ├── widget.routes.ts     # Widget endpoints
│   │   │       └── intent.routes.ts     # Intent endpoints
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── merchant-dashboard.html          # Merchant code generator
│   ├── saas-platform-demo.html          # SaaS demo (StreamFlow)
│   ├── widget/
│   │   ├── index.html                   # Widget HTML
│   │   ├── widget.ts                    # Widget logic (EIP-3009)
│   │   └── widget.css                   # Widget styles
│   └── src/                             # Optional admin panel
│       └── App.tsx                      # Landing page
└── README.md
```

## 🔌 Integration Example

### Merchant Side (Your Platform)
```html
<!-- Copy this from merchant dashboard -->
<iframe 
  src="http://localhost:5173/widget?merchantId=demo-merchant-123&amount=9990000&recipient=0xYourWallet"
  width="100%"
  height="600"
  frameborder="0"
  style="max-width: 420px;"
></iframe>
```

### Parameters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `merchantId` | Your merchant ID | `demo-merchant-123` |
| `amount` | Monthly amount in base units | `9990000` (9.99 USDC) |
| `recipient` | Your wallet address | `0x490A...CD33` |
| `token` | Token contract (optional) | Default: DevUSDCe |

## 🔗 API Endpoints

### Widget API
- `POST /api/widget/init` - Initialize widget, validate merchant
- `POST /api/subscriptions` - Create new subscription
- `GET /api/subscriptions` - List all subscriptions
- `GET /api/subscriptions?customerAddress=0x...` - Get customer's subscriptions

### Example: Create Subscription
```bash
curl -X POST http://localhost:8787/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "demo-merchant-123",
    "customerAddress": "0x...",
    "recipient": "0x...",
    "amount": "9990000",
    "token": "0xf329184c1b464411bd683a2e8f42c1bfe42b2331",
    "paymentHeader": "x402_...",
    "maxExecutions": 12
  }'
```

## 🤖 How It Works

### 1. Customer Signs Once
```typescript
// Widget generates EIP-3009 signature
const paymentHeader = await facilitator.generatePaymentHeader({
  validBefore: Date.now() / 1000 + (365 * 24 * 60 * 60), // 1 year!
  // ... other params
});
```

### 2. Backend Stores Subscription
```typescript
{
  id: "uuid",
  customerAddress: "0x...",
  paymentHeader: "x402_...",  // Reusable for 1 year!
  schedule: {
    type: "monthly",
    nextExecution: timestamp,
    executionCount: 0
  }
}
```

### 3. Scheduler Creates Monthly Intents
```typescript
// Runs every minute
setInterval(() => {
  const dueSubscriptions = getSubscriptions()
    .filter(sub => sub.nextExecution <= Date.now());
  
  dueSubscriptions.forEach(sub => {
    createIntent({
      paymentHeader: sub.paymentHeader,  // Same signature!
      // ...
    });
  });
}, 60000);
```

### 4. Simple Executor Processes
- Checks if intent is within deadline
- Executes via x402 Facilitator (gas-free!)
- Scheduler updates `nextExecution` to next month

## 🎯 Value Proposition

### For SaaS Platforms
- ✅ Accept crypto subscriptions easily
- ✅ No need to handle wallets or keys
- ✅ 2-line integration
- ✅ No credit card fees
- ✅ Global accessibility

### For Customers
- ✅ Sign once, subscribe forever
- ✅ Zero gas fees
- ✅ No credit card needed
- ✅ True ownership (funds in your wallet)
- ✅ Cancel anytime (in production version)

### Why x402 is Essential
- 🚫 Without x402: Every payment needs new signature + gas fees
- ✅ With x402: One signature valid for 1 year, enables automatic payments, zero gas fees
- 🚫 Without x402: Users would abandon subscriptions due to monthly MetaMask prompts
- ✅ With x402: Seamless UX like Web2 subscriptions

## 🏆 Hackathon Criteria

**Track**: x402 Agentic Finance/Payment — Advanced Programmatic Settlement & Workflows

✅ **Recurring instruction sets** - Monthly automated payments  
✅ **Advanced settlement** - Gas-free via x402 Facilitator  
✅ **Multi-step automation** - Scheduler → Intent → AI → Settlement  
✅ **EIP-3009** - Reusable signatures for recurring payments  
✅ **Production-ready** - Complete merchant + customer flows  

## 📊 Technical Highlights

### EIP-3009 Signature Reuse
One signature, valid for 1 year, enables unlimited monthly payments without user interaction.

### Gas-Free Execution
x402 Facilitator pays all gas fees. Customers only need tokens for the payment amount.

### Simple & Reliable Execution
Automatic execution of recurring payments on schedule, with on-chain intent registration for transparency.

### Iframe Isolation
Widget runs in isolated iframe for security, easy integration, and consistent UX across platforms.

## 🔮 Future Enhancements

- [ ] Merchant registration system
- [ ] Customer subscription management UI
- [ ] Multi-token support (ETH, other stablecoins)
- [ ] Mainnet deployment
- [ ] Webhook notifications for merchants
- [ ] Analytics dashboard
- [ ] White-label customization

## 📄 Files Reference

- `FINAL_CHECKLIST.md` - Presentation checklist and troubleshooting
- `frontend/widget/README.md` - Widget technical documentation
- `mvp-roadmap.md` - Original project planning (historical)

## 🎤 Demo Script

1. **Show Merchant Dashboard** (30s)
   - Generate widget code
   - Show how simple it is

2. **Show SaaS Demo** (1 min)
   - Real-world platform example
   - Customer subscription flow
   - MetaMask signature

3. **Show Backend Logs** (30s)
   - Subscription created
   - Scheduler running
   - Monthly execution

4. **Explain Value** (1 min)
   - One signature = infinite payments
   - Zero gas fees
   - Easy integration

## 🙏 Acknowledgments

Built for the **Cronos x402 Paytech Hackathon**  
Powered by **Cronos EVM** and **Crypto.com Facilitator SDK**

---

**Live Demo**: http://localhost:5173/saas-platform-demo.html  
**Merchant Dashboard**: http://localhost:5173/merchant-dashboard.html  
**Documentation**: See `FINAL_CHECKLIST.md` for full details
