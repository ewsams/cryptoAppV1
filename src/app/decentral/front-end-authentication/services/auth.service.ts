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
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    ));
  }
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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

  // Send email verification when new user sign up
  async sendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.userLoggedInSubject.next(false);
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
    }
  }

}
