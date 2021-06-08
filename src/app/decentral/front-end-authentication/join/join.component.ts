import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { SubmitFormModel } from '../models/submitform';
import { FirestoreService } from '../services/firestore.service';
import { Web3Service } from 'src/app/util/web3.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  profileRequestFormObject: SubmitFormModel;
  users: Observable<SubmitFormModel[]>;
  myForm: FormGroup;
  whiteListed: boolean;
  whiteListedAccount: any;
  whiteListedAccountSubscription: Subscription;
  whiteListedSubscription: Subscription;
  invalidEmailAddress = 'Your email address is invalid.';

  // tslint:disable-next-line:variable-name
  constructor(
    private fb: FormBuilder,
    private db: FirestoreService,
    private afAuth: AngularFireAuth,
    private web3Service: Web3Service,
  ) { }

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
      this.addUser(this.profileRequestFormObject);
    }
  }

  ngOnInit() {
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
      ),]]
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

  async addUser(userObject: SubmitFormModel) {
    try {
      const createUser = await this.afAuth.createUserWithEmailAndPassword(userObject.email,userObject.password);
      const id = (await this.afAuth.currentUser).uid;
      const addUser = await this.db.set(`users/${id}`,
      {id:id,...userObject});
      const addUserProfile = await this.db.set(`profiles/${id}`,
      {
      id:id,
      userName:userObject.userName,
      web3Address: userObject.web3Address,
      spins:0
    }
    )    
      const getWeb3 = await this.web3Service.handleKycSubmit(userObject.web3Address);
      const sendEmail = await this.sendWelcomeEmail(userObject.email, userObject.userName);
    } catch (error) {
      if (error.message ===
        'The email address is already in use by another account.') {
        this.invalidEmailAddress = "That email is not available please try another...";
        this.myForm.controls['email'].setErrors({ 'invalid': true });
        setTimeout(() => this.myForm.controls['email'].setErrors(null), 5000);
      }
    }
  }

  async sendWelcomeEmail(email: string, userName: string) {
    const id = (await this.afAuth.currentUser).uid;
    const welcomeEmail = {
      to: [email],
      message: {
        subject: `Welcome ${userName} from the Appollo Team.`,
        text: "The world of crypto currency is just at your fingertips...",
        html: `
        <div style="display:flex;justify-content:center">
        <h2 style="text-align: center;"> ${userName} thanks for joining... <br>
        We have alot of great things coming soon...</h2>
        <img
        style="height:45%;width:45%;"
        src="https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/emailLogo.png?alt=media&token=3959acc4-f69d-4662-a541-de0288e88c0e">
        </div>   
        `
      }
    }
    this.db.set(`welcomeEmails/${id}`, welcomeEmail);
  }
}
