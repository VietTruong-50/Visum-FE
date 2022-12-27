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

  // saveList(): void {
  //   localStorage.setItem('list_songs', JSON.stringify(this.files));
  // }

  // loadList(): void {
  //   this.files = JSON.parse(localStorage.getItem('list_songs')!) ?? [];
  // }

  // addFile(song: Song) {
  //   if (localStorage.getItem('cart_items')) {
  //     let index = this.files.findIndex((item) => item.id === song.id);
  //     console.log(index);

  //     if (index > -1) {
  //       this.files.splice(index, 1);
  //     }

  //     this.files.push(song);
  //   }
  //   this.saveList();
  // }

  // getFiles() {
  //   this.loadList();

  //   return this.files;
  // }

  // get getList(){
  //   this.loadList();

  //   return of(this.files)
  // }

  setList(listSong: any) {
    this.listSong$.next(listSong);
  }
}
