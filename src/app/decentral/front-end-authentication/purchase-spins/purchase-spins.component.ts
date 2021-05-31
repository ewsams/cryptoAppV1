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
  constructor( public activeModal: NgbModal,
               private userService: UserService,
               private web3Service: Web3Service) { }

  ngOnInit() {
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
   }

   
    purchase50Spins = async () => {
      await this.web3Service.lotteryDeposit(100000000000000000000);
    }

    purchase100Spins = async () => {
      await this.web3Service.lotteryDeposit(250000000000000000000);
    }

    purchase200Spins = async () => {
      await this.web3Service.lotteryDeposit(500000000000000000000);
    }

   ngOnDestroy() {
     this.colorSubscription.unsubscribe();
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

}

