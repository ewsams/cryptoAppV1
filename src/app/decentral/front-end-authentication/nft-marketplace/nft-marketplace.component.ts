import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { NftUploadComponent } from '../nft-upload/nft-upload.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nft-marketplace',
  templateUrl: './nft-marketplace.component.html',
  styleUrls: ['./nft-marketplace.component.scss']
})
export class NftMarketplaceComponent implements OnInit {
  marketNftsSub: Subscription;
  marketNfts: any;
  page = 1;
  pageSize = 9;
  totalPageElements: number;
  loading: boolean;
  user: any;
  userSub: Subscription;
  marketSub: Subscription;
  colorSubscription: Subscription;
  color: boolean;

  constructor( 
    private userService:UserService,
    private modal: NgbModal,
    private web3Service:Web3Service,
    private router:Router) { }

  ngOnInit() {
    this.userService.getNftMarket();
    this.loading = true;
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
    this.marketNftsSub = this.userService.marketNfts$.subscribe(
      nfts => {
        this.marketNfts = nfts;
        this.loading = false;
      }
    )
    this.userSub = this.userService.currentUser$.subscribe(
      user => {this.user = user});
  }

  createNft = () => {
    this.modal.open(NftUploadComponent, {
      size: 'lg',
    });
  }

  ngOnDestroy(){
    if(this.marketNftsSub && this.userSub 
      && this.marketSub && this.colorSubscription
    ){
      this.marketNftsSub.unsubscribe();
      this.userSub.unsubscribe();
      this.marketSub.unsubscribe();
      this.colorSubscription.unsubscribe();
    }
  }

  toYourNfts = () => {
    this.router.navigate(['your-nfts']);
  }

  addNftLikes = (nft:any) => {
    this.userService.addLike(nft,this.user);
  }

}
