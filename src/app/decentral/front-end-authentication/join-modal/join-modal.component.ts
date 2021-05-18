import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription} from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal-joining',
  template: `
    <div
      class="container"
      style="display: flex; align-items: flex-start; border:solid white 3px; position:fixed;top:0;"
      [ngStyle]="{'background-color': color ? 'rgb(121,141,179)' :'rgb(35,40,50)'}"
    >
      <div class="modal-header" style="background-color: transparent;">
        <h4 class="modal-title" style="color:white;">
        <span *ngIf="!whiteListed" class="w-100" style="border-bottom:solid white 1px;">
            Welcome Let's Get Started</span
          >
          <div *ngIf="whiteListed" class="text-success whitelisted-notification">Congrats Account: {{whiteListedAccount}} 
          <br> is now Whitelisted. Please Log In...</div>
          <div class="mt-4" style="padding:2rem">
            <strong
              >"You can earn crypto by creating your own artistic 
              content with your friends..."</strong
            >
          </div>

          <div class="mb-2">
            <strong
              >"The world of crypto currency is just at your
              fingertips"...</strong
            >
          </div>

          <div>
            <span>
              <img
                class="mb-2"
                src="../assets/img/appollo-logo.png"
                style="width: 16rem; height: 16rem;"
              />
            </span>
          </div>
        </h4>
      </div>
      <div class="modal-body">
        <app-join></app-join>
      </div>
    </div>
  `,
})
export class NgbdModalContentComponent implements OnInit {
  color: boolean;
  colorSubscription: Subscription;
  whiteListed: boolean;
  whiteListedSubscription:Subscription;
  whiteListedAccountSubscription: Subscription;
  whiteListedAccount: string;
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private web3Service: Web3Service
  ) {}

  ngOnInit() {
    this.whiteListedSubscription = this.web3Service.isWhiteListed$.subscribe(isListed => {
      this.whiteListed = isListed;
    })
    this.whiteListedAccountSubscription = this.web3Service.whiteListedAccountAddress$.subscribe(account => {
      this.whiteListedAccount = account;
    });
   this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
     this.color = color;
   });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
    this.whiteListedAccountSubscription.unsubscribe();
    this.whiteListedSubscription.unsubscribe();
 }
}

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styles: [
    `
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class JoinModalComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit() {}
}
