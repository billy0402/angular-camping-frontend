import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model.model';

import { UserService } from '@services/api/user.service';
import { AuthService } from '@services/auth.service';
import { AccountService } from '@services/account.service';
import { RememberMeService } from '@services/remember-me.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { RwdHelper } from '@utils/rwd-helper';

import { ForgetPasswordDialogComponent } from '@pages/auth/forget-password-dialog/forget-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private accountService: AccountService,
    private rememberMeService: RememberMeService,
    private snakeBarService: SnakeBarService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    if (this.rememberMeService.isRememberMe) {
      this.form.patchValue({
        account: this.accountService.account,
      });
    }
  }

  changeRememberMe(event: MatCheckboxChange): void {
    this.rememberMeService.isRememberMe = event.checked;
  }

  onSubmit(): void {
    this.accountService.account = this.form.value.account;

    this.userService.login(this.form.value).subscribe(
      (res: HttpResponse<ApiModel<object>>) => {
        const token = res.headers.get('X-Auth-Token') || '';
        if (token) {
          this.authService.setToken(token);
          this.accountService.account = this.form.value.account;
          this.authService.isAuth = true;

          this.redirectPreviousPage();
        }
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  redirectPreviousPage(): void {
    const redirectUrl = this.route.snapshot.queryParams.redirectUrl;
    this.router
      .navigateByUrl(redirectUrl)
      .then(() => {
        window.location.reload();
      })
      .catch(() => this.router.navigate(['']));
  }

  openDialog(): void {
    this.dialog.open(ForgetPasswordDialogComponent, {
      width: RwdHelper.isMobile() ? '100%' : '50%',
    });
  }
}
