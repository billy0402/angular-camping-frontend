import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowCreateDialogComponent } from './borrow-create-dialog.component';

describe('BorrowCreateDialogComponent', () => {
  let component: BorrowCreateDialogComponent;
  let fixture: ComponentFixture<BorrowCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
