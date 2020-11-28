import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { User } from '@models/user/user.model';
import { CommentAndBadRecord } from '@models/user/comment-and-bad-record.model';
import { Experience } from '@models/user/experience.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/user';

  constructor(private httpService: HttpService) {}

  login(data: object): Observable<HttpResponse<ApiModel<object>>> {
    // @ts-ignore
    return this.httpService.post<object>('/login', data);
  }

  getUser(): Observable<ApiModel<User>> {
    return this.httpService.get<User>(this.baseUrl);
  }

  addUser(data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(this.baseUrl, data);
  }

  updateUser(data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(this.baseUrl, data);
  }

  getUserCommentAndBadRecord(
    account: string
  ): Observable<ApiModel<CommentAndBadRecord>> {
    return this.httpService.get<CommentAndBadRecord>(
      `${this.baseUrl}/${account}/comment-and-bad-record`
    );
  }

  updatePassword(data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/password`, data);
  }

  forgetPassword(data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(
      `${this.baseUrl}/forgot-password`,
      data
    );
  }

  forgetPasswordChange(data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/forgot-password/change`,
      {}
    );
  }

  userCompensate(data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/compensate`, data);
  }

  enableUser(account: string): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${account}/enable`,
      {}
    );
  }

  disableUser(account: string): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${account}/disable`,
      {}
    );
  }

  getUserExperiences(): Observable<ApiModel<Experience[]>> {
    return this.httpService.get<Experience[]>(`${this.baseUrl}/experience`);
  }
}
