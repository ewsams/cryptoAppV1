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

  private userNfts = new BehaviorSubject<any[]>([]);
  userNfts$ = this.userNfts.asObservable();

  private nftMarketNfts = new BehaviorSubject<any[]>([]);
  marketNfts$ = this.nftMarketNfts.asObservable();

  auctionEndDate: string | number | Date;
  userPreviouslyLiked: any;
  currentLikesCount: number;


  constructor(private afAuth: AngularFireAuth,
    private db: FirestoreService) { }

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
    );
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
      likes: 0,
    };
    this.db.update(`nftCollection/${user.id}/nftData/${nft.nftData.name}`, {
      nftData,
    });
    this.db.set(`nftMarketCollection/${nft.nftData.name}_${user.id}`, {
      nftData,
      auctionOpen: true
    });
  }

  addLike = (nft: any, user: any, likeCount: number) => {

    // Check for Likes
    this.db.col(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}/userLiked`,
      ref => ref.where('likedBy', '==', user.id)).valueChanges().subscribe(
        userLiked => {
          this.userPreviouslyLiked = userLiked[0];
        });


    if (typeof this.userPreviouslyLiked === 'undefined') {

      this.db.set(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}/userLiked/${user.id}`, {
        likedBy: user.id
      });

      this.db.update(`nftCollection/${nft.nftData.userId}/nftData/${nft.nftData.name}`, {
        'nftData.likes': likeCount + 1
      });
      this.db.update(`nftMarketCollection/${nft.nftData.name}_${nft.nftData.userId}`, {
        'nftData.likes': likeCount + 1
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
            name: element.nftData.name,
            loadingAnimation: false,
            likes: 0,
            isUpdating: false,
            userId: element.nftData.userId,
            web3Address: element.nftData.web3Address
          };
          this.db.delete(`nftMarketCollection/${nftData.name}_${nftData.userId}`);
          this.db.deleteCollection(`nftMarketCollection/${nftData.name}_${nftData.userId}/userLiked`, 200);
          this.db.set(`nftCollection/${nftData.userId}/nftData/${nftData.name}`,
            { nftData });
        }
        this.nftMarketNfts.next(marketNfts);
      });
    });
  }

  deleteNonMarketUserNft = (nft: any, user: any) => {
    this.db.delete(`nftCollection/${user.id}/nftData/${nft.nftData.name}`);
  }
}
