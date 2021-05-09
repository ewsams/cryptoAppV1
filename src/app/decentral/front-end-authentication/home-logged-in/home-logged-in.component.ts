import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
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
  userTokenBalanceSub:Subscription;
  appolloAmount$:any;
  loading = true;
  page = 1;
  pageSize = 12;
  totalPageElements: number;
  accountAddress: any;
  whiteListedSub: Subscription;

  constructor(public db: FirestoreService, 
    private authService: AuthService, 
    private web3Service: Web3Service) {}

  ngOnInit() {
  this.userSub = this.db.col$('users').subscribe(users => {
      this.users$ = users;
      this.totalPageElements = this.users$.length;
      this.loading = false;
    });
    this.whiteListedSub = this.web3Service.whiteListedAccountAddress$.subscribe(address => {
      this.accountAddress = address;
    })
    this.gatherUserTokens();
    }

 gatherUserTokens = () => {
    const tokens = this.web3Service.userCurrentTokens();
    this.userTokenBalanceSub = this.web3Service.userAvailiableTokens$.subscribe(tokens => {
      this.appolloAmount$ = tokens;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.userTokenBalanceSub.unsubscribe();
    this.whiteListedSub.unsubscribe()
  }
}
