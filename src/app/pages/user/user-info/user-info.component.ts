import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model.model';
import { User } from '@models/user/user.model';
import { BadRecord } from '@models/user/comment-and-bad-record.model';
import { Experience } from '@models/user/experience.model';

import { UserService } from '@services/api/user.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { ChangePasswordDialogComponent } from '@pages/auth/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User;
  badRecords: BadRecord[] = [];
  experiences: Experience[] = [];
  form!: FormGroup;
  isEditable = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snakeBarService: SnakeBarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExperiences();
    this.getUserInfo();

    this.form = this.formBuilder.group({
      nickName: [null],
      experience: [null],
      email: [null],
      cellPhone: [null],
      address: [null],
    });
    this.form.disable();
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.user = res.data;
        this.updateFormValue(this.user);
        this.getUserCommentAndBadRecord();
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: User): void {
    this.form.setValue({
      nickName: data.nickName,
      experience: data.experience.toString(),
      email: data.email,
      cellPhone: data.cellPhone,
      address: data.address,
    });
  }

  getUserCommentAndBadRecord(): void {
    this.userService.getUserCommentAndBadRecord(this.user.account).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.badRecords = res.data.badRecordArray;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getExperiences(): void {
    this.userService.getUserExperiences().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.experiences = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  onEditClick(): void {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  onSubmit(): void {
    this.userService.updateUser(this.form.value).subscribe(
      (res: ApiModel<string>) => {
        this.snakeBarService.open(res.message);
        this.isEditable = false;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  openDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: document.body.scrollWidth <= 960 ? '100%' : '50%',
    });
  }
}
