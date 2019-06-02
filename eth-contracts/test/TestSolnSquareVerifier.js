var Test = require('../config/testConfig.js');

contract('TestSolnSquareVerifier', async (accounts) => {

  var config;
  var proof;
  var input;

  before('setup', async () => {
    config = await Test.Config(accounts);
    proof = config.proof;
    input = config.input;
  });

  describe('SolnSquareVerifier', function() {
    it('can add new solution', async () => {
      let tokenId = config.firstTokenId;
      let result = await config.solnSquareVerifier.addSolution(
        config.owner,
        tokenId,
        proof.A,
        proof.A_p,
        proof.B,
        proof.B_p,
        proof.C,
        proof.C_p,
        proof.H,
        proof.K,
        input,
        {from: config.owner}
      );

      assert.equal(result, true, "Should return true");
    })

    it('can mint ERC721 token', async () => {
       let tokenId = config.firstTokenId + 1;
       let result = await config.solnSquareVerifier.mintNewNFT(
         config.account_one,
         tokenId,
         proof.A,
         proof.A_p,
         proof.B,
         proof.B_p,
         proof.C,
         proof.C_p,
         proof.H,
         proof.K,
         input,
         {from: config.owner}
       );

       assert.equal(result, true, "Should return true");
    })

  });
});