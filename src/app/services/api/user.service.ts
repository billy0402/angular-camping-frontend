import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { SelectType } from '@models/select-type.model';
import { User } from '@models/user/user.model';
import { CommentAndBadRecord } from '@models/user/comment-and-bad-record.model';
import { ExperienceType } from '@models/user/experience-type.model';

import { HttpService } from '@services/http.service';
import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/user';

  constructor(
    private httpService: HttpService,
    private httpWithRxService: HttpWithRxService
  ) {}

  login(data: object): Observable<HttpResponse<ApiModel<object>>> {
    // @ts-ignore
    return this.httpService.post<object>('/login', data);
  }

  getUser(): Observable<User> {
    return this.httpWithRxService.get<User>(this.baseUrl);
  }

  addUser(data: object): Observable<boolean> {
    return this.httpWithRxService.post<string>(this.baseUrl, data);
  }

  updateUser(data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(this.baseUrl, data);
  }

  getUserCommentAndBadRecord(account: string): Observable<CommentAndBadRecord> {
    return this.httpWithRxService.get<CommentAndBadRecord>(
      `${this.baseUrl}/${account}/comment-and-bad-record`
    );
  }

  updatePassword(data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/password`,
      data
    );
  }

  forgetPassword(data: object): Observable<boolean> {
    return this.httpWithRxService.post<string>(
      `${this.baseUrl}/forgot-password`,
      data
    );
  }

  forgetPasswordChange(data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/forgot-password/change`,
      data
    );
  }

  userCompensate(data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/compensate`,
      data
    );
  }

  enableUser(account: string): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${account}/enable`
    );
  }

  disableUser(account: string): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${account}/disable`
    );
  }

  getExperienceTypes(): Observable<ExperienceType[]> {
    return this.httpWithRxService.get<ExperienceType[]>(
      `${this.baseUrl}/experience`
    );
  }

  getBadRecordTypes(): Observable<SelectType[]> {
    return this.httpWithRxService.get<SelectType[]>(
      `${this.baseUrl}/bad-record`
    );
  }
}
