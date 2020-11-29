import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class RentalStatusService {
  baseUrl = '/rental';

  constructor(private httpWithRxService: HttpWithRxService) {}

  agreeRental(id: number): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${id}/status/agree`
    );
  }

  denyRental(id: number): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${id}/status/denied`
    );
  }

  cancelRental(id: number): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${id}/status/cancel`
    );
  }

  terminalRental(id: number, data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${id}/status/terminate`,
      data
    );
  }

  payRental(id: number, data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${id}/status/payment`,
      data
    );
  }
}
