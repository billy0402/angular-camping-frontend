import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowPaymentDialogComponent } from './borrow-payment-dialog.component';

describe('BorrowPaymentDialogComponent', () => {
  let component: BorrowPaymentDialogComponent;
  let fixture: ComponentFixture<BorrowPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
