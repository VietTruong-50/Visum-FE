import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';
import { Song, SongDTO } from 'src/app/api-svc';
import { StreamState } from '../../interface/StreamState';
import { CloudService } from 'src/app/service/cloud.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {

  state!: StreamState;
  currentFile: any = {};

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;
  rangeDuration = 0;
  volume = 0;

  isVolume: boolean = false;
  isPlay: boolean = false;

  constructor(private audioService: DataService) {}

  ngOnInit(): void {
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  get getCurrentSong(){
    return this.audioService.loadCurrentSong()
  }

  playStream(url?: any) {
    this.audioService.playStream(url);
    this.isPlay = true;
  }

  play() {
    this.audioService.play();
    this.isPlay = true;
  }

  pause() {
    this.audioService.pause();
    this.isPlay = false;
  }

  stop() {
    this.audioService.stop();
  }

  replay() {
    this.audioService.replay();
  }

  setVolume(event: any) {
    this.audioService.updateVolume(event);
  }

  playNext() {}

  playPrevious() {}

  setSeekTo(change: Event) {
    this.audioService.setSeekTo(change);
  }
}
