import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LotteryService } from 'src/app/util/lottery.service';
import { Web3Service } from 'src/app/util/web3.service';
import { LotteryInputComponent } from '../lottery-input/lottery-input.component';


@Component({
  selector: 'app-loterry',
  templateUrl: './loterry.component.html',
  styleUrls: ['./loterry.component.scss']
})
export class LoterryComponent implements OnInit {
  isPlaying = false;
  lotterySub: Subscription;
  nums: number[];
  playerNumbers: Number[];

  constructor(private web3Service: Web3Service,
    private lottorryService: LotteryService,
    private modal:NgbModal) {
  }
  ngOnInit() {
  }

   // The User will enter their wager in Ethereum
   purchaseSpins = async () => {
    await this.web3Service.lottery(200000000000000000000);
  }

  playLottery = async () => {
    this.getPlayersLottoNumbers();
    if(this.playerNumbers === null){
      this.isPlaying = false;
      alert('please add numbers to play');
    }else{ 
        this.isPlaying = true;
        this.getLottoNumbers();
        setTimeout(() => this.finishedPlaying(), 6500);
      }
  }

  finishedPlaying = () => {
    this.isPlaying = false;
    this.lottorryService.playerNumbers.next(null);
  }

  ngOnDestroy() {
    this.lotterySub.unsubscribe();
  }

  getLottoNumbers = () => { 
    this.lotterySub = this.lottorryService.getNumbers().subscribe(numbers => {
      this.nums =
      numbers.replace(/\n/g, ',').split(',').map(
        Number).slice(0, -1);
  });
  }

  openLotteryNumbersInput = () =>  {
    this.modal.open(LotteryInputComponent, {
      size: 'md',
    });
  }

  getPlayersLottoNumbers = () => {
    this.lottorryService.playerNumbers$.subscribe(numbers => {
      this.playerNumbers = numbers;
      console.log(this.playerNumbers);
    })
  }

}
