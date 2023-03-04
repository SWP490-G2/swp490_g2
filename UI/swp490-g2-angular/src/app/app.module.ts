import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationPagesModule } from './authentication-pages/authentication-pages.module';
import { HttpErrorHandler } from "./global/http-error-handler";
import { ToastModule } from "primeng/toast";
import { MessageService, ConfirmationService } from "primeng/api";
import { AuthGuard } from "./global/auth.guard";
import { AuthService } from "./global/auth.service";
import { TokenInterceptor } from "./global/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AuthenticationPagesModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: HttpErrorHandler,
    },
    // Auth
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
