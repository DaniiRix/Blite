import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import * as UAuthWeb3Modal from '@uauth/web3modal';
import UAuth from '@uauth/js';

export const uauthOptions = new UAuth({
  clientID: process.env.NEXT_PUBLIC_UNSTOPPABLE,
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://blite-sage.vercel.app/'
      : 'http://localhost:3000',
  scope: 'openid wallet',
});

export function useWeb3Modal() {
  const providerOptions = {
    'custom-uauth': {
      display: UAuthWeb3Modal.display,
      connector: UAuthWeb3Modal.connector,
      package: UAuth,
      options: uauthOptions,
    },
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

  UAuthWeb3Modal.registerWeb3Modal(web3Modal);

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);

  // if (web3Modal.cachedProvider && !provider) {
  //   connectWallet();
  // }

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
