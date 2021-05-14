import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loterry',
  templateUrl: './loterry.component.html',
  styleUrls: ['./loterry.component.scss']
})
export class LoterryComponent implements OnInit {
 isPlaying = false;

  constructor() {
  }
  ngOnInit() {
  }

  playLottery(){
    this.isPlaying = true;
    setTimeout( () => this.isPlaying = false, 10000);
  
  }

}
