import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent implements OnInit {

  // song: any;
  // img: any;
  // artist: any;

  constructor() {
    // this.song = '../assets/audio/' + localStorage.getItem('song') + '.mp3';
    // this.img = '../assets/images/song/' + localStorage.getItem('img') + '.jpg';
    // this.artist = localStorage.getItem('artist');

  }

  ngOnInit(): void {}
  
}
