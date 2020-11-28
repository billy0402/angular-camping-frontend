import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ApiModel } from '@models/api-model.model';
import { ProductGroupDetail } from '@models/product/product-group.model';
import { Product, ProductEdit } from '@models/product/product.model';
import { ProductType } from '@models/product/product-type.model';
import { City } from '@models/city/city.model';

import { ProductService } from '@services/api/product.service';
import { CityService } from '@services/api/city.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { ImageCropperDialogComponent } from '@components/image-cropper-dialog/image-cropper-dialog.component';
import { ProductFormDialogComponent } from '@pages/product/product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  productId!: number;
  coverImage: string = '';
  products: Product[] = [];
  cities: string[] = [];
  areas: City[] = [];
  productTypes: ProductType[] = [];
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cityService: CityService,
    private snakeBarService: SnakeBarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      borrowStartDate: [null, [Validators.required]],
      borrowEndDate: [null, [Validators.required]],
      cityName: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      coverImage: [null],
      productArray: [[]],
    });

    this.getCities();
    this.getProductTypes();
  }

  getProductTypes(): void {
    this.productService.getProductTypes().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productTypes = res.data;

        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.productId) {
          this.isEdit = true;
          this.getProductGroup(this.productId);
        }
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getProductGroup(id: number): void {
    this.productService.getProductGroup(id).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.updateFormValue(res.data);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: ProductGroupDetail): void {
    this.form.patchValue({
      name: data.name,
      borrowStartDate: new Date(data.borrowStartDate),
      borrowEndDate: new Date(data.borrowEndDate),
      cityName: data.city.name,
      cityId: data.city.id,
      price: data.price,
      coverImage: data.coverImage,
      bankAccount: data.bankAccount,
      productArray: data.productArray.map((product: Product) =>
        this.transformDetailToEdit(product)
      ),
    });
    this.updateAreas();

    this.products = data.productArray;
  }

  transformDetailToEdit(product: Product): ProductEdit {
    return {
      ...product,
      type: this.productTypes.find((type) => type.name === product.type)!.id,
    };
  }

  transformEditToDetail(product: ProductEdit): Product {
    return {
      ...product,
      type: this.productTypes.find((type) => type.id === product.type)!.name,
    };
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

  updateAreas(): void {
    this.cityService.selectCity = this.form.value.cityName;
    this.areas = this.cityService.areas;
  }

  openCoverImageDialog(isEdit: boolean): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '70%',
      data: {
        image: isEdit ? this.form.value.coverImage : '',
        isEdit: isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      this.form.patchValue({
        coverImage: data.image,
      });
    });
  }

  deleteCoverImage(): void {
    this.form.patchValue({
      coverImage: null,
    });
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      this.form.value.productArray.push(data);
      this.products.push(this.transformEditToDetail(data));
    });
  }

  editProduct(value: { index: number; product: ProductEdit }): void {
    this.form.value.productArray[value.index] = value.product;
    this.products[value.index] = this.transformEditToDetail(value.product);
  }

  deleteProduct(index: number): void {
    this.form.value.productArray.splice(index, 1);
    this.products.splice(index, 1);
  }

  dateFormatter(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD');
  }

  onSubmit(): void {
    let action!: Observable<ApiModel<string>>;
    const data = {
      ...this.form.value,
      borrowStartDate: this.dateFormatter(this.form.value.borrowStartDate),
      borrowEndDate: this.dateFormatter(this.form.value.borrowEndDate),
    };

    action = this.isEdit
      ? this.productService.updateProductGroup(this.productId, data)
      : this.productService.addProductGroup(data);

    action.subscribe(
      (res) => {
        this.snakeBarService.open(res.message);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
