import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private afAuth: AngularFireAuth,) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    this.authService.userLoggedInSubject.next(isLoggedIn);
    if (!isLoggedIn) {
    this.router.navigate(['home']);
    }
    return isLoggedIn;
  }
}

