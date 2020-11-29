import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ProductGroupDetail } from '@models/product/product-group.model';

import { ProductService } from '@services/api/product.service';

import { BorrowCreateDialogComponent } from '@pages/borrow/borrow-create-dialog/borrow-create-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productGroupId!: number;
  productGroup!: ProductGroupDetail;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.productGroupId = +param.get('id')!;
      this.getProductDetail(this.productGroupId);
    });
  }

  getProductDetail(id: number): void {
    this.productService.getProductGroup(id).subscribe((productGroup) => {
      if (!productGroup) {
        return;
      }

      this.productGroup = productGroup;
    });
  }

  toUserProduct() {
    this.router.navigate(
      ['user', this.productGroup.productOwnerAccount, 'product'],
      {
        queryParams: {
          nickName: this.productGroup.productOwnerName,
        },
      }
    );
  }

  openDialog(): void {
    this.dialog.open(BorrowCreateDialogComponent, {
      width: document.body.scrollWidth <= 960 ? '100%' : '50%',
      data: {
        productGroupId: this.productGroupId,
        productGroup: this.productGroup,
      },
    });
  }
}
