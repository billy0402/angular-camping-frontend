import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BadRecord } from '@models/user/comment-and-bad-record.model';
import { ProductGroup } from '@models/product/product-group.model';

import { UserService } from '@services/api/user.service';
import { ProductService } from '@services/api/product.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
})
export class UserProductComponent implements OnInit {
  account: string = '';
  nickName: string = '';
  comment: number | null = null;
  badRecords: BadRecord[] = [];
  productGroups: ProductGroup[] = [];
  isEdit = false;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const account = this.route.snapshot.paramMap.get('account');
    const nickName = this.route.snapshot.queryParamMap.get('nickName') || '';

    if (account) {
      this.updateUserInfo(account, nickName);
    } else {
      this.isEdit = true;
      this.getUserInfo();
    }
  }

  updateUserInfo(account: string, nickName: string): void {
    this.account = account;
    this.nickName = nickName;
    this.getUserCommentAndBadRecord();
    this.getUserProductGroups();
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe((user) => {
      if (!user) {
        return;
      }

      this.updateUserInfo(user.account, user.nickName);
    });
  }

  getUserCommentAndBadRecord(): void {
    this.userService
      .getUserCommentAndBadRecord(this.account)
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.comment = data.comment;
        this.badRecords = data.badRecordArray;
      });
  }

  getUserProductGroups(): void {
    this.productService
      .getProductGroupsByUser(this.account)
      .subscribe((productGroups) => {
        if (!productGroups) {
          return;
        }

        this.productGroups = productGroups;
      });
  }
}
