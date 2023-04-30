import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
import { HttpClientModule } from "@angular/common/http";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AddressFieldsComponent } from "./address-fields/address-fields.component";
import { OrderInformationRoutingModule } from './order-information-routing.module';
import { OrderInformationComponent } from './order-information.component';


@NgModule({
  declarations: [
    OrderInformationComponent,
    AddressFieldsComponent
  ],
  imports: [
    CommonModule,
    OrderInformationRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    HttpClientModule,
    DialogModule,
    ToastModule,
    AccordionModule,
    TableModule,
    InputTextareaModule,
  ],
  exports: [AddressFieldsComponent],
})
export class OrderInformationModule { }
