import 'tailwindcss/tailwind.css';
import '../global.css';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Web3Context from '../src/components/web3Context';

function MyApp({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    setIsMobile(
      navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    );
  }, []);

  return (
    <>
      <Head>
        <title>Blite</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Web3Context.Provider
        value={{ address, contract, setAddress, setContract }}
      >
        <Navbar />
        <Component {...pageProps} isMobile={isMobile} />
      </Web3Context.Provider>
    </>
  );
}

export default MyApp;
