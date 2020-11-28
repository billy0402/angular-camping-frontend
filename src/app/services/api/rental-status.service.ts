import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class RentalStatusService {
  baseUrl = '/rental';

  constructor(private httpService: HttpService) {}

  agreeRental(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/agree`,
      {}
    );
  }

  denyRental(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/denied`,
      {}
    );
  }

  cancelRental(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/cancel`,
      {}
    );
  }

  terminalRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/terminate`,
      data
    );
  }

  payRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/payment`,
      data
    );
  }
}
