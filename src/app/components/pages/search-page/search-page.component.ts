import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  SongControllerService,
  ApiResponsePageSong,
  SingerControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  songData: any;
  singerData: any;
  playlistData: any;
  title: string[]= [];

  constructor(
    private songControllerService: SongControllerService,
    private singerController: SingerControllerService,
    private userController: UserControllerService,
    private audioService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.title = val.url.split('/');

        this.getSongData();
        this.getPlaylistData();
        this.getSingerData();
      }
    });
  }

  ngOnInit(): void {}

  // getSongData() {
  //   this.songControllerService
  //     .getSong(0, 6, 'songName')
  //     .subscribe((result: ApiResponsePageSong) => {
  //       if (result.errorCode == null) {
  //         result.result?.content?.forEach((item) => {
  //           if (item.image) {
  //             let objectURL = 'data:image/jpeg;base64,' + item.image;

  //             item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //           }
  //         });

  //         this.songData = result.result?.content;

  //         console.log(this.songData);
  //       } else {
  //         alert('Error');
  //       }
  //     });
  // }

  getSongData() {
    this.title[2] = this.route.snapshot.params['title'];

    this.songControllerService
      .findSongsByTitle(this.title[2] ? this.title[2] : '', 0, 6)
      .subscribe((rs) => {
        if (rs.errorCode == null) {
          // rs.result?.content?.forEach((item) => {
          //   if (item.image) {
          //     let objectURL = 'data:image/jpeg;base64,' + item.image;

          //     item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //   }
          // });

          this.songData = rs.result?.content;

          console.log(this.songData);
        } else {
          alert('Error');
        }
      });
  }

  getSingerData() {
    this.title[1] = this.route.snapshot.params['title'];

    this.singerController
      .findSingersByTitle(this.title[2] ? this.title[2] : '', 0, 4)
      .subscribe((rs) => {
        this.singerData = rs.result?.content;
      });
  }

  getPlaylistData() {
    this.title[1] = this.route.snapshot.params['title'];

    this.userController
      .findPlaylistsByTitle(this.title[2] ? this.title[2] : '', 0, 4)
      .subscribe((rs) => {
        this.playlistData = rs.result?.content;
      });
  }

  playSong(song: any) {
    this.audioService.playStream(song, true)
  }
}
