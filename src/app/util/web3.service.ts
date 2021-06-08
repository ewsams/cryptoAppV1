import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { BehaviorSubject, Subject } from 'rxjs';
import AppolloToken from 'build/contracts/AppolloToken.json';
import AppolloTokenCrowdsale from 'build/contracts/AppolloTokenCrowdsale.json';
import Lottery from 'build/contracts/Lottery.json';

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
  private lottoBalanceSubject = new Subject<number>();
  lottoBalance$ = this.lottoBalanceSubject.asObservable();
  private spinsReceiptBehaviorSubject = new BehaviorSubject<any>(null);
  spinsTransactionReceipt$ = this.spinsReceiptBehaviorSubject.asObservable();

  // Contract related variables
  appolloTokenInstance;
  appolloTokenCrowdsaleInstance;
  lotteryInstance;
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
        AppolloTokenCrowdsale.networks[1].address);

    this.whiteListedAccount.next(kycAddress);
    this.whiteListedBoolean.next(true);
  }

  userCurrentTokens = async () => {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.appolloTokenInstance =
      new this.web3js.eth.Contract(AppolloToken.abi,
        AppolloToken.networks[1].address);
    let userTokens = await
      this.appolloTokenInstance.methods.balanceOf(this.accounts[0]).call();
    // Tokens in Ethereum
    let tokensInEth = userTokens / 1000000000000000000;
    this.userTokens.next(tokensInEth);
  }

  // palyer deposit amount in Ethereum
  lotteryDeposit = async (playerDeposit: number) => {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    // Lottery Contract Instance
    this.lotteryInstance = new this.web3js.eth.Contract(
      Lottery.abi, Lottery.networks[1].address);

    //Appollo Token Instance
    this.appolloTokenInstance =
      new this.web3js.eth.Contract(AppolloToken.abi,
        AppolloToken.networks[1].address);

    // Transfer of Appollo Tokens to the Lottery Address
    await this.appolloTokenInstance.methods.transfer(
      Lottery.networks[1].address, playerDeposit.toString()).send({ from: this.accounts[0] }).
      on('receipt',
        receipt => {
          if(receipt.status === true){
            this.spinsReceiptBehaviorSubject.next(receipt);
          }
        });
  }

  checkLottoBalance = async () => {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.appolloTokenInstance =
      new this.web3js.eth.Contract(AppolloToken.abi,
        AppolloToken.networks[1].address);
    let lottoBalance = await
      this.appolloTokenInstance.methods.balanceOf(Lottery.networks[1].address).call();
    const lottoBalanceInEth = lottoBalance / 1000000000000000000;
    this.lottoBalanceSubject.next(lottoBalanceInEth);
  }

}
