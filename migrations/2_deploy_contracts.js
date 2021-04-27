var AppolloToken = artifacts.require("./AppolloToken.sol");
var AppolloTokenSale = artifacts.require("./AppolloTokenCrowdsale.sol");
var KycContract = artifacts.require("./KycContract.sol");
require('dotenv').config({ path: '../.env' });

// time helpers
import { duration } from '../test/helpers/increaseTime';
import latestTime from '../test/helpers/latestTime';

this.openingTime = latestTime() + duration.weeks(1);
this.closingTime = this.openingTime + duration.weeks(1);

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(AppolloToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(KycContract);
  await deployer.deploy(AppolloTokenSale, 500, addr[0], AppolloToken.address, 1000000000, openingTime, closingTime, KycContract.address);
  let appolloInstance = await AppolloToken.deployed();
  await appolloInstance.transfer(AppolloTokenSale.address, process.env.INITIAL_TOKENS);
};