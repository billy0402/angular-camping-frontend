import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SelectType } from '@models/select-type.model';
import { Rental } from '@models/rental/rental.model';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  baseUrl = '/rental';

  constructor(private httpWithRxService: HttpWithRxService) {}

  getRentals(): Observable<Rental[]> {
    return this.httpWithRxService.get<Rental[]>(`${this.baseUrl}/borrow`);
  }

  addRental(data: object): Observable<boolean> {
    return this.httpWithRxService.post<{ id: number }>(this.baseUrl, data);
  }

  getRentalStatusReason(id: number, status: number): Observable<string> {
    return this.httpWithRxService.get<string>(
      `${this.baseUrl}/${id}/${status}/change-description`
    );
  }

  getBorrows(): Observable<Rental[]> {
    return this.httpWithRxService.get<Rental[]>(this.baseUrl);
  }

  addRentalComment(id: number, data: object): Observable<boolean> {
    return this.httpWithRxService.post<string>(
      `${this.baseUrl}/${id}/comment`,
      data
    );
  }

  getRentalStatusTypes(): Observable<SelectType[]> {
    return this.httpWithRxService.get<SelectType[]>(`${this.baseUrl}/status`);
  }
}
