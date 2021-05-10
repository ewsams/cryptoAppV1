import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Subject } from 'rxjs';
import AppolloToken from 'build/contracts/AppolloToken.json';
import AppolloTokenCrowdsale from 'build/contracts/AppolloTokenCrowdsale.json';


@Injectable({
  providedIn: 'root'
})
export class Web3Service {


  private whiteListedAccount = new Subject<any>();
  whiteListedAccountAddress$ = this.whiteListedAccount.asObservable();
  private whiteListedBoolean = new Subject<boolean>();
  isWhiteListed$ = this.whiteListedBoolean.asObservable();
  private userTokens = new Subject<any>();
  userAvailiableTokens$ = this.userTokens.asObservable();

  // Contract related variables
  appolloTokenInstance;
  appolloTokenCrowdsaleInstance;
  web3Modal;

  provider; // set provider
  web3js; // create web3 instance
  accounts;// gather accounts

  constructor() {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID' // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)'
      }
    });
  }


  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
  }

  async handleKycSubmit(kycAddress: string) {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.appolloTokenCrowdsaleInstance =
      new this.web3js.eth.Contract(AppolloTokenCrowdsale.abi,
        AppolloTokenCrowdsale.networks[5].address);

    this.whiteListedAccount.next(kycAddress);
    this.whiteListedBoolean.next(true);
  }

  userCurrentTokens = async () => {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.appolloTokenInstance =
      new this.web3js.eth.Contract(AppolloToken.abi,
        AppolloToken.networks[5].address);
    let userTokens = await
      this.appolloTokenInstance.methods.balanceOf(this.accounts[0]).call();
    // Tokens in Ethereum
    let tokensInEth = userTokens / 1000000000000000000;
    this.userTokens.next(tokensInEth);
  }

}
