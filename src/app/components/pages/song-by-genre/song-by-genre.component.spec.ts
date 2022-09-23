import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongByGenreComponent } from './song-by-genre.component';

describe('SongByGenreComponent', () => {
  let component: SongByGenreComponent;
  let fixture: ComponentFixture<SongByGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongByGenreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
