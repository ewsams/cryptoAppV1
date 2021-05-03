const AppolloTokenSale = artifacts.require("./AppolloTokenCrowdsale.sol");
const AppolloToken = artifacts.require("./AppolloToken.sol");
const KycContract = artifacts.require("./KycContract.sol");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

require('dotenv').config({ path: '../.env' });

contract('AppolloTokenSale Test', async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;
    beforeEach(async () => {
        let startTime = (Math.floor(Date.now() / 1000)) + duration.seconds(1);
        let endTime = startTime + duration.days(5);
        this.testingAppolloSale = await AppolloTokenSale.new(100, deployerAccount, AppolloToken.address, 1000000000,
            startTime, endTime, KycContract.address)
    });

    it("there shouldnt be any coins in my account", async () => {
        let instance = await AppolloToken.deployed();
        return expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });


    it("there shouldnt be any coins in my account", async () => {
        let instance = await AppolloToken.deployed();
        return expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });


    it("all coins should be in the tokensale smart contract", async () => {
        let instance = await AppolloToken.deployed();
        let balance = await instance.balanceOf.call(this.testingAppolloSale.address);
        let totalSupply = await instance.totalSupply.call();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await AppolloToken.deployed();
        let tokenSaleInstance = await this.testingAppolloSale;
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

        expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") })).to.be.rejected;
        expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);

        expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "ether") })).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

    });
});