import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
declare let require: any;
import Web3 from 'web3';
import * as contract from 'truffle-contract';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { uDonate_address, uDonate_abi } from '../../abis.js'

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  public ready = false;
  web3js: any;
  provider: any;
  accounts: any;
  uDonate: any;
  web3Modal


  public accountsObservable = new Subject<string[]>();
  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.ethereum.enable().then(() => {
        this.web3 = new Web3(window.ethereum);
      });
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }

  private async refreshAccounts() {
    const accs = await this.web3.eth.getAccounts();
    console.log('Refreshing accounts');

    // Get the initial account balance so it can be displayed.
    if (accs.length === 0) {
      console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return;
    }

    if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
      console.log('Observed new accounts');

      this.accountsObservable.next(accs);
      this.accounts = accs;
    }

    this.ready = true;
  }

  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    return this.accounts;
  }

  async createOrganization(orgID, payableWallet, orgName, tokenAddress) {
    // --- temporarily re-initializating these for the effect file 
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 

    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);

    const create = await this.uDonate
      .methods.createOrganization(orgID, payableWallet, orgName, tokenAddress)
      .send({ from: this.accounts[0] });
    return create;
  }

  async getOrganization(orgID) {
    // --- temporarily re-initializating these for the effect file 
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);
    
    const org = await this.uDonate.methods.getOrganization(orgID).call({ from: this.accounts[0] });
    
    const organization = org;
    const walletAddress = organization[1];
    const balence = await this.web3js.eth.getBalance(walletAddress);

    const orgWithBalence = {
      id: organization[0],
      payableWallet: organization[1],
      paused: organization[2],
      ended: organization[3],
      causesIDs: organization[4],
      balence: balence,
    }

    return orgWithBalence;
  }

  async donate(id, amount, tip) {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);

    const updatedAmt = amount * 1e18;

    const donate = await this.uDonate.methods.donateETH(id, tip).send({ from: this.accounts[0], value: updatedAmt })

    return donate;
  }
}
