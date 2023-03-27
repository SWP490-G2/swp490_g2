import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateInfoRoutingModule } from './update-info-routing.module';
import { UpdateInfoComponent } from './update-info.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { AccountInformationModule } from '../../account-information/account-information.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpErrorHandler } from 'src/app/global/http-error-handler';


@NgModule({
  declarations: [
    UpdateInfoComponent
  ],
  imports: [
    CommonModule,
    UpdateInfoRoutingModule,
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
      // processes all errors
      provide: ErrorHandler,
      useClass: HttpErrorHandler,
    },
  ],
})
export class UpdateInfoModule { }
