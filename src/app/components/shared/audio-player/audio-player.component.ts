import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  audio = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];

  @Input() file = {
    url : '',
    img : '',
    name: ''
  }
  
  files = [
    {
      url: '../assets/audio/Sunroof.mp3',
      img: '',
      name: 'Sunroof',
    },
    {
      url: '../assets/audio/UntilIFoundYou.mp3',
      img: '',
      name: 'UntilIFoundYou',
    },
    {
      url: '../assets/audio/keshi-playlist.mp3',
      img: '',
      name: 'Keshi',
    },
  ];

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;
  rangeDuration = 0;


  constructor() {
  }

  ngOnInit(): void {
  }

  handler: any;

  streamObserver(url: any) { 
    return new Observable((observer) => {
      this.audio.src = url;
      this.audio.load();
      this.audio.play();
      
      this.handler = (event: Event) => {
        this.seek = this.audio.currentTime;
        this.rangeDuration = this.audio.duration;
        this.duration = this.timeFormat(this.audio.duration);
        this.currentTime = this.timeFormat(this.audio.currentTime);
      };

      this.addEvent(this.audio, this.audioEvents, this.handler);

      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;

        this.removeEvent(this.audio, this.audioEvents, this.handler);
      };
    });
  }

  addEvent(obj: HTMLAudioElement, events: string[], handler: any) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: HTMLAudioElement, events: string[], handler: any) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(event: any) {
    this.audio.currentTime = event.target.value;
  }

  openUrl(url: string) {
    this.streamObserver(url).subscribe((event) => {});

    console.log(url);
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setVolume(event: any) {
    this.audio.volume = event.target.value;
  }

  timeFormat(time: any, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
