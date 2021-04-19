var AppolloToken = artifacts.require("./AppolloToken.sol");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});

contract('AppolloToken Test', async (accounts) => {
    const [deployerAccount,recipient,anotherAccount] = accounts;
  
    beforeEach(async () => {
        this.myAppolloToken = await AppolloToken.new(process.env.INITIAL_TOKENS);
        });

    it("should put 100000000 AppolloToken in the first account", async () => {
       let instance = this.myAppolloToken;
      let totalSupply = await instance.totalSupply();
      return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  })

  it("should verify transfer", async () => {
    const sendTokens = 1;
     let instance = this.myAppolloToken;
    let totalSupply = await instance.totalSupply();
    
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = this.myAppolloToken;
        let balanceOfAccount = await instance.balanceOf(deployerAccount);
  
        expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;
  
        //check if the balance is still the same
       return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
      });
  
});
