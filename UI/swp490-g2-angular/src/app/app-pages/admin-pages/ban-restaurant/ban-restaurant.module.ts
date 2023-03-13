import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BanRestaurantRoutingModule } from "./ban-restaurant-routing.module";
import { BanRestaurantComponent } from "./ban-restaurant.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [BanRestaurantComponent],
  imports: [
    CommonModule,
    BanRestaurantRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class BanRestaurantModule {}
