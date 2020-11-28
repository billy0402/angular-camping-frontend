import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExpansionPanelComponent } from './product-expansion-panel.component';

describe('ProductExpansionPanelComponent', () => {
  let component: ProductExpansionPanelComponent;
  let fixture: ComponentFixture<ProductExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
