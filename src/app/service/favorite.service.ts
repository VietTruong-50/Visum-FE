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

  favoriteList: number[] = [];

  getFavoriteData() {
    this.userController.getListFavorites(0, 4, 'views').subscribe((rs) => {
      this.favoriteList = [];
      rs.result?.content?.forEach((song) => this.favoriteList.push(song.id!));
    });
  }

  checkFavorite(song: Song): boolean {
    let foundSong;
    foundSong = this.favoriteList.find((favor) => {
      return favor === song.id;
    });

    return foundSong != null ? true : false;
  }
}
