import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { ApiModel } from '@models/api-model.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverIp = environment.serverIp;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authService.getToken() || '',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  get<T>(url: string): Observable<ApiModel<T>> {
    return this.http.get<ApiModel<T>>(this.serverIp + url, this.httpOptions);
  }

  post<T>(url: string, data: object): Observable<ApiModel<T>> {
    if (url === '/login') {
      // @ts-ignore
      this.httpOptions.observe = 'response' as 'response';
    }

    return this.http.post<ApiModel<T>>(
      this.serverIp + url,
      data,
      this.httpOptions
    );
  }

  put<T>(url: string, data: object): Observable<ApiModel<T>> {
    return this.http.put<ApiModel<T>>(
      this.serverIp + url,
      data,
      this.httpOptions
    );
  }

  patch<T>(url: string, data: object): Observable<ApiModel<T>> {
    return this.http.patch<ApiModel<T>>(
      this.serverIp + url,
      data,
      this.httpOptions
    );
  }

  delete<T>(url: string): Observable<ApiModel<T>> {
    return this.http.delete<ApiModel<T>>(this.serverIp + url, this.httpOptions);
  }
}
