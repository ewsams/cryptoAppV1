import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nft-market-card-nav',
  templateUrl: './nft-market-card-nav.component.html',
  styleUrls: ['./nft-market-card-nav.component.scss']
})
export class NftMarketCardNavComponent implements OnInit {
  @Input() nft:any;
  user: any;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
    })
  }

  addNftLikes = () => {
    this.userService.addLike(this.nft);
  }

}
