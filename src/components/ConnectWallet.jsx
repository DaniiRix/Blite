import React, { useEffect, useState } from 'react';
import Blockies from 'react-blockies';
import { useWeb3Modal } from '../hooks/web3';

const truncateAddress = (address) => {
  return address.slice(0, 8) + '...' + address.slice(-4);
};

const ConnectWallet = () => {
  const [signerAddress, setSignerAddress] = useState('');
  const { connectWallet, disconnectWallet, provider, error } = useWeb3Modal();

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSignerAddress(address);
    };
    if (provider && !error) getAddress();

    return () => {
      disconnectWallet();
    };
  }, []);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  return (
    <div className="flex items-center">
      {signerAddress && (
        <Blockies
          className="rounded-full"
          seed={signerAddress.toLowerCase()}
          size={10}
          scale={3}
        />
      )}
      {signerAddress ? (
        <div className="mx-1">{truncateAddress(signerAddress)}</div>
      ) : (
        <div>
          <button
            className="mx-2 border border-blue-600 bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-400 hover:border-blue-400"
            onClick={handleClickConnect}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
