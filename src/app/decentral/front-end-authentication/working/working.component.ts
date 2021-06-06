import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-working',
  template: `
  <div class="container" style="border:solid white 3px; position:absolute;top:0;"
  [ngStyle]="{'background-color': color ? 'rgb(121,141,179)' :'rgb(35,40,50)'}">
  <div class="close-icon" (click)="closeModal()">X</div>
  <img
    src="../assets/img/appollo-logo.png"
    style="width: 6rem; height: 6rem;"
  />
  <img
    src="../assets/img/appollo-text-logo.png"
    style="width: 8rem; height: 8rem;"
  />
  <div class="modal-body">
  <h3 style="text-align:center;font-family:Impact;">
  No Pump and Dumps ever. This project is dedicated to a long and prosperous life...</h3>
  <h3 style="text-align:left; font-family:Impact">The developers thank you for your patience as we continue to develop.This is going to be worth the wait...</h3>
    <h4 style="text-align:center">"The world of crypto currency is at your
          fingertips"...</h4>
    </div>
</div>
  `,
  styleUrls: ['./working.component.scss']
})
export class WorkingComponent implements OnInit {color: boolean;
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

