import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

interface SongData {
  url: string;
  img: string;
  artist: string;
}

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audio: any;

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

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;
  rangeDuration = 0;
  volume = 0;

  file: SongData;

  isVolume: boolean = false;
  isPlay: boolean = true;

  song: any;

  constructor(private router: Router) {
    this.audio = new Audio();

    this.song = localStorage.getItem('song');
    const img = localStorage.getItem('img');
    const artist = localStorage.getItem('artist');

    this.file = {
      url: '../assets/audio/' + this.song + '.mp3',
      img: img
        ? '../assets/images/song/' + img + '.jpg'
        : '../assets/images/Music_Mindfully.jpg',
      artist: artist ? artist : '',
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem('song')) {
      this.streamObserver(this.file.url).subscribe((event) => {});
    }
  }

  ngOnDestroy() {
    // destroy audio here
    if (this.audio) {
      this.audio.pause();
    }
  }

  streamObserver(url: any) {
    return new Observable((observer) => {
      this.audio.src = url;
      this.audio.load();
      this.audio.play();

      if (Number(localStorage.getItem('playTime'))) {
        this.audio.currentTime = Number(localStorage.getItem('playTime'));
      }

      const handler = (event: Event) => {
        this.seek = this.audio.currentTime;
        this.rangeDuration = this.audio.duration;
        this.duration = this.timeFormat(this.audio.duration);
        this.currentTime = this.timeFormat(this.audio.currentTime);
        this.volume = this.audio.volume;

        localStorage.setItem('playTime', this.audio.currentTime.toString());
        localStorage.setItem('duration', this.audio.duration.toString());
      };

      this.addEvent(this.audio, handler);

      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;

        this.removeEvent(this.audio, handler);
      };
    });
  }

  addEvent(obj: HTMLAudioElement, handler: any) {
    this.audioEvents.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: HTMLAudioElement, handler: any) {
    this.audioEvents.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(event: any) {
    this.audio.currentTime = event.target.value;
  }

  play() {
    this.audio.play();
    this.isPlay = false;
  }

  pause() {
    this.audio.pause();
    this.isPlay = true;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.play();
  }

  setVolume(event: any) {
    this.audio.volume = event.target.value;
  }

  timeFormat(time: any, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
