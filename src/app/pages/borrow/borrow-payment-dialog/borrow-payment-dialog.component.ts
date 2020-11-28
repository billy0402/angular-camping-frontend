import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model.model';
import { User } from '@models/user/user.model';

import { UserService } from '@services/api/user.service';
import { RentalStatusService } from '@services/api/rental-status.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

interface BorrowPaymentDialog {
  rentalId: number;
}

@Component({
  selector: 'app-borrow-payment-dialog',
  templateUrl: './borrow-payment-dialog.component.html',
  styleUrls: ['./borrow-payment-dialog.component.scss'],
})
export class BorrowPaymentDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BorrowPaymentDialog,
    private dialogRef: MatDialogRef<BorrowPaymentDialogComponent>,
    private formBuilder: FormBuilder,
    private rentalStatusService: RentalStatusService,
    private userService: UserService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cardId: [null, Validators.required],
      safeCode: [null, Validators.required],
      expireYear: [null, Validators.required],
      expireMonth: [null, Validators.required],

      billLastName: [null, Validators.required],
      billFirstName: [null, Validators.required],
      billCellPhone: [null, Validators.required],

      billZipCode: [null, Validators.required],
      billAddress: [null, Validators.required],
      billCountry: [null, Validators.required],
      billCity: [null, Validators.required],
    });

    this.getUserInfo();
  }

  intRange(start: number, end: number): number[] {
    const range = [...Array(end + 1).keys()];
    return range.slice(start, end + 1);
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.updateFormValue(res.data);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(user: User): void {
    this.form.patchValue({
      billLastName: user.lastName,
      billFirstName: user.firstName,
      billCellPhone: user.cellPhone,
      billAddress: user.address,
    });
  }

  onSubmit(): void {
    this.rentalStatusService
      .payRental(this.data.rentalId, this.form.value)
      .subscribe(
        (res: ApiModel<string>) => {
          this.snakeBarService.open(res.message);

          if (res.result) {
            this.dialogRef.close();
          }
        },
        (err) => {
          this.snakeBarService.open(err.error.message);
        }
      );
  }
}
