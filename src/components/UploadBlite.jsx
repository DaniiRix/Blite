import { useEffect, useState } from 'react';

import { store } from '../utils';
import Web3Context from './web3Context.js';
import { useContext } from 'react';
import Web3 from 'web3';

const UploadBlite = ({ setBlites }) => {
  const { contract, address, setAddress } = useContext(Web3Context);

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllBlites = async () => {
    let temp = [];
    let allBlites = 0;
    allBlites = await contract.methods.getTotalBlites().call();

    allBlites = parseInt(allBlites, 16);

    for (let i = 1; i <= allBlites; i++) {
      const blite = await contract.methods.getBlite(i).call();
      temp.push(blite);
    }
    temp = temp.filter(Boolean);
    temp.reverse();
    setBlites(temp);
  };

  useEffect(() => {
    let fetchDataInterval;

    if (contract) {
      fetchAllBlites();
      fetchDataInterval = setInterval(() => {
        fetchAllBlites();
      }, 10000);
      return () => {
        clearInterval(fetchDataInterval);
      };
    }
  }, [contract]);

  const uploadBlite = async () => {
    if (title && value && file) {
      setLoading(true);
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);

        const date = new Date().toDateString();
        const cid = await store(file, title, value, date, address);
        const tx = await contract.methods
          .storeBlite(cid.cid)
          .send({ from: address, gasPrice: Web3.utils.toWei('4', 'gwei') });

        alert('Blite added successfully');
        console.log(`Transaction confirmed: ${tx}`);

        setFile(null);
        setTitle('');
        setValue('');
      } catch (error) {
        console.error(error);
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
