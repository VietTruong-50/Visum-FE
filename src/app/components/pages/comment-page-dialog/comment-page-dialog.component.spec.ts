import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPageDialogComponent } from './comment-page-dialog.component';

describe('CommentPageDialogComponent', () => {
  let component: CommentPageDialogComponent;
  let fixture: ComponentFixture<CommentPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
