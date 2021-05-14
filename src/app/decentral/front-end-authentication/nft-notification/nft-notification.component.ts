import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nft-notification',
  templateUrl: './nft-notification.component.html',
  styleUrls: ['./nft-notification.component.scss']
})
export class NftNotificationComponent implements OnInit {
  colorSubscription: Subscription;
  color: any;

  constructor(private userService: UserService,
    public activeModal: NgbModal,) { }

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