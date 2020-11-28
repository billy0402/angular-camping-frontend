import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RentalStatusService } from '@services/api/rental-status.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

interface BorrowTerminalDialogData {
  rentalId: number;
}

@Component({
  selector: 'app-borrow-terminal-dialog',
  templateUrl: './borrow-terminal-dialog.component.html',
  styleUrls: ['./borrow-terminal-dialog.component.scss'],
})
export class BorrowTerminalDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BorrowTerminalDialogData,
    private dialogRef: MatDialogRef<BorrowTerminalDialogComponent>,
    private formBuilder: FormBuilder,
    private rentalStatusService: RentalStatusService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: [null, Validators.required],
    });
  }

  onSubmit(): void {
    this.rentalStatusService
      .terminalRental(this.data.rentalId, this.form.value)
      .subscribe(
        (res) => {
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
