import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponsePageSong, SongControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-song-by-genre',
  templateUrl: './song-by-genre.component.html',
  styleUrls: ['./song-by-genre.component.scss'],
})
export class SongByGenreComponent implements OnInit {
  title: string;
  listSong: any;
  constructor(
    private route: ActivatedRoute,
    private songController: SongControllerService
  ) {
    this.title = this.route.snapshot.params['genre'];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.songController
      .findSongsByCategory(this.title, 1, 5, 'createdAt')
      .subscribe((result: ApiResponsePageSong) => {
        if(result.errorCode == null){
          this.listSong = result.result?.content;
        }
      });
  }
}
