import dynamic from 'next/dynamic';
import { useState } from 'react';

import Blites from '../src/components/Blites';
const UploadBlite = dynamic(() => import('../src/components/UploadBlite'), {
  ssr: false,
});

function Home() {
  const [blites, setBlites] = useState([]);
  return (
    <main className="w-full my-3/4 mx-auto text-center">
      <div className="w-[60%] mx-auto">
        <div className="py-3 flex flex-col">
          {/* Upload Blites */}
          <UploadBlite setBlites={setBlites} />

          {/* View Blites */}
          <Blites blites={blites} />
        </div>
      </div>
    </main>
  );
}
export default Home;
