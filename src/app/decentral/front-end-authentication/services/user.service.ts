import { Injectable } from '@angular/core';
import { SubmitFormModel } from '../models/submitform';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: SubmitFormModel;
  users: any;
  private userLandSelection = new BehaviorSubject<any>(null);
  userLandSelectionObservable$ = this.userLandSelection.asObservable();

  private userWearableSelection = new BehaviorSubject<any>(null);
  userWearableSelectionObservable$ = this.userWearableSelection.asObservable();

  private userBackgroundSelection = new BehaviorSubject<any>(null);
  userBackgroundSelectionObservable$ = this.userBackgroundSelection.asObservable();

  private currentUsers = new BehaviorSubject<any>(null);
  currentUsers$ = this.currentUsers.asObservable();

  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();

  private currentUsersPrivate: Observable<any>;

  private userNfts = new BehaviorSubject<any>(null);
  userNfts$ = this.userNfts.asObservable();

  private nftMarketNfts = new BehaviorSubject<any>(null);
  marketNfts$ = this.nftMarketNfts.asObservable();
  auctionEndDate: string | number | Date;
  userPreviouslyLiked: any;


  constructor(private afAuth: AngularFireAuth,
    public db: FirestoreService) { }

  getUserLandSelection(data) {
    this.userLandSelection.next(data);
  }

  getUserWearableSelection(data) {
    this.userWearableSelection.next(data);
  }

  getBackgroundColor(color) {
    this.userBackgroundSelection.next(color);
  }

  getCurrentUsers = (): Observable<any> => {
    this.currentUsersPrivate = this.db.colWithIds$('profiles');
    return this.currentUsersPrivate;
  }

  getCurrentUser = async () => {
    const currentUser = await this.afAuth.currentUser;
    this.currentUsersPrivate.subscribe(users => {
      const currentUsers = users;
      this.currentUsers.next(currentUsers);
      const user = currentUsers.find(user => user.id === currentUser.uid);
      this.currentUser.next(user);
    });
  }

  getUserNfts = async () => {
    const currentUser = await this.afAuth.currentUser;
    this.db.colWithIds$(`nftCollection/${currentUser.uid}/nftData`).subscribe(
      nfts => {
        this.userNfts.next(nfts);
      }
    )
  }
  addNftToMarket = (nft: any, user: any) => {
    const nftData = {
      addedToMarket: true,
      description: nft.nftData.description,
      uri: nft.nftData.uri,
      name: nft.nftData.name,
      createdBy: user.userName,
      userId: user.id,
      web3Address: user.web3Address,
      likes: 0
    }
    this.db.update(`nftCollection/${user.id}/nftData/${nft.nftData.name}`, {
      nftData,
    });
    this.db.set(`nftMarketCollection/${nft.nftData.name}_${user.id}`, {
      nftData,
    });
  }

  addLike = (nft: any, user: any) => {

   this.checkForPriorLike(nft,user);
    
   if (!this.userPreviouslyLiked) {

      this.db.set(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}/userLiked/${user.id}`, {
        likedBy: user.id
      });

      this.db.update(`nftCollection/${nft.nftData.userId}/nftData/${nft.nftData.name}`, {
        "nftData.likes": nft.nftData.likes + 1
      });
      this.db.update(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}`, {
        "nftData.likes": nft.nftData.likes + 1
      });
    }
    else if (this.userPreviouslyLiked.likedBy === user.id) {
      this.db.delete(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}/userLiked/${user.id}`)

      this.db.update(`nftCollection/${nft.nftData.userId}/nftData/${nft.nftData.name}`, {
        "nftData.likes": nft.nftData.likes - 1
      });
      this.db.update(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}`, {
        "nftData.likes": nft.nftData.likes - 1
      });
    }
  }

  getNftMarket = () => {
    this.db.colWithIds$('nftMarketCollection').subscribe(marketNfts => {

      marketNfts.forEach(async (element) => {

        const currentUser = await this.afAuth.currentUser;
        if (element.createdAt) {
          this.auctionEndDate = await element.createdAt.toDate().setDate(
            element.createdAt.toDate().getDate() + 7);
        }
        const endDate = new Date(this.auctionEndDate);
        const currentTime = new Date(Date.now());

        if (currentTime > endDate) {
          const nftData = {
            addedToMarket: false,
            description: element.nftData.description,
            uri: element.nftData.uri,
            name: element.nftData.name
          }
          this.db.delete(`nftMarketCollection/${element.nftData.name}_${currentUser.uid}`);
          this.db.update(`nftCollection/${currentUser.uid}/nftData/${nftData.name}`,
            { nftData });
        }
        this.nftMarketNfts.next(marketNfts);
      });
    });
  }

  deleteNonMarketUserNft = (nft: any, user: any) => {
    this.db.delete(`nftCollection/${user.id}/nftData/${nft.nftData.name}`);
  }

  checkForPriorLike = (nft:any,user:any) => {
    this.db.colWithIds$(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}/userLiked`).subscribe(
      async userLiked => {
        this.userPreviouslyLiked = await userLiked.find(userLiked => userLiked.likedBy === user.id);
      }
    );
  }
}
