import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateRestaurantInfoRoutingModule } from "./update-restaurant-info-routing.module";
import { UpdateRestaurantInfoComponent } from "./update-restaurant-info.component";
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

@NgModule({
  declarations: [UpdateRestaurantInfoComponent],
  imports: [
    CommonModule,
    UpdateRestaurantInfoRoutingModule,
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
export class UpdateRestaurantInfoModule {}
