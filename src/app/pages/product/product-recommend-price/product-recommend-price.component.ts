import { Component, OnInit } from '@angular/core';

import { ProductBrand } from '@models/product/product-brand.model';
import {
  ProductSubType,
  ProductType,
} from '@models/product/product-type.model';

import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-product-recommend-price',
  templateUrl: './product-recommend-price.component.html',
  styleUrls: ['./product-recommend-price.component.scss'],
})
export class ProductRecommendPriceComponent implements OnInit {
  brands: ProductBrand[] = [];
  types: ProductType[] = [];
  subTypes: ProductSubType[] = [];
  recommendPrice!: number;

  selectBrandId!: number;
  selectTypeId!: number;
  selectSubTypeId!: number;

  constructor(
    private productService: ProductService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.getProductBrands();
  }

  getProductBrands(): void {
    this.productService.getProductBrands().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.brands = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getProductTypes(): void {
    this.productService.getProductBrandTypes(this.selectBrandId).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.types = res.data;
        this.subTypes = [];
        this.selectTypeId = null;
        this.selectSubTypeId = null;
        this.recommendPrice = null;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getProductSubTypes(): void {
    this.productService
      .getProductBrandSubTypes(this.selectBrandId, this.selectTypeId)
      .subscribe(
        (res) => {
          if (!res.result) {
            this.snakeBarService.open(res.message);
          }

          this.subTypes = res.data;
          this.recommendPrice = null;
          this.selectSubTypeId = null;
        },
        (err) => {
          this.snakeBarService.open(err.error.message);
        }
      );
  }

  getProductRecommendPrice(): void {
    this.productService
      .getProductRecommendPrice(
        this.selectBrandId,
        this.selectTypeId,
        this.selectSubTypeId
      )
      .subscribe(
        (res) => {
          if (!res.result) {
            this.snakeBarService.open(res.message);
          }

          this.recommendPrice = res.data.price;
        },
        (err) => {
          this.snakeBarService.open(err.error.message);
        }
      );
  }
}
