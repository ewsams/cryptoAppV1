import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubmitFormModel } from 'src/app/decentral/front-end-authentication/models/submitform';
@Injectable({
  providedIn: 'root',
})
export class UserPricingService {
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
