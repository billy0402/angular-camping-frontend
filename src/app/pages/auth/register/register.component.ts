import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { ApiModel } from '@models/api-model.model';
import { Experience } from '@models/user/experience.model';

import { UserService } from '@services/api/user.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  experiences!: Experience[];
  isHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snakeBarService: SnakeBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cellPhone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      nickName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      bankAccount: [null, [Validators.required]],
    });

    this.getExperiences();
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

  onSubmit(): void {
    const birthday = this.form.value.birthday as Date;
    const formatBirthday = moment(birthday).format('YYYY/MM/DD');

    this.userService
      .addUser({
        ...this.form.value,
        birthday: formatBirthday,
      })
      .subscribe(
        (res: ApiModel<string>) => {
          this.snakeBarService.open(res.message);

          if (res.result) {
            this.router.navigate(['auth', 'login']);
          }
        },
        (err) => {
          this.snakeBarService.open(err.error.message);
        }
      );
  }
}
