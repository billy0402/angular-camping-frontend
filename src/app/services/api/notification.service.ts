import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { Notification } from '@models/notification/notification.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  baseUrl = '/notification';

  constructor(private httpService: HttpService) {}

  getNotifications(): Observable<ApiModel<Notification[]>> {
    return this.httpService.get<Notification[]>(this.baseUrl);
  }

  getNotReadCount(): Observable<ApiModel<{ count: number }>> {
    return this.httpService.get<{ count: number }>(
      `${this.baseUrl}/not-read-count`
    );
  }
}
