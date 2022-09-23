import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-song-by-genre',
  templateUrl: './song-by-genre.component.html',
  styleUrls: ['./song-by-genre.component.scss']
})
export class SongByGenreComponent implements OnInit {

  title: string | undefined;

  constructor( private route: ActivatedRoute) {
    this.title = this.route.snapshot.params['genres'];
   }

  ngOnInit(): void {
  }

}
