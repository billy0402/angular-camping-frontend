import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as moment from 'moment';

import { ProductGroup } from '@models/product/product-group.model';
import { ProductType } from '@models/product/product-type.model';
import { City } from '@models/city/city.model';

import { ProductService } from '@services/api/product.service';
import { CityService } from '@services/api/city.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  form!: FormGroup;
  productTypes: ProductType[] = [];
  cities: string[] = [];
  productGroups: ProductGroup[] = [];

  chipTypes: ProductType[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cityService: CityService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      borrowStartDate: [null],
      borrowEndDate: [null],
      cityId: [null],
      typeArray: [[]],
      priceRange: [null],
    });

    this.getProductTypes();
    this.getCities();
    this.getProductGroups();
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productTypes = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getCities(): void {
    this.cityService.getCity().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.cityService.cities = res.data;
        this.cities = this.cityService.cityNames;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getAreas(cityName: string): City[] {
    this.cityService.selectCity = cityName;
    return this.cityService.areas;
  }

  getProductGroups(params: string = ''): void {
    this.productService.getProductGroups(params).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productGroups = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  addType(value: string): void {
    const findType = this.productTypes.find((item) => item.name === value);

    if (findType && !this.chipTypes.includes(findType)) {
      this.form.value.typeArray.push(findType.id);
      this.chipTypes.push(findType);
    }
  }

  removeType(type: ProductType): void {
    const index = this.chipTypes.indexOf(type);

    if (index >= 0) {
      this.form.value.typeArray.splice(index, 1);
      this.chipTypes.splice(index, 1);
    }
  }

  inputChip(event: MatChipInputEvent): void {
    this.addType(event.value.trim());

    const input = event.input;
    if (input) {
      input.value = '';
    }
  }

  selectAutoComplete(event: MatAutocompleteSelectedEvent): void {
    this.addType(event.option.viewValue.trim());

    this.typeInput.nativeElement.value = '';
  }

  onSubmit(): void {
    let params = '';

    for (let [key, value] of Object.entries(this.form.value)) {
      if (!value || (value instanceof Array && value.length === 0)) {
        continue;
      }

      if (value instanceof Date) {
        const date = new Date(value as Date);
        value = moment(date).format('YYYY/MM/DD');
      }

      params += `${key}=${value}&`;
    }

    this.getProductGroups(params);
  }
}
