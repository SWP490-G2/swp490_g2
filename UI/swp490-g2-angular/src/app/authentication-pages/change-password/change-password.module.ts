import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ForgotPassPageModule } from '../forgot-pass-page/forgot-pass-page.module';
import { ChangePasswordRoutingModule } from './change-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPassPageModule,
    ChangePasswordRoutingModule
  ],
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
