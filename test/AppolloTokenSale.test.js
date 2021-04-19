var AppolloTokenSale = artifacts.require("./AppolloTokenCrowdsale.sol");
var AppolloToken = artifacts.require("./AppolloToken.sol");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});

contract('AppolloTokenSale Test', async (accounts) => {
    
    const [deployerAccount,recipient,anotherAccount] = accounts;
       

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
            
                expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
                return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
            
            });
});
