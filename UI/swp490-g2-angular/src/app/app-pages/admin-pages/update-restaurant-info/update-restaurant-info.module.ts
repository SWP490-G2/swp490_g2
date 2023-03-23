import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateRestaurantInfoRoutingModule } from "./update-restaurant-info-routing.module";
import { UpdateRestaurantInfoComponent } from "./update-restaurant-info.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [UpdateRestaurantInfoComponent],
  imports: [
    CommonModule,
    UpdateRestaurantInfoRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ],
})
export class UpdateRestaurantInfoModule {}
