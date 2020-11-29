import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Notification } from '@models/notification/notification.model';

import { AuthService } from '@services/auth.service';
import { AccountService } from '@services/account.service';
import { NotificationService } from '@services/api/notification.service';
import { SpinnerService } from '@services/ui/spinner.service';

import { RwdHelper } from '@utils/rwd-helper';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isAuth$!: Observable<boolean>;
  account$!: Observable<string>;
  showSpinner$!: Observable<boolean>;
  notifications: Notification[] = [];
  notReadCount = 0;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.account$ = this.accountService.account$;
    this.showSpinner$ = this.spinnerService.isShow$;

    this.getNotifications();
    this.getNotReadCount();
  }

  getBannerImage(): string {
    const mobile = RwdHelper.isPhone() ? '-mobile' : '';
    return `assets/image/banner${mobile}.png`;
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications) => {
      if (!notifications) {
        return;
      }

      this.notifications = notifications.reverse();
    });
  }

  getNotReadCount(): void {
    this.notificationService.getNotReadCount().subscribe((data) => {
      if (!data) {
        return;
      }

      this.notReadCount = data.count;
    });
  }
}
