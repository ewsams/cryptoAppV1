import { Component, Inject, OnInit,Renderer2  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LogginService } from './decentral/front-end-authentication/services/loggin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  username: string;
  password: string;
  dark: boolean;
  constructor(private router: Router, private logginService: LogginService,
    private render: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.logginService.$logginCheckObservable.subscribe((element) => {
      if (element === false) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }

  toggleBodyBackground() {
    this.dark = !this.dark;
    if(this.dark) {
     this.render.removeClass(this.document.body, 'brand-color-animation');
     this.render.addClass(this.document.body,'light')
    } else {
      document.body.style.backgroundColor = "brand-color-animation";
      this.render.removeClass(this.document.body, 'light');
      this.render.addClass(this.document.body,'brand-color-animation')
    }
  }
}
