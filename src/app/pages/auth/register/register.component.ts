import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ExperienceType } from '@models/user/experience-type.model';

import { UserService } from '@services/api/user.service';

import { DateHelper } from '@utils/date-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  experienceTypes!: ExperienceType[];
  isHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    this.userService.getExperienceTypes().subscribe((experienceTypes) => {
      if (!experienceTypes) {
        return;
      }

      this.experienceTypes = experienceTypes;
    });
  }

  onSubmit(): void {
    this.userService
      .addUser({
        ...this.form.value,
        birthday: DateHelper.toDateString(this.form.value.birthday),
      })
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.router.navigate(['auth', 'login']);
        }
      });
  }
}
