import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserProductComponent } from './user-product/user-product.component';

const routes: Routes = [
  { path: '', component: UserInfoComponent, canActivate: [AuthGuard] },
  {
    path: 'product',
    component: UserProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':account/product',
    component: UserProductComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
