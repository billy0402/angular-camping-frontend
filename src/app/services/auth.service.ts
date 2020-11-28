import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { LocalStorageKey } from '@enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSubject$ = new BehaviorSubject<boolean>(false);

  constructor(private jwtHelper: JwtHelperService) {
    this.isAuthSubject$.next(!this.isTokenExpired());
  }

  set isAuth(value: boolean) {
    this.isAuthSubject$.next(value);
  }

  get isAuth(): boolean {
    return this.isAuthSubject$.value;
  }

  get isAuth$(): Observable<boolean> {
    return this.isAuthSubject$.pipe(shareReplay(1));
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    return this.jwtHelper.isTokenExpired(token);
  }

  setToken(value: string): void {
    localStorage.setItem(LocalStorageKey.TOKEN, value);
  }

  getToken(): string | null {
    return localStorage.getItem(LocalStorageKey.TOKEN);
  }

  removeToken(): void {
    const token = this.getToken();
    if (token) {
      localStorage.removeItem(LocalStorageKey.TOKEN);
    }
  }
}
