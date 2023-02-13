import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Song,
  SongControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  playlistData: any;

  constructor(
    private userController: UserControllerService,
    private songControllerService: SongControllerService,
    private cloudService: CloudService,
    private audioService: DataService,
    private favoriteService: FavoriteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recommendSongNotInFavorite();
    this.getFavoriteData();
  }

  playSong(song: Song) {
    this.songControllerService.increaseSongView(song.id!).subscribe((rs) => {});
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  recommendSongs: any;

  recommendSongNotInFavorite() {
    this.userController.recommendSongNotInFavorite(0, 20).subscribe((rs) => {
      this.recommendSongs = rs.result?.content;
    });
  }

  checkFavorite(song: Song): boolean {
    return this.favoriteService.checkFavorite(song);
  }

  addToFavorite(songId: number) {
    this.userController.addFavoriteSong(songId).subscribe((rs) => {
      console.log('Add success');
      this.recommendSongNotInFavorite();
      this.getFavoriteData();

      this.favoriteService.getFavoriteData();
    });
  }

  removeFromFavorite(songId: number) {
    this.userController.deleteFavoriteSong(songId).subscribe((rs) => {
      this.recommendSongNotInFavorite();
      this.getFavoriteData();
      this.favoriteService.getFavoriteData();
      console.log('Remove success');
    });
  }

  getAllPlaylist() {
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
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

  getFavoriteData() {
    this.userController.getListFavorites(0, 20, 'views').subscribe((result) => {
      let data = result.result?.content ? result.result?.content : [];
      this.favoriteService.setList(data);
    });
  }
}
