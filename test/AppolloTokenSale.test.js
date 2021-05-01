var AppolloTokenSale = artifacts.require("./AppolloTokenCrowdsale.sol");
var AppolloToken = artifacts.require("./AppolloToken.sol");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});

contract('AppolloTokenSale Test', async (accounts) => {
    
    const [deployerAccount,recipient,anotherAccount] = accounts;
       
    before(async function() {
        // Transfer extra ether to investor1's account for testing
        await web3.eth.sendTransaction({ from: deployerAccount, to: recipient, value: ether(25) })
      });

        it("there shouldnt be any coins in my account", async () => {
            let instance = await AppolloToken.deployed();
            return expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
            });
        

            it("all coins should be in the tokensale smart contract", async () => {
                let instance = await AppolloToken.deployed();
                let balance = await instance.balanceOf.call(AppolloTokenSale.address);
                let totalSupply = await instance.totalSupply.call();
                return expect(balance).to.be.a.bignumber.equal(totalSupply);
            });
            
            it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
                let tokenInstance = await AppolloToken.deployed();
                let tokenSaleInstance = await AppolloTokenSale.deployed();
                let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
                
                expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
                expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

                let kycInstance = await KycContract.deployed();
                await kycInstance.setKycCompleted(recipient);
            
                expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "ether")})).to.be.fulfilled;
                return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
            
            });
});