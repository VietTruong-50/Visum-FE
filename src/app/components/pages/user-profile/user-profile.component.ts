import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import {
  ApiResponseUserDTO,
  UserControllerService,
  UserDTO,
} from 'src/app/api-svc';

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
  userData: any;

  isChangePassword: boolean = true;

  gender: GENDER[] = [
    { value: 'MALE', viewValue: 'Nam' },
    { value: 'FEMALE', viewValue: 'Nữ' },
    { value: 'OTHER', viewValue: 'Khác' },
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [' ', Validators.required],
      birthOfDate: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData =  localStorage.getItem('userProfile');
    this.userData =  JSON.parse(this.userData);
    
    this.formGroup.patchValue({
      userName: this.userData.userName,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      gender: this.userData.gender,
      birthOfDate: moment(new Date(this.userData.birthOfDate)).format(
        'yyyy-MM-DD'
      ),
      mobile: this.userData.mobile,
      email: this.userData.email,
    });
  }

  changePassword(value: string) {
    if (value == 'password') {
      this.isChangePassword = false;
    } else {
      this.isChangePassword = true;
    }
  }
}
