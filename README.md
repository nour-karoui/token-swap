HELLO <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px"> This is TokenSwap    
---

<p>
  <a href="https://github.com/nour-karoui/token-swap#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/nour-karoui/token-swap/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/nour-karoui/token-swap/blob/main/license" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bishkou/password-pwnd" />
  </a>
</p>

## ✂️ How is this project divided?
The project is divided into 3 main sections:
1. ***contracts:*** This section includes the Token Swap smart contract.
2. ***token-swap:*** This section Dapp that allows users to interact with our smart contracts, fund liquidity pools, swap tokens and get a dashboard of all the historic data (Swaps made and funds added to the pool).
3. ***subgraph:*** This section includes the subgraph that indexes our smart contract events.

## 🙌 What is Token Swap?
It is a **decentralized app for Swapping two tokens and funding their pool** (0x1f22CfA0a766A38de741265f61558406f3fdCB17 & 0x80a0314327e5Fa3aE9e2EE17b2F5F021e061952b). All the smart contracts are deployed on **Base Sepolia** built with ***Foundry Framework***, ***NextJs***, ***TheGraph***, ***Viem***, ***wagmi*** and ***Dynamic.xyz*** libraries.
1. Any user can view the historic list of all swaps and funds made.
2. Only connected users with non null balances can fund the pool.
3. Only connected users with non null balances can swap tokens.

## 🙌 Important links
- **Token A Link:** https://sepolia.basescan.org/token/0x1f22CfA0a766A38de741265f61558406f3fdCB17
- **Token B Link:** https://sepolia.basescan.org/token/0x80a0314327e5Fa3aE9e2EE17b2F5F021e061952b
- **Token Swap Link:** https://sepolia.basescan.org/address/0xf46c0d70734A96cC91AF43278668f35e7c09D76D#readContract
- **Subgraph Playground:** https://subgraph.satsuma-prod.com/nours-team--280818/token-swap/playground

## 🚀 Running and testing the app

---  	

> **To run the DApp you need both a Metamask wallet attached to your Browser, also you need some Eth on Base Sepolia**

#### Running the DApp
To interact with the molecules app
```shell
    npm run dev
```
