import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SongControllerService,
  ApiResponsePageSong,
  SingerControllerService,
  SingerDTO,
  UserControllerService,
} from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
})
export class ArtistDetailComponent implements OnInit {
  singerData!: SingerDTO;
  playlistData: any;

  constructor(
    private singerController: SingerControllerService,
    private userController: UserControllerService,
    private audioService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSongData();
  }

  getSongData() {
    this.singerController
      .findSingerById(this.route.snapshot.params['id'])
      .subscribe((rs) => {
        this.singerData = rs.result!;
      });
  }

  playSong(song: any) {}

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
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
    });
  }
}
