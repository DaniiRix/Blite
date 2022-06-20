import React, { useEffect, useState } from 'react';
import Blockies from 'react-blockies';
import Web3 from 'web3';
import UAuth from '@uauth/js';

import Web3Context from './web3Context.js';
import { abi } from '../contracts/blite';
import { useContext } from 'react';

const deployedAddress = '0xbb48b22feA8E4b0B36bD5eFDE06Cd37B993d3855';

const truncateAddress = (address) => {
  return address.slice(0, 8) + '...' + address.slice(-4);
};

const uauth = new UAuth({
  clientID: process.env.NEXT_PUBLIC_UNSTOPPABLE,
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://blite-sage.vercel.app/'
      : 'http://localhost:3000',
});

const ConnectWallet = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const { address, setAddress, setContract } = useContext(Web3Context);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    if (!address) {
      const { ethereum } = window;
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);

        const web3 = new Web3(Web3.givenProvider);

        if (ethereum.networkVersion !== '80001') {
          alert('Please switch to Polygon testnet');
        }

        const instance = new web3.eth.Contract(abi, deployedAddress);
        setContract(instance);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectUnstoppable = async () => {
    try {
      const authorization = await uauth.loginWithPopup();

      if (authorization.idToken.wallet_address) {
        setAddress(authorization.idToken.wallet_address);
        const web3 = new Web3(Web3.givenProvider);

        if (ethereum.networkVersion !== '80001') {
          alert('Please switch to Polygon testnet');
        }

        const instance = new web3.eth.Contract(abi, deployedAddress);
        setContract(instance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center">
      {address && (
        <Blockies
          className="rounded-full"
          seed={address.toLowerCase()}
          size={10}
          scale={3}
        />
      )}
      {address ? (
        <div className="mx-1">{truncateAddress(address)}</div>
      ) : (
        <div>
          <button
            className="mx-2 border border-blue-600  px-4 py-2 rounded-xl text-blue-600 hover:text-blue-400 hover:border-blue-400"
            onClick={connectUnstoppable}
          >
            Login with unstoppable
          </button>
          <button
            className="mx-2 border border-blue-600 bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-400 hover:border-blue-400"
            onClick={connectWallet}
          >
            {haveMetamask ? 'Connect Wallet' : 'Install metamask'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
