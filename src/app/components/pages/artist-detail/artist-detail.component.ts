import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  SongControllerService,
  ApiResponsePageSong,
  SingerControllerService,
  SingerDTO,
  UserControllerService,
  Song,
  AlbumControllerService,
} from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { GlobalConstants } from '../../shared/GlobalConstants';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
})
export class ArtistDetailComponent implements OnInit {
  singerData!: SingerDTO;
  playlistData: any;
  albumsData: any;
  key: boolean;

  constructor(
    private singerController: SingerControllerService,
    private userController: UserControllerService,
    private audioService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private cloudService: CloudService,
    private favoriteService: FavoriteService,
    private albumController: AlbumControllerService
  ) {
    this.key = this.cookieService.check(GlobalConstants.authToken);
    this.route.paramMap.subscribe((res) => {
      console.log(res.get('id'));

      this.getSingerData(Number(res.get('id')));
    });
  }

  ngOnInit(): void {
    this.getAllPlaylist();
    this.getSingerAlbums();
  }

  getSingerData(id?: number) {
    this.singerController.findSingerById(id!).subscribe((rs) => {
      this.singerData = rs.result!;
    });
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  openCommentDialog() {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
    });
  }

  addToPlaylist(playlistId: number, songId: number) {
    this.userController
      .addSongToPlaylist(playlistId, [songId])
      .subscribe((rs) => {});
  }

  getAllPlaylist() {
    if (this.key) {
      this.userController.getAllPlaylistByUser().subscribe((rs) => {
        this.playlistData = rs.result;
      });
    }
  }

  playPlaylist(isShuffle: boolean) {
    this.cloudService.setList(this.singerData.songList);

    this.cloudService
      .getData()
      .subscribe((rs) => this.audioService.playPlaylist(isShuffle, rs));
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

  getSingerAlbums() {
    this.albumController
      .getAllAlbumBySinger(this.route.snapshot.params['id'], 0, 20, 'name')
      .subscribe((rs) => {
        this.albumsData = rs.result?.content;
        console.log(this.albumsData);
      });
  }

  playAlbumPlaylist(list: any) {
    this.cloudService.setList(list);
    this.cloudService.getData().subscribe((rs) => {
      this.audioService.playPlaylist(false, rs);
    });
  }
}
