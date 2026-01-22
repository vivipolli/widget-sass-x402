import { ethers } from 'ethers';
import { Token, PREDEFINED_TOKENS } from '../types/token.types';

export function getTokenDecimals(tokenAddress: string): number {
  const token = PREDEFINED_TOKENS.find(
    t => t.address.toLowerCase() === tokenAddress.toLowerCase()
  );
  return token?.decimals || 18;
}

export function convertToBaseUnits(amount: string, decimals: number): string {
  try {
    if (!amount || amount === '') return '0';
    return ethers.parseUnits(amount, decimals).toString();
  } catch (error) {
    return '0';
  }
}

export function convertToHumanReadable(baseUnits: string, decimals: number): string {
  try {
    if (!baseUnits || baseUnits === '0') return '0';
    return ethers.formatUnits(baseUnits, decimals);
  } catch (error) {
    return '0';
  }
}

export function isX402Compatible(tokenAddress: string): boolean {
  const normalized = tokenAddress.toLowerCase();
  const usdceTestnet = '0xf329184c1b464411bd683a2e8f42c1bfe42b2331';
  const usdceMainnet = '0xc21223249ca28397b4b6541dffaecc539bff0c59';
  
  return normalized === usdceTestnet || normalized === usdceMainnet;
}

export function validateTokenAddress(address: string): boolean {
  if (address === 'native') return true;
  try {
    ethers.getAddress(address);
    return true;
  } catch {
    return false;
  }
}

export function formatTokenAmount(amount: string, decimals: number = 6): string {
  try {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    });
  } catch {
    return amount;
  }
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (address === 'native') return 'Native';
  if (!address) return '';
  if (address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function getTokenByAddress(address: string, tokens: Token[]): Token | undefined {
  return tokens.find(t => t.address.toLowerCase() === address.toLowerCase());
}

export function validateAmount(amount: string, decimals: number): { valid: boolean; error?: string } {
  if (!amount || amount === '') {
    return { valid: false, error: 'Amount is required' };
  }

  const num = parseFloat(amount);
  if (isNaN(num)) {
    return { valid: false, error: 'Invalid amount format' };
  }

  if (num <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }

  const decimalPlaces = (amount.split('.')[1] || '').length;
  if (decimalPlaces > decimals) {
    return { valid: false, error: `Maximum ${decimals} decimal places allowed` };
  }

  return { valid: true };
}
