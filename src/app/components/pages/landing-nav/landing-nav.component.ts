import { Component, OnInit } from '@angular/core';
import { ApiResponseSongDTO, SongControllerService } from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.scss'],
})
export class LandingNavComponent implements OnInit {
  songData: any;

  constructor(
    private songControllerService: SongControllerService,
    private _data: DataService
  ) {
  }

  ngOnInit(): void {
    this.getSongData();
  }

  getSongData() {
    this.songControllerService
      .getSong()
      .subscribe((result: ApiResponseSongDTO) => {
        if(result.errorCode == null){
          this.songData = result.result;

          console.log(this.songData )
        }else{
          alert('Error');
        }
      });
  }

  playSong(song: any) {
    this._data.add(song);
  }
}
