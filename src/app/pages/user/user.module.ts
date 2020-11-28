import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserProductComponent } from './user-product/user-product.component';


@NgModule({
  declarations: [UserInfoComponent, UserProductComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
