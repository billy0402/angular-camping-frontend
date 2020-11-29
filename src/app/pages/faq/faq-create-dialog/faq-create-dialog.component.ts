import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { User } from '@models/user/user.model';

import { ProblemReportService } from '@services/api/problem-report.service';
import { UserService } from '@services/api/user.service';

@Component({
  selector: 'app-faq-create-dialog',
  templateUrl: './faq-create-dialog.component.html',
  styleUrls: ['./faq-create-dialog.component.scss'],
})
export class FaqCreateDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FaqCreateDialogComponent>,
    private formBuilder: FormBuilder,
    private problemReportService: ProblemReportService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      reportTitle: [null, Validators.required],
      type: [null, Validators.required],
      reporterEmail: [null, Validators.required],
      reportContent: [null, Validators.required],
    });

    this.getUserInfo();
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
      reporterEmail: user.email,
    });
  }

  onSubmit(): void {
    this.problemReportService
      .addProblemReport(this.form.value)
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.dialogRef.close();
        }
      });
  }
}
