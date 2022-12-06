import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { SongControllerService, SongDTO, UserControllerService } from 'src/app/api-svc';
import { DataService } from 'src/app/service/data.service';

interface MusicData {
  position: number;
  name: string;
  album: string;
  duration: string;
}
const ELEMENT_DATA: MusicData[] = [
  {
    position: 1,
    name: 'UntilIFoundYou',
    album: 'UntilIFoundYou (single)',
    duration: 'H',
  },
  { position: 2, name: 'Sunroof', album: 'Sunroof (single)', duration: 'He' },
  {
    position: 3,
    name: 'Keshi playlist',
    album: 'Keshi playlist',
    duration: 'Li',
  },
];
@Component({
  selector: 'app-music-favorite',
  templateUrl: './music-favorite.component.html',
  styleUrls: ['./music-favorite.component.scss'],
})
export class MusicFavoriteComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'album', 'duration'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();
  constructor(private userController: UserControllerService, private _data: DataService) {
    this.getFavoriteData();
  }

  ngOnInit(): void {}

  getFavoriteData() {
    this.userController.getListFavorites(1, 4, 'createdAt').subscribe((result) => {
      let data = result.result?.content ? result.result?.content : [];
      this.dataSource = new MatTableDataSource<SongDTO>(data);
    });
  }

  timeFormat(time: any, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  playSong(song: any) {
    this._data.add(song);
  }

  stop(song: any){
    
  }
}
