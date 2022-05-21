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
    else setSignerAddress('');
  }, [provider]);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  const handleClickAddress = () => {
    disconnectWallet();
  };

  return (
    <button
      className="flex items-center"
      onClick={signerAddress ? handleClickAddress : handleClickConnect}
    >
      <Blockies
        className="rounded-full"
        seed={signerAddress.toLowerCase()}
        size={10}
        scale={3}
      />
      <div className="mx-1">
        {signerAddress ? truncateAddress(signerAddress) : 'Connect Wallet'}
      </div>
    </button>
  );
};

export default ConnectWallet;
