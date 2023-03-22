import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewRestaurantDetailsRoutingModule } from "./view-restaurant-details-routing.module";
import { ViewRestaurantDetailsComponent } from "./view-restaurant-details.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TagModule } from "primeng/tag";

@NgModule({
  declarations: [ViewRestaurantDetailsComponent],
  imports: [
    CommonModule,
    ViewRestaurantDetailsRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TagModule,
    TabMenuModule,
    FormsModule,
    ButtonModule,
  ],
})
export class ViewRestaurantDetailsModule {}
