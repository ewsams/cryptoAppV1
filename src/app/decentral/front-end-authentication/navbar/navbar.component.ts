import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsModalComponent } from '../about-us-modal/about-us-modal.component';
import { NgbdModalContentComponent } from '../join-modal/join-modal.component';
import { SetUpComponent } from '../set-up/set-up.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {


  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
  ) { }

  ngOnInit() {
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
      size: 'lg',
    });
  }
  setUpModal() {
    const modalRef = this.modalService.open(SetUpComponent, {
      size: 'md'
    });
  }
}
