import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { SelectType } from '@models/select-type.model';
import { Rental, User } from '@models/rental/rental.model';

import { BorrowStatus } from '@enums/borrow-status.enum';
import { Color } from '@enums/color.enum';

import { RentalService } from '@services/api/rental.service';
import { RentalStatusService } from '@services/api/rental-status.service';

import { FoolProofDialogComponent } from '@components/fool-proof-dialog/fool-proof-dialog.component';
import { BorrowPaymentDialogComponent } from '@pages/borrow/borrow-payment-dialog/borrow-payment-dialog.component';
import { BorrowTerminalDialogComponent } from '@pages/borrow/borrow-terminal-dialog/borrow-terminal-dialog.component';
import { BorrowCommentDialogComponent } from '@pages/borrow/borrow-comment-dialog/borrow-comment-dialog.component';

class StatusButton {
  text: string;
  color: Color;
  disable: boolean;

  constructor(text: string, color: Color, disable: boolean = false) {
    this.text = text;
    this.color = color;
    this.disable = disable;
  }
}

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss'],
})
export class BorrowListComponent implements OnInit {
  isRental = false;
  rentals: Rental[] = [];
  rentalStatusTypes: SelectType[] = [];

  constructor(
    private rentalService: RentalService,
    private rentalStatusService: RentalStatusService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRentalStatusType();
    this.updateRentals(false);
  }

  updateRentals(isRental: boolean): void {
    const action = isRental
      ? this.rentalService.getRentals()
      : this.rentalService.getBorrows();

    action.subscribe((rentals) => {
      if (!rentals) {
        return;
      }

      this.rentals = rentals;
    });
  }

  toUserProduct(user: User): void {
    this.router.navigate(['user', user.account, 'product'], {
      queryParams: { nickName: user.account },
    });
  }

  getRentalStatusType(): void {
    this.rentalService.getRentalStatusTypes().subscribe((rentalStatusTypes) => {
      if (!rentalStatusTypes) {
        return;
      }

      this.rentalStatusTypes = rentalStatusTypes;
    });
  }

  getStatusText(status: BorrowStatus): string {
    const type = this.rentalStatusTypes.find((type) => type.id === status);
    return type ? type.name : '未知';
  }

  getStatusColor(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.notAgree:
      case BorrowStatus.notPay:
        return Color.primary5;
      case BorrowStatus.notPlace:
      case BorrowStatus.notPickUp:
        return Color.primary1;
      case BorrowStatus.notReturn:
      case BorrowStatus.notRetrieve:
        return Color.primary2;
      case BorrowStatus.notComment:
        return Color.primary4;
      default:
        return Color.lightgray;
    }
  }

  getStatusButton(status: BorrowStatus): StatusButton[] {
    return this.isRental
      ? this.getRentalButton(status)
      : this.getBorrowButton(status);
  }

  getBorrowButton(status: BorrowStatus): StatusButton[] {
    switch (status) {
      case BorrowStatus.notAgree:
        return [new StatusButton('取消交易', Color.red)];
      case BorrowStatus.notPay:
        return [
          new StatusButton('取消交易', Color.red),
          new StatusButton('付款', Color.primary2),
        ];
      case BorrowStatus.notPlace:
        return [new StatusButton('取消交易', Color.red)];
      case BorrowStatus.notPickUp:
        return [new StatusButton('扣除手續費終止交易', Color.red)];
      case BorrowStatus.notComment:
        return [new StatusButton('評價租方', Color.primary4)];
      default:
        return [new StatusButton('無可執行動作', Color.lightgray, true)];
    }
  }

  getRentalButton(status: BorrowStatus): StatusButton[] {
    switch (status) {
      case BorrowStatus.notAgree:
        return [
          new StatusButton('拒絕出租', Color.red),
          new StatusButton('同意出租', Color.primary2),
        ];
      case BorrowStatus.notPay:
      case BorrowStatus.notPlace:
      case BorrowStatus.notPickUp:
        return [new StatusButton('取消交易', Color.red)];
      case BorrowStatus.notComment:
        return [new StatusButton('評價借方', Color.primary4)];
      default:
        return [new StatusButton('無可執行動作', Color.lightgray, true)];
    }
  }

  clickStatusButton(text: string, rentalId: number): void {
    switch (text) {
      case '付款':
        return this.openPaymentDialog(rentalId);
      case '扣除手續費終止交易':
        return this.openTerminalDialog(rentalId);
      case '評價租方':
      case '評價借方':
        return this.openCommentDialog(text, rentalId);
      default:
        return this.openFoolProofDialog(text, rentalId);
    }
  }

  trackByIndex(index: number, obj: StatusButton) {
    return index;
  }

  openFoolProofDialog(title: string, rentalId: number): void {
    const dialogRef = this.dialog.open(FoolProofDialogComponent, {
      width: document.body.scrollWidth <= 960 ? '100%' : '50%',
      data: {
        icon: title.startsWith('同意') ? 'check_circle' : 'cancel',
        title: title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      let action;
      switch (title) {
        case '取消交易':
          action = this.rentalStatusService.cancelRental(rentalId);
          break;
        case '同意出租':
          action = this.rentalStatusService.agreeRental(rentalId);
          break;
        case '拒絕出租':
          action = this.rentalStatusService.denyRental(rentalId);
          break;
      }

      if (!action) {
        return;
      }
      action.subscribe();
    });
  }

  openPaymentDialog(rentalId: number): void {
    this.dialog.open(BorrowPaymentDialogComponent, {
      width: document.body.scrollWidth <= 960 ? '100%' : '50%',
      data: {
        rentalId: rentalId,
      },
    });
  }

  openTerminalDialog(rentalId: number): void {
    this.dialog.open(BorrowTerminalDialogComponent, {
      width: document.body.scrollWidth <= 960 ? '100%' : '50%',
      data: {
        rentalId: rentalId,
      },
    });
  }

  openCommentDialog(title: string, rentalId: number): void {
    this.dialog.open(BorrowCommentDialogComponent, {
      width: document.body.scrollWidth <= 960 ? '100%' : '50%',
      data: {
        title: title,
        rentalId: rentalId,
      },
    });
  }
}
