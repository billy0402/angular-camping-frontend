import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';

import { ComponentsModule } from '@components/components.module';
import { ProductModule } from '@pages/product/product.module';
import { UserRoutingModule } from './user-routing.module';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserProductComponent } from './user-product/user-product.component';

@NgModule({
  declarations: [UserInfoComponent, UserProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ComponentsModule,
    ProductModule,
  ],
})
export class UserModule {}
