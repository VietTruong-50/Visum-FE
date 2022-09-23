import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponseLoginResponseDTO, UserControllerService } from 'src/app/api-svc';
import { GlobalConstants } from '../../shared/GlobalConstants';

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userController: UserControllerService,
    private route: Router,
    private cookie: CookieService
  ) {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit(): void {}
  login() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.userController.login({
        userName: this.formGroup.controls['userName'].value,
        password: this.formGroup.controls['password'].value
      }).subscribe((response: ApiResponseLoginResponseDTO) => {
        if (response.errorCode == null) {
          this.cookie.set(GlobalConstants.authToken, <string>response.result?.token, undefined, "/")
          this.route.navigateByUrl("/home").then();
        } else {
          // this.dialogService.showErrorDialog({
          //   title: "Error",
          //   description: `${response.message}`,
          //   buttonText: "Exit",
          //   onAccept: () => {}
          // })
          console.log(response.message);
        }
      })
    }
  }
}
