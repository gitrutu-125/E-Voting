<<<<<<< HEAD
# Blockchain-Based E-Voting System

A decentralized voting application where voters connect a MetaMask wallet, cast one vote through a Solidity smart contract on the Ethereum Sepolia testnet, and view the results read directly from the blockchain.

> **Disclaimer:** This is an educational mini-project. One vote per wallet does not prove one vote per person, since someone could create multiple wallets. It is not suitable for real public or government elections.

## Features
- Connect a MetaMask wallet and check that it is on the Sepolia network
- View the list of candidates loaded from the smart contract
- Cast a vote by signing a transaction in MetaMask
- Each wallet address can vote only once (enforced by the contract)
- The voting buttons change to "Already voted" after a wallet has voted
- View the live vote count for each candidate with Refresh Results
- The page reloads automatically when the account or network changes in MetaMask

## Tech Stack
| Layer | Technology |
|---|---|
| Smart contract | Solidity ^0.8.20 |
| Development and deployment | Remix IDE |
| Wallet | MetaMask |
| Blockchain | Ethereum Sepolia testnet |
| Web3 library | ethers.js v6 |
| Frontend | HTML, CSS, JavaScript |

## Project Structure
```
E-Voting/
├── contracts/
│   └── Voting.sol      # Smart contract
└── frontend/
    ├── index.html      # Page layout
    ├── style.css       # Styling
    └── app.js          # Wallet connection and contract calls (ethers.js)
```

## How It Works
1. The `Voting` contract stores candidates (id, name, vote count) and a `hasVoted` mapping.
2. `vote(candidateId)` rejects repeat voters and invalid candidates, then increments the vote count and emits a `VoteCast` event.
3. The frontend uses ethers.js to read candidates and results, and to send vote transactions through MetaMask.

## Getting Started
1. Install the [MetaMask](https://metamask.io/) extension and switch to the **Sepolia** network.
2. Get free test ETH from a Sepolia faucet.
3. Open `contracts/Voting.sol` in [Remix IDE](https://remix.ethereum.org/), compile it, and deploy it using the **Browser Extension (MetaMask)** environment.
4. Copy the deployed contract address and paste it into `CONTRACT_ADDRESS` in `frontend/app.js`.
5. Run the `frontend` folder with a local server (for example, VS Code Live Server) and open `index.html`.
6. Click **Connect MetaMask**, vote, then click **Refresh Results**.

## Screenshots
Add your screenshots to a `screenshots/` folder and link them here:
- MetaMask wallet on Sepolia
- Remix deployment
- Website before and after connecting
- Election results

## Limitations and Future Work
- Candidates are fixed in the contract's constructor
- No voter identity verification
- No admin role or voting start and end times

## License
MIT
=======
# E-Voting
Decentralized e-voting DApp built with Solidity, Ethereum (Sepolia testnet), MetaMask and ethers.js. Voters connect a wallet, cast one vote per address through a smart contract, and view transparent on-chain results. Includes a HTML/CSS/JS frontend. Educational prototype, not for real elections.
>>>>>>> 0a7c55285160d00f323aa98e8f25cf0d4a62c49e
