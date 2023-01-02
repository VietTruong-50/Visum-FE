import { Song } from "src/app/api-svc";

export interface FavoriteSong{
    song?: Song;
    idFavorite?: number
}