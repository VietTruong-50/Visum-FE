import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  Playlist,
  PlaylistResponse,
  Song,
  UserControllerService,
} from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';
import { PlaylistDialogComponent } from '../playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
})
export class PlaylistDetailComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;

  playlistData!: PlaylistResponse;

  listSong: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);

  displayedColumns: string[] = ['position', 'name', 'album', 'duration'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private userController: UserControllerService,
    private route: ActivatedRoute,
    private audioService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPlaylistData();
  }

  getPlaylistData() {
    this.userController
      .getPlaylistById(this.route.snapshot.params['playlistId'])
      .subscribe((rs) => {
        this.playlistData = rs.result!;
        this.listSong.next(this.playlistData.songList!);
        this.dataSource = new MatTableDataSource<Song>(
          this.playlistData.songList
        );
      });
  }

  openPlaylistDialog() {
    this.dialog
      .open(PlaylistDialogComponent, {
        width: '20vw',
        data: "EDIT PLAYLIST"
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getPlaylistData();
      });
  }

  getData() {
    return this.listSong.asObservable();
  }

  playPlaylist(isShuffle: boolean) {
    this.listSong.subscribe((rs) => {
      this.audioService.playPlaylist(isShuffle, rs);
    });
  }
}
