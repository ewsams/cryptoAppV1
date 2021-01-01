import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmitFormModel } from "../models/submitform";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileRequestFormObject: SubmitFormModel;
  myForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  onsubmit() {
    if (this.myForm.status === "VALID") {
      this.profileRequestFormObject = {
        userName: this.userName.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        address: this.address.value,
        city: this.city.value,
        country: this.country.value,
        postalCode: this.postalCode.value,
      };
      console.log("form:", this.myForm);
      console.log("profile:", this.profileRequestFormObject);
    }
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      userName: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      postalCode: [
        null,
        [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)],
      ],
    });
  }
  // Getters for working with our form
  get userName() {
    return this.myForm.get("userName");
  }
  get password() {
    return this.myForm.get("password");
  }
  get firstName() {
    return this.myForm.get("firstName");
  }
  get lastName() {
    return this.myForm.get("lastName");
  }
  get email() {
    return this.myForm.get("email");
  }
  get address() {
    return this.myForm.get("address");
  }
  get city() {
    return this.myForm.get("city");
  }
  get country() {
    return this.myForm.get("country");
  }
  get postalCode() {
    return this.myForm.get("postalCode");
  }
}
