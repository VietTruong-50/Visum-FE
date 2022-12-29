import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/auth/log-in-component/log-in.component';
import { SignUpComponent } from './components/auth/sign-up-component/sign-up.component';
import { ArtistDetailComponent } from './components/pages/artist-detail/artist-detail.component';
import { FavoritePageComponent } from './components/pages/favorite-page/favorite-page.component';
import { GenrePageComponent } from './components/pages/genre-page/genre-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LandingNavComponent } from './components/pages/landing-nav/landing-nav.component';
import { PlaylistDetailComponent } from './components/pages/playlist-page/playlist-detail/playlist-detail.component';
import { PlaylistPageComponent } from './components/pages/playlist-page/playlist-page.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { SongByGenreComponent } from './components/pages/song-by-genre/song-by-genre.component';
import { TrendingPageComponent } from './components/pages/trending-page/trending-page.component';
import { AudioPlayerComponent } from './components/shared/audio-player/audio-player.component';
import { RightSideNavComponent } from './components/shared/right-side-nav/right-side-nav.component';

let routes: Routes = [];
routes = [
  {
    path: '',
    component: LandingNavComponent,
  },
  {
    path: 'discover',
    component: LandingNavComponent,
  },
  {
    path: 'genres',
    component: GenrePageComponent,
  },
  {
    path: 'favorite',
    component: FavoritePageComponent,
  },
  {
    path: 'genres/:genre',
    component: SongByGenreComponent,
  },
  {
    path: 'playlist',
    component: PlaylistPageComponent,
  },
  {
    path: 'playlist-details/:playlistId',
    component: PlaylistDetailComponent,
  },
  {
    path: 'search/:title',
    component: SearchPageComponent,
  },
  {
    path: 'artist-detail',
    component: ArtistDetailComponent,
  },
  {
    path: 'trending',
    component: TrendingPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 0],
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
