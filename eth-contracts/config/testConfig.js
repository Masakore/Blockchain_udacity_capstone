var BigNumber = require('../../node_modules/bignumber.js');
var MyERC721Token = artifacts.require("./MyERC721Token");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");

var proofJSON = 
  {
    "proof":
    {
      "A":["0x95652610e960ef278f41ba665f17d2157be209363094ad124985624256223a9", "0x539c799eeb760deeaa999434e6072cbe46946fd12efca3a9c1f62e829ec1294"],
      "A_p":["0x194942f61d4b01f59d6cd90f4c3ec675df92d10fbc5cbed67b396914f6ec991d", "0x14288b8310ad7f1246b1ee89e27a7f2f1b42b48559b45c80612b0247a047a81c"],
      "B":
      [["0x145fd0e7fdbc896db8a30275962a45d012f76edb7e2df819dde5c66e024b1eb", "0x30543e7c6e43ae7e1963c41c1192c9e5b26cfbe7ba379501b02eb676d7580a83"], ["0x2e2d432fc003e8311ecdf7bd50b1d8f0756aa92bb755290c389390da464784", "0x229ba6620485a3e9a36c91bc095a4373d684af7afb83f263ca26c17ebf2c4910"]],

        "B_p":["0x2e2e0b3aef7c8f77e99b1069de5a3dd9c4d7c8f06d31f8457e2af888f336fb87", "0x35a6fcb8138902624c3098b7be9ec7b975aec553d76464b37b739aa7dcfe260"],
      "C":["0x1461dbb7dec1fc97a53858fa6ddcc7de15d98c4e13d30de40daddd7f684052b9", "0x226f1497ec3606cbdfbfdb3c4920ba493a584ac7437691d05ec0769353632b12"],
      "C_p":["0x2ba5ddf2248a6e536c875e93011c61cd5145ae95d3693289f166aea53a915fce", "0x21b238968937d1e11fd716c3798f9679b4ddf207c1c506394d59146ffdcf2641"],
      "H":["0xc3fd5678e99a61fd659db598806b15cd9b44a54aff5a9d9a92454082f002163", "0x21e0ac61df73e65b55e5abe8a918ee25fa26dc56d6812964c61d8cc39c8db461"],
      "K":["0xf44a748c44a207eb8a762595a18a9d0b5845e48bef496cba08b2d90fe66f9b8", "0x1b7b46d70f7e22983510c6382d2070f5b754883ab4b0fd1bbd8cd77006c470c4"]
    },
    "input":[9,1]
  };

var Config = async function (accounts) {
  const _owner = accounts[0];
  const _account_one = accounts[0];
  const _account_two = accounts[1];

  const proof = proofJSON['proof'];
  const input = proofJSON['input'];

  const _name = 'Real Estate Token';
  const _symbol = 'RET';
  const _baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';
  const _firstTokenId = 1;
  const _lastTokenId = 10;

  let myERC721Token = await MyERC721Token.new(_name, _symbol, _baseTokenURI);
  let verifier = await Verifier.new();
  let solnSquareVerifier = await SolnSquareVerifier.new(verifier.address, _name, _symbol, _baseTokenURI);

  return {
    owner: _owner,
    account_one: _account_one,
    account_two: _account_two,
    firstTokenId: _firstTokenId,
    lastTokenId: _lastTokenId,
    proof: proof,
    input: input,
    name: _name,
    symbol: _symbol,
    baseTokenURI: _baseTokenURI,
    weiMultiple: (new BigNumber(10)).pow(18),
    myToken: myERC721Token,
    solnSquareVerifier: solnSquareVerifier,
    verifier: verifier
  }
}

module.exports = {
  Config: Config
};