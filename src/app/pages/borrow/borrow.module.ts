import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowCommentDialogComponent } from './borrow-comment-dialog/borrow-comment-dialog.component';
import { BorrowCreateDialogComponent } from './borrow-create-dialog/borrow-create-dialog.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowPaymentDialogComponent } from './borrow-payment-dialog/borrow-payment-dialog.component';
import { BorrowTerminalDialogComponent } from './borrow-terminal-dialog/borrow-terminal-dialog.component';


@NgModule({
  declarations: [BorrowCommentDialogComponent, BorrowCreateDialogComponent, BorrowListComponent, BorrowPaymentDialogComponent, BorrowTerminalDialogComponent],
  imports: [
    CommonModule,
    BorrowRoutingModule
  ]
})
export class BorrowModule { }
