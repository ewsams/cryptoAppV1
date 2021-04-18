var AppolloToken = artifacts.require("./AppolloToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(AppolloToken,100000000);
};
