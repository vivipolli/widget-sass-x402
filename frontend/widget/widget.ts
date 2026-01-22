import { ethers } from 'ethers';
import { Facilitator, CronosNetwork, Contract } from '@crypto.com/facilitator-client';

interface WidgetConfig {
  merchantId: string;
  amount: string;
  recipient: string;
  token?: string;
  apiBase?: string;
}

class PaymentWidget {
  private config: WidgetConfig;
  private provider?: ethers.BrowserProvider;
  private signer?: ethers.Signer;
  private customerAddress?: string;
  private apiBase: string;

  constructor() {
    this.config = this.parseURLParams();
    this.apiBase = this.config.apiBase || 'http://localhost:8787';
    this.init();
  }

  private parseURLParams(): WidgetConfig {
    const params = new URLSearchParams(window.location.search);
    return {
      merchantId: params.get('merchantId') || '',
      amount: params.get('amount') || '',
      recipient: params.get('recipient') || '',
      token: params.get('token') || '0xf329184c1b464411bd683a2e8f42c1bfe42b2331',
    };
  }

  private async init() {
    try {
      this.showStatus('Initializing widget...');

      if (!this.config.merchantId || !this.config.amount || !this.config.recipient) {
        throw new Error('Missing required parameters: merchantId, amount, recipient');
      }

      const response = await fetch(`${this.apiBase}/api/widget/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId: this.config.merchantId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to initialize widget');
      }

      const amountInUSDC = (parseInt(this.config.amount) / 1000000).toFixed(2);
      document.getElementById('payment-amount')!.textContent = `${amountInUSDC} USDC`;
      document.getElementById('merchant-id')!.textContent = this.config.merchantId;

      document.getElementById('payment-info')!.style.display = 'block';
      document.getElementById('wallet-section')!.style.display = 'block';
      this.showStatus('Ready to connect');

      this.setupEventListeners();
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  private setupEventListeners() {
    document.getElementById('connect-wallet-btn')!.addEventListener('click', () => this.connectWallet());
    document.getElementById('sign-btn')!.addEventListener('click', () => this.signAndSubscribe());
    document.getElementById('retry-btn')!.addEventListener('click', () => window.location.reload());
  }

  private async connectWallet() {
    try {
      this.showStatus('Connecting to MetaMask...');

      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      this.signer = await this.provider.getSigner();
      this.customerAddress = await this.signer.getAddress();

      const network = await this.provider.getNetwork();
      if (network.chainId !== 338n) {
        this.showStatus('Switching to Cronos Testnet...');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x152' }],
        });
      }

      document.getElementById('connected-address')!.textContent = 
        `${this.customerAddress.slice(0, 6)}...${this.customerAddress.slice(-4)}`;
      document.getElementById('wallet-section')!.style.display = 'none';
      document.getElementById('sign-section')!.style.display = 'block';
      this.showStatus('Wallet connected');
    } catch (error: any) {
      this.showError(error.message || 'Failed to connect wallet');
    }
  }

  private async signAndSubscribe() {
    try {
      if (!this.signer || !this.customerAddress) {
        throw new Error('Wallet not connected');
      }

      this.showStatus('Requesting signature (this allows recurring payments)...');

      const facilitator = new Facilitator({ network: CronosNetwork.CronosTestnet });

      const oneYearInSeconds = 365 * 24 * 60 * 60;
      const paymentHeader = await facilitator.generatePaymentHeader({
        to: this.config.recipient,
        value: this.config.amount,
        asset: Contract.DevUSDCe,
        signer: this.signer,
        validBefore: Math.floor(Date.now() / 1000) + oneYearInSeconds,
        validAfter: 0,
      });

      this.showStatus('Creating subscription...');

      const response = await fetch(`${this.apiBase}/api/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: this.config.merchantId,
          customerAddress: this.customerAddress,
          recipient: this.config.recipient,
          amount: this.config.amount,
          token: this.config.token,
          paymentHeader,
          maxExecutions: 12,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create subscription');
      }

      const subscription = await response.json();

      document.getElementById('sign-section')!.style.display = 'none';
      document.getElementById('success-section')!.style.display = 'block';
      document.getElementById('subscription-id')!.textContent = `ID: ${subscription.id}`;
      this.showStatus('Subscription active!');
    } catch (error: any) {
      this.showError(error.message || 'Failed to create subscription');
    }
  }

  private showStatus(message: string) {
    const statusEl = document.getElementById('widget-status')!;
    const messageEl = document.getElementById('status-message')!;
    statusEl.style.display = 'block';
    messageEl.textContent = message;
    document.getElementById('error-section')!.style.display = 'none';
  }

  private showError(message: string) {
    document.getElementById('widget-status')!.style.display = 'none';
    document.getElementById('wallet-section')!.style.display = 'none';
    document.getElementById('sign-section')!.style.display = 'none';
    document.getElementById('error-section')!.style.display = 'block';
    document.getElementById('error-message')!.textContent = message;
  }
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

new PaymentWidget();
