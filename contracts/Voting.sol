
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.20;

 contract Voting {
     struct Candidate {
         uint256 id;
         string name;
         uint256 voteCount;
     }

     Candidate[] private candidates;

     mapping(address => bool) public hasVoted;

     event VoteCast(address indexed voter, uint256 candidateId);

     constructor() {
         candidates.push(Candidate(1, "Candidate A", 0));
         candidates.push(Candidate(2, "Candidate B", 0));
         candidates.push(Candidate(3, "Candidate C", 0));
     }

     function vote(uint256 candidateId) public {
         require(!hasVoted[msg.sender], "You have already voted");
         require(
             candidateId > 0 && candidateId <= candidates.length,
             "Invalid candidate"
         );

         hasVoted[msg.sender] = true;
         candidates[candidateId - 1].voteCount++;

         emit VoteCast(msg.sender, candidateId);
     }

     function getCandidateCount() public view returns (uint256) {
         return candidates.length;
     }

     function getCandidate(uint256 index)
         public
         view
         returns (uint256, string memory, uint256)
     {
         require(index < candidates.length, "Invalid index");

         Candidate memory c = candidates[index];
         return (c.id, c.name, c.voteCount);
     }

     function getResults()
         public
         view
         returns (Candidate[] memory)
     {
         return candidates;
     }
 }