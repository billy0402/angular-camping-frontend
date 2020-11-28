import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxPaginationModule } from 'ngx-pagination';

import { ComponentsModule } from '@components/components.module';
import { ProductRoutingModule } from './product-routing.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductFormDialogComponent } from './product-form-dialog/product-form-dialog.component';
import { ProductExpansionPanelComponent } from './product-expansion-panel/product-expansion-panel.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFilterComponent,
    ProductFormComponent,
    ProductFormDialogComponent,
    ProductExpansionPanelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ImageCropperModule,
    NgImageSliderModule,
    NgxPaginationModule,
    ComponentsModule,
  ],
  exports: [ProductListComponent],
})
export class ProductModule {}
