import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable, Subscription, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-nft',
  templateUrl: './update-nft.component.html',
  styleUrls: ['./update-nft.component.scss']
})
export class UpdateNftComponent implements OnInit {
  @Input() userUpdateNft;
  @Output() cancelUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  user: any;
  nftNameInput: any;
  nftNameSubmitted: boolean;
  validNftName: string;
  urlSub: Subscription;
  nftUploadUri: any;
  path: string;
  dbUploadComplete: boolean;
  nftUploadSub: Subscription;
  nftSub: Subscription;
  updateNftMessage: string;
  nftUniqueCheck: boolean;
  validDescription: string;
  colorSubscription: Subscription;
  color: boolean;
  nftUpdateWarning: string;


  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private fb: FormBuilder,
    private db: FirestoreService,
    public activeModal: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.nftUpdateWarning =
      `${this.userUpdateNft.nftData.name} is currently stored.
    Any Changes after submitting will update your Nft.`;
    this.nftUniqueCheck = false;
    this.dbUploadComplete = false;
    this.nftNameSubmitted = false;

    this.colorSubscription = this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });

    this.nftNameInput = this.fb.group({
      nftName: [this.userUpdateNft.nftData.name, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]],
      nftDescription: [this.userUpdateNft.nftData.description, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(100)]]
    });

    this.userService.currentUser$.subscribe(user => this.user = user);
  }

  upload = (event) => {
    const file = event.target.files[0];
    const filePath = `nft-images/${this.user.id}/${this.validNftName}`;
    this.ref = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));

    // observe percentage changes
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.nftUploadSub = this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.ref.getDownloadURL())
    )
      .subscribe(element => {
        this.path = element.ref.fullPath;
      });
  }

  onSubmit = () => {
    if (this.nftNameInput.status === 'VALID') {
      this.nftNameSubmitted = true;
      this.validNftName = this.nftName.value;
      this.validDescription = this.nftDescription.value;
      this.checkUnique();
      this.nftDbUpload();
    }
  }
  get nftName() {
    return this.nftNameInput.get('nftName');
  }

  get nftDescription() {
    return this.nftNameInput.get('nftDescription');
  }

  nftDbUpload = () => {
    const id = this.user.id;
    const nftName = this.validNftName;
    const nftDescription = this.validDescription;
    if (this.path) {
      this.urlSub = this.storage.ref(
        `${this.path}_300x300`).getDownloadURL().subscribe(uri => {
          this.nftUploadUri = uri ? uri : this.userUpdateNft.nftData.uri;
          const nftData: any = {
            uri: this.nftUploadUri,
            name: nftName,
            description: nftDescription,
            addedToMarket: false,
            isUpdating: false,
            likes: 0,
            loadingAnimation:false
          };
          if (this.userUpdateNft.nftData.name != this.validNftName
            && this.nftUniqueCheck === false) {
              this.db.update(`nftCollection/${id}/nftData/${this.validNftName}`, {
                nftData
              });
              this.db.delete(`nftCollection/${id}/nftData/${this.userUpdateNft.nftData.name}`);
          }

          if (this.userUpdateNft.nftData.name === this.validNftName && this.nftUniqueCheck === false) {
            this.db.update(`nftCollection/${id}/nftData/${this.userUpdateNft.nftData.name}`, {
              nftData
            });
          }
          this.dbUploadComplete = true;
        });
    }
  }



  ngOnDestroy() {
    if (this.dbUploadComplete) {
      this.nftUploadSub.unsubscribe();
      this.urlSub.unsubscribe();
    }
    if (this.nftSub) {
      this.nftSub.unsubscribe();
    }
  }

  checkUnique = () => {
    if (this.nftNameSubmitted) {
      this.nftSub = this.db.col$(`nftCollection/${this.user.id}/nftData`).subscribe(
        nfts => {
          const nftList = nfts;
          const notUniqueNft: any =
            nftList.find((nft: any) =>
              nft.nftData.name === this.nftName.value
            );
          if (notUniqueNft &&
            this.userUpdateNft.nftData.name
            != this.validNftName) {
            this.nftUniqueCheck = true;
            this.nftNameSubmitted = false;
            this.updateNftMessage =
              `${notUniqueNft.nftData.name} is currently stored.
            Please Submit a Unique name.
            `;
          } else if (!notUniqueNft) {
            this.nftUniqueCheck = false;
            this.updateNftMessage = '';
          }
        }
      );
    }
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

  cancelUpdateEvent = () => {
    this.cancelUpdate.emit(false);
  }
}

