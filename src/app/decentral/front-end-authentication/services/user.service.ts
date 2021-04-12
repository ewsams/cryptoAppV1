import { Injectable } from '@angular/core';
import { SubmitFormModel } from '../models/submitform';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: SubmitFormModel;
  users: any;
  userLandSelection = new BehaviorSubject<any>(null);
  currentBackgroundSelection = new BehaviorSubject<any>(null);

  userLandSelectionObservable$ = this.userLandSelection.asObservable();

  userWearableSelection = new BehaviorSubject<any>(null);
  userWearableSelectionObservable$ = this.userWearableSelection.asObservable();

  userBackgroundSelection = new BehaviorSubject<any>(null);
  userBackgroundSelectionObservable$ = this.userBackgroundSelection.asObservable();

  constructor() {}

  getUserLandSelection(data) {
    this.userLandSelection.next(data);
  }

  getUserWearableSelection(data) {
    this.userWearableSelection.next(data);
  }

getBackgroundColor(color) {
this.userBackgroundSelection.next(color);
  }
}
