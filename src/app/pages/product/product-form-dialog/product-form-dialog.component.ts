import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { SelectType } from '@models/select-type.model';
import { Product, ProductEdit } from '@models/product/product.model';
import { ProductImage } from '@models/product/product-image.model';
import { SliderImage } from '@models/product/slider-image.model';

import { ProductService } from '@services/api/product.service';

import { ImageCropperDialogComponent } from '@components/image-cropper-dialog/image-cropper-dialog.component';

interface ProductFormDialogData {
  product: Product;
}

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  form!: FormGroup;
  productTypes: SelectType[] = [];
  productImages: SliderImage[] = [];
  imageIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ProductFormDialogData,
    private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      count: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      appearance: [null, [Validators.required]],
      useInformation: [null, [Validators.required]],
      brokenCompensation: [null, [Validators.required]],
      relatedLink: [null],
      memo: [null],
      imageArray: [null],
    });

    this.getProductTypes();
  }

  getProductTypes(): void {
    this.productService.getProductTypes().subscribe((productTypes) => {
      if (!productTypes) {
        return;
      }

      this.productTypes = productTypes;
      if (this.data) {
        this.updateFormValue(this.data.product);
      }
    });
  }

  transformDetailToEdit(product: Product): ProductEdit {
    return {
      ...product,
      type: this.productTypes.find((type) => type.name === product.type)!.id,
    };
  }

  updateFormValue(product: Product): void {
    const productEdit = this.transformDetailToEdit(product);
    this.form.patchValue(productEdit);
    this.productImages = this.imageToSliderObject(this.data.product.imageArray);
  }

  imageToSliderObject(images: ProductImage[] | null): SliderImage[] {
    if (!images) {
      return [];
    }

    return images.map((image) => new SliderImage(image.url));
  }

  updateImageIndex(arrow: string): void {
    if (arrow === 'previous') {
      this.imageIndex -= 1;
    } else if (arrow === 'next') {
      this.imageIndex += 1;
    }
  }

  openImageDialog(isEdit: boolean): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '70%',
      data: {
        image: isEdit ? this.productImages[this.imageIndex].image : '',
        isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      if (data.isEdit) {
        this.productImages[this.imageIndex] = new SliderImage(data.image);
        this.productImages = [...this.productImages];
      } else {
        this.productImages.push(new SliderImage(data.image));
      }

      this.form.patchValue({
        imageArray: this.productImages.map((image) => {
          return {
            url: image.image,
          };
        }),
      });

      this.imageIndex = 0;
    });
  }

  deleteProductImage(): void {
    this.productImages.splice(this.imageIndex, 1);
    this.imageIndex = 0;
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
}
