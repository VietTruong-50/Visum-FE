import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.scss'],
})
export class RightSideNavComponent implements OnInit {
  file = {
    url: '',
    img: '',
    name: '',
  };

  @ViewChild(AudioPlayerComponent)
  audio: AudioPlayerComponent = new AudioPlayerComponent;

  song: any;
  img: any;
  mp3Source: string | undefined;
  imgSource: string | undefined;

  constructor() {
    this.song = localStorage.getItem('song');
    this.img = localStorage.getItem('img');
    this.mp3Source = '../assets/audio/' + this.song + '.mp3';
    this.imgSource = '../assets/images/song/' + this.img + '.jpg';

    this.file = {
      url: this.mp3Source,
      img: this.imgSource,
      name: this.song
    }


  }

  ngOnInit(): void {}
  
}
