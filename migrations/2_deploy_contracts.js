var AppolloToken = artifacts.require("./AppolloToken.sol");
var AppolloTokenSale = artifacts.require("./AppolloTokenCrowdsale.sol");
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(AppolloToken,process.env.INITIAL_TOKENS);
  await deployer.deploy(AppolloTokenSale, 1, addr[0], AppolloToken.address);
  let appolloInstance = await AppolloToken.deployed();
  await appolloInstance.transfer(AppolloTokenSale.address, process.env.INITIAL_TOKENS);
};