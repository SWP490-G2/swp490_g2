import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRestaurantInfoRoutingModule } from './add-restaurant-info-routing.module';
import { AddRestaurantInfoComponent } from './add-restaurant-info.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RadioButtonModule } from "primeng/radiobutton";
import { ToastModule } from "primeng/toast";
import { HttpErrorHandler } from "src/app/global/http-error-handler";
import { DropdownModule } from "primeng/dropdown";
import { AccountInformationModule } from "src/app/app-pages/account-information/account-information.module";


@NgModule({
  declarations: [
    AddRestaurantInfoComponent
  ],
  imports: [
    CommonModule,
    AddRestaurantInfoRoutingModule,
    AccountInformationModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
    DropdownModule,
    AccountInformationModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: ErrorHandler,
      useClass: HttpErrorHandler,
    },
  ],
})
export class AddRestaurantInfoModule { }
