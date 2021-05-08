import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss'],
})
export class HomeLoggedInComponent implements OnInit {
  users$: any[];
  userSub: Subscription;
  loading = true;

  constructor(public db: FirestoreService, private authService: AuthService) {}

  ngOnInit() {
  this.userSub = this.db.col$('users').subscribe(users => {
      this.users$ = users;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
