import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { ApiModel } from '@models/api-model.model';

import { AuthService } from './auth.service';
import { SnakeBarService } from './ui/snake-bar.service';

@Injectable({
  providedIn: 'root',
})
export class HttpWithRxService {
  private serverIp = environment.serverIp;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authService.getToken() || '',
    }),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snakeBarService: SnakeBarService
  ) {}

  get<T>(url: string): Observable<T> {
    return this.http
      .get<ApiModel<T>>(this.serverIp + url, this.httpOptions)
      .pipe(
        map((res) => res.data),
        catchError((err) => this.handleError<T>('GET', url, err.error))
      );
  }

  post<T>(url: string, data: object = {}): Observable<boolean> {
    return this.http
      .post<ApiModel<T>>(this.serverIp + url, data, this.httpOptions)
      .pipe(
        tap((res) => this.snakeBarService.open(res.message)),
        map((res) => res.result),
        catchError((err) => this.handleError<T>('POST', url, err.error))
      );
  }

  put<T>(url: string, data: object = {}): Observable<boolean> {
    return this.http
      .put<ApiModel<T>>(this.serverIp + url, data, this.httpOptions)
      .pipe(
        tap((res) => this.snakeBarService.open(res.message)),
        map((res) => res.result),
        catchError((err) => this.handleError<T>('PUT', url, err.error))
      );
  }

  patch<T>(url: string, data: object = {}): Observable<boolean> {
    return this.http
      .patch<ApiModel<T>>(this.serverIp + url, data, this.httpOptions)
      .pipe(
        tap((res) => this.snakeBarService.open(res.message)),
        map((res) => res.result),
        catchError((err) => this.handleError<T>('PATCH', url, err.error))
      );
  }

  delete<T>(url: string): Observable<boolean> {
    return this.http
      .delete<ApiModel<T>>(this.serverIp + url, this.httpOptions)
      .pipe(
        tap((res) => this.snakeBarService.open(res.message)),
        map((res) => res.result),
        catchError((err) => this.handleError<T>('DELETE', url, err.error))
      );
  }

  private handleError<T>(
    method: string,
    url: string,
    err: ApiModel<T>
  ): Observable<null> {
    console.error(`[${method}] ${url}`);
    console.error(err);
    this.snakeBarService.open(err.message);
    return of(null);
  }
}
