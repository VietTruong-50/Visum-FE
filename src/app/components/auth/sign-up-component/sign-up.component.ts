import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {  this.formGroup = this.formBuilder.group({
    userName: ["", Validators.required],
    password: ["", Validators.required],
    cf_password: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    gender: [" ", Validators.required],
    birthOfDate: ["", Validators.required],
    mobile: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    termAndPrivacy: [false]
  })
}

  ngOnInit(): void {
  }

}
