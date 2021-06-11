import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, 
  AngularFireStorageReference, 
  AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, Subscription, from } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-nft-upload',
  templateUrl: './nft-upload.component.html',
  styleUrls: ['./nft-upload.component.scss']
})
export class NftUploadComponent implements OnInit {

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
  nftUploadUri:any;
  path: string;
  dbUploadComplete: boolean;


  constructor(
    private storage: AngularFireStorage, 
    private userService: UserService,
    private fb: FormBuilder,
    private db: FirestoreService) {}

  ngOnInit() {
    this.dbUploadComplete = false;
    this.nftNameSubmitted = false;

    this.nftNameInput = this.fb.group({
      nftName: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]]});

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
    this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = this.ref.getDownloadURL() )
     )
    .subscribe(element => {
      console.log(element);
      this.path = element.ref.fullPath;
    });
  }

  onSubmit = () => {
    if (this.nftNameInput.status === 'VALID') {
      this.nftNameSubmitted = true;
      this.validNftName = this.nftName.value; 
    }
  }
  get nftName() {
    return this.nftNameInput.get('nftName');
  }

  nftDbUpload = () => {
  const id = this.user.id;
    this.urlSub = this.storage.ref(
      `${this.path}_200x200`).getDownloadURL().subscribe(uri =>
      {
      this.nftUploadUri = uri;
      this.db.set(`nftCollection/${id}`,{
      nftUri:this.nftUploadUri});
      console.log(this.nftUploadUri);
      this.dbUploadComplete = true;
      });
  }



   ngOnDestroy(){
     this.nftDbUpload();
     if(this.dbUploadComplete){
       this.urlSub.unsubscribe();
     }
  }
}

