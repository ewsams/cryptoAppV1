import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from '../join-modal/join-modal.component';
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
    private logginService: LogginService
  ) {}

  ngOnInit() {
    this.sideNav = false;
    this.logginService.$logginCheckObservable.subscribe((element) => {
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
    this.logginService.updateLoggedInStatus(false);
  }
  openModal() {
    const modalRef = this.modalService.open(NgbdModalContentComponent, {
      size: 'lg',
    });
  }
}
