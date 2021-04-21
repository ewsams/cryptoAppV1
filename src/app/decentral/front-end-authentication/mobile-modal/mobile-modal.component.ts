import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { SubmitFormModel } from '../models/submitform';
import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/user.service';
import {Web3Service} from '../../../util/web3.service';

@Component({
  selector: 'app-mobile-modal',
  templateUrl: './mobile-modal.component.html',
  styleUrls: ['./mobile-modal.component.scss']
})
export class MobileModalComponent implements OnInit {
  color: boolean;
  profileRequestFormObject: SubmitFormModel;
  users: Observable<SubmitFormModel[]>;
  myForm: FormGroup;
  whiteListed: boolean;
  whiteListedAccount: string;
  whiteListedAccountSubscription: Subscription;
  whiteListedSubscription: Subscription;

  // tslint:disable-next-line:variable-name
  constructor(
    private fb: FormBuilder,
    private db: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private modal: NgbModal, private userService: UserService,
    private web3Service: Web3Service
  ) {}
  onSubmit() {
    if (this.myForm.status === 'VALID') {
      this.profileRequestFormObject = {
        userName: this.userName.value,
        password: this.password.value,
        email: this.email.value,
        phone: this.phone.value,
        web3Address: this.web3Address.value,
        isValid: true,
      };
      console.log(this.profileRequestFormObject);
      this.afAuth.createUserWithEmailAndPassword(this.email.value, this.password.value);
      this.db.add('users', this.profileRequestFormObject);
      this.router.navigate(['home-logged-in']);
      this.web3Service.handleKycSubmit(this.profileRequestFormObject.web3Address);
      this.whiteListedSubscription = this.web3Service.isWhiteListed$.subscribe(isListed => {
        this.whiteListed = isListed;
      });
      this.whiteListedAccountSubscription = this.web3Service.accountStatus$.subscribe(account => {
        this.whiteListedAccount = account;
      });
    }
  }

  ngOnInit() {
    this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });

    // form for database
    this.myForm = this.fb.group({
      userName: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
          ),
        ],
      ],
      web3Address: ['', [Validators.required, Validators.pattern(
        /^0x[a-fA-F0-9]{40}$/
      ), ]]
    });
  }
  // Getters for working with our form
  get userName() {
    return this.myForm.get('userName');
  }
  get password() {
    return this.myForm.get('password');
  }
  get email() {
    return this.myForm.get('email');
  }
  get phone() {
    return this.myForm.get('phone');
  }
  get web3Address() {
    return this.myForm.get('web3Address');
  }

  closeModal() {
    this.modal.dismissAll();
  }

  ngOnDestroy() {
    this.whiteListedAccountSubscription.unsubscribe();
    this.whiteListedSubscription.unsubscribe();
  }
}
