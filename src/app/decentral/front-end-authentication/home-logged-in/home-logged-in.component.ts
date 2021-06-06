import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss'],
})
export class HomeLoggedInComponent implements OnInit {
  users$: any[];
  userSub: Subscription;
  userTokenBalanceSub:Subscription;
  appolloAmount$:any;
  loading = true;
  page = 1;
  pageSize = 12;
  totalPageElements: number;
  accountAddress: any;
  whiteListedSub: Subscription;
  user: any;
  userRetrieved: boolean;

  constructor(public db: FirestoreService, 
    private web3Service: Web3Service,
    private userService: UserService) {}

  ngOnInit() {
  const users = this.userService.getCurrentUsers();
  this.userService.getCurrentUser();
  this.userSub = users.subscribe(users => {
      this.users$ = users;
      this.totalPageElements = this.users$.length;
      this.loading = false;
    });
    this.gatherUserTokens();
    }

 gatherUserTokens = () => {
    const tokens = this.web3Service.userCurrentTokens();
    this.userTokenBalanceSub = this.web3Service.userAvailiableTokens$.subscribe(tokens => {
      this.appolloAmount$ = tokens.toFixed(2);
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.userTokenBalanceSub.unsubscribe();
  }
}
