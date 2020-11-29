import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ProductGroup } from '@models/product/product-group.model';

import { ProductService } from '@services/api/product.service';

import { RwdHelper } from '@utils/rwd-helper';

import { FoolProofDialogComponent } from '@components/fool-proof-dialog/fool-proof-dialog.component';

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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  toProductDetail(id: number): void {
    this.router.navigate(['product', id]);
  }

  toProductEdit(id: number): void {
    this.router.navigate(['product', id, 'edit']);
  }

  deleteProductGroup(id: number): void {
    const dialogRef = this.dialog.open(FoolProofDialogComponent, {
      width: RwdHelper.isMobile() ? '100%' : '50%',
      data: {
        icon: 'delete_forever',
        title: '刪除商品',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProductGroup(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }
}
