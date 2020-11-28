import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface FoolProofDialogData {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-fool-proof-dialog',
  templateUrl: './fool-proof-dialog.component.html',
  styleUrls: ['./fool-proof-dialog.component.scss'],
})
export class FoolProofDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FoolProofDialogData,
    private dialogRef: MatDialogRef<FoolProofDialogData>
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
