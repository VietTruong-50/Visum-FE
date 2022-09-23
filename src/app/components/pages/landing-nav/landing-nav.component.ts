import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioPlayerComponent } from '../../shared/audio-player/audio-player.component';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.scss'],
})
export class LandingNavComponent implements OnInit {
  
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {}

  playMusic(value: string, artist: string) {
    localStorage.setItem('song', value);
    localStorage.setItem('img', artist);
    this.router.navigate(['home']);
  }
}
