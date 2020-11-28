import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { AccountService } from '@services/account.service';
import { RememberMeService } from '@services/remember-me.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private rememberMeService: RememberMeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.removeToken();
    this.authService.isAuth = false;

    if (!this.rememberMeService.isRememberMe) {
      this.accountService.removeAccount();
    }

    this.router.navigate(['']);
  }
}
