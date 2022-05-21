import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export function useWeb3Modal() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          80001: 'https://rpc-mainnet.maticvigil.com/',
        },
        network: 'mumbai',
      },
    },
  };
  const web3Modal = new Web3Modal({
    network: 'mumbai',
    cacheProvider: true,
    providerOptions,
  });
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);

  if (web3Modal.cachedProvider && !provider) {
    connectWallet();
  }

  async function connectWallet() {
    try {
      const externalProvider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(
        externalProvider
      );

      const res = await ethersProvider.getNetwork();
      if (res.chainId !== 80001) {
        alert('Please connect to Polygon mumbai testnet');
        setError('Please connect to Polygon mumbai testnet');
        return;
      }

      setProvider(ethersProvider);
      setSigner(ethersProvider.getSigner());
    } catch (e) {
      setError('NO_WALLET_CONNECTED');
      console.log('NO_WALLET_CONNECTED', e);
    }
  }

  function disconnectWallet() {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
  }

  return { connectWallet, disconnectWallet, provider, signer, error };
}
