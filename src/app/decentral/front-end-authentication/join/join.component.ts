import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { SubmitFormModel } from '../models/submitform';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  profileRequestFormObject: SubmitFormModel;
  users: Observable<SubmitFormModel[]>;
  myForm: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(
    private fb: FormBuilder,
    private db: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  onSubmit() {
    if (this.myForm.status === 'VALID') {
      this.profileRequestFormObject = {
        userName: this.userName.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        phone: this.phone.value,
        isValid: true,
      };
      console.log(this.profileRequestFormObject);
      this.afAuth.createUserWithEmailAndPassword(this.email.value, this.password.value);
      this.db.add('users', this.profileRequestFormObject);
      this.router.navigate(['home-logged-in']);
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    });
  }
  // Getters for working with our form
  get userName() {
    return this.myForm.get('userName');
  }
  get password() {
    return this.myForm.get('password');
  }
  get firstName() {
    return this.myForm.get('firstName');
  }
  get lastName() {
    return this.myForm.get('lastName');
  }
  get email() {
    return this.myForm.get('email');
  }
  get phone() {
    return this.myForm.get('phone');
  }
}
