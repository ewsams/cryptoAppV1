import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LotteryService } from 'src/app/util/lottery.service';
import { Web3Service } from 'src/app/util/web3.service';


@Component({
  selector: 'app-loterry',
  templateUrl: './loterry.component.html',
  styleUrls: ['./loterry.component.scss']
})
export class LoterryComponent implements OnInit {
  isPlaying = false;
  lotterySub: Subscription;
  nums: number[];

  constructor(private web3Service: Web3Service,
    private lottorryService: LotteryService) {
  }
  ngOnInit() {
  }

  async purchaseSpins(){
    await this.web3Service.lottery(200000000000000000000);
  }

  // The User will enter their wager in Ethereum
  async playLottery() {
    this.isPlaying = true;
    this.lotterySub = this.lottorryService.getNumbers().subscribe(numbers => {
        this.nums =
        numbers.replace(/\n/g, ',').split(',').map(
          Number).slice(0, -1);
    });
    setTimeout(() => this.isPlaying = false, 6500);
  }

  ngOnDestroy() {
    this.lotterySub.unsubscribe();
  }

}
