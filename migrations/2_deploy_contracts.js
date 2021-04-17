var AppolloToken = artifacts.require("contracts/Appollo.sol");

module.exports = async function(deployer) {
  await deployer.deploy(AppolloToken,100000000);
};
