import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { PlaylistDialogComponent } from './playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
})
export class PlaylistPageComponent implements OnInit {
  playlistData: any;

  constructor(
    private dialog: MatDialog,
    private userController: UserControllerService,
    private router: Router,
    private cloudService: CloudService,
    private audioService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllPlaylist();
  }

  openPlaylistDialog() {
    this.dialog
      .open(PlaylistDialogComponent, {
        width: '20vw',
        data: {
          title: 'NEW PLAYLIST',
        },
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getAllPlaylist();
      });
  }

  getAllPlaylist() {
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
      console.log(this.playlistData);
    });
  }

  deletePlaylist(playlistId: number) {
    const dialogData = new ConfirmDialogModel(
      'Xóa Playlist',
      `Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Bạn có muốn xóa?`
    );

    this.dialog
      .open(ConfirmDialogComponent, {
        width: '40vw',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((rs) => {
        if (rs === true) {
          this.userController.deletePlaylist(playlistId).subscribe((rs) => {
            this.getAllPlaylist();
          });
        }
      });
  }

  renderTo(playlistId: number) {
    this.router.navigate(['playlist-details', playlistId]);
  }

  playPlaylist(playlistid: number) {
    this.getPlaylistData(playlistid);

    this.cloudService.getData().subscribe((rs) => {
      this.audioService.playPlaylist(false, rs);
    });
  }

  playlistDetails: any;

  getPlaylistData(playlistId: number, orderBy?: string, sortType?: string) {
    this.userController
      .getPlaylistById(
        playlistId,
        orderBy ? orderBy : 'ASC',
        sortType ? sortType : 'name'
      )
      .subscribe((rs) => {
        this.playlistDetails = rs.result!;
        console.log(this.playlistDetails);

        this.cloudService.setList(this.playlistDetails.songList!);
      });
  }
}
