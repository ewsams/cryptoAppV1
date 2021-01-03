import { Injectable } from "@angular/core";
import { SubmitFormModel } from "../models/submitform";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userCollection: AngularFirestoreCollection<SubmitFormModel>;
  userDocument: AngularFirestoreDocument<SubmitFormModel>;
  user: SubmitFormModel;
  users: any;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection("users");
  }

  addUser(user: SubmitFormModel) {
    this.userCollection.add(user);
  }
}
