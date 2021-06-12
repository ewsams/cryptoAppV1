import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NftUploadComponent } from '../nft-upload/nft-upload.component';

@Component({
  selector: 'app-nft-market',
  templateUrl: './nft-market.component.html',
  styleUrls: ['./nft-market.component.scss']
})
export class NftMarketComponent implements OnInit {

  constructor( private modal: NgbModal,) { }

  ngOnInit() {
  }

  createNft = () => {
    this.modal.open(NftUploadComponent, {
      size: 'lg',
    });
  }

}
