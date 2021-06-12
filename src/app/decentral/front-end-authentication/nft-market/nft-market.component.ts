import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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

  constructor( 
    private userService:UserService,
    private modal: NgbModal) { }

  ngOnInit() {
    this.loading = true;
    this.userNftsSub = this.userService.userNfts$.subscribe(
      nfts => {
        this.userNfts = nfts;
        this.totalPageElements = this.userNfts.length;
        this.loading = false;
      }
    )
  }

  createNft = () => {
    this.modal.open(NftUploadComponent, {
      size: 'lg',
    });
  }

  ngOnDestroy(){
    if(this.userNftsSub){
      this.userNftsSub.unsubscribe();
    }
  }

}
