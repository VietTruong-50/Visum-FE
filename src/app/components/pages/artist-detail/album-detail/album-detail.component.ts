import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlbumControllerService, Song } from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { CommentPageDialogComponent } from '../../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
})
export class AlbumDetailComponent implements OnInit {
  sort: string = 'DSC';
  pageIndex: number = 0;
  pageSize: number = 5;
  albumData: any;
  displayedColumns: string[] = [
    'position',
    'name',
    'album',
    'duration',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private cloudService: CloudService,
    private audioService: DataService,
    private dialog: MatDialog,
    private albumController: AlbumControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAlbumSong();
  }

  @ViewChild('matSort') matSort = new MatSort();
  ngAfterViewInit() {
    this.matSort.disableClear = true;
    this.dataSource.sort = this.matSort;
  }

  playPlaylist(isShuffle: boolean) {
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

  sortBy(sortType: string, order: string) {
    order != 'ASC' ? (this.sort = order) : (this.sort = 'ASC');
  }

  openCommentDialog(songId: number) {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
      data: songId,
    });
  }

  getAlbumSong() {
    this.albumController
      .getAlbumById(this.route.snapshot.params['id'])
      .subscribe((rs) => {
        this.cloudService.setList(rs.result?.songList);
        this.albumData = rs.result
        this.dataSource = new MatTableDataSource<Song>(rs.result?.songList);
      });
  }
}
