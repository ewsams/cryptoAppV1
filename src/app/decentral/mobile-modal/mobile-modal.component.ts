import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../front-end-authentication/services/user.service';
@Component({
  selector: 'app-mobile-modal',
  templateUrl: './mobile-modal.component.html',
  styleUrls: ['./mobile-modal.component.scss']
})
export class MobileModalComponent implements OnInit {
  color: boolean;

  constructor( private modal: NgbModal, private userService: UserService) { }

  ngOnInit() {
    this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });
  }

  closeModal() {
    this.modal.dismissAll();
  }
}
