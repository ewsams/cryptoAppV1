import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';
import AppolloTokenCrowdsale from 'build/contracts/AppolloTokenCrowdsale.json';

@Component({
  selector: 'app-purchase-spins',
  templateUrl: './purchase-spins.component.html',
  styleUrls: ['./purchase-spins.component.scss']
})
export class PurchaseSpinsComponent implements OnInit {
  color: boolean;
  colorSubscription: Subscription;
  spinsTransactionReceipt: any;
  transactionSubscription: Subscription;
  confirmationWallet: string;
  appolloTransfered: number;
  spinsPurchased: string;
  awaitingTransactionConfirmation: boolean;
  users$: any;
  userSub: Subscription;
  user: any;
  userRetrieved: boolean;
  userTokenBalanceSub: Subscription;
  appolloAmount$: number;
  insufficientAppolloAvailable: boolean;
  insufficientAPPMessage: string;


  constructor(public activeModal: NgbModal,
    private userService: UserService,
    private web3Service: Web3Service,
    private db: FirestoreService) { }

  ngOnInit() {
    this.gatherUserTokens();
    this.userRetrieved = false;
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
    this.getCurrentUser();
  }


  purchase50Spins = async () => {
    this.awaitingTransactionConfirmation = true;
    await this.web3Service.lotteryDeposit(100000000000000000000);
    this.confirmSpinsPurchase();
  }

  purchase100Spins = async () => {
    this.awaitingTransactionConfirmation = true;
    await this.web3Service.lotteryDeposit(250000000000000000000);
    this.confirmSpinsPurchase();
  }

  purchase200Spins = async () => {
    this.awaitingTransactionConfirmation = true;
    await this.web3Service.lotteryDeposit(500000000000000000000);
    this.confirmSpinsPurchase();
  }

  confirmSpinsPurchase = () => {
    this.transactionSubscription = this.web3Service.spinsTransactionReceipt$.subscribe(receipt => {
      if (receipt.status === true) {
        this.spinsTransactionReceipt = receipt;
        this.awaitingTransactionConfirmation = false;

        this.confirmationWallet =
          this.spinsTransactionReceipt.events.Transfer.address;

        this.appolloTransfered =
          Number(this.spinsTransactionReceipt.events.Transfer.returnValues.value) / 1000000000000000000;
      }
      if (this.appolloTransfered === 100) {
        this.spinsPurchased =
          `Congrats you just purchased 50 spins using ${this.appolloTransfered} APP`;
        this.updateUserSpins(50);
        }
      if (this.appolloTransfered === 250) {
        this.spinsPurchased =
          `Congrats you just purchased 100 spins using ${this.appolloTransfered} APP`;
         this.updateUserSpins(100);
        }
      if (this.appolloTransfered === 500) {
        this.spinsPurchased =
          `Congrats you just purchased 200 spins using ${this.appolloTransfered} APP`;
          this.updateUserSpins(200);
      }
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
    if (this.transactionSubscription && 
      this.userSub && this.userTokenBalanceSub) {
      this.transactionSubscription.unsubscribe();
      this.userSub.unsubscribe();
      this.userTokenBalanceSub.unsubscribe();
    }
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

  getCurrentUser = async () => {
      this.userSub = this.userService.currentUser$.subscribe(user => {
        this.user = user;
        this.userRetrieved = true;
      });
  }

  updateUserSpins = (userSpinsNumber:number) => {
    if(!this.user.spins){
      this.db.update(`profiles/${this.user.id}`,{spins: userSpinsNumber});
    } else {
      this.db.update(`profiles/${this.user.id}`,{spins: userSpinsNumber + this.user.spins});
    }
  }

  gatherUserTokens = () => {
    const tokens = this.web3Service.userCurrentTokens();
    this.userTokenBalanceSub = this.web3Service.userAvailiableTokens$.subscribe(tokens => {
      this.appolloAmount$ = tokens;
      if(this.appolloAmount$ < 100){
        this.insufficientAppolloAvailable = true; 
        const appRequiredToPurchase = 100 - this.appolloAmount$;
        const appolloSaleAddress = AppolloTokenCrowdsale.networks[1].address;
        this.insufficientAPPMessage = 
        `Currently you have ${this.appolloAmount$} APP
          You need ${appRequiredToPurchase} more APP to purchase Spins... 
          Use this address: ${appolloSaleAddress} to purchase APP... 
        `;
      }
    });
  }

}
