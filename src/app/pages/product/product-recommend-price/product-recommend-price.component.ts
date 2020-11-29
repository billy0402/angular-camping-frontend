import { Component, OnInit } from '@angular/core';

import { SelectType } from '@models/select-type.model';

import { ProductService } from '@services/api/product.service';

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

  selectBrandId!: number;
  selectTypeId!: number;
  selectSubTypeId!: number;

  constructor(private productService: ProductService) {}

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
      .getProductBrandTypes(this.selectBrandId)
      .subscribe((types) => {
        if (!types) {
          return;
        }

        this.types = types;
        this.subTypes = [];
        this.selectTypeId = null;
        this.selectSubTypeId = null;
        this.recommendPrice = null;
      });
  }

  getProductSubTypes(): void {
    this.productService
      .getProductBrandSubTypes(this.selectBrandId, this.selectTypeId)
      .subscribe((subTypes) => {
        if (!subTypes) {
          return;
        }

        this.subTypes = subTypes;
        this.recommendPrice = null;
        this.selectSubTypeId = null;
      });
  }

  getProductRecommendPrice(): void {
    this.productService
      .getProductRecommendPrice(
        this.selectBrandId,
        this.selectTypeId,
        this.selectSubTypeId
      )
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.recommendPrice = data.price;
      });
  }
}
