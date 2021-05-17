import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/util/web3.service';


@Component({
  selector: 'app-loterry',
  templateUrl: './loterry.component.html',
  styleUrls: ['./loterry.component.scss']
})
export class LoterryComponent implements OnInit {
 isPlaying = false;
 playerDeposit: number;

  constructor(private web3Service: Web3Service) {
  }
  ngOnInit() {
  }

  // The User will enter their wager in Ethereum
  async playLottery(){
    await this.web3Service.lottery(200000000000000000);
    this.isPlaying = true;
    setTimeout( () => this.isPlaying = false, 10000);
  
  }

}
