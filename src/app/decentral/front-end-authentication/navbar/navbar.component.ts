import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsModalComponent } from '../about-us-modal/about-us-modal.component';
import { NgbdModalContentComponent } from '../join-modal/join-modal.component';
import { AuthService } from '../services/auth.service';
import { LogginService } from '../services/loggin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  sideNav: boolean;
  showProfile: boolean;
  constructor(
    private modalService: NgbModal,
    private logginService: LogginService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sideNav = false;
    this.authService.userLoggedInCheck$.subscribe((element) => {
      if (element === false) {
        this.showProfile = false;
      } else {
        this.showProfile = true;
      }
    });
  }

  showSideNav() {
    this.sideNav = !this.sideNav;
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
}
