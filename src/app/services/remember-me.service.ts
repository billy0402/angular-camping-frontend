import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { LocalStorageKey } from '@enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class RememberMeService {
  private isRememberMeSubject$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isRememberMeSubject$.next(this.checkRememberMe());
  }

  set isRememberMe(value: boolean) {
    this.setRememberMe(value);
    this.isRememberMeSubject$.next(value);
  }

  get isRememberMe(): boolean {
    return this.isRememberMeSubject$.value;
  }

  get isRememberMe$(): Observable<boolean> {
    return this.isRememberMeSubject$.pipe(shareReplay(1));
  }

  private checkRememberMe(): boolean {
    const isRememberMe = this.getRememberMe();
    if (!isRememberMe || isRememberMe === 'false') {
      return false;
    }

    return true;
  }

  private setRememberMe(value: boolean): void {
    const s = value ? 'true' : 'false';
    localStorage.setItem(LocalStorageKey.IS_REMEMBER_ME, s);
  }

  private getRememberMe(): string | null {
    return localStorage.getItem(LocalStorageKey.IS_REMEMBER_ME);
  }
}
