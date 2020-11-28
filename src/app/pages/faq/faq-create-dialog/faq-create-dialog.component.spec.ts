import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCreateDialogComponent } from './faq-create-dialog.component';

describe('FaqCreateDialogComponent', () => {
  let component: FaqCreateDialogComponent;
  let fixture: ComponentFixture<FaqCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
