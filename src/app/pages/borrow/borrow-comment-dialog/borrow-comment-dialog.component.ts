import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RentalService } from '@services/api/rental.service';

interface BorrowCommentDialogData {
  title: string;
  rentalId: number;
}

@Component({
  selector: 'app-borrow-comment-dialog',
  templateUrl: './borrow-comment-dialog.component.html',
  styleUrls: ['./borrow-comment-dialog.component.scss'],
})
export class BorrowCommentDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BorrowCommentDialogData,
    private dialogRef: MatDialogRef<BorrowCommentDialogComponent>,
    private formBuilder: FormBuilder,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: [5, Validators.required],
    });
  }

  onSubmit(): void {
    this.rentalService
      .addRentalComment(this.data.rentalId, this.form.value)
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.dialogRef.close();
        }
      });
  }
}
