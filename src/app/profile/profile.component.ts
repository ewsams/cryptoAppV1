import { Component, OnInit } from "@angular/core";
import { SubmitFormModel } from "../models/submitform";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  formIsValid: boolean;
  profileFormObject: SubmitFormModel;

  constructor() {}

  onsubmit() {
    console.log(this.profileFormObject);
  }

  ngOnInit() {
    this.profileFormObject = {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      country: "",
      postalCode: null,
    };
    this.formIsValid = false;
  }
}
