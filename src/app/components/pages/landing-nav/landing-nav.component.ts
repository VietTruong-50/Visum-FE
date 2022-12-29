import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ApiResponsePageSong,
  Song,
  SongControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.scss'],
})
export class LandingNavComponent implements OnInit {
  songData: any;
  playlistData: any;

  constructor(
    private songControllerService: SongControllerService,
    private audioService: DataService,
    private sanitizer: DomSanitizer,
    private userController: UserControllerService
  ) {}

  ngOnInit(): void {
    this.getSongData();
    this.getAllPlaylist()
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
          // this.audioService.listSong = this.songData

          console.log(this.songData);
        } else {
          alert('Error');
        }
      });
  }

  getAllPlaylist() {
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
    });
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  addToPlaylist(playlistId: number, songId: number){
    this.userController.addSongToPlaylist(playlistId, [songId]).subscribe(rs => {})
  }
}
