import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogInComponent } from '../../auth/log-in-component/log-in.component';
import { GlobalConstants } from '../../shared/GlobalConstants';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {

  key: boolean;
  constructor(private dialog: MatDialog, 
    private router: Router, 
    private cookieService: CookieService) {
    this.key = this.cookieService.check(GlobalConstants.authToken);
  }

  ngOnInit(): void {}

  openUserProfile() {
    if(this.cookieService.check(GlobalConstants.authToken)){
      this.dialog.open(UserProfileComponent, {
        width: '65vw',
      });
    }else{
      this.dialog.open(LogInComponent, {
        width: '45vw',
      });
    }
  
  }

  navigateTo(route: string) {
    if(route == '/favorite' && !this.cookieService.check(GlobalConstants.authToken)) {
      this.dialog.open(LogInComponent, {
        width: '45vw',
      });
    } else{
      this.router.navigate([route]);  
    }
  }
}
