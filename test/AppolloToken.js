var AppolloToken = artifacts.require("./AppolloToken.sol");

var chai = require('chai');
const  BN = web3.utils.BN;
const  chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('AppolloToken Test', async (accounts) => {
    const [deployerAccount,recipient,anotherAccount] = accounts;
  
    it("should put 100000000 AppolloToken in the first account", async () => {
      let instance = await AppolloToken.deployed();
      let totalSupply = await instance.totalSupply();
      expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  })

  it("should verify transfer", async () => {
    const sendTokens = 1;
    let instance = await AppolloToken.deployed();
    let totalSupply = await instance.totalSupply();
    
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = await Token.deployed();
        let balanceOfAccount = await instance.balanceOf(initialHolder);
  
        expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;
  
        //check if the balance is still the same
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
      });
});
