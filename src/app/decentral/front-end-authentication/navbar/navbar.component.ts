import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsModalComponent } from '../about-us-modal/about-us-modal.component';
import { NgbdModalContentComponent } from '../join-modal/join-modal.component';
import { SetUpComponent } from '../set-up/set-up.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { WorkingComponent } from '../working/working.component';
import { DOCUMENT } from '@angular/common';

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
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.logginSub = this.authService.userLoggedInCheck$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.render.setStyle(this.document.body,
          'background', "url('https://firebasestorage.googleapis.com/v0/b/ewsdeploy.appspot.com/o/Animate.png?alt=media&token=f828dd90-e6f8-4731-88d0-75304d97fdd5')");
      } else {
        this.render.removeStyle(this.document.body, 'background');
      }
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
      size: 'md',
    });
  }
  ngOnDestroy() {
    this.logginSub.unsubscribe();
  }
}