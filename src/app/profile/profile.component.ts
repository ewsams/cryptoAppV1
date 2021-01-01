import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmitFormModel } from "../models/submitform";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileFormObject: SubmitFormModel;
  myForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  onsubmit() {
    if (this.myForm.status === "VALID") {
      this.profileFormObject = {
        userName: this.myForm.controls.userName.value,
        password: this.myForm.controls.password.value,
        firstName: this.myForm.controls.firstName.value,
        lastName: this.myForm.controls.lastName.value,
        email: this.myForm.controls.email.value,
        address: this.myForm.controls.address.value,
        city: this.myForm.controls.city.value,
        country: this.myForm.controls.country.value,
        postalCode: this.myForm.controls.postalCode.value,
      };
      console.log("form:", this.myForm);
      console.log("profile:", this.profileFormObject);
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

  get postalCode() {
    return this.myForm.get("postalCode");
  }
}
