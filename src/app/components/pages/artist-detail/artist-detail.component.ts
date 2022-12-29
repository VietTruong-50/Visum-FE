import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SongControllerService, ApiResponsePageSong } from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  songData: any;

  constructor(
    private songControllerService: SongControllerService,
    private _data: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getSongData()
  }

  getSongData() {
    this.songControllerService
      .getSong(0, 6, 'songName')
      .subscribe((result: ApiResponsePageSong) => {
        if (result.errorCode == null) {
          // result.result?.content?.forEach((item) => {
          //   if (item.image) {
          //     let objectURL = 'data:image/jpeg;base64,' + item.image;

          //     item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //   }
          // });

          this.songData = result.result?.content;

          console.log(this.songData);
        } else {
          alert('Error');
        }
      });
  }

  playSong(song: any) {
  }

}
