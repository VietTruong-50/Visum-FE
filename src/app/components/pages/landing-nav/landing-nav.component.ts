import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import {
  AlbumControllerService,
  ApiResponsePageSong,
  CategoryControllerService,
  Song,
  SongControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import * as _ from 'lodash';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { GlobalConstants } from '../../shared/GlobalConstants';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { CloudService } from 'src/app/service/cloud.service';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.scss'],
})
export class LandingNavComponent implements OnInit, AfterViewInit {
  songData: any;
  playlistData: any;
  key: boolean;
  albumsData: any;
  categoryData: any;

  @ViewChild('swiperSlideShow') swiperSlideShow!: SwiperComponent;
  config: SwiperOptions = {};

  ngAfterViewInit(): void {
    this.config = {
      autoHeight: true,
      allowTouchMove: true,
      navigation: false,
      loop: true,
    };
  }

  setSwiperInstance(swiper: Swiper) {
    setInterval(() => {
      swiper.slideNext();
    }, 5000);
  }

  constructor(
    private songControllerService: SongControllerService,
    private audioService: DataService,
    private sanitizer: DomSanitizer,
    private userController: UserControllerService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private favoriteService: FavoriteService,
    private albumController: AlbumControllerService,
    private cloudService: CloudService,
    private categoryController: CategoryControllerService
  ) {
    this.key = this.cookieService.check(GlobalConstants.authToken);
  }

  ngOnInit(): void {
    // this.getSongData();
    this.getAllPlaylist();
    this.getAlbumData();
    this.getAllCategory();
  }

  async getSongData() {
    await this.songControllerService
      .getSong(0, 20, 'songName')
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

  getAlbumData() {
    this.albumController.getAllAlbum(0, 20, 'name').subscribe((rs) => {
      this.albumsData = rs.result?.content;
    });
  }

  playAlbumPlaylist(list: any) {
    this.cloudService.setList(list);
    this.cloudService.getData().subscribe((rs) => {
      this.audioService.playPlaylist(false, rs);
    });
  }

  getAllCategory() {
    this.categoryController.getAllSongByCategory().subscribe((rs) => {
      this.categoryData = rs.result;
      console.log(this.categoryData);
    });
  }
}
