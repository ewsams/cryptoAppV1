import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nft-market-card-nav',
  templateUrl: './nft-market-card-nav.component.html',
  styleUrls: ['./nft-market-card-nav.component.scss']
})
export class NftMarketCardNavComponent implements OnInit {
  @Input() nft: any;
  user: any;
  userIsPresent: boolean;
  userSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.userService.currentUser$.subscribe(user => {
      this.user = user;
      this.userIsPresent = true;
    });
  }

  addNftLikes = () => {
    if (this.userIsPresent) {
      this.userService.addLike(this.nft, this.user);
    }
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
