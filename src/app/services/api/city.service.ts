import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { City } from '@models/city/city.model';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl = '/city';

  private _cities: City[] = [];
  private _selectCity: string = '';

  constructor(private httpWithRxService: HttpWithRxService) {}

  set cities(value: City[]) {
    this._cities = value;
  }

  set selectCity(value: string) {
    this._selectCity = value;
  }

  get cityNames(): string[] {
    const names = this._cities.map((city) => city.name);
    return [...new Set(names)];
  }

  get areas(): City[] {
    return this._cities.filter((city) => city.name === this._selectCity);
  }

  getCity(): Observable<City[]> {
    return this.httpWithRxService.get<City[]>(this.baseUrl);
  }
}
