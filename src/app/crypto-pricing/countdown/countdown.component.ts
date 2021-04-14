import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileModalComponent } from 'src/app/decentral/front-end-authentication/mobile-modal/mobile-modal.component';

@Component({
  selector: 'app-countdown',
  template: `
  <div class="row">
  <div class="text-white mx-auto mobile-cta" (click)="openJoin()">Join Us</div>
  <div class="text-white mx-auto mobile-cta" (click)="openAbout()">About Us</div></div>
  <div class="row">
  <div class="text-white mx-auto">ICO begins in:
      <span id="days"> {{daysToDday}} Days</span>
        <span id="hours"> {{hoursToDday}} Hours</span>
      <span id="minutes"> {{minutesToDday}} Minutes</span>
    <span id="seconds"> {{secondsToDday}} Seconds </span>
    </div>
  </div>
  `,
  styleUrls: ['./countdown.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor( private modal: NgbModal) {}

  public dateNow = new Date();
  public dDay = new Date('May 05 2021 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;


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
         .subscribe(x => { this.getTimeDifference(); });
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
  this.modal.open(MobileModalComponent, {
    size: 'sm',
  });
}
}
