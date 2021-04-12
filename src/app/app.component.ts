import { Component, Inject, OnInit,Renderer2  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LogginService } from './decentral/front-end-authentication/services/loggin.service';
import { UserService } from './decentral/front-end-authentication/services/user.service';
import { AuthService } from './decentral/front-end-authentication/services/auth.service';
import { Observable } from 'apollo-angular-boost';
import { User } from './decentral/front-end-authentication/models/user';
import { FirestoreService } from './decentral/front-end-authentication/services/firestore.service';

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
  constructor(private router: Router,private authService: AuthService, private logginService: LogginService,
    private render: Renderer2, @Inject(DOCUMENT) private document: Document , private db: FirestoreService) {}

  ngOnInit() {

    this.authService.userLoggedInCheck$.subscribe((element) => {
      if (element === false) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }
}
