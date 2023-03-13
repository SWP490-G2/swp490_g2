import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewAllRestaurantRoutingModule } from "./view-all-restaurant-routing.module";
import { ViewAllRestaurantComponent } from "./view-all-restaurant.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";


@NgModule({
  declarations: [
    ViewAllRestaurantComponent
  ],
  imports: [
    CommonModule,
    ViewAllRestaurantRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule
  ]
})
export class ViewAllRestaurantModule { }
