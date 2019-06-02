var Test = require('../config/testConfig');

contract('TestERC721Mintable', accounts => {

    var config;

    before('setup contract', async () => {
        config = await Test.Config(accounts);
        const tokenId = config.firstTokenId;
        for (let i=tokenId; i <= config.lastTokenId; i++) {
            await config.myToken.mint(config.owner, i, {from: config.owner});
        }

    });

    describe('match erc721 spec', function () {
        
        it('should return total supply', async function () {
            let result = await config.myToken.totalSupply.call({from: config.owner});
            assert.equal(result, config.lastTokenId, "Wrong total supply");
        })

        it('should get token balance', async function () {
            let result = await config.myToken.balanceOf.call(config.owner);
            assert.equal(result, config.lastTokenId, "Wrong balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let testTokenId = config.firstTokenId;

            let expectedTokenURI = config.baseTokenURI.concat(testTokenId);
            
            let result = await config.myToken.getTokenURI.call(testTokenId, {from: config.owner});
            
            assert.equal(result, expectedTokenURI, "Wrong token URI");
            
        })

        it('should transfer token from one owner to another', async function () {
            let testTokenId = config.firstTokenId;

            await config.myToken.transferFrom.call(config.owner, config.account_one, testTokenId, {from: config.owner});

            let result = await config.myToken.ownerOf.call(testTokenId);

            assert.equal(result, config.account_one, "Transfer failed");
        })
    });

    describe('have ownership properties', function () {
        
        it('should return contract owner', async function () {
            let result= await config.myToken.getContractOwner();
            assert.equal(result, config.owner, "Wrong owner returned");
        })

        it('should fail when minting when address is not contract owner', async function () {
            const newTokenId = config.lastTokenId + 1;

            var reverted = false;
            try {
                await config.myToken.mint(config.account_one, newTokenId, {from: config.account_one});
            } catch(e) {
                reverted = true; 
                console.error(e);
            }
            
            assert.equal(reverted, true, "should fail when minting when address is not contract owner");
        })


    });
})