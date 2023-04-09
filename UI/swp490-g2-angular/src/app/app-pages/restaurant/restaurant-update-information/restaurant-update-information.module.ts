import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RestaurantUpdateInformationRoutingModule } from "./restaurant-update-information-routing.module";
import { RestaurantUpdateInformationComponent } from "./restaurant-update-information.component";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DialogModule } from "primeng/dialog";  


@NgModule({
  declarations: [
    RestaurantUpdateInformationComponent
  ],
  imports: [
    CommonModule,
    RestaurantUpdateInformationRoutingModule,
    DialogModule,
    InputTextareaModule,
  ],
  exports: [
    RestaurantUpdateInformationComponent
  ]
})
export class RestaurantUpdateInformationModule { }
