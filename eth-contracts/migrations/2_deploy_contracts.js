// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("./MyERC721Token");
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {

  let name = "Real Estate Token";
  let symbol = "RET";
  let baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

  deployer.deploy(ERC721Mintable, name, symbol, baseTokenURI);
  deployer.deploy(Verifier).then(() => {
    return deployer.deploy(SolnSquareVerifier, Verifier.address, name, symbol, baseTokenURI)
  });
};
