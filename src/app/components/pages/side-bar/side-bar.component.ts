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
  constructor(private dialog: MatDialog, 
    private router: Router, 
    private route: ActivatedRoute,
    private cookieService: CookieService) {
   
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
    this.router.navigate([route], {relativeTo: this.route});  
  }
}
