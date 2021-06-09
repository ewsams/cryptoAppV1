import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LotteryService } from 'src/app/util/lottery.service';
import { Web3Service } from 'src/app/util/web3.service';
import { LotteryInputComponent } from '../lottery-input/lottery-input.component';
import { PurchaseSpinsComponent } from '../purchase-spins/purchase-spins.component';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LotteryInfoComponent } from '../lottery-info/lottery-info.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-loterry',
  templateUrl: './loterry.component.html',
  styleUrls: ['./loterry.component.scss']
})
export class LoterryComponent implements OnInit {
  isPlaying: boolean;
  nums: number[];
  playerNumbers: Number[];
  playerNumbersSub: Subscription;
  currentLotteryBalance: string;
  lotteryBalanceSub: Subscription;
  randomLotteryNumberSub: Subscription;
  winnerString: string;
  alertMessage: boolean;
  userSub: Subscription;
  user: any;
  userRetrieved: boolean;
  alertMessageString: string;

  constructor(
    private web3Service: Web3Service,
    private lottorryService: LotteryService,
    private modal: NgbModal,
    private userService: UserService,
    private db: FirestoreService) {
  }
  ngOnInit() {
    this.userRetrieved = false;
    this.getCurrentUser();
    this.web3Service.checkLottoBalance();
    this.lotteryBalanceSub = this.web3Service.lottoBalance$.subscribe(balance => {
      this.currentLotteryBalance = balance.toFixed(2);
    });
    this.getPlayersLottoNumbers();
  }

  // The User will enter their wager in Ethereum
  purchaseSpins = () => {
    this.modal.open(PurchaseSpinsComponent, {
      size: 'lg',
    });
  }

  playLottery = () => {
    if (!this.user.spins || this.user.spins === 0) {
      this.isPlaying = false;
      this.alertMessage = true;
      this.alertMessageString = 'Please Purchase Spins to Play...';
    }
    else if (this.playerNumbers === null) {
      this.isPlaying = false;
      this.alertMessage = true;
      this.alertMessageString = 'Please Select Numbers to Play...';
    } else {
      this.isPlaying = true;
      this.db.update(`profiles/${this.user.id}`,{...this.user,spins: this.user.spins - 1});
      this.getLottoNumbers();
      setTimeout(() => this.finishedPlaying(), 6500);
    }
  }

  finishedPlaying = () => {
    this.isPlaying = false;
    this.lottorryService.playerNumbers.next(null);
  }

  getLottoNumbers = () => {
    this.randomLotteryNumberSub = this.lottorryService.getNumbers().subscribe(numbers => {
      this.nums =
        numbers.replace(/\n/g, ',').split(',').map(
          Number).slice(0, -1);
      // comparing users numbers
      this.compareUsersNumbers();
    });
  }

  openLotteryNumbersInput = () => {
    this.modal.open(LotteryInputComponent, {
      size: 'md',
    });
  }

  lotteryInfo = () => {
    this.modal.open(LotteryInfoComponent, {
      size: 'md',
    });
  }

  getPlayersLottoNumbers = () => {
    this.playerNumbersSub = this.lottorryService.playerNumbers$.subscribe(numbers => {
      this.playerNumbers = numbers;
    });
  }

  compareUsersNumbers = (): String => {
    for (let i = 0; i < this.nums.length; i++) {
      if (this.nums[i] !== this.playerNumbers[i]) {
        return this.winnerString = `Please Play Again...`;
      }
    }
    this.web3Service.payLotteryWinner();
    this.db.update(`profiles/${this.user.id}`, {
      winner:true, amount:this.currentLotteryBalance
    });
    return this.winnerString = `Congratulations You Win!`;
  }

  getCurrentUser = async () => {
    this.userSub = this.userService.currentUser$.subscribe(user => {
      this.user = user;
      this.userRetrieved = true;
    });
  }

  ngOnDestroy() {
    if (this.randomLotteryNumberSub &&
      this.playerNumbersSub &&
      this.lotteryBalanceSub && this.userSub) {
      this.randomLotteryNumberSub.unsubscribe();
      this.playerNumbersSub.unsubscribe();
      this.lotteryBalanceSub.unsubscribe();
      this.userSub.unsubscribe();
    }
  }
}
