import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  loggedIn: boolean;
  constructor() {}

  ngOnInit() {
    this.loggedIn = false;
  }

  logIn() {
    this.loggedIn = true;
  }
}
