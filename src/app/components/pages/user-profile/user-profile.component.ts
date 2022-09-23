import { Component, OnInit } from '@angular/core';

interface GENDER{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isChangePassword: boolean = true;

  gender: GENDER[] = [
    {value: "MALE", viewValue: "Nam"},
    {value: "FEMALE", viewValue: "Nữ"},
    {value: "OTHER", viewValue: "Khác"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changePassword(value: string){
    if(value == 'password'){
      this.isChangePassword = false;
    }else{
      this.isChangePassword = true;
    }
  
  }
}
