import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddRestaurantInfoRoutingModule } from "./add-restaurant-info-routing.module";
import { AddRestaurantInfoComponent } from "./add-restaurant-info.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RadioButtonModule } from "primeng/radiobutton";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { AccountInformationModule } from "src/app/app-pages/account-information/account-information.module";
import { ImageAttachmentModule } from "src/app/shared/image-attachment/image-attachment.module";
import { AutoCompleteModule } from "primeng/autocomplete";

@NgModule({
  declarations: [AddRestaurantInfoComponent],
  imports: [
    CommonModule,
    AddRestaurantInfoRoutingModule,
    CommonModule,
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
    ImageAttachmentModule,
    AutoCompleteModule,
  ],
})
export class AddRestaurantInfoModule {}
