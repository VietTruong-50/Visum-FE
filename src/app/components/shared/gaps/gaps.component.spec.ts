import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapsComponent } from './gaps.component';

describe('GapsComponent', () => {
  let component: GapsComponent;
  let fixture: ComponentFixture<GapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
