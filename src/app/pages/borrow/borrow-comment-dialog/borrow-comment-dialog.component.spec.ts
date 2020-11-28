import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowCommentDialogComponent } from './borrow-comment-dialog.component';

describe('BorrowCommentDialogComponent', () => {
  let component: BorrowCommentDialogComponent;
  let fixture: ComponentFixture<BorrowCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
