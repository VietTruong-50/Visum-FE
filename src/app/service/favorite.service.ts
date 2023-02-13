import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Song, UserControllerService } from '../api-svc';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private userController: UserControllerService) {
    this.getFavoriteData();
  }

  favoriteListId: number[] = [];

  private favoriteList: BehaviorSubject<Song[]> = new BehaviorSubject([{}])
  favoriteSongs = this.favoriteList.asObservable();

  getFavoriteData() {
    this.userController.getListFavorites(0, 20, 'views').subscribe((rs) => {
      this.favoriteListId = [];
      rs.result?.content?.forEach((song) => this.favoriteListId.push(song.id!));
    });
  }

  setList(list: any){
    this.favoriteList.next(list);
  }

  checkFavorite(song: Song): boolean {
    let foundSong;
    foundSong = this.favoriteListId.find((favor) => {
      return favor === song.id;
    });

    return foundSong != null ? true : false;
  }
}
