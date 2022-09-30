import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiResponseUserDTO, UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userController: UserControllerService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      cf_password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [' ', Validators.required],
      birthOfDate: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      termAndPrivacy: [false],
    });
  }

  ngOnInit(): void {}

  signUp() {
    let formValue = this.formGroup.getRawValue();
    this.formGroup.markAllAsTouched();
    console.log(formValue);
    if (formValue.password === formValue.cf_password && this.formGroup.valid) {
      this.userController
        .register({
          userName: formValue.userName,
          password: formValue.password,
          gender: formValue.gender,
          email: formValue.email,
          mobile: formValue.mobile,
          birthOfDate: moment(formValue.birthOfDate).toISOString(),
          firstName: formValue.firstName,
          lastName: formValue.lastName,
        })
        .subscribe((result: ApiResponseUserDTO) => {
          console.log(result.result);
          if (result.errorCode == null) {
            this.router.navigate(['/auth/log-in']);
          } else {
            alert('Error ' + result);
          }
        });
    }else{
      alert('Password and Cfpassword is incorrect');
    }
  }
}
