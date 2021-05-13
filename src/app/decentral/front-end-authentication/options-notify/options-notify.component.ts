import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-options-notify',
  templateUrl: './options-notify.component.html',
  styleUrls: ['./options-notify.component.scss']
})
export class OptionsNotifyComponent implements OnInit {color: boolean;
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

