import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss']
})
export class SetUpComponent implements OnInit {
  images: string[];
  constructor() { }

  ngOnInit() {
    this.gatherImages();
  }

  gatherImages = () => {
    this.images = [
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/metaMask.gif?alt=media&token=3dbcf322-1373-488e-9460-eada2af9607d',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/createWallet.gif?alt=media&token=a1d27ffc-2221-4d53-9674-d637a80c2453',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step3.gif?alt=media&token=dae25d00-3143-451a-ada5-a43f4a7bd499',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/addAddress.gif?alt=media&token=7d167c91-1eec-4ff8-8613-614318714cbf',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/sendEther.gif?alt=media&token=04e3fd80-8dab-454d-b99d-9fd428627dad',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/appTokenStep.gif?alt=media&token=79ede12a-b45c-481d-8380-0e01abd32c7a',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Success.gif?alt=media&token=2aab1a26-1055-4510-983e-d863d878352c',
    ];
  }
}
