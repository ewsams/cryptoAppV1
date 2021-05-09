import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;

  type: 'login' | 'reset' = 'login';
  loading = false;

  serverMessage: string;
  screenSize: string;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,

  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  changeType(val) {
    this.type = val;
    this.serverMessage = '';
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
        this.router.navigate(['home-logged-in']);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
