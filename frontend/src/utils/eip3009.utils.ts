import { ethers } from 'ethers';
import { Facilitator, CronosNetwork, Contract } from '@crypto.com/facilitator-client';

export interface GeneratePaymentHeaderResult {
  paymentHeader: string;
}

function getAssetFromToken(tokenAddress: string, network: CronosNetwork): Contract {
  const normalized = tokenAddress.toLowerCase();
  
  const usdceTestnet = '0xf329184c1b464411bd683a2e8f42c1bfe42b2331';
  const usdceMainnet = '0xc21223249ca28397b4b6541dffaecc539bff0c59';
  
  if (network === CronosNetwork.CronosTestnet && normalized === usdceTestnet) {
    return Contract.DevUSDCe;
  }
  
  if (network === CronosNetwork.CronosMainnet && normalized === usdceMainnet) {
    return Contract.USDCe;
  }
  
  throw new Error(`Token ${tokenAddress} not supported by x402. Only DevUSDCe is supported on testnet.`);
}

export async function generatePaymentHeader(
  tokenAddress: string,
  to: string,
  value: string,
  network: CronosNetwork = CronosNetwork.CronosTestnet,
  validBeforeSeconds?: number
): Promise<GeneratePaymentHeaderResult> {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  try {
    console.log('🔐 Generating x402 payment header with MetaMask...');
    console.log('   To:', to);
    console.log('   Value:', value);
    console.log('   Token:', tokenAddress);

    const facilitator = new Facilitator({ network });
    const asset = getAssetFromToken(tokenAddress, network);

    const defaultValidBefore = 600;
    const actualValidBefore = validBeforeSeconds || defaultValidBefore;
    
    const paymentHeader = await facilitator.generatePaymentHeader({
      to,
      value,
      asset,
      signer,
      validBefore: Math.floor(Date.now() / 1000) + actualValidBefore,
      validAfter: 0,
    });

    console.log('✅ Payment header generated successfully!');

    return {
      paymentHeader,
    };
  } catch (error: any) {
    console.error('❌ Error generating payment header:', error);
    throw new Error('User rejected signature or header generation failed');
  }
}

export async function getProvider(): Promise<ethers.BrowserProvider> {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner(): Promise<ethers.Signer> {
  const provider = await getProvider();
  return await provider.getSigner();
}

export async function getConnectedAddress(): Promise<string> {
  const signer = await getSigner();
  return await signer.getAddress();
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
