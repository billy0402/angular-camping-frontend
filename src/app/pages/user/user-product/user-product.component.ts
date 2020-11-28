import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BadRecord } from '@models/user/comment-and-bad-record.model';
import { ProductGroup } from '@models/product/product-group.model';

import { UserService } from '@services/api/user.service';
import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

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
    private snakeBarService: SnakeBarService,
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
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.updateUserInfo(res.data.account, res.data.nickName);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getUserCommentAndBadRecord(): void {
    this.userService.getUserCommentAndBadRecord(this.account).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.comment = res.data.comment;
        this.badRecords = res.data.badRecordArray;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getUserProductGroups(): void {
    this.productService.getProductGroupsByUser(this.account).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productGroups = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
