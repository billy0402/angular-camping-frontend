import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Bank } from '@models/bank/bank.model';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  baseUrl = '/bank';

  constructor(private httpWithRxService: HttpWithRxService) {}

  getBanks(): Observable<Bank[]> {
    return this.httpWithRxService.get<Bank[]>(this.baseUrl);
  }
}
