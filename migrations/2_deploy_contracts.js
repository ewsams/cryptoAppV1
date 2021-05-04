const AppolloToken = artifacts.require("./AppolloToken.sol");
const AppolloTokenSale = artifacts.require("./AppolloTokenCrowdsale.sol");
const KycContract = artifacts.require("./KycContract.sol");
const TestingTime = artifacts.require('TestingTime')
require('dotenv').config({ path: '../.env' });

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};

module.exports = async function (deployer) {
  let startTime = Math.floor(Date.now() / 1000) + duration.seconds(300);
  let endTime = startTime + duration.days(5);
  let addr = await web3.eth.getAccounts();
  const cap = web3.utils.toWei("500", "ether") // 5000 eth

  await deployer.deploy(AppolloToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(KycContract);
  await deployer.deploy(AppolloTokenSale, 1000, addr[0], AppolloToken.address, cap,
    startTime, endTime);
  let appolloInstance = await AppolloToken.deployed();
  await appolloInstance.transfer(AppolloTokenSale.address, process.env.INITIAL_TOKENS);
};