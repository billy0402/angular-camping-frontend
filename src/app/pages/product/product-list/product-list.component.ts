import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductGroup } from '@models/product/product-group.model';

import { ProductService } from '@services/api/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productGroups: ProductGroup[] = [];
  @Input() isEdit = false;

  page = 1;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  toProductDetail(id: number): void {
    this.router.navigate(['product', id]);
  }

  toProductEdit(id: number): void {
    this.router.navigate(['product', id, 'edit']);
  }

  deleteProductGroup(id: number) {
    this.productService.deleteProductGroup(id).subscribe();
  }
}
