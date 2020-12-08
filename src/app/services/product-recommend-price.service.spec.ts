import { TestBed } from '@angular/core/testing';

import { ProductRecommendPriceService } from './product-recommend-price.service';

describe('ProductRecommendPriceService', () => {
  let service: ProductRecommendPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRecommendPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
