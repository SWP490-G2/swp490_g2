import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationPagesRoutingModule } from './authentication-pages-routing.module';
import { ForgotPassPageComponent } from './forgot-pass-page/forgot-pass-page.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { LoginComponent } from './login-page/login.component';
import { RegisterComponent } from './register-page/register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPassPageComponent
  ],
  imports: [
    CommonModule,
    AuthenticationPagesRoutingModule,
    StyleClassModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    DividerModule,
    RippleModule,
    CheckboxModule,
    FormsModule,
  ]
})
export class AuthenticationPagesModule { }
