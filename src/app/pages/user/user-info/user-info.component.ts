import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { User } from '@models/user/user.model';
import { BadRecord } from '@models/user/comment-and-bad-record.model';
import { ExperienceType } from '@models/user/experience-type.model';

import { UserService } from '@services/api/user.service';

import { RwdHelper } from '@utils/rwd-helper';

import { ChangePasswordDialogComponent } from '@pages/auth/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User;
  badRecords: BadRecord[] = [];
  experienceTypes: ExperienceType[] = [];
  form!: FormGroup;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    this.userService.getUser().subscribe((user) => {
      if (!user) {
        return;
      }

      this.user = user;
      this.updateFormValue(user);
      this.getUserCommentAndBadRecord();
    });
  }

  updateFormValue(user: User): void {
    this.form.patchValue({
      ...user,
      experience: user.experience.toString(),
    });
  }

  getUserCommentAndBadRecord(): void {
    this.userService
      .getUserCommentAndBadRecord(this.user.account)
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.badRecords = data.badRecordArray;
      });
  }

  getExperiences(): void {
    this.userService.getExperienceTypes().subscribe((experienceTypes) => {
      if (!experienceTypes) {
        return;
      }

      this.experienceTypes = experienceTypes;
    });
  }

  changeEditable(): void {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  onSubmit(): void {
    this.userService.updateUser(this.form.value).subscribe((isSuccess) => {
      if (isSuccess) {
        this.changeEditable();
      }
    });
  }

  openDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: RwdHelper.isMobile() ? '100%' : '50%',
    });
  }
}
