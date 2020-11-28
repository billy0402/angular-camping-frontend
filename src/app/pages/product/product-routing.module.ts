import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProductFilterComponent },
  { path: 'add', component: ProductFormComponent, canActivate: [AuthGuard] },
  {
    path: ':id/edit',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  { path: ':id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
