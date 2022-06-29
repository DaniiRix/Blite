import { useContext, useEffect, useState } from 'react';
import Identicon from 'react-identicons';
import Web3 from 'web3';
import { get } from '../utils';
import Web3Context from './web3Context';

const Blite = ({ blite }) => {
  const { address, filteredAddr } = useContext(Web3Context);

  const [data, setData] = useState({
    title: '',
    description: 'Fetching from IPFS...',
    date: '',
    author: '',
    url: 'https://via.placeholder.com/200',
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await get(blite);
      if (data) {
        if (filteredAddr) {
          if (data.author.toLowerCase() === filteredAddr.toLowerCase()) {
            setData(data);
          } else {
            setData(null);
          }
        } else {
          setData(data);
        }
      }
    };
    fetchData();
  }, [blite, filteredAddr]);

  if (!data) return null;

  const tip = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider);

      const tx = await web3.eth.sendTransaction({
        from: address,
        to: data.author,
        value: web3.utils.toWei('0.1', 'ether'),
        gasPrice: web3.utils.toWei('10', 'gwei'),
      });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-md my-10 pt-3 rounded-2xl overflow-hidden flex flex-col">
      <div className="flex items-center p-3">
        <Identicon string={data.title} size={40} />
        <p className="text-xl text-left flex-1 mx-3">{data.author}</p>
        <p className="text-xl">{data.date}</p>
      </div>
      <img
        src={data.url}
        alt="image"
        className="mx-auto my-10 w-fit h-fit rounded-xl object-contain"
      />
      <div className="bg-gray-100 px-5 py-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md float-right"
          onClick={tip}
        >
          TIP
        </button>
        <h5 className="text-xl my-2 font-bold">{data.title}</h5>
        <p className="text-base mt-4 mb-2">{data.description}</p>
      </div>
    </div>
  );
};

export default Blite;
