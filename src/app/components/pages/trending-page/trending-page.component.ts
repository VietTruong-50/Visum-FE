import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { UserControllerService, SongDTO, SongControllerService, ApiResponsePageSong } from 'src/app/api-svc';
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

  constructor(private songControllerService: SongControllerService, private _data: DataService) {
    this.getSongData();
  }

  ngOnInit(): void {}

  getSongData() {
    this.songControllerService
      .getSong(0, 6, 'songName')
      .subscribe((result: ApiResponsePageSong) => {
        if(result.errorCode == null){
          let data = result.result?.content ? result.result?.content : [];
          this.dataSource = new MatTableDataSource<SongDTO>(data);
        }else{
          alert('Error');
        }
      });
  }


  timeFormat(time: any, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  playSong(song: any) {
  }
}
