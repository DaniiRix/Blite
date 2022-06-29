## Blite

<video width="320" height="240" controls>
  <source src="/demo.mov" type="video/mov">
Your browser does not support the video tag.
</video>

### Integrating Login with Unstoppable and UNS Domain Resolution API for tipping authors

Discord Handle: DaniiiRix#3285<br />
Email: danielrix01@protonmail.com<br />
Unstoppable Domain: uns-devtest-3fd73c.crypto

Blite is a decentralized forum where anybody may submit information that has been socially vetted without fear of censorship. The name of the site is a pun on the phrase "I read it, therefore I share it."

Github: DaniiRix <br/>
Email: danielrix01@protonmail.com <br/>
Wallet: 0x8EAe1CBf2B211abd3401c6280eE27748c6fAB6eF <br/>
Contracts are stored at: 0xbb48b22feA8E4b0B36bD5eFDE06Cd37B993d3855

### How blite used IPFS?

Blite has used the IPFS underpinning technology to store the details of each blite as well as the photos associated with each blite in a decentralised, censorship-free, and easily accessible manner.

Blite has used the service of web3.storage to interact with the IPFS, we make a directory of the details.json which contains the details of blite along with the path of the image attached to it.

The code for this part is written in src/utils/index.js

#### Video: [https://www.dropbox.com/s/xss5nooju7qmj4n/Blite.mov?dl=0](https://www.dropbox.com/s/xss5nooju7qmj4n/Blite.mov?dl=0)

#### Running the app

## Getting Started

Clone the repo:

```bash
https://github.com/DaniiRix/Blite
```

Install packages:

```bash
npm install
```

Create .env at the root of the project:

```bash
NEXT_PUBLIC_STORAGE=[<Web3.storage API key>]
```

Run development server:

```bash
npm run dev
```
