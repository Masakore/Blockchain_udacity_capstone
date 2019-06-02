// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Test = require('../config/testConfig');


contract('TestSquareVerifier', accounts => {

  var config;
  var proof;
  var input;

  before('setup contract', async () => {
    config = await Test.Config(accounts);
    proof = config.proof;
    input = config.input;

  });

  describe('Verification with correct proof', function() {
    it ('should return true', async () => 
      {
        let result = await config.verifier.verifyTx.call(
          proof.A,
          proof.A_p,
          proof.B,
          proof.B_p,
          proof.C,
          proof.C_p,
          proof.H,
          proof.K,
          input
        );
        
        assert.equal(result, true, "Should return true");
      }
    )
  });


  describe('Verification with INCORRECT proof', function() {
    it('should return false', async () => {
      let result = await config.verifier.verifyTx.call(
        proof.A,
        proof.A_p,
        proof.B,
        proof.B_p,
        proof.C,
        proof.C_p,
        proof.K,
        proof.H, // swap K and H
        input
      );
      
      assert.equal(result, false, "Should return false");
    })
  });
})