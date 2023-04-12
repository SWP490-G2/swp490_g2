import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuyerInformationRoutingModule } from "./account-information-routing.module";
import { AccountInformationComponent } from "./account-information.component";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
import { HttpClientModule } from "@angular/common/http";
import { OpenRestaurantRequestComponent } from "./open-restaurant-request/open-restaurant-request.component";
import { DialogModule } from "primeng/dialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { AddressFieldsComponent } from "./address-fields/address-fields.component";
import { RestaurantsModule } from "../restaurants/restaurants.module";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AccountInformationComponent,
    OpenRestaurantRequestComponent,
    AddressFieldsComponent,
    // ListOfRestaurantsComponent,
  ],
  imports: [
    CommonModule,
    BuyerInformationRoutingModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    HttpClientModule,
    DialogModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    ToastModule,
    AccordionModule,
    TableModule,
    RestaurantsModule,
    InputTextareaModule,
    AutoCompleteModule
  ],
  exports: [AddressFieldsComponent],
})
export class AccountInformationModule {}
