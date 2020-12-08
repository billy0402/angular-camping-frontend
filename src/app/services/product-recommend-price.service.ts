import { Injectable } from '@angular/core';

import { ProductRecommendPrice } from '@models/product/product-recommend-price.model';

@Injectable({
  providedIn: 'root',
})
export class ProductRecommendPriceService {
  private _recommendPrices: ProductRecommendPrice[] = [];

  constructor() {}

  get recommendPrices(): ProductRecommendPrice[] {
    return this._recommendPrices;
  }

  get total(): number {
    return this._recommendPrices.reduce((a, b) => a + b.price, 0);
  }

  append(recommendPrice: ProductRecommendPrice): void {
    this._recommendPrices.push(recommendPrice);
  }

  remove(index: number): void {
    this._recommendPrices.splice(index, 1);
  }

  clear(): void {
    this._recommendPrices = [];
  }
}
