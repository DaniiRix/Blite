const { Contract } = require('ethers');
import { useEffect, useState } from 'react';

import { store } from '../utils';
import { abi } from '../contracts/blite';
import { useWeb3Modal } from '../hooks/web3';

const address = '0xbb48b22feA8E4b0B36bD5eFDE06Cd37B993d3855';

const UploadBlite = ({ setBlites }) => {
  const { provider, signer, error } = useWeb3Modal();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // For read access
  const contract_read = new Contract(address, abi, provider);

  // For write access
  const contract_write = new Contract(address, abi, signer);

  const fetchAllBlites = async () => {
    let temp = [];
    let allBlites = 0;
    allBlites = await contract_read.getTotalBlites();

    allBlites = parseInt(allBlites, 16);

    for (let i = 1; i <= allBlites; i++) {
      const blite = await contract_read.getBlite(i);
      temp.push(blite);
    }
    temp = temp.filter(Boolean);
    temp.reverse();
    setBlites(temp);
  };

  useEffect(() => {
    let fetchDataInterval;
    if (provider && !error) {
      fetchAllBlites();
      fetchDataInterval = setInterval(() => {
        fetchAllBlites();
      }, 10000);
    }
    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [provider, error]);

  const uploadBlite = async () => {
    if (title && value && file && !error) {
      setLoading(true);
      try {
        const date = new Date().toDateString();
        const address = await signer.getAddress();
        const cid = await store(file, title, value, date, address);
        const tx = await contract_write.storeBlite(cid.cid);

        alert('Blite added successfully');
        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block ${receipt.blockNumber}`);

        setFile(null);
        setTitle('');
        setValue('');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <div className="shadow-md rounded-xl p-3">
      <textarea
        placeholder="Give your column a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl py-2 px-3 mt-3 text-base border resize-none"
        rows={2}
      />
      <textarea
        placeholder="What's on your mind?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-xl py-2 px-3 mt-3 text-base border resize-none"
        rows={5}
      />

      {file ? (
        <div className="mt-3 mx-auto">
          <img src={URL.createObjectURL(file)} alt="display" />
        </div>
      ) : (
        <div className="mt-3 mx-auto">
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        </div>
      )}
      <button
        className="hover:bg-[#833ab4] text-white font-bold py-2 px-4 rounded-xl w-full text-base mt-3 bg-[#833ab4da] disabled:opacity-60 disabled:hover:bg-[#833ab4da] "
        onClick={uploadBlite}
        disabled={loading}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadBlite;
