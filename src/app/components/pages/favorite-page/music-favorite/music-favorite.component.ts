import { Component, OnInit } from '@angular/core';

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

  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {}
}
