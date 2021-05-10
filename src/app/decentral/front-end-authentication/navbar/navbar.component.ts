import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsModalComponent } from '../about-us-modal/about-us-modal.component';
import { NgbdModalContentComponent } from '../join-modal/join-modal.component';
import { SetUpComponent } from '../set-up/set-up.component';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { WorkingComponent } from '../working/working.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  logginSub: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.logginSub = this.authService.userLoggedInCheck$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logOut() {
    this.authService.signOut();
  }
  openJoinModal() {
    const modalRef = this.modalService.open(NgbdModalContentComponent, {
      size: 'lg',
    });
  }
  openAboutModal() {
    const modalRef = this.modalService.open(AboutUsModalComponent, {
      size: 'md',
    });
  }
  setUpModal() {
    const modalRef = this.modalService.open(SetUpComponent, {
      size: 'md'
    });
  }

  workingModal() {
    const modalRef = this.modalService.open(WorkingComponent, {
      size: 'lg'
    });
  }
  ngOnDestroy() {
    this.logginSub.unsubscribe();
  }
}
