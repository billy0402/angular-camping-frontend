import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoolProofDialogComponent } from './fool-proof-dialog.component';

describe('FoolProofDialogComponent', () => {
  let component: FoolProofDialogComponent;
  let fixture: ComponentFixture<FoolProofDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoolProofDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoolProofDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
