import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription} from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-us-modal',
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
  <h2 style="text-align:center;font-family:Impact;">
  Our goals through 2021 are as follows...</h2>
  <h3 class="goal-align" id="goal1">I) Complete our ICO.</h3>
  <h3 class="goal-align" id="goal2">II) Begin Appollo Token lottos.</h3>
  <h3 class="goal-align" id="goal3">III) Initialize our NFT market.</h3>
  <h3 class="goal-align" id="goal4">IV) Create liquidity pools to reduce gas fees.</h3>
  <h3 class="goal-align" id="goal5">V) Build a bridge in order to utilize other block chains.</h3>
  <h3 class="goal-align" id="goal6">VI) Continue to build our presence and brand.</h3>
    </div>
</div>
  `,
  styleUrls: ['./about-us-modal.component.scss']
})
export class AboutUsModalComponent implements OnInit {
  color: boolean;
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
