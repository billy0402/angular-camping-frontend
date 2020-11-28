import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { Rental } from '@models/rental/rental.model';
import { RentalStatusType } from '@models/rental/rental-status-type.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  baseUrl = '/rental';

  constructor(private httpService: HttpService) {}

  getRentals(): Observable<ApiModel<Rental[]>> {
    return this.httpService.get<Rental[]>(`${this.baseUrl}/borrow`);
  }

  addRental(data: object): Observable<ApiModel<{ id: number }>> {
    return this.httpService.post<{ id: number }>(this.baseUrl, data);
  }

  getRentalStatusReason(
    id: number,
    status: number
  ): Observable<ApiModel<string>> {
    return this.httpService.get<string>(
      `${this.baseUrl}/${id}/${status}/change-description`
    );
  }

  getBorrows(): Observable<ApiModel<Rental[]>> {
    return this.httpService.get<Rental[]>(this.baseUrl);
  }

  addRentalComment(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(`${this.baseUrl}/${id}/comment`, data);
  }

  getRentalStatusTypes(): Observable<ApiModel<RentalStatusType[]>> {
    return this.httpService.get<RentalStatusType[]>(`${this.baseUrl}/status`);
  }
}
