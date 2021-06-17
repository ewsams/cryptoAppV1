import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-body-toggle',
  template: `

    <div class="align-self">
    <div class="mt-3 ml-3">
    <img
        style="height:2rem;width:2rem;cursor:pointer;"
        (click)="toggleBodyBackground()"
        src={{icon}}/>
  </div>

  `,
  styleUrls: ['./body-toggle.component.scss'],
})
export class BodyToggleComponent implements OnInit {
  dark: boolean;
  loggedInSub: Subscription;
  isLoggedIn: boolean;
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
    } else  {
      this.render.removeClass(this.document.body, 'light');
      this.render.addClass(this.document.body, 'brand-color-animation');
      this.userService.getBackgroundColor(false);
      this.icon = '../../../../assets/img/pngjoy.com_sun-icon-white-sun-blue-background-transparent-png_2479146.png';
    }
  }
  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
