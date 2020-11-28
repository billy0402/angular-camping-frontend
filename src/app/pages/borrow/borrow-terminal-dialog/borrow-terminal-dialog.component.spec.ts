import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowTerminalDialogComponent } from './borrow-terminal-dialog.component';

describe('BorrowTerminalDialogComponent', () => {
  let component: BorrowTerminalDialogComponent;
  let fixture: ComponentFixture<BorrowTerminalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowTerminalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowTerminalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
