import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import {
  UserControllerService,
  SongDTO,
  SongControllerService,
  ApiResponsePageSong,
} from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.scss'],
})
export class TrendingPageComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['position', 'name', 'album', 'duration'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();

  constructor(
    private songControllerService: SongControllerService,
    private _data: DataService
  ) {}

  ngOnInit(): void {
    this.getSongData();

    Chart.register(...registerables);
  }

  randomScalingFactor() {
    return (Math.random() > 3 ? 2 : 1) * Math.round(Math.random() * 100);
  }

  getSongData() {
    this.songControllerService.getSongChart(0, 10, 'name').subscribe((rs) => {
      let listSong = rs.result?.songs;
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
              label: listSong?.at(0)?.songName,
              data: rs.result?.top1,
              fill: false,
              borderColor: '#4a90e2',
              borderWidth: 1,
              backgroundColor: '#fff',
              tension: 0.4,
            },
            {
              label: listSong?.at(1)?.songName,
              data: rs.result?.top2,
              fill: false,
              borderColor: '#50e3c2',
              borderWidth: 1,
              backgroundColor: '#fff',
              tension: 0.4,
            },
            {
              label: listSong?.at(2)?.songName,
              data: rs.result?.top3,
              borderColor: '#e35050',
              borderWidth: 1,
              backgroundColor: '#fff',
              tension: 0.4,
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
              border: { color: '#8a8491', dash: [8, 4] },
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

  playSong(song: any) {}
}
