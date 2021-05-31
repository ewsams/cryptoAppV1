import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LotteryService } from 'src/app/util/lottery.service';
import { Web3Service } from 'src/app/util/web3.service';
import { LotteryInputComponent } from '../lottery-input/lottery-input.component';
import { PurchaseSpinsComponent } from '../purchase-spins/purchase-spins.component';


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
  currentLotteryBalance: number;
  lotteryBalanceSub: Subscription;
  randomLotteryNumberSub: Subscription;
  winnerString: string;
  alertMessage: boolean;

  constructor(private web3Service: Web3Service,
    private lottorryService: LotteryService,
    private modal: NgbModal) {
  }
  ngOnInit() {
    this.web3Service.checkLottoBalance();
    this.lotteryBalanceSub = this.web3Service.lottoBalance$.subscribe(balance => {
      this.currentLotteryBalance = balance;
    });
    this.getPlayersLottoNumbers();
  }

  // The User will enter their wager in Ethereum
  purchaseSpins = async () => {
    this.modal.open(PurchaseSpinsComponent, {
      size: 'lg',
    });
    // await this.web3Service.lotteryDeposit(200000000000000000000);
  }

  playLottery = async () => {
    if (this.playerNumbers === null) {
      this.isPlaying = false;
      this.alertMessage = true;
    } else {
      this.isPlaying = true;
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
    return this.winnerString = `Congratulations You Win!`;
  }


  ngOnDestroy() {
    if (this.randomLotteryNumberSub && 
      this.playerNumbersSub &&
      this.lotteryBalanceSub) {
      this.randomLotteryNumberSub.unsubscribe();
      this.playerNumbersSub.unsubscribe();
      this.lotteryBalanceSub.unsubscribe();
    }
  }

}
