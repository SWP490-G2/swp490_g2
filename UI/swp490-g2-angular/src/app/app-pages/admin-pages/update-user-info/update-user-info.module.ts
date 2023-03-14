import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateUserInfoRoutingModule } from "./update-user-info-routing.module";
import { UpdateUserInfoComponent } from "./update-user-info.component";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import { MessageService, ConfirmationService } from "primeng/api";
import { HttpErrorHandler } from "src/app/global/http-error-handler";
import { HttpClientModule } from "@angular/common/http";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [UpdateUserInfoComponent],
  imports: [
    CommonModule,
    UpdateUserInfoRoutingModule,
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
export class UpdateUserInfoModule {}
