import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import {
  UserControllerService,
  SongDTO,
  SongControllerService,
  ApiResponsePageSong,
  Song,
} from 'src/app/api-svc';
import { CloudService } from 'src/app/service/cloud.service';
import { DataService } from 'src/app/service/data.service';
import { CommentPageDialogComponent } from '../comment-page-dialog/comment-page-dialog.component';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.scss'],
})
export class TrendingPageComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;
  playlistData: any
  displayedColumns: string[] = ['position', 'name', 'album', 'duration', 'action'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private songControllerService: SongControllerService,
    private _data: DataService,
    private userController: UserControllerService,
    private dialog: MatDialog,
    private cloudService: CloudService,
    private audioService: DataService
  ) {}

  ngOnInit(): void {
    this.getSongData();
    this.getAllPlaylist()

    Chart.register(...registerables);
  }

  randomScalingFactor() {
    return (Math.random() > 3 ? 2 : 1) * Math.round(Math.random() * 100);
  }

  listSong: any

  getSongData() {
    this.songControllerService.getSongChart(0, 10, 'name').subscribe((rs) => {
      this.listSong = rs.result?.songs;

      new Chart('lineChart', {
        type: 'line',
        data: {
          labels: [
            'Thứ 2',
            'Thứ 3',
            'Thứ 4',
            'Thứ 5',
            'Thứ 6',
            'Thứ 7',
            'Chủ Nhật',
          ],
          datasets: [
            {
              label: this.listSong?.at(0)?.songName,
              data: rs.result?.top1,
              fill: false,
              borderColor: '#4a90e2',
              borderWidth: 1,
              backgroundColor: '#fff',
              tension: 0.5,
            },
            {
              label: this.listSong?.at(1)?.songName,
              data: rs.result?.top2,
              fill: false,
              borderColor: '#50e3c2',
              borderWidth: 1,
              backgroundColor: '#fff',
              tension: 0.5,
            },
            {
              label: this.listSong?.at(2)?.songName,
              data: rs.result?.top3,
              borderColor: '#e35050',
              borderWidth: 1,
              backgroundColor: '#fff',
              tension: 0.5,
            },
          ],
        },
        options: {
          scales: {
            x: {
              border: { color: '#8a8491' },
              ticks: {
                color: '#fff',
              },
              grid: {
                color: '#8a8491',
                display: false,
              },
            },
            y: {
              border: { color: '#8a8491', dash: [2, 4] },
              ticks: {
                color: '#fff',
              },
              grid: {
                color: '#8a8491',
                display: true,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              usePointStyle: true,
            },
          },
        },
      });
      this.dataSource = new MatTableDataSource<SongDTO>(rs.result?.songs);
    });
  }

  timeFormat(time: any, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  playSong(song: Song) {
    this.audioService.saveCurrentSong(song);
    this.audioService.playStream(song, true);
  }

  getAllPlaylist() {
    this.userController.getAllPlaylistByUser().subscribe((rs) => {
      this.playlistData = rs.result;
    });
  }

  openCommentDialog(songId: number) {
    this.dialog.open(CommentPageDialogComponent, {
      width: '30vw',
      data: songId,
    });
  }

  addToPlaylist(playlistId: number, songId: number) {
    this.userController
      .addSongToPlaylist(playlistId, [songId])
      .subscribe((rs) => {});
  }

  playPlaylist(isShuffle: boolean) {
    if (this.listSong?.length! > 0) {
      this.cloudService.setList(this.listSong!);
    }
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
}
