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
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step1.gif?alt=media&token=f878263b-677e-4889-9114-8417801c5b1b',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step2.gif?alt=media&token=5947d8ba-e84b-4b86-8f97-4805c369407b',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step3.gif?alt=media&token=41da2d17-793a-4f30-99dd-9383501ea0a2',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step4.gif?alt=media&token=77d70c85-8989-4585-a21f-dc0232d277c6',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step5.gif?alt=media&token=8f17df22-f9b7-4519-acff-d046d85bc4b2',
      'https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Step6.gif?alt=media&token=2726c5e5-2623-40b5-85ca-4f6d86619d83',
    ];
  }
}
