var AppolloToken = artifacts.require("./AppolloToken.sol");
var AppolloTokenSales = artifacts.require("./AppolloTokenCrowdsale.sol");

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(AppolloToken,100000000);
  await deployer.deploy(AppolloTokenSales, 1, addr[0], AppolloToken.address);
  let appolloInstance = await AppolloToken.deployed();
  await appolloInstance.transfer(AppolloTokenSales.address, 100000000);
};