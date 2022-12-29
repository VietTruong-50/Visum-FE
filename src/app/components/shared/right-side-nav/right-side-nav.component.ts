import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent implements OnInit {
  title: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search(title: string) {
    this.router.navigate(['/search', title]);
  }
}
