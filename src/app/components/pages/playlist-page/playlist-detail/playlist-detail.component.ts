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
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { PlaylistDialogComponent } from '../playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
})
export class PlaylistDetailComponent implements OnInit {
  sort: string = 'DSC';

  pageIndex: number = 0;
  pageSize: number = 5;

  playlistData!: PlaylistResponse;

  displayedColumns: string[] = ['position', 'name', 'album', 'duration'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private userController: UserControllerService,
    private route: ActivatedRoute,
    private audioService: DataService,
    private dialog: MatDialog,
    private cloudService: CloudService
  ) {}

  ngOnInit(): void {
    this.getPlaylistData();
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
        this.cloudService.setList(this.playlistData.songList!);
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
    this.cloudService.getData().subscribe((rs) => {
      this.audioService.playPlaylist(isShuffle, rs);
    });
  }
}
