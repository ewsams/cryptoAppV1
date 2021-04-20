import { Component, Inject, OnInit, Renderer2  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LogginService } from './decentral/front-end-authentication/services/loggin.service';
import { UserService } from './decentral/front-end-authentication/services/user.service';
import { AuthService } from './decentral/front-end-authentication/services/auth.service';
import { FirestoreService } from './decentral/front-end-authentication/services/firestore.service';
import {Web3Service} from './util/web3.service';
import { Subscription } from 'rxjs';

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
  backgroundColor: Subscription;

  constructor(private router: Router, private authService: AuthService,
              private logginService: LogginService, private render: Renderer2,
              @Inject(DOCUMENT) private document: Document , private db: FirestoreService,
              private web3Service: Web3Service) {}

  ngOnInit() {
    this.backgroundColor = this.authService.userLoggedInCheck$.subscribe((element) => {
      if (element === false) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }
  ngOnDestroy() {
    this.backgroundColor.unsubscribe();
  }

  connectWallet() {
    this.web3Service.connectAccount();
  }
}
