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
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './components/shared/api-http-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { LandingNavComponent } from './components/pages/landing-nav/landing-nav.component';
import { GenrePageComponent } from './components/pages/genre-page/genre-page.component';
import { SongByGenreComponent } from './components/pages/song-by-genre/song-by-genre.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { AudioPlayerComponent } from './components/shared/audio-player/audio-player.component';
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
    AudioPlayerComponent
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
    MatSelectModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
