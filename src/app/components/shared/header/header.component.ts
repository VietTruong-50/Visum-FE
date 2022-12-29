import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponseUser, UserControllerService } from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';
import { LogInComponent } from '../../auth/log-in-component/log-in.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { GlobalConstants } from '../GlobalConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userData: any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userController: UserControllerService,
    private dialog: MatDialog,
    private audioService: DataService
  ) {
    if (this.cookieService.check(GlobalConstants.authToken)) {
      this.getUserData();
    }
  }

  ngOnInit(): void {}

  getUserData() {
    this.userController
      .getCurrentUser()
      .subscribe((result: ApiResponseUser) => {
        if (result.errorCode == null) {
          this.userData = result.result;
          localStorage.setItem('userProfile', JSON.stringify(this.userData));
        } else {
          alert(result.errorCode);
        }
      });
  }

  openSigninDialog() {
    this.dialog.open(LogInComponent, {
      width: '45vw',
    });
  }

  openUserProfile() {
    if(this.cookieService.check(GlobalConstants.authToken)){
      this.dialog.open(UserProfileComponent, {
        width: '65vw',
      });
    }
  }

  onSignOut() {
    this.cookieService.delete(GlobalConstants.authToken, '/');
    window.location.reload();
    localStorage.removeItem('userProfile')
    this.router.navigateByUrl('/')
  }

  playShuffle() {
    this.audioService.playPlaylist(true)
  }
}
