import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  goToSongByGenre(category: string){
    this.router.navigateByUrl('/home/(child:' + category +'/songs)');  
  }
}
