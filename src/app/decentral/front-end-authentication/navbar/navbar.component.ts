import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsModalComponent } from '../about-us-modal/about-us-modal.component';
import { NgbdModalContentComponent } from '../join-modal/join-modal.component';
import { SetUpComponent } from '../set-up/set-up.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { WorkingComponent } from '../working/working.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { OptionsNotifyComponent } from '../options-notify/options-notify.component';
import { NftNotificationComponent } from '../nft-notification/nft-notification.component';

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
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.logginSub = this.authService.userLoggedInCheck$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.render.addClass(this.document.body,
          'background-logged-in');
      }   
      else {
        this.render.removeClass(this.document.body, 
          'background-logged-in');
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

  optionsNotify(){
    const modalRef = this.modalService.open(OptionsNotifyComponent,{
      size:'md ',
    });
  }

  nftNotification(){
   this.router.navigate(['nft-market']);
  }

  lotteryNavigate(){
    this.router.navigate(['lottery']);
  }

  
  homeNavigate(){
    this.router.navigate(['home-logged-in']);
  }

  ngOnDestroy() {
    this.logginSub.unsubscribe();
  }
}