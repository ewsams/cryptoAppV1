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
  nftUpdateBoolean: boolean;
  addingNftToMarketAnimation: boolean;

  constructor(
    private userService: UserService,
    private modal: NgbModal,
    private web3Service: Web3Service,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUserNfts();
    this.loading = true;
    this.deleteBoolean = false;
    this.addingNftToMarketAnimation = false;
    this.nftUpdateBoolean = false;
    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
    this.userNftsSub = this.userService.userNfts$.subscribe(
      async nfts => {
        this.userNfts = await nfts.sort((a, b) => b.updatedAt.toDate() - a.updatedAt.toDate());
        this.loading = false;
      }
    );
    this.userSub = this.userService.currentUser$.subscribe(
      user => { this.user = user; });
  }

  createNft = () => {
    this.modal.open(NftUploadComponent, {
      size: 'lg',
    });
  }

  addNftToMarket = async (nft: any) => {
    this.web3Service.nftAddedToMarketConfirmed.next(null);
    this.web3Service.payToAddToMarket();
    this.marketSub = this.web3Service.nftAddedToMarketConfirmed$.subscribe(confirmed => {
      if (confirmed != true) {
        nft.nftData.loadingAnimation = true;
      } else if (confirmed === true) {
        nft.nftData.loadingAnimation = false;
        this.userService.addNftToMarket(nft, this.user);
      }
    });
  }

  ngOnDestroy() {
    if (this.userNftsSub && this.userSub
      && this.marketSub && this.colorSubscription) {
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
    this.userService.deleteNonMarketUserNft(this.nft, this.user);
    this.deleteBoolean = !this.deleteBoolean;
  }

  deleteNonMarketNftAlert = (nft: any) => {
    this.nft = nft;
    this.nftDeletMessage = `Are You sure you want to delete ${nft.nftData.name}`;
    this.deleteBoolean = !this.deleteBoolean;
  }

  nftUpdate = (nft: any) => {
    nft.nftData.isUpdating = true;
    this.nftUpdateBoolean = !this.nftUpdateBoolean;
  }

  nftCancelUpdate = ($event, nft) => {
    nft.nftData.isUpdating = $event;
  }

}
