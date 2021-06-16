import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { AuthService } from 'src/app/decentral/front-end-authentication/services/auth.service';
import { UserService } from 'src/app/decentral/front-end-authentication/services/user.service';

@Component({
  selector: 'app-countdown',
  template: `
  <div *ngIf="dateLoaded" class="row justify-content-center">
  <div [ngStyle]="{'color': dangerColorDisplay ? 'rgb(255,129,123)' :'rgb(2,233,188)'}"
  class="mx-auto text-center">Auction Ends:
      <p [ngStyle]="{'color': dangerColorDisplay ? 'rgb(255,129,123)' :'rgb(2,233,188)'}"
       id="days"> {{daysToDday}} {{Days}}</p>
      <p [ngStyle]="{'color': dangerColorDisplay ? 'rgb(255,129,123)' :'rgb(2,233,188)'}"
       id="hours"> {{hoursToDday}} {{Hours}}</p><br>
    <p [ngStyle]="{'color': dangerColorDisplay ? 'rgb(255,129,123)' :'rgb(2,233,188)'}"
     id="minutes"> {{minutesToDday}} {{Minutes}}</p>
    <p [ngStyle]="{'color': dangerColorDisplay ? 'rgb(255,129,123)' :'rgb(2,233,188)'}"
     id="seconds"> {{secondsToDday}} {{Seconds}} </p>
    </div>
  </div>
  `,
  styleUrls: ['./countdown.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

  @Input() auctionStart;
  private subscription: Subscription;
  logginSub: Subscription;
  isLoggedIn: boolean;
  auctionCountdowDate: any;
  dateLoaded: boolean;
  dangerColorDisplay: boolean;

  constructor(
    private web3Service: Web3Service,
    private authService: AuthService,
    private userService: UserService) { }

  public dateNow = new Date();
  dDay: Date;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

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
    this.getCountdown();
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
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
    this.dateLoaded = false;
    this.logginSub = this.authService.userLoggedInCheck$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.subscription = interval(1000)
      .subscribe(x => {
        this.getTimeDifference();
        this.formatSingleValues();
        if (this.daysToDday === 2){
          this.dangerColorDisplay = true;
        }
        this.dateLoaded = true;
      });

  }

  ngOnDestroy() {
    if(this.subscription && this.logginSub){
      this.subscription.unsubscribe();
      this.logginSub.unsubscribe();
    }
  }

  formatSingleValues() {
    if (this.daysToDday === 1) {
      this.Days = 'Day';
    } else {
      this.Days = 'Days';
    } if (this.hoursToDday === 1) {
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

  getCountdown = () => {
    const auctionCountDownDate = this.auctionStart.setDate(this.auctionStart.getDate() + 7)
    this.dDay = new Date(auctionCountDownDate);
  }
}
