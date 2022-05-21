import { Web3Storage } from 'web3.storage';

export async function store(file, title, description, date, author) {
  const details = new File(
    [JSON.stringify({ name: file.name, title, description, date, author })],
    'details.json'
  );

  const storage = new Web3Storage({ token: process.env.NEXT_PUBLIC_STORAGE });

  const cid = await storage.put([file, details], {
    name: title,
  });

  return { cid };
}

export async function get(cid) {
  const res = await fetch(
    `https://${cid}.ipfs.dweb.link/${encodeURIComponent('details.json')}`
  );

  if (!res.ok) {
    console.error(res);
    return null;
  }
  const details = await res.json();
  const url = `https://${cid}.ipfs.dweb.link/${encodeURIComponent(
    details.name
  )}`;
  return { ...details, url };
}
