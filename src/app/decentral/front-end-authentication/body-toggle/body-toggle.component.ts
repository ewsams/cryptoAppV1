import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MobileModalComponent } from '../mobile-modal/mobile-modal.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-body-toggle',
  template: `
<div class="container">
    <div class="row">
    <img
        class="justify-content-left"
        style="height:2rem;width:2rem;cursor:pointer;"
        (click)="toggleBodyBackground()"
        src={{icon}}/>
  </div>
</div>
  `,
  styleUrls: ['./body-toggle.component.scss'],
})
export class BodyToggleComponent implements OnInit {
  dark: any;
  constructor(private render: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private userService: UserService) {}
  icon = '../../../../assets/img/pngjoy.com_sun-icon-white-sun-blue-background-transparent-png_2479146.png';

  ngOnInit() {
  }

  toggleBodyBackground() {
    this.dark = !this.dark;
    if (this.dark) {
     this.render.removeClass(this.document.body, 'brand-color-animation');
     this.render.addClass(this.document.body, 'light');
     this.userService.getBackgroundColor(true);
     this.icon = '../../../../assets/img/pnghut_moon-icon-white.png';
    } else {
      document.body.style.backgroundColor = 'brand-color-animation';
      this.render.removeClass(this.document.body, 'light');
      this.render.addClass(this.document.body, 'brand-color-animation');
      this.userService.getBackgroundColor(false);
      this.icon = '../../../../assets/img/pngjoy.com_sun-icon-white-sun-blue-background-transparent-png_2479146.png';
    }
  }
}
