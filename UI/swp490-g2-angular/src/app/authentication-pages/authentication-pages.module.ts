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
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from './login-page/login.component';
import { RegisterComponent } from './register-page/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CodeValidatorComponent } from './register-page/code-validator/code-validator.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPassPageComponent,
    CodeValidatorComponent
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
    MessageModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,

  ],
  providers: [
    MessageService,
    ConfirmationService

  ]
})
export class AuthenticationPagesModule { }
