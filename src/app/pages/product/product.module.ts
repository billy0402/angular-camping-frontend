import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductExpansionPanelComponent } from './product-expansion-panel/product-expansion-panel.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductFormDialogComponent } from './product-form-dialog/product-form-dialog.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [ProductDetailComponent, ProductExpansionPanelComponent, ProductFilterComponent, ProductFormComponent, ProductFormDialogComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
