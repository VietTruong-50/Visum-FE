import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import {
  Song,
  SongControllerService,
  SongDTO,
  UserControllerService,
} from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { CommentPageDialogComponent } from '../../comment-page-dialog/comment-page-dialog.component';

interface MusicData {
  position: number;
  name: string;
  album: string;
  duration: string;
}
const ELEMENT_DATA: MusicData[] = [
  {
    position: 1,
    name: 'UntilIFoundYou',
    album: 'UntilIFoundYou (single)',
    duration: 'H',
  },
  { position: 2, name: 'Sunroof', album: 'Sunroof (single)', duration: 'He' },
  {
    position: 3,
    name: 'Keshi playlist',
    album: 'Keshi playlist',
    duration: 'Li',
  },
];
@Component({
  selector: 'app-music-favorite',
  templateUrl: './music-favorite.component.html',
  styleUrls: ['./music-favorite.component.scss'],
})
export class MusicFavoriteComponent implements OnInit {
  playlistData: any;

  listSong: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);

  displayedColumns: string[] = [
    'position',
    'name',
    'singer',
    'duration',
    'action',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private userController: UserControllerService,
    private audioService: DataService,
    private favoriteService: FavoriteService,
    private dialog: MatDialog
  ) {
    this.getFavoriteData();
  }

  ngOnInit(): void {
    this.getAllPlaylist()
  }

  getFavoriteData() {
    this.favoriteService.favoriteSongs.subscribe((rs) => {
      this.listSong.next(rs!);
      this.dataSource = new MatTableDataSource<SongDTO>(rs);
    });
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  playPlaylist(index: number, song: Song) {
    if (index == 0) {
      this.listSong.subscribe((rs) => {
        this.audioService.playPlaylist(false, rs);
      });
    } else {
      this.playSong(song);
    }
  }

  stop(song: any) {}

  sortData($event: any) {
    throw new Error('Method not implemented.');
  }

  openCommentDialog(songId: number) {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
      data: songId,
    });
  }

  removeFromFavorite(songId: number){
    this.userController.deleteFavoriteSong(songId).subscribe(rs =>{
      // let data = rs.result?.content ? rs.result?.content : [];
      // this.favoriteService.setList(data);
      this.getFavoriteData()
    })
  }

  getAllPlaylist() {
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
    });
  }

  addToPlaylist(playlistId: number, songId: number) {
    this.userController
      .addSongToPlaylist(playlistId, [songId])
      .subscribe((rs) => {});
  }

}
