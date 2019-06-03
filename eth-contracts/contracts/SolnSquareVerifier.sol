pragma solidity >=0.4.21 <0.6.0;

import "./Verifier.sol";
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is MyERC721Token {
  Verifier verifier;

  struct Solution {
    uint256 index;
    address solution;
  }

  Solution[] private solutions;

  mapping (bytes32 => Solution) private existingSolution;

  event SolutionAdded(address solution);

  constructor (
    address _verifierContract
//    string memory name,
//    string memory symbol,
//    string memory baseTokenURI
  )
    MyERC721Token()
    public
  {
    verifier = Verifier(_verifierContract);
  }

	// TODO Create a function to add the solutions to the array and emit the event
  function addSolution(
    address _solution,
    uint256 _index,
		uint[2] memory a,
		uint[2] memory a_p,
		uint[2][2] memory b,
		uint[2] memory b_p,
		uint[2] memory c,
		uint[2] memory c_p,
		uint[2] memory h,
		uint[2] memory k,
		uint[2] memory input
  )
    public
    returns (bool)
  {
    bytes32 key = keccak256(abi.encodePacked());
    require(existingSolution[key].index == 0, "Already exists");
    Solution memory sol = Solution({index: _index, solution: _solution});
    existingSolution[key] = sol;
    solutions.push(sol);
    emit SolutionAdded(_solution);
    return true;
  }

	// TODO Create a function to mint new NFT only after the solution has been verified
	//  - make sure the solution is unique (has not been used before)
	//  - make sure you handle metadata as well as tokenSuplly
  function mintNewNFT(
	  address to,
	  uint256 tokenId,
		uint[2] memory a,
		uint[2] memory a_p,
		uint[2][2] memory b,
		uint[2] memory b_p,
		uint[2] memory c,
		uint[2] memory c_p,
		uint[2] memory h,
		uint[2] memory k,
		uint[2] memory input
	)
	  public
    returns (bool)
  {
    require(verifier.verifyTx(
			a,
			a_p,
			b,
			b_p,
			c,
			c_p,
			h,
			k,
			input
    ) == true, "Solution is wrong");

    addSolution(
			to,
			tokenId,
			a,
			a_p,
			b,
			b_p,
			c,
			c_p,
			h,
			k,
			input
    );
    super.mint(to, tokenId);
    return true;
  }

}
