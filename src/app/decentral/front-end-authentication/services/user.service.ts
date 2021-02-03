import { Injectable } from '@angular/core';
import { SubmitFormModel } from '../models/submitform';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<SubmitFormModel>;
  userDocument: AngularFirestoreDocument<SubmitFormModel>;
  user: SubmitFormModel;
  users: any;
  userLandSelection = new BehaviorSubject<any>(
    null
  );
  $userLandSelectionObservable = this.userLandSelection.asObservable();

  userWearableSelection = new BehaviorSubject<any>(
   null
  );
  $userWearableSelectionObservable = this.userWearableSelection.asObservable();

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
  }

  addUser(user: SubmitFormModel) {
    this.userCollection.add(user);
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
  getUserLandSelection(data) {
    this.userLandSelection.next(data);
  }

  getUserWearableSelection(data) {
    this.userWearableSelection.next(data);
  }
}
