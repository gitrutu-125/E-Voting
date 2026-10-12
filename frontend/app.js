
const CONTRACT_ADDRESS = "0xEe8A950b925a7582052871db2A46B247f58EdaA3";

const SEPOLIA_CHAIN_ID = 11155111;

const ABI = [
  "function vote(uint256 candidateId)",
  "function getCandidateCount() view returns (uint256)",
  "function getCandidate(uint256 index) view returns (uint256, string, uint256)",
  "function hasVoted(address) view returns (bool)"
];

let provider;
let signer;
let contract;
let account;

const $ = (id) => document.getElementById(id);

function status(message) {
  $("status").textContent = message;
}

async function connectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask.");
    }

    provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const network = await provider.getNetwork();

    if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
      throw new Error(
        "Please switch MetaMask to the Sepolia test network."
      );
    }

    signer = await provider.getSigner();
    account = await signer.getAddress();

    contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

    $("walletStatus").textContent = "Connected: " + account;

    await loadCandidates();
    await loadResults();

    status("Wallet connected successfully.");
  } catch (error) {
    status(error.shortMessage || error.message);
  }
}

async function loadCandidates() {
  const count = Number(await contract.getCandidateCount());
  const voted = await contract.hasVoted(account);

  $("candidates").replaceChildren();

  if (voted) {
    status("You have already cast your vote. You cannot vote again.");
  }

  for (let i = 0; i < count; i++) {
    const candidate = await contract.getCandidate(i);

    const card = document.createElement("div");
    card.className = "candidate";

    const name = document.createElement("span");
    name.textContent = candidate[1];

    const button = document.createElement("button");
    button.textContent = voted ? "Already voted" : "Vote";
    button.disabled = voted;

    button.addEventListener("click", async () => {
      try {
        button.disabled = true;
        status("Please confirm the vote in MetaMask.");

        const tx = await contract.vote(candidate[0]);

        status("Transaction submitted. Waiting for confirmation...");
        await tx.wait();

        status("Vote recorded successfully!");

        await loadCandidates();
        await loadResults();
      } catch (error) {
        status(error.shortMessage || error.message);
        await loadCandidates();
      }
    });

    card.append(name, button);
    $("candidates").append(card);
  }
}

async function loadResults() {
  const count = Number(await contract.getCandidateCount());
  const results = $("results");

  results.replaceChildren();

  for (let i = 0; i < count; i++) {
    const candidate = await contract.getCandidate(i);

    const line = document.createElement("p");
    line.textContent =
      candidate[1] + ": " + candidate[2].toString() + " votes";

    results.append(line);
  }
}

$("connectButton").addEventListener("click", connectWallet);

$("refreshButton").addEventListener("click", async () => {
  try {
    if (!contract) {
      throw new Error("Connect your wallet first.");
    }

    await loadCandidates();
    await loadResults();

    status("Results and voting status updated.");
  } catch (error) {
    status(error.shortMessage || error.message);
  }
});

if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => {
    window.location.reload();
  });

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
}