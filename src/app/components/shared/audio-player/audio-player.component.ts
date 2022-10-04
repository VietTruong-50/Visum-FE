import {
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';
import { SongDTO } from 'src/app/api-svc';

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

  isVolume: boolean = false;
  isPlay: boolean = false;

  song: any;

  constructor( private _data: DataService) {
    this.audio = new Audio();
  }

  ngOnInit(): void {
    this._data.get()?.subscribe(rs => {
      this.song = rs;

      this.streamObserver('../assets/audio/' + rs.title + '.mp3').subscribe((event) => {});
    })
  }

  ngOnDestroy() {}

  streamObserver(url: any) {
    return new Observable((observer) => {
      this.audio.src = url;
      this.audio.load();
      this.audio.play();
      
      const handler = (event: Event) => {
        this.seek = this.audio.currentTime;
        this.rangeDuration = this.audio.duration;
        this.duration = this.timeFormat(this.audio.duration);     
        this.currentTime = this.timeFormat(this.audio.currentTime);
        this.volume = this.audio.volume;
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

  replay() {
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
