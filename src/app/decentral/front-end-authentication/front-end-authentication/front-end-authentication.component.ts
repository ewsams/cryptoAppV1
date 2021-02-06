import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LogginService } from '../services/loggin.service';

@Component({
  selector: 'app-front-end-authentication',
  templateUrl: './front-end-authentication.component.html',
  styleUrls: ['./front-end-authentication.component.scss'],
})
export class FrontEndAuthenticationComponent implements OnInit {
  logginNotification: string;
  @Input() userName: string;
  @Input() password: string;
  constructor(
    private logginService: LogginService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.logInLandingCheck();
  }

  onAuthenticatedClick() {
    // request for validation starts here
    if (this.userName === 'admin' && this.password === 'admin') {
      this.logginNotification = 'Log Out';
      this.router.navigate(['/home-logged-in']);
      this.authService.setLoggedInStatus(true);
    } else {
      this.logginNotification = 'Log In';
      this.authService.setLoggedInStatus(true);
    }
  }

  logInLandingCheck() {
    this.logginService.$logginCheckObservable.subscribe((element) => {
      if (element === false) {
        this.logginNotification = 'Log In';
      } else {
        this.logginNotification = 'Log Out';
      }
    });
  }
}
