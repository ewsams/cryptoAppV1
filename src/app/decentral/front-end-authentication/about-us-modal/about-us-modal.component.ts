import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription} from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-us-modal',
  template: `
  <div class="container" style="border:solid white 3px; position:absolute;top:0;"
  [ngStyle]="{'background-color': color ? 'rgb(121,141,179)' :'rgb(35,40,50)'}">
  <img
    src="../assets/img/appollo-logo.png"
    style="width: 6rem; height: 6rem;"
  />
  <img
    src="../assets/img/appollo-text-logo.png"
    style="width: 8rem; height: 8rem;"
  />
  <span class="modal-header modal-header-style">
    <h3 class="modal-title" style="color:white;">
      <strong style="border-bottom:solid white 1px;">
        We aim to provide our Hodlers the best Liquidty and Lowest fees of any token</strong
      >
    </h3>
  </span>
  <div class="modal-body">
  <h3 style="text-align:center;font-family:Impact;">
  Our goals through Quarter 4 2021 are as follows...</h3>
  <h3 style="text-align:left; font-family:Times">I) Goal</h3>
  <h3 style="text-align:left; font-family:Times">II) Goal</h3>
  <h3 style="text-align:left; font-family:Times">III) Goal</h3>
  <h3 style="text-align:left; font-family:Times">IV) Goal</h3>
  <h3 style="text-align:left; font-family:Times">V) Goal</h3>
  <h3 style="text-align:left; font-family:Times">VI) Goal</h3>
    <h4 style="text-align:center">"The world of crypto currency is at your
          fingertips"...</h4>
    </div>
</div>
  `,
  styleUrls: ['./about-us-modal.component.scss']
})
export class AboutUsModalComponent implements OnInit {
  color: boolean;
  colorSubscription: Subscription;
  constructor( public activeModal: NgbActiveModal,
               private userService: UserService) { }

  ngOnInit() {
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
   }

   ngOnDestroy() {
     this.colorSubscription.unsubscribe();
  }

}
