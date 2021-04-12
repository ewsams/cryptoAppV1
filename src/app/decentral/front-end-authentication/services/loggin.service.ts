import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubmitFormModel } from '../models/submitform';

@Injectable({
  providedIn: 'root',
})
export class LogginService {
  userCollection: AngularFirestoreCollection<SubmitFormModel>;
  userDocument: AngularFirestoreDocument<SubmitFormModel>;
  user: SubmitFormModel;
  users: any;
  userLogginCheck = new BehaviorSubject<boolean>(false);
  $logginCheckObservable = this.userLogginCheck.asObservable();

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
  }

  getUsers(): Observable<SubmitFormModel[]> {
    this.users = this.userCollection.snapshotChanges().pipe(
      map((firestoreDatabase) => {
        return firestoreDatabase.map((rawUserData) => {
          const data = rawUserData.payload.doc.data() as SubmitFormModel;
          data.id = rawUserData.payload.doc.id;
          return data;
        });
      })
    );
    return this.users;
  }

  updateLoggedInStatus(bool: boolean) {
    this.userLogginCheck.next(bool);
  }
}
