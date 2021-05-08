import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss'],
})
export class HomeLoggedInComponent implements OnInit {
  constructor(public db: FirestoreService, private authService: AuthService) {}

  ngOnInit() {
  }
}
