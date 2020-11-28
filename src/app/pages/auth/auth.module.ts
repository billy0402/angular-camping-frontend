import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { ForgetPasswordDialogComponent } from './forget-password-dialog/forget-password-dialog.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [ChangePasswordDialogComponent, ForgetPasswordDialogComponent, LoginComponent, LogoutComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
