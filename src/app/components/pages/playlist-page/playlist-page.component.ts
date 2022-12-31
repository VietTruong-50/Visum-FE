import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/api-svc';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPlaylist();
  }

  openPlaylistDialog() {
    this.dialog
      .open(PlaylistDialogComponent, {
        width: '20vw',
        data: {
          title: "NEW PLAYLIST"
        }
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getAllPlaylist();
      });
  }

  getAllPlaylist() {
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
    });
  }

  deletePlaylist(playlistId: number) {
    this.userController.deletePlaylist(playlistId).subscribe((rs) => {
      this.getAllPlaylist();
    });
  }

  renderTo(playlistId: number){
    this.router.navigate(['playlist-details', playlistId])
  }
}
