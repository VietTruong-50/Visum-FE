import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { StreamState } from '../../interface/StreamState';


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
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
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

  playNext() {
    this.audioService.playNext()
  }

  playPrevious() {
    this.audioService.playPrevious()
  }

  setSeekTo(change: Event) {
    this.audioService.setSeekTo(change);
  }
}
