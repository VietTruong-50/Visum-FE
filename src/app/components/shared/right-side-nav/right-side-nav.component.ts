import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SingerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent implements OnInit {
  title: string = '';
  singerData: any;

  constructor(private router: Router, private singerController: SingerControllerService) {}

  ngOnInit(): void {
    this.getTopSingerData()
  }

  search(title: string) {
    this.router.navigate(['/search', title]);
  }

  getTopSingerData(){
    this.singerController.getTopArtists().subscribe(rs => {
      this.singerData = rs.result
      console.log(this.singerData)
    })
  }

  renderTo(id: number, type: string) {
    if (type == 'playlist') {
      this.router.navigate(['playlist-details', id]);
    } else {
      this.router.navigate(['artist-details', id]);
    }
  }
}
