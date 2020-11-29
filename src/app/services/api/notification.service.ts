import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Notification } from '@models/notification/notification.model';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  baseUrl = '/notification';

  constructor(private httpWithRxService: HttpWithRxService) {}

  getNotifications(): Observable<Notification[]> {
    return this.httpWithRxService.get<Notification[]>(this.baseUrl);
  }

  getNotReadCount(): Observable<{ count: number }> {
    return this.httpWithRxService.get<{ count: number }>(
      `${this.baseUrl}/not-read-count`
    );
  }
}
