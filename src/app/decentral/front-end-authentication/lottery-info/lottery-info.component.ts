import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-lottery-info',
  templateUrl: './lottery-info.component.html',
  styleUrls: ['./lottery-info.component.scss']
})
export class LotteryInfoComponent implements OnInit { color: boolean;
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

