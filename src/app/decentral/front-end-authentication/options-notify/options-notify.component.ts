import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-notify',
  templateUrl: './options-notify.component.html',
  styleUrls: ['./options-notify.component.scss']
})
export class OptionsNotifyComponent implements OnInit {
  candle1: HTMLElement;
  candle2: HTMLElement;
  candle3: HTMLElement;
  candle4: HTMLElement;
  candle6: HTMLElement;
  candle7: HTMLElement;
  candle8: HTMLElement;
  candle9: HTMLElement;
  candle10: HTMLElement;
  candle11: HTMLElement;
  candle12: HTMLElement;
  candle13: HTMLElement;
  candle14: HTMLElement;
  candle15: HTMLElement;
  candle16: HTMLElement;
  candle17: HTMLElement;
  candle18: HTMLElement;
  candle19: HTMLElement;
  candle20: HTMLElement;
  candle21: HTMLElement;
  candles: HTMLElement[];

  constructor() { 
  }
  
  ngOnInit() {
    this.buildChart();
  }

  buildChart(){
    this.candles = [
      this.candle1 = document.getElementById('Candle1'),
      this.candle2 = document.getElementById('Candle2'),
      this.candle3 = document.getElementById('Candle3'),
      this.candle4 = document.getElementById('Candle4'),
      this.candle6 = document.getElementById('Candle6'),
      this.candle7 = document.getElementById('Candle7'),
      this.candle8 = document.getElementById('Candle8'),
      this.candle9 = document.getElementById('Candle9'),
      this.candle10 = document.getElementById('Candle10'),
      this.candle11= document.getElementById('Candle11'),
      this.candle12 = document.getElementById('Candle12'),
      this.candle13 = document.getElementById('Candle13'),
      this.candle14 = document.getElementById('Candle14'),
      this.candle15= document.getElementById('Candle15'),
      this.candle16 = document.getElementById('Candle16'),
      this.candle17= document.getElementById('Candle17'),
      this.candle18= document.getElementById('Candle18'),
      this.candle19= document.getElementById('Candle19'),
      this.candle20= document.getElementById('Candle20'),
      this.candle21 = document.getElementById('Candle21'),
      ];
  }
}
