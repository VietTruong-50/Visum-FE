import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss'],
})
export class PlaylistDialogComponent implements OnInit {
  title: string = '';
  playlistId: number;
  formGroup: FormGroup;

  constructor(
    private userController: UserControllerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.playlistId = data.playlistId;

    this.formGroup = this.formBuilder.group({
      playlistName: [''],
    });
  }

  ngOnInit(): void {}

  doAction() {
    console.log(this.formGroup.controls['playlistName'].value);

    if (this.title == 'NEW PLAYLIST') {
      this.userController
        .createNewPlaylist({
          playlistName: this.formGroup.controls['playlistName'].value,
        })
        .subscribe((rs) => {
          console.log('add success');
          this.dialogRef.close();
        });
    } else {
      this.userController
        .updatePlaylist(this.playlistId, {
          playlistName: this.formGroup.controls['playlistName'].value,
        })
        .subscribe((rs) => {
          this.dialogRef.close();
        });
    }
  }
}
