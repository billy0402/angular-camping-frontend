import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Notification } from '@models/notification/notification.model';

import { AuthService } from '@services/auth.service';
import { AccountService } from '@services/account.service';
import { NotificationService } from '@services/api/notification.service';
import { SpinnerService } from '@services/ui/spinner.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

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
    private spinnerService: SpinnerService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.account$ = this.accountService.account$;
    this.showSpinner$ = this.spinnerService.isShow$;

    this.getNotifications();
    this.getNotReadCount();
  }

  getBannerImage(): string {
    const mobile = document.body.scrollWidth < 600 ? '-mobile' : '';
    return `assets/image/banner${mobile}.png`;
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.notifications = res.data.reverse();
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getNotReadCount(): void {
    this.notificationService.getNotReadCount().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.notReadCount = res.data.count;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
