const AppolloTokenCrowdsale = artifacts.require("./AppolloTokenCrowdsale.sol");
const AppolloToken = artifacts.require("./AppolloToken.sol");
const KycContract = artifacts.require("./KycContract.sol");

require('dotenv').config({ path: '../.env' });
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

contract('this.testingAppolloSale Test', async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;
    const cap = web3.utils.toWei("500", "ether"); // 500 eth

    beforeEach(async () => {
        this.myAppolloToken = await AppolloToken.deployed();
        this.kyc = await KycContract.new();
        let startTime = (Math.floor(Date.now() / 1000)) + duration.seconds(1);
        let endTime = startTime + duration.days(5);
        this.testingAppolloSale = await AppolloTokenCrowdsale.new(1000, deployerAccount, this.myAppolloToken.address, cap,
            startTime, endTime, this.kyc.address);
    })

    it("there shouldnt be any coins in my account", async () => {
        let instance = await this.myAppolloToken;
        return expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });


    it("all coins should be in the tokensale smart contract", async () => {
        let balance = await this.myAppolloToken.balanceOf.call(this.testingAppolloSale.address);
        let totalSupply = Math.floor(process.env.INITIAL_TOKENS);
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await this.myAppolloToken;
        let tokenSaleInstance = await this.testingAppolloSale;
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

        expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") })).to.be.rejected;
        expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

        await this.kyc.setKycCompleted(recipient);

        expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "ether") })).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

    });

});