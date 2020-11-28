import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { BorrowRoutingModule } from './borrow-routing.module';

import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowCreateDialogComponent } from './borrow-create-dialog/borrow-create-dialog.component';
import { BorrowTerminalDialogComponent } from './borrow-terminal-dialog/borrow-terminal-dialog.component';
import { BorrowPaymentDialogComponent } from './borrow-payment-dialog/borrow-payment-dialog.component';
import { BorrowCommentDialogComponent } from './borrow-comment-dialog/borrow-comment-dialog.component';

@NgModule({
  declarations: [
    BorrowListComponent,
    BorrowCreateDialogComponent,
    BorrowTerminalDialogComponent,
    BorrowPaymentDialogComponent,
    BorrowCommentDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BorrowRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    NgImageSliderModule,
  ],
  exports: [],
})
export class BorrowModule {}
