# x402 Payment Widget

Embeddable payment widget for recurring subscriptions using x402 Protocol.

## Features

- 🔐 **One-time signature** - Customer signs once for recurring payments
- ⚡ **Gas-free** - x402 Facilitator pays all gas fees
- 🔄 **Automated** - Monthly payments execute automatically
- 🚀 **Easy integration** - 2 lines of code (iframe)
- 🌐 **Decentralized** - Funds move directly from user's wallet

## Quick Integration

```html
<iframe 
  src="http://localhost:5173/widget?merchantId=YOUR_MERCHANT_ID&amount=1000000&recipient=YOUR_WALLET"
  width="100%"
  height="600"
  frameborder="0"
></iframe>
```

## Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `merchantId` | Yes | Your merchant identifier | `demo-merchant-123` |
| `amount` | Yes | Payment amount in base units | `1000000` (1 USDC) |
| `recipient` | Yes | Wallet address to receive payments | `0x490A...CD33` |
| `token` | No | Token contract address | Default: DevUSDCe |

## Example URLs

**1 USDC monthly:**
```
http://localhost:5173/widget?merchantId=demo-merchant-123&amount=1000000&recipient=0x490A1814Bd4b99Ae4730Bf3acf82Cd7a5257CD33
```

**5 USDC monthly:**
```
http://localhost:5173/widget?merchantId=demo-merchant-123&amount=5000000&recipient=0x490A1814Bd4b99Ae4730Bf3acf82Cd7a5257CD33
```

## Files

- `index.html` - Widget HTML structure
- `widget.ts` - Widget logic (TypeScript)
- `widget.css` - Widget styles

## Development

### Run locally
```bash
cd frontend
yarn dev
```

Widget will be available at: `http://localhost:5173/widget`

### Build
```bash
yarn build
```

## Flow

1. **Initialize** - Widget loads and validates merchant
2. **Connect** - User connects MetaMask
3. **Sign** - User signs EIP-3009 message (valid for 1 year)
4. **Subscribe** - Subscription created in backend
5. **Execute** - Automatic monthly payments via AI scheduler

## Technical Details

### EIP-3009 Signature
The widget generates an EIP-3009 signature that:
- Is valid for 1 year (`validBefore`)
- Allows the backend to execute transfers without further signatures
- Authorizes transfers from the user's wallet

### x402 Integration
Uses `@crypto.com/facilitator-client` to:
- Generate payment headers
- Settle transactions gas-free
- Verify signatures

### Security
- Widget runs in isolated iframe
- No private keys stored
- MetaMask signature required
- Merchant validation on backend

## Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

Requires MetaMask extension.

## More Info

See parent directory:
- `WIDGET_DEMO.md` - Full demo guide
- `WIDGET_MVP_SUMMARY.md` - Implementation summary
- `widget-example.html` - Integration example
