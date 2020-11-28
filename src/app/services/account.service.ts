import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { LocalStorageKey } from '@enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountSubject$ = new BehaviorSubject<string>('');

  constructor() {
    const account = this.getAccount() || '';
    this.accountSubject$.next(account);
  }

  set account(value: string) {
    this.setAccount(value);
    this.accountSubject$.next(value);
  }

  get account(): string {
    return this.accountSubject$.value;
  }

  get account$(): Observable<string> {
    return this.accountSubject$.pipe(shareReplay(1));
  }

  private setAccount(value: string): void {
    localStorage.setItem(LocalStorageKey.ACCOUNT, value);
  }

  private getAccount(): string | null {
    return localStorage.getItem(LocalStorageKey.ACCOUNT);
  }

  removeAccount(): void {
    const token = this.getAccount();
    if (token) {
      localStorage.removeItem(LocalStorageKey.ACCOUNT);
    }
  }
}
