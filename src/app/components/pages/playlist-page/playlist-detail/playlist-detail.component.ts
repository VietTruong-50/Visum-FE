import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import {
  Playlist,
  PlaylistResponse,
  Song,
  UserControllerService,
} from 'src/app/api-svc';
import { GlobalConstants } from 'src/app/components/shared/GlobalConstants';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { CommentPageDialogComponent } from '../../comment-page-dialog/comment-page-dialog.component';
import { PlaylistDialogComponent } from '../playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
})
export class PlaylistDetailComponent implements OnInit {
  sort: string = 'DSC';
  listSong: any;
  key: boolean;

  pageIndex: number = 0;
  pageSize: number = 5;

  playlistData!: PlaylistResponse;

  displayedColumns: string[] = [
    'position',
    'name',
    'album',
    'duration',
    'action',
  ];
  displayedColumns2: string[] = ['name', 'album', 'duration', 'action'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private userController: UserControllerService,
    private route: ActivatedRoute,
    private audioService: DataService,
    private dialog: MatDialog,
    private cloudService: CloudService,
    private favoriteService: FavoriteService,
    private cookieService: CookieService
  ) {
    this.key = this.cookieService.check(GlobalConstants.authToken);
  }

  ngOnInit(): void {
    this.getPlaylistData();
    this.getSongsNotInPlaylist();
  }

  getPlaylistData(orderBy?: string, sortType?: string) {
    this.userController
      .getPlaylistById(
        this.route.snapshot.params['playlistId'],
        orderBy ? orderBy : 'ASC',
        sortType ? sortType : 'name'
      )
      .subscribe((rs) => {
        this.playlistData = rs.result!;

        this.dataSource = new MatTableDataSource<Song>(
          this.playlistData.songList
        );
      });
  }

  sortBy(sortType: string, order: string) {
    order != 'ASC' ? (this.sort = order) : (this.sort = 'ASC');

    this.getPlaylistData(this.sort, sortType);
  }

  openPlaylistDialog() {
    this.dialog
      .open(PlaylistDialogComponent, {
        width: '20vw',
        data: {
          playlistId: this.route.snapshot.params['playlistId'],
          title: 'EDIT PLAYLIST',
        },
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getPlaylistData();
      });
  }

  playPlaylist(isShuffle: boolean) {
    if (this.playlistData.songList?.length! > 0) {
      this.cloudService.setList(this.playlistData.songList!);
    }
    this.cloudService.getData().subscribe((rs) => {
      if (isShuffle == true) {
        for (var i = rs.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = rs[i];
          rs[i] = rs[j];
          rs[j] = temp;
        }
      }
      this.dataSource = new MatTableDataSource<Song>(rs);
      this.audioService.playPlaylist(isShuffle, rs);
    });
  }

  getSongsNotInPlaylist() {
    this.userController
      .findSongsNotInPlaylist(this.route.snapshot.params['playlistId'], 0, 20)
      .subscribe((rs) => {
        this.listSong = rs.result?.content!;

        this.dataSource2 = new MatTableDataSource<Song>(this.listSong);
      });
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  addToPlaylist(songId: number) {
    this.userController
      .addSongToPlaylist(this.route.snapshot.params['playlistId'], [songId])
      .subscribe((rs) => {
        this.getPlaylistData();
        this.getSongsNotInPlaylist();
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

  openCommentDialog(songId: number) {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
      data: songId,
    });
  }

  deleteSongFromPlaylist(songId: number) {
    console.log(songId);
    this.userController
      .deleteSongFromPlaylist(this.route.snapshot.params['playlistId'], songId)
      .subscribe((rs) => {
        this.getPlaylistData();
        this.getSongsNotInPlaylist();
      });
  }
}
