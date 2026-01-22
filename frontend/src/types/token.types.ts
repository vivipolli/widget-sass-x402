export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  x402Supported: boolean;
  network: string;
  isNative?: boolean;
  icon?: string;
}

export const PREDEFINED_TOKENS: Token[] = [
  {
    name: 'DevUSDCe',
    symbol: 'USDC',
    address: '0xf329184c1b464411bd683a2e8f42c1bfe42b2331',
    decimals: 6,
    x402Supported: true,
    network: 'Cronos Testnet'
  },
  {
    name: 'Wrapped CRO',
    symbol: 'WCRO',
    address: '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23',
    decimals: 18,
    x402Supported: false,
    network: 'Cronos Testnet'
  },
  {
    name: 'Native CRO',
    symbol: 'CRO',
    address: 'native',
    decimals: 18,
    x402Supported: false,
    network: 'Cronos Testnet',
    isNative: true
  }
];

export const CUSTOM_TOKEN_PLACEHOLDER: Token = {
  name: 'Custom Token',
  symbol: 'CUSTOM',
  address: '',
  decimals: 18,
  x402Supported: false,
  network: 'Cronos Testnet'
};
