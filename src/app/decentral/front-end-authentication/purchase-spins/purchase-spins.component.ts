import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-purchase-spins',
  templateUrl: './purchase-spins.component.html',
  styleUrls: ['./purchase-spins.component.scss']
})
export class PurchaseSpinsComponent implements OnInit {color: boolean;
  colorSubscription: Subscription;
  constructor( public activeModal: NgbModal,
               private userService: UserService) { }

  ngOnInit() {
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
   }

   ngOnDestroy() {
     this.colorSubscription.unsubscribe();
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

}

