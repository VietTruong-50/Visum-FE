import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Song, SongControllerService } from '../api-svc';
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
    songId: undefined,
    currentDuration: undefined
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

  constructor(
    private cloudService: CloudService,
    private songController: SongControllerService
  ) {
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
    if (this.loadCurrentSong != null) {
      // this.streamObserver(
      //   '../assets/audio/' +
      //     (song
      //       ? song.songName
      //       : this._listSong[this._listSong.length - 1].songName) +
      //     '.mp3'
      // ).subscribe((rs) => {});
    }
    this.audio.play();
    console.log(this.state);
  }

  playStream(song?: Song, isAdd?: boolean) {
    if (song && isAdd) {
      this.addSongToList(song);
    }

    return this.streamObserver(
      '../assets/audio/' +
        (song
          ? song.songName
          : this._listSong[this._listSong.length - 1].songName) +
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

  replay() {
    this.audio.currentTime = 0;
  }

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
        
        let cr = this.loadCurrentSong()

        this.state.songId = cr?.id
        this.state.currentDuration = cr?.duration

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
        this.songController.increaseSongView(this.state.songId!).subscribe((rs) => {});

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
      songId: undefined,
      currentDuration: undefined
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  saveCurrentSong(song: Song): void {
    localStorage.setItem('currentSong', JSON.stringify(song));
  }

  loadCurrentSong() {
    return JSON.parse(
      localStorage.getItem('currentSong') != 'undefined'
        ? localStorage.getItem('currentSong')!
        : '{ }'
    );
  }

  updateVolume(event: any) {
    this.audio.volume = event.target.value;
    this.state.volume = this.audio.volume;
  }

  currentSong!: Song;

  playNext(song?: Song) {
    console.log('Play next');

    let currentIndex = this._listSong.findIndex(
      (value) => value.id === this.loadCurrentSong().id
    );
    console.log(currentIndex);

    let nextIndex =
      currentIndex === this._listSong.length - 1 ? 0 : currentIndex + 1;

    this.currentSong = this._listSong.at(nextIndex)!;

    this.saveCurrentSong(this.currentSong);
    this.playStream(this.currentSong);
  }

  playPrevious(song?: Song) {
    console.log(this.loadCurrentSong().songName);

    let currentIndex = this._listSong.findIndex(
      (value) => value.id === this.loadCurrentSong().id
    );

    console.log(currentIndex);

    let previousIndex =
      currentIndex === 0 ? this._listSong.length - 1 : currentIndex - 1;
    console.log(previousIndex);
    console.log(this._listSong);

    this.currentSong = this._listSong.at(previousIndex)!;

    this.saveCurrentSong(this.currentSong);
    this.playStream(this.currentSong);
  }

  playPlaylist(isSuffle: boolean, list?: Song[]) {
    this._listSong = list!;

    this.saveCurrentSong(this._listSong[0]);
    this.streamObserver(
      '../assets/audio/' + this._listSong[0].songName + '.mp3'
    ).subscribe((rs) => {});
  }
}
