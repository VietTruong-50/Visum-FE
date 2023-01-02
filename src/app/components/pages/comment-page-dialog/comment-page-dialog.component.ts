import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { SongControllerService, UserControllerService } from 'src/app/api-svc';
import { LogInComponent } from '../../auth/log-in-component/log-in.component';
import { GlobalConstants } from '../../shared/GlobalConstants';

@Component({
  selector: 'app-comment-page-dialog',
  templateUrl: './comment-page-dialog.component.html',
  styleUrls: ['./comment-page-dialog.component.scss'],
})
export class CommentPageDialogComponent implements OnInit {
  commentData: any;
  songId: number;
  key: boolean;
  value: string = '';
  userData: any;

  constructor(
    private userController: UserControllerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cookieService: CookieService
  ) {
    this.songId = data;
    this.key = this.cookieService.check(GlobalConstants.authToken);
    this.userData = JSON.parse(localStorage.getItem('userProfile')!)
    console.log(this.userData);
    
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.userController
      .getAllComments(this.songId, 'createdAt', 'ASC', 0, 10)
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

  createComment() {
    console.log(this.value);
    this.userController
      .createCommentDTO({
        commentText: this.value,
        songId: this.songId,
      })
      .subscribe((rs) => {
        this.value = '';
        this.getComments();
      });
  }

  deleteComment(commentId: number) {
    this.userController.deleteComment(commentId).subscribe((rs) => {
      this.getComments();
    });
  }

  checkUserComment(userId: number): boolean{
    return userId === this.userData.id
  }
}
