import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this app');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const targetChainId = '0x152';
      
      if (chainId !== targetChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });
        } catch (error: any) {
          if (error.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x152',
                  chainName: 'Cronos Testnet',
                  nativeCurrency: { name: 'tCRO', symbol: 'tCRO', decimals: 18 },
                  rpcUrls: ['https://evm-t3.cronos.org'],
                  blockExplorerUrls: ['https://cronos.org/explorer/testnet3'],
                },
              ],
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress('');
    setIsConnected(false);
  }, []);

  return { address, isConnected, connect, disconnect };
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
