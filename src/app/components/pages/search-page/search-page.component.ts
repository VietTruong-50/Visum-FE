import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  SongControllerService,
  ApiResponsePageSong,
  SingerControllerService,
  UserControllerService,
  Song,
} from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { GlobalConstants } from '../../shared/GlobalConstants';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  songData: any;
  singerData: any;
  playlistData: any;
  title: string[] = [];
  key: boolean;

  constructor(
    private songControllerService: SongControllerService,
    private singerController: SingerControllerService,
    private userController: UserControllerService,
    private audioService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private cloudService: CloudService,
    private dialog: MatDialog,
    private favoriteService: FavoriteService,
    private cookieService: CookieService
  ) {

    this.key = this.cookieService.check(GlobalConstants.authToken);

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

  getSongData() {
    this.title[2] = this.route.snapshot.params['title'];

    this.songControllerService
      .findSongsByTitle(this.title[2] ? this.title[2].trim() : '', 0, 6)
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
      .findSingersByTitle(this.title[2] ? this.title[2].trim() : '', 0, 4)
      .subscribe((rs) => {
        this.singerData = rs.result?.content;
        console.log(this.singerData);
      });
  }

  getPlaylistData() {
    this.title[1] = this.route.snapshot.params['title'];

    this.userController
      .findPlaylistsByTitle(this.title[2] ? this.title[2].trim() : '', 0, 4)
      .subscribe((rs) => {
        this.playlistData = rs.result?.content;
      });
  }

  playSong(song: any) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  playPlaylist(isShuffle: boolean, songList: any) {
    this.cloudService.setList(songList)
    this.cloudService.getData().subscribe((rs) => {
      this.audioService.playPlaylist(isShuffle, rs);
    });
  }

  openCommentDialog(songId: number) {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
      data: songId,
    });
  }

  addToPlaylist(playlistId: number, songId: number) {
    this.userController
      .addSongToPlaylist(playlistId, [songId])
      .subscribe((rs) => {});
  }

  renderTo(id: number, type: string) {
    if (type == 'playlist') {
      this.router.navigate(['playlist-details', id]);
    } else {
      this.router.navigate(['artist-details', id]);
    }
  }

  deletePlaylist(playlistId: number) {
    this.userController.deletePlaylist(playlistId).subscribe((rs) => {
      this.getPlaylistData();
    });
  }

  checkFavorite(song: Song): boolean {
    return this.favoriteService.checkFavorite(song)
  }

  addToFavorite(songId: number) {
    this.userController.addFavoriteSong(songId).subscribe((rs) => {
      console.log('Add success');
    });
  }

  removeFromFavorite(songId: number) {
    this.userController.deleteFavoriteSong(songId).subscribe((rs) => {
      console.log('Remove success');
    });
  }
}
