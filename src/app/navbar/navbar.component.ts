import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  submitted = false;
  password: string;
  userName: string;
  greeting = "Welcome";
  constructor() {}

  ngOnInit() {}

  onClick(greet: string) {
    // Request goes here for validation
    if (this.password.length >= 3 && this.userName.length >= 3) {
      this.greeting = greet;
    }
  }
}
