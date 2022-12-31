import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SongControllerService, UserControllerService } from 'src/app/api-svc';
import { LogInComponent } from '../../auth/log-in-component/log-in.component';

@Component({
  selector: 'app-comment-page-dialog',
  templateUrl: './comment-page-dialog.component.html',
  styleUrls: ['./comment-page-dialog.component.scss'],
})
export class CommentPageDialogComponent implements OnInit {
  commentData: any;
  songId: number

  constructor(
    private userController: UserControllerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.songId = data
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.userController
      .getAllComments(this.songId, 'createdAt', 'ASC', 0, 20)
      .subscribe((rs) => {
        console.log(rs.result?.content);
        this.commentData = rs.result?.content;
      });
  }

  openLoginDialog() {
    this.dialog.open(LogInComponent, {
      width: '45vw',
    });
  }
}
