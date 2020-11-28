import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { Bank } from '@models/bank/bank.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  baseUrl = '/bank';

  constructor(private httpService: HttpService) {}

  getBanks(): Observable<ApiModel<Bank[]>> {
    return this.httpService.get<Bank[]>(this.baseUrl);
  }
}
