# Project Overview

An embeddable **subscription payment widget** for SaaS platforms on Cronos EVM, powered by **x402**. The key differentiator is the widget itself: merchants generate a small **iframe** snippet and ship a production-style checkout experience in minutes—no custom Web3 UI, no wallet edge cases, and no extra frontend plumbing.

Customers complete the entire flow inside the widget: connect MetaMask, confirm the plan, and subscribe. Under the hood, the widget enables **“sign once, pay monthly”** using **EIP-3009**. The customer signs a single authorization, and the backend can reuse it to execute recurring settlements via the **x402 Facilitator** (with gas sponsorship). This delivers a seamless subscription UX without monthly wallet prompts—while staying **non-custodial**, since funds are only debited from the user’s wallet at execution time.

x402 subscription widget for SaaS: sign once, auto-pay monthly.