import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {}

  openUserProfile() {
    this.dialog.open(UserProfileComponent, {
      width: '65vw',
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route], {relativeTo: this.route});  
  }
}
