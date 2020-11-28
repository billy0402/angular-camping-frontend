import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowListComponent } from './borrow-list.component';

describe('BorrowListComponent', () => {
  let component: BorrowListComponent;
  let fixture: ComponentFixture<BorrowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
