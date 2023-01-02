import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Song, UserControllerService } from '../api-svc';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  listSong: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);

  constructor() {}

  setList(listSong: any) {
    this.listSong.next(listSong);
  }

  getData() {
    return this.listSong.asObservable();
  }
}
