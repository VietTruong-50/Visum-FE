import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ApiResponsePageSong,
  Song,
  SongControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { GlobalConstants } from '../../shared/GlobalConstants';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-song-by-genre',
  templateUrl: './song-by-genre.component.html',
  styleUrls: ['./song-by-genre.component.scss'],
})
export class SongByGenreComponent implements OnInit {
  title: string;
  songData: any;
  playlistData: any;
  key: boolean;
  constructor(
    private route: ActivatedRoute,
    private songController: SongControllerService,
    private audioService: DataService,
    private favoriteService: FavoriteService,
    private cookieService: CookieService,
    private userController: UserControllerService,
    private dialog: MatDialog
  ) {
    this.title = this.route.snapshot.params['genre'];
    this.key = this.cookieService.check(GlobalConstants.authToken);
  }

  ngOnInit(): void {
    this.getData();
    this.getAllPlaylist()
  }

  getData() {
    this.songController
      .findSongsByCategory(this.title, 0, 5, 'songName')
      .subscribe((result: ApiResponsePageSong) => {
        if (result.errorCode == null) {
          this.songData = result.result?.content;
        }
      });
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  getAllPlaylist() {
    if (this.key) {
      this.userController.getAllPlaylistByUser().subscribe((rs) => {
        this.playlistData = rs.result;
      });
    }
  }

  checkFavorite(song: Song): boolean {
    return this.favoriteService.checkFavorite(song);
  }

  addToFavorite(songId: number) {
    this.userController.addFavoriteSong(songId).subscribe((rs) => {
      console.log('Add success');
      this.favoriteService.getFavoriteData();
    });
  }

  removeFromFavorite(songId: number) {
    this.userController.deleteFavoriteSong(songId).subscribe((rs) => {
      this.favoriteService.getFavoriteData();
      console.log('Remove success');
    });
  }

  addToPlaylist(playlistId: number, songId: number) {
    this.userController
      .addSongToPlaylist(playlistId, [songId])
      .subscribe((rs) => {});
  }

  openCommentDialog(songId: number) {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
      data: songId,
    });
  }
}
