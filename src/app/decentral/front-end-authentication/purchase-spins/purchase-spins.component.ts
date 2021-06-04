import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-purchase-spins',
  templateUrl: './purchase-spins.component.html',
  styleUrls: ['./purchase-spins.component.scss']
})
export class PurchaseSpinsComponent implements OnInit {color: boolean;
  colorSubscription: Subscription;
  spinsTransactionReceipt: any;
  transactionSubscription: Subscription;
  confirmationWallet:string;
  appolloTransfered:number;
  spinsPurchased: string;
  awaitingTransactionConfirmation:boolean;

  
  constructor( public activeModal: NgbModal,
               private userService: UserService,
               private web3Service: Web3Service) { }

  ngOnInit() {
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
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
          if(receipt.status === true){
            this.spinsTransactionReceipt = receipt;
            this.awaitingTransactionConfirmation = false;
            
            this.confirmationWallet = 
            this.spinsTransactionReceipt.events.Transfer.address;
            
            this.appolloTransfered = 
           Number(this.spinsTransactionReceipt.events.Transfer.returnValues.value) / 1000000000000000000;
          }
          if(this.appolloTransfered === 100){
            this.spinsPurchased =
            `Congrats you just purchased 50 spins using ${this.appolloTransfered} APP`;
          }        
          if(this.appolloTransfered === 250){
            this.spinsPurchased = 
            `Congrats you just purchased 100 spins using ${this.appolloTransfered} APP`;
          }
          if(this.appolloTransfered === 500){
            this.spinsPurchased = 
            `Congrats you just purchased 200 spins using ${this.appolloTransfered} APP`;
          }
      });  
        console.log(this.spinsTransactionReceipt,this.confirmationWallet,this.appolloTransfered);
    }

   ngOnDestroy() {
     this.colorSubscription.unsubscribe();
     if(this.transactionSubscription){
      this.transactionSubscription.unsubscribe();
     }
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

}

