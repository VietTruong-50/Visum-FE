import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicFavoriteComponent } from './music-favorite.component';

describe('MusicFavoriteComponent', () => {
  let component: MusicFavoriteComponent;
  let fixture: ComponentFixture<MusicFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
