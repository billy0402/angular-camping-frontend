import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { City } from '@models/city/city.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl = '/city';

  private _cities: City[] = [];
  private _selectCity: string = '';

  constructor(private httpService: HttpService) {}

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

  getCity(): Observable<ApiModel<City[]>> {
    return this.httpService.get<City[]>(this.baseUrl);
  }
}
