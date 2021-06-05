import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../services/firestore.service';

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
  currentUser: any;
  userSub: Subscription;
  user: any;
  userRetrieved: boolean;


  constructor(public activeModal: NgbModal,
    private userService: UserService,
    private web3Service: Web3Service,
    private afAuth: AngularFireAuth,
    private db: FirestoreService) { }

  ngOnInit() {
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
        this.setUserSpins(50);
        }
      if (this.appolloTransfered === 250) {
        this.spinsPurchased =
          `Congrats you just purchased 100 spins using ${this.appolloTransfered} APP`;
         this.setUserSpins(100);
        }
      if (this.appolloTransfered === 500) {
        this.spinsPurchased =
          `Congrats you just purchased 200 spins using ${this.appolloTransfered} APP`;
          this.setUserSpins(200);
      }
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
    if (this.transactionSubscription && this.userSub) {
      this.transactionSubscription.unsubscribe();
      this.userSub.unsubscribe();
    }
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

  getCurrentUser = async () => {
    this.currentUser = await this.afAuth.currentUser;
    this.userSub = this.db.colWithIds$('users').subscribe(users => {
      this.users$ = users;
      this.user = this.users$.find(user => user.email === this.currentUser.email);
      this.userRetrieved = true;
    });
  }

  setUserSpins = (userSpinsNumber:number) => {
    if(!this.user.spins){
      this.db.set(`users/${this.user.id}`,{...this.user,spins: userSpinsNumber});
    } else {
      this.db.set(`users/${this.user.id}`,{...this.user,spins: userSpinsNumber + this.user.spins});
    }
  }
}
