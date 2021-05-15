import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/util/web3.service';


@Component({
  selector: 'app-loterry',
  templateUrl: './loterry.component.html',
  styleUrls: ['./loterry.component.scss']
})
export class LoterryComponent implements OnInit {
 isPlaying = false;

  constructor(private web3Service: Web3Service) {
  }
  ngOnInit() {
  }

  lottery = () => {

  }

  playLottery(){
    this.isPlaying = true;
    setTimeout( () => this.isPlaying = false, 10000);
  
  }

}
