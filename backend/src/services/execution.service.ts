import { ethers } from 'ethers';
import { Facilitator, CronosNetwork, Contract } from '@crypto.com/facilitator-client';
import { Intent, IntentType } from '../types/intent.types.js';

export class ExecutionService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private facilitator: Facilitator;
  private network: CronosNetwork;

  constructor() {
    const rpcUrl = process.env.RPC_URL || 'https://evm-t3.cronos.org';
    const privateKey = process.env.PRIVATE_KEY!;
    this.network = (process.env.NETWORK as CronosNetwork) || CronosNetwork.CronosTestnet;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.facilitator = new Facilitator({ network: this.network });
  }

  async executeIntent(intent: Intent): Promise<string> {
    return await this.executePayment(intent);
  }

  private getAssetFromToken(tokenAddress: string): Contract | null {
    const normalized = tokenAddress.toLowerCase();
    
    const usdceTestnet = '0xf329184c1b464411bd683a2e8f42c1bfe42b2331';
    const usdceMainnet = '0xc21223249ca28397b4b6541dffaecc539bff0c59';
    
    if (this.network === CronosNetwork.CronosTestnet && normalized === usdceTestnet) {
      return Contract.DevUSDCe;
    }
    
    if (this.network === CronosNetwork.CronosMainnet && normalized === usdceMainnet) {
      return Contract.USDCe;
    }
    
    return null;
  }

  private async executePayment(intent: Intent): Promise<string> {
    const recipientAddress = ethers.getAddress(intent.recipient.toLowerCase());
    const tokenAddress = intent.token.toLowerCase();
    const ownerAddress = ethers.getAddress(intent.owner.toLowerCase());
    
    const asset = this.getAssetFromToken(tokenAddress);
    
    if (!asset) {
      throw new Error(`Token ${tokenAddress} not supported by x402. Only DevUSDCe is supported.`);
    }
    
    console.log(`📋 Preparing x402 payment for intent ${intent.id}`);
    console.log(`   Token: ${tokenAddress}`);
    console.log(`   Amount: ${intent.amount}`);
    console.log(`   Recipient: ${recipientAddress}`);
    console.log(`   Owner: ${ownerAddress}`);
    
    let header: string;
    
    if (intent.paymentHeader) {
      console.log('🔐 Using user-provided payment header (DECENTRALIZED)');
      console.log('   This transaction will debit from user wallet:', ownerAddress);
      header = intent.paymentHeader;
    } else {
      console.log('⚠️  No payment header provided, using backend wallet (CENTRALIZED)');
      console.log('   This transaction will debit from backend wallet:', this.wallet.address);
      
      const isRecurring = 'isRecurring' in intent && intent.isRecurring;
      const validBeforeSeconds = isRecurring 
        ? (365 * 24 * 60 * 60)
        : 600;
      
      header = await this.facilitator.generatePaymentHeader({
        to: recipientAddress,
        value: intent.amount,
        asset,
        signer: this.wallet,
        validBefore: Math.floor(Date.now() / 1000) + validBeforeSeconds,
        validAfter: 0,
      });
    }

    const requirements = this.facilitator.generatePaymentRequirements({
      payTo: recipientAddress,
      description: `AI Execution Agent - Intent ${intent.id}`,
      maxAmountRequired: intent.amount,
    });

    const body = this.facilitator.buildVerifyRequest(header, requirements);

    console.log('🔍 Verifying payment with x402...');
    const verify = await this.facilitator.verifyPayment(body);
    console.log('Payment verification result:', JSON.stringify(verify, null, 2));
    if (!verify.isValid) {
      throw new Error('Payment verification failed: ' + (verify.invalidReason || 'Unknown reason'));
    }

    console.log('✅ Payment verified! Settling transaction...');
    const settle = await this.facilitator.settlePayment(body);
    console.log('Payment settlement result:', JSON.stringify(settle, null, 2));
    if (settle.event !== 'payment.settled') {
      throw new Error(`Payment settlement failed. Event received: ${settle.event}. Full response: ${JSON.stringify(settle)}`);
    }

    console.log(`🎉 Payment settled successfully! TxHash: ${settle.txHash}`);
    
    if (intent.paymentHeader) {
      console.log(`✅ DECENTRALIZED: Funds debited from user wallet ${ownerAddress}`);
    } else {
      console.log(`⚠️  CENTRALIZED: Funds debited from backend wallet ${this.wallet.address}`);
    }
    
    return settle.txHash || '';
  }

  async estimateGasPrice(): Promise<string> {
    const feeData = await this.provider.getFeeData();
    const gasPriceWei = feeData.gasPrice || BigInt(0);
    return ethers.formatUnits(gasPriceWei, 'gwei');
  }

  async getWalletInfo(): Promise<any> {
    const address = this.wallet.address;
    const balance = await this.provider.getBalance(address);
    const balanceInTCRO = ethers.formatEther(balance);
    
    return {
      address,
      balance: balanceInTCRO,
      balanceWei: balance.toString(),
      network: this.network,
      hasSufficientBalance: parseFloat(balanceInTCRO) > 0.1,
    };
  }
}
