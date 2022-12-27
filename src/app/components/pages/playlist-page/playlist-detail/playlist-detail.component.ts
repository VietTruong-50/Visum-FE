import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'album', 'duration'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();
  constructor() { }

  ngOnInit(): void {
  }

}
