import { Component, OnInit } from '@angular/core';

import { SelectType } from '@models/select-type.model';

import { ProductService } from '@services/api/product.service';
import { ProductRecommendPriceService } from '@services/product-recommend-price.service';

@Component({
  selector: 'app-product-recommend-price',
  templateUrl: './product-recommend-price.component.html',
  styleUrls: ['./product-recommend-price.component.scss'],
})
export class ProductRecommendPriceComponent implements OnInit {
  brands: SelectType[] = [];
  types: SelectType[] = [];
  subTypes: SelectType[] = [];
  recommendPrice!: number;

  selectBrand!: SelectType;
  selectType!: SelectType;
  selectSubType!: SelectType;

  constructor(
    private productService: ProductService,
    private productRecommendPriceService: ProductRecommendPriceService
  ) {}

  ngOnInit(): void {
    this.getProductBrands();
  }

  getProductBrands(): void {
    this.productService.getProductBrands().subscribe((brands) => {
      if (!brands) {
        return;
      }

      this.brands = brands;
    });
  }

  getProductTypes(): void {
    this.productService
      .getProductBrandTypes(this.selectBrand.id)
      .subscribe((types) => {
        if (!types) {
          return;
        }

        this.types = types;
        this.subTypes = [];
        this.selectType = null;
        this.selectSubType = null;
        this.recommendPrice = null;
      });
  }

  getProductSubTypes(): void {
    this.productService
      .getProductBrandSubTypes(this.selectBrand.id, this.selectType.id)
      .subscribe((subTypes) => {
        if (!subTypes) {
          return;
        }

        this.subTypes = subTypes;
        this.recommendPrice = null;
        this.selectSubType = null;
      });
  }

  getProductRecommendPrice(): void {
    this.productService
      .getProductRecommendPrice(
        this.selectBrand.id,
        this.selectType.id,
        this.selectSubType.id
      )
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.recommendPrice = data.price;
        this.productRecommendPriceService.append({
          brand: this.selectBrand.name,
          type: this.selectType.name,
          subType: this.selectSubType.name,
          price: this.recommendPrice,
        });
      });
  }
}
