import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponsePageSong, Song, SongControllerService } from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-song-by-genre',
  templateUrl: './song-by-genre.component.html',
  styleUrls: ['./song-by-genre.component.scss'],
})
export class SongByGenreComponent implements OnInit {
  title: string;
  songData: any;
  constructor(
    private route: ActivatedRoute,
    private songController: SongControllerService,
    private audioService: DataService
  ) {
    this.title = this.route.snapshot.params['genre'];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.songController
      .findSongsByCategory(this.title, 0, 5, 'songName')
      .subscribe((result: ApiResponsePageSong) => {
        if(result.errorCode == null){
          this.songData = result.result?.content;
        }
      });
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song)
    this.audioService.playStream(song, true)
  }
}
