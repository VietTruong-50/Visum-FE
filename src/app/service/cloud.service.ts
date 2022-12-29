import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Song } from '../api-svc';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  files: Song[] = [];

  private listSong$ = new BehaviorSubject<any>([]);
  listSong = this.listSong$.asObservable();
  
  constructor() {}

  setList(listSong: any) {
    // this.listSong$.next(listSong);
  }
}
