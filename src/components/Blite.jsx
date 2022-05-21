import { useEffect, useState } from 'react';
import Identicon from 'react-identicons';
import { get } from '../utils';

const Blite = ({ blite }) => {
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
      if (data) setData(data);
    };
    fetchData();
  }, [blite]);

  return (
    <div className="shadow-md py-3 rounded-xl flex flex-col">
      <div className="flex items-center p-3">
        <Identicon string={data.title} size={40} />
        <p className="text-xl text-left flex-1 mx-3">{data.owner}</p>
        <p className="text-xl">{data.date}</p>
      </div>
      <img src={data.url} alt="image" className="w-full h-full rounded-xl" />
      <h5 className="text-xl my-2 font-bold">{data.title}</h5>
      <p className="text-base my-2">{data.description}</p>
    </div>
  );
};

export default Blite;
