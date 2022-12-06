import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  AuthControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { GlobalConstants } from '../../shared/GlobalConstants';
import { SignUpComponent } from '../sign-up-component/sign-up.component';

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authController: AuthControllerService,
    private route: Router,
    private cookie: CookieService,
    private dialogRef: MatDialogRef<LogInComponent>,
    private dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [false],
    });
  }

  ngOnInit(): void {
    if (this.cookie.get('remember_me') == 'true') {
      let userName = this.cookie.get('userName').slice(0, -7);
      let password = this.cookie.get('password').slice(0, -7);

      this.formGroup.controls['remember_me'].setValue(true);
      this.formGroup.controls['userName'].setValue(window.atob(userName));
      this.formGroup.controls['password'].setValue(window.atob(password));
    }
  }

  login() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.authController
        .authenticateUser({
          username: this.formGroup.controls['userName'].value,
          password: this.formGroup.controls['password'].value,
        })
        .subscribe((response) => {
          if (response.errorCode == null) {
            this.cookie.set(
              GlobalConstants.authToken,
              <string>response.result?.jwtToken,
              undefined,
              '/'
            );

            this.cookie.set('userName', '');
            this.cookie.set('password', '');
            this.cookie.set('remember_me', 'false');

            if (this.formGroup.controls['remember_me'].value == true) {
              this.cookie.set(
                'userName',
                window
                  .btoa(this.formGroup.controls['userName'].value)
                  .toString() + this.randomString(7)
              );
              this.cookie.set(
                'password',
                window
                  .btoa(this.formGroup.controls['password'].value)
                  .toString() + this.randomString(7)
              );
              this.cookie.set('remember_me', 'true');
            }

            window.location.reload();
            this.route.navigateByUrl('/discover').then();
          } else {
            // this.dialogService.showErrorDialog({
            //   title: "Error",
            //   description: `${response.message}`,
            //   buttonText: "Exit",
            //   onAccept: () => {}
            // })
            console.log(response.message);
          }
        });
    }
  }

  randomString(length: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]=-)(*&^%$#@!~`";
    let secretKey = '';
    for (let i = 0; i < length; i++) {
      secretKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return secretKey;
  }

  openSignup() {
    this.dialogRef.close();
    this.dialog.open(SignUpComponent, {
      width: '45vw',
    });
  }
}
