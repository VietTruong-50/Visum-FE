import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserControllerService } from 'src/app/api-svc';

interface GENDER {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  formGroup: FormGroup;
  pwFormGroup: FormGroup;
  userData: any;

  isChangePassword: boolean = false;

  gender: GENDER[] = [
    { value: 'MALE', viewValue: 'Nam' },
    { value: 'FEMALE', viewValue: 'Nữ' },
    { value: 'OTHER', viewValue: 'Khác' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userController: UserControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      id: ['', Validators.required],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [],
      birthOfDate: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.pwFormGroup = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      cf_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData = localStorage.getItem('userProfile');
    this.userData = JSON.parse(this.userData);

    this.formGroup.patchValue({
      id: this.userData.id,
      userName: this.userData.userName,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      gender: this.userData.genderEnum,
      birthOfDate: moment(new Date(this.userData.birthOfDate)).format(
        'yyyy-MM-DD'
      ),
      mobile: this.userData.mobile,
      email: this.userData.email,
    });
    console.log(this.formGroup.getRawValue());
    
  }

  changePasswordForm(value: string) {
    if (value == 'password') {
      this.isChangePassword = true;
    } else {
      this.isChangePassword = false;
    }
  }

  saveUser() {
    let formValue;
    if (this.isChangePassword) {
      formValue = this.pwFormGroup.getRawValue();
      this.changePassword(formValue);
    } else {
      formValue = this.formGroup.getRawValue();
      this.updateUser(formValue);
    }
  }

  updateUser(formValue: any) {
    this.userController
      .updateProfile({
        userName: formValue.userName,
        password: '',
        gender: formValue.gender,
        email: formValue.email,
        mobile: formValue.mobile,
        birthOfDate: moment(formValue.birthOfDate).toISOString(),
        firstName: formValue.firstName,
        lastName: formValue.lastName,
      })
      .subscribe((result) => {
        if (result.errorCode == null) {
          localStorage.setItem('userProfile', JSON.stringify(formValue));
          this.getUserData()
          alert('Change profile success');
        } else alert('error');
      });
  }

  changePassword(formValue: any) {
    if (formValue.newPassword == formValue.cf_password) {
      this.userController
        .changePassword({
          currentPassword: formValue.currentPassword,
          newPassword: formValue.newPassword,
          cf_password: formValue.cf_password,
        })
        .subscribe((result) => {
          if (result.errorCode == null) {
            alert('Change password success');
            this.pwFormGroup.reset();
          } else alert('error');
        });
    } else {
      alert('Error pw');
    }
  }
}
