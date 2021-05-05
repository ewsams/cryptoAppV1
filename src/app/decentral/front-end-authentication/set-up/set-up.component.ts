import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss']
})
export class SetUpComponent implements OnInit {
  images:any;
  constructor() { }

  ngOnInit() {
    this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  }

}
