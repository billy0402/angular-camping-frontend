import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isShowSubject$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  get isShow(): boolean {
    return this.isShowSubject$.getValue();
  }

  get isShow$(): Observable<boolean> {
    return this.isShowSubject$.pipe(shareReplay(1));
  }

  show() {
    this.isShowSubject$.next(true);
  }

  hide() {
    this.isShowSubject$.next(false);
  }
}
