import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuyerInformationRoutingModule } from "./buyer-information-routing.module";
import { BuyerInformationComponent } from "./buyer-information.component";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import { MessageService } from "primeng/api";
import { OpenRestaurantRequestComponent } from "./open-restaurant-request/open-restaurant-request.component";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [
    BuyerInformationComponent,
    OpenRestaurantRequestComponent,
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
  ],
  providers: [
    MessageService
  ]
})
export class BuyerInformationModule { }
