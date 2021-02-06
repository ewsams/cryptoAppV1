import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-body-toggle',
  template: `
    <div class="checkbox switcher">
      <label for="test1">
        <input
          (click)="toggleBodyBackground()"
          type="checkbox"
          id="test1"
          value=""
          checked
        />
        <span><small></small></span>
      </label>
    </div>
  `,
  styleUrls: ['./body-toggle.component.scss'],
})
export class BodyToggleComponent implements OnInit {
  dark: any;
  constructor(private render: Renderer2, @Inject(DOCUMENT) private document: Document, private userService: UserService) {}

  ngOnInit() {}

  toggleBodyBackground() {
    this.dark = !this.dark;
    if (this.dark) {
     this.render.removeClass(this.document.body, 'brand-color-animation');
     this.render.addClass(this.document.body, 'light');
     this.userService.getBackgroundColor(true);
    } else {
      document.body.style.backgroundColor = 'brand-color-animation';
      this.render.removeClass(this.document.body, 'light');
      this.render.addClass(this.document.body, 'brand-color-animation');
      this.userService.getBackgroundColor(false);
    }
  }
}
