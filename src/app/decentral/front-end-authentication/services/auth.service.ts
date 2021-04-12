import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user'; // optional

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';
import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: any;
  userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedInCheck$ = this.userLoggedInSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: FirestoreService,
    private router: Router
  ) {
    this.getUser$();
  }
  getUser$(): Observable<User> {
    return (this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          this.setLoggedInStatus(true);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          this.setLoggedInStatus(false);
          return of(null);
        }
      })
    ));
  }
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.setLoggedInStatus(true);
    this.router.navigate(['home-logged-in']);
    this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    this.setLoggedInStatus(false);
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  setLoggedInStatus(bool: boolean) {
    this.userLoggedInSubject.next(bool);
  }
}
