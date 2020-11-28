import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommendPriceComponent } from './product-recommend-price.component';

describe('ProductRecommendPriceComponent', () => {
  let component: ProductRecommendPriceComponent;
  let fixture: ComponentFixture<ProductRecommendPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRecommendPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRecommendPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
