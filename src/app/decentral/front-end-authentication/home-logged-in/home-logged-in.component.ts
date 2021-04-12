import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss'],
})
export class HomeLoggedInComponent implements OnInit {
  test = [];
  testComments = [];
  loading = true;
  viewComments = false;
  username: string;
  like = 0;
  liked = false;
  likeUrl = '../../../../assets/img/heart-icon.png';
  user$: any;
  constructor(public db: FirestoreService, private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
    for (let i = 0; i < 3; i++) {
      this.username = 'User #';
      this.test.push(i);
    }
    this.loading = false;
  }

  addLike() {
    if (this.like <= 0) {
      this.likeUrl = '../../../../assets/img/liked-heart.png';
      this.liked = true;
      this.like += 1;
    } else {
      this.like -= 1;
      this.likeUrl = '../../../../assets/img/heart-icon.png';
    }
  }
  viewCommentsToggle() {
    scrollTo(0, 0);
    this.viewComments = !this.viewComments;
  }
}
