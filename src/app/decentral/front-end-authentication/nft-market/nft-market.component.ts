import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/util/web3.service';
import { NftUploadComponent } from '../nft-upload/nft-upload.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nft-market',
  templateUrl: './nft-market.component.html',
  styleUrls: ['./nft-market.component.scss']
})
export class NftMarketComponent implements OnInit {
  userNftsSub: Subscription;
  userNfts: any;
  page = 1;
  pageSize = 9;
  totalPageElements: number;
  loading: boolean;
  user: any;
  userSub: Subscription;
  marketSub: Subscription;
  colorSubscription: Subscription;
  color: boolean;
  deleteBoolean: any;
  nftDeletMessage: string;
  nft: any;

  constructor( 
    private userService:UserService,
    private modal: NgbModal,
    private web3Service:Web3Service,
    private router:Router) { }

  ngOnInit() {
    this.loading = true;
    this.deleteBoolean = false;
    this.userService.getUserNfts();
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
    this.userNftsSub = this.userService.userNfts$.subscribe(
      nfts => {
        this.userNfts = nfts;
        this.totalPageElements = nfts.length;
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

  addNftToMarket = async (nft:any) => {
    this.web3Service.nftAddedToMarketConfirmed.next(null);
    this.web3Service.payToAddToMarket();
    this.marketSub = this.web3Service.nftAddedToMarketConfirmed$.subscribe(confirmed => {
      if(confirmed === true){
        this.userService.addNftToMarket(nft,this.user);
      }
    });
  }

  ngOnDestroy(){
    if(this.userNftsSub && this.userSub 
      && this.marketSub && this.colorSubscription){
      this.userNftsSub.unsubscribe();
      this.userSub.unsubscribe();
      this.marketSub.unsubscribe();
      this.colorSubscription.unsubscribe();
    }
  }

  toNftMarket = () => {
    this.router.navigate(['nft-market']);
  }

  deletNft = () => {
     this.userService.deleteNonMarketUserNft(this.nft,this.user)
     this.deleteBoolean = !this.deleteBoolean;
    }

  deleteNonMarketNftAlert = (nft:any) => {
    this.nft = nft;
    this.nftDeletMessage = `Are You sure you want to delete ${nft.nftData.name}`
    this.deleteBoolean = !this.deleteBoolean
  }

}
