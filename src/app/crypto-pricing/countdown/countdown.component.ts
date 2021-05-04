import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileModalComponent } from 'src/app/decentral/front-end-authentication/mobile-modal/mobile-modal.component';
import { AboutUsModalComponent } from 'src/app/decentral/front-end-authentication/about-us-modal/about-us-modal.component';
import { Web3Service } from 'src/app/util/web3.service';

@Component({
  selector: 'app-countdown',
  template: `
  <div class="row">
  <div class="text-white mx-auto mobile-cta" (click)="openJoin()">Join Us</div>
  <div class="text-white mx-auto mobile-cta" (click)="openAbout()">About Us</div>
  <span class="connect-Cta text-white mx-auto mobile-cta btn btn-primary" (click)="connectWallet()">Connect Your Web3 Wallet</span>
  </div>
  <div class="row">
  <div class="text-white mx-auto">ICO begins in:
      <span id="days"> {{daysToDday}} {{Days}}</span>
        <span id="hours"> {{hoursToDday}} {{Hours}}</span>
      <span id="minutes"> {{minutesToDday}} {{Minutes}}</span>
    <span id="seconds"> {{secondsToDday}} {{Seconds}} </span>
    </div>
  </div>
  `,
  styleUrls: ['./countdown.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor( private modal: NgbModal, private web3Service: Web3Service) {}

  public dateNow = new Date();
  public dDay = new Date('May 11 2021 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  public Days = 'Days';
  public Hours = 'Hours';
  public Minutes = 'Minutes';
  public Seconds = 'Seconds';

  private getTimeDifference() {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
  }

private allocateTimeUnits(timeDifference) {
      this.secondsToDday =
      Math.floor((timeDifference) /
      (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday =
      Math.floor((timeDifference) /
      (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday =
      Math.floor((timeDifference) /
      (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday =
      Math.floor((timeDifference) /
      (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    }

  ngOnInit() {
     this.subscription = interval(1000)
         .subscribe(x => { this.getTimeDifference(); this.formatSingleValues(); });
  }

 ngOnDestroy() {
    this.subscription.unsubscribe();
 }

 openJoin() {
  this.modal.open(MobileModalComponent, {
    size: 'sm',
  });
}
openAbout() {
  this.modal.open(AboutUsModalComponent, {
    size: 'sm',
  });
}
formatSingleValues() {
  if (this.daysToDday === 1) {
    this.Days = 'Day';
  } else {
    this.Days = 'Days';
  }  if (this.hoursToDday === 1) {
    this.Hours = 'Hour';
  } else {
    this.Hours = 'Hours';
  } if (this.minutesToDday === 1) {
    this.Minutes = 'Minute';
  } else {
    this.Minutes = 'Minutes';
  } if (this.secondsToDday === 1) {
    this.Seconds = 'Second';
  } else {
    this.Seconds = 'Seconds';
  }
}

connectWallet() {
  this.web3Service.connectAccount();
}
}
