import { Injectable } from '@angular/core';
import { SubmitFormModel } from '../models/submitform';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: SubmitFormModel;
  users: any;
  private userLandSelection = new BehaviorSubject<any>(null);
  userLandSelectionObservable$ = this.userLandSelection.asObservable();

  private userWearableSelection = new BehaviorSubject<any>(null);
  userWearableSelectionObservable$ = this.userWearableSelection.asObservable();

  private userBackgroundSelection = new BehaviorSubject<any>(null);
  userBackgroundSelectionObservable$ = this.userBackgroundSelection.asObservable();

  private currentUsers = new BehaviorSubject<any>(null);
  currentUsers$ = this.currentUsers.asObservable();

  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();
  
  private currentUsersPrivate: Observable<any>;

  private userNfts = new BehaviorSubject<any>(null);
  userNfts$ = this.userNfts.asObservable();

  constructor(private afAuth: AngularFireAuth,
    public db: FirestoreService) { }

  getUserLandSelection(data) {
    this.userLandSelection.next(data);
  }

  getUserWearableSelection(data) {
    this.userWearableSelection.next(data);
  }

  getBackgroundColor(color) {
    this.userBackgroundSelection.next(color);
  }

  getCurrentUsers = (): Observable<any> => {
    this.currentUsersPrivate = this.db.colWithIds$('profiles');
    return this.currentUsersPrivate;
  }

  getCurrentUser = async () => {
    const currentUser = await this.afAuth.currentUser;
    this.currentUsersPrivate.subscribe(users => {
      const currentUsers = users;
      this.currentUsers.next(currentUsers);
      const user = currentUsers.find(user => user.id === currentUser.uid);
      this.currentUser.next(user);
    });
  }

  getUserNfts = async () => {
    const currentUser = await this.afAuth.currentUser;
    this.db.colWithIds$(`nftCollection/${currentUser.uid}/nftData`).subscribe(
      nfts => {
        this.userNfts.next(nfts);
      }
    )
  }
}
