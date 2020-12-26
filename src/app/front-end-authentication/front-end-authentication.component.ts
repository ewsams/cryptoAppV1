import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-front-end-authentication',
  templateUrl: './front-end-authentication.component.html',
  styleUrls: ['./front-end-authentication.component.scss']
})
export class FrontEndAuthenticationComponent implements OnInit {  
  @Input() userName: string;
  @Input() password: string;
  @Output()
  isAuthenticated: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onAuthenticatedClick() {
    if (this.userName === "admin" && this.password === "admin") {
      this.isAuthenticated.emit("Logged In");
    } else {
      this.isAuthenticated.emit("Logged Out");
    }
  }

}
