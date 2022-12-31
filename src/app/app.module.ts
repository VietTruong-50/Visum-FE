import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './components/auth/sign-up-component/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { LogInComponent } from './components/auth/log-in-component/log-in.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SideBarComponent } from './components/pages/side-bar/side-bar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SwiperModule } from 'swiper/angular';
import { GapsComponent } from './components/shared/gaps/gaps.component';
import { RightSideNavComponent } from './components/shared/right-side-nav/right-side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './components/shared/api-http-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { LandingNavComponent } from './components/pages/landing-nav/landing-nav.component';
import { GenrePageComponent } from './components/pages/genre-page/genre-page.component';
import { SongByGenreComponent } from './components/pages/song-by-genre/song-by-genre.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AudioPlayerComponent } from './components/shared/audio-player/audio-player.component';
import { FavoritePageComponent } from './components/pages/favorite-page/favorite-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MusicFavoriteComponent } from './components/pages/favorite-page/music-favorite/music-favorite.component';
import { MatMenuModule } from '@angular/material/menu';
import { PlaylistPageComponent } from './components/pages/playlist-page/playlist-page.component';
import { PlaylistDetailComponent } from './components/pages/playlist-page/playlist-detail/playlist-detail.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { ArtistDetailComponent } from './components/pages/artist-detail/artist-detail.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import {
  CategoryService,
  LegendService,
  TooltipService,
  DataLabelService,
  LineSeriesService,
} from '@syncfusion/ej2-angular-charts';
import { TrendingPageComponent } from './components/pages/trending-page/trending-page.component';
import { SpinnerLoadingComponent } from './components/shared/spinner-loading/spinner-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlaylistDialogComponent } from './components/pages/playlist-page/playlist-dialog/playlist-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { TimeFormatPipe } from './components/pipes/time-format.pipe';
import { CommentPageDialogComponent } from './components/pages/comment-page-dialog/comment-page-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    HomePageComponent,
    SideBarComponent,
    HeaderComponent,
    GapsComponent,
    RightSideNavComponent,
    LandingNavComponent,
    GenrePageComponent,
    SongByGenreComponent,
    UserProfileComponent,
    AudioPlayerComponent,
    FavoritePageComponent,
    MusicFavoriteComponent,
    PlaylistPageComponent,
    PlaylistDetailComponent,
    SearchPageComponent,
    ArtistDetailComponent,
    TrendingPageComponent,
    SpinnerLoadingComponent,
    PlaylistDialogComponent,
    TimeFormatPipe,
    CommentPageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    NgbModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    SwiperModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    ChartModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
