import 'tailwindcss/tailwind.css';
import '../global.css';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../src/components/Navbar';

function MyApp({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false);

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
      <Navbar {...pageProps} />
      <Component {...pageProps} isMobile={isMobile} />
    </>
  );
}

export default MyApp;
