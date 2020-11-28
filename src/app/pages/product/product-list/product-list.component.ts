import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductGroup } from '@models/product/product-group.model';

import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productGroups: ProductGroup[] = [];
  @Input() isEdit = false;

  page = 1;

  constructor(
    private productService: ProductService,
    private snakeBarService: SnakeBarService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toProductDetail(id: number): void {
    this.router.navigate(['product', id]);
  }

  toProductEdit(id: number): void {
    this.router.navigate(['product', id, 'edit']);
  }

  deleteProductGroup(id: number) {
    this.productService.deleteProductGroup(id).subscribe(
      (res) => {
        this.snakeBarService.open(res.message);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
