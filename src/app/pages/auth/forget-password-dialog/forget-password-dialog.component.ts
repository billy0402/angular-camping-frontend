import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { UserService } from '@services/api/user.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-forget-password-dialog',
  templateUrl: './forget-password-dialog.component.html',
  styleUrls: ['./forget-password-dialog.component.scss'],
})
export class ForgetPasswordDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      account: [null, Validators.required],
      email: [null, Validators.required],
      cellPhone: [null, Validators.required],
    });
  }

  onSubmit(): void {
    this.userService.forgetPassword(this.form.value).subscribe(
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
