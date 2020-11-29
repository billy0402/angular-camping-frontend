import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from '@models/user/user.model';

import { UserService } from '@services/api/user.service';
import { RentalStatusService } from '@services/api/rental-status.service';

interface BorrowPaymentDialog {
  title: string;
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
    private userService: UserService
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
    this.userService.getUser().subscribe((user) => {
      if (!user) {
        return;
      }

      this.updateFormValue(user);
    });
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
    const action =
      this.data.title === '賠償'
        ? this.userService.userCompensate(this.form.value)
        : this.rentalStatusService.payRental(
            this.data.rentalId,
            this.form.value
          );

    action.subscribe((isSuccess) => {
      if (isSuccess) {
        this.dialogRef.close();
      }
    });
  }
}
