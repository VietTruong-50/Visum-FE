import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Song } from '../api-svc';
import { ApiResponseSongDTO } from '../api-svc/model/apiResponseSongDTO';
import { StreamState } from '../components/interface/StreamState';
import { CloudService } from './cloud.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private stop$ = new Subject<void>();

  _listSong: Song[] = [];

  set listSong(list: any) {
    this._listSong = list;
  }

  get listSong() {
    return this._listSong;
  }

  private state: StreamState = {
    isPlaying: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
    volume: undefined,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

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

  constructor(private cloudService: CloudService) {
    this.audio = new Audio();
  }

  streamObserver(url: any) {
    return new Observable((observer) => {
      this.audio.src = url;

      this.audio.load();

      this.audio.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      //4278.731356, 163.079646, 177.786332

      this.addEvent(this.audio, handler);

      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;

        this.removeEvent(this.audio, handler);
        this.resetState();
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

  timeFormat(time: any, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  play() {
    this.audio.play();
    console.log(this.state);
  }

  playStream(song: Song) {
    this.addSongToList(song);

    return this.streamObserver(
      '../assets/audio/' +
        this._listSong[this._listSong.length - 1].songName +
        '.mp3'
    ).subscribe((rs) => {});
  }

  addSongToList(song: Song) {
    let index = this._listSong.findIndex((item) => item.id === song.id);

    if (index > -1) {
      this._listSong.splice(index, 1);
    }

    this._listSong.push(song);
  }

  setList() {
    this.cloudService.setList(this._listSong);
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.stop$.next();
  }

  replay() {}

  setSeekTo(event: any) {
    this.audio.currentTime = event.target.value;
  }

  private updateStateEvents(event: Event) {
    switch (event.type) {
      case 'canplay':
        this.state.currentTime = this.audio.currentTime;
        this.state.duration = this.audio.duration;
        this.state.readableDuration = this.timeFormat(this.audio.duration);
        this.state.readableCurrentTime = this.timeFormat(
          this.audio.currentTime
        );
        this.state.volume = this.audio.volume;
        console.log(this.state);

        break;
      case 'playing':
        this.state.isPlaying = true;
        break;
      case 'pause':
        this.state.isPlaying = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audio.currentTime;
        this.state.readableCurrentTime = this.timeFormat(
          this.state.currentTime
        );
        break;
      case 'ended':
        this.playNext();

        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }

    this.stateChange.next(this.state);
  }

  resetState() {
    this.state = {
      isPlaying: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      volume: undefined,
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  saveCurrentSong(song: Song): void {
    localStorage.setItem('currentSong', JSON.stringify(song));
  }

  loadCurrentSong() {
    return JSON.parse(localStorage.getItem('currentSong')!) ?? [];
  }

  updateVolume(event: any) {
    this.audio.volume = event.target.value;
    this.state.volume = this.audio.volume;
  }

  currentSong!: Song;

  playNext(song?: Song) {
    console.log('Play next');

    const currentIndex = this._listSong.findIndex((value) =>
      value === song ? song : this.loadCurrentSong()
    );

    let nextIndex = (currentIndex + 1) % this._listSong.length;

    this.currentSong = this._listSong.at(nextIndex)!;

    this.saveCurrentSong(this.currentSong);
    this.playStream(this.currentSong);
  }

  // playPrevious() {
  // const currentIndex = this.listSong.findIndex((value) => value == this.song);
  // let previousIndex =
  //   (currentIndex + this.listSong.length - 1) % this.listSong.length;
  // this.song = this.listSong.at(previousIndex);
  // this.streamObserver('../assets/audio/' + this.song.title + '.mp3').subscribe((event) => {});
  // }

  playPlaylist(isSuffle: boolean) {
    // if (isSuffle != true) {
    // } else {
    // }
  }
}
