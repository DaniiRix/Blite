import React from 'react';

import dynamic from 'next/dynamic';
const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
});

const Navbar = () => {
  return (
    <div className="mx-auto w-[70%] flex p-3 shadow-md rounded-xl">
      <h4 className="text-4xl font-semibold flex-1">Blite</h4>
      <ConnectWallet />
    </div>
  );
};

export default Navbar;
