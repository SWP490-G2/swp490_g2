import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewAllRestaurantRoutingModule } from "./view-all-restaurant-routing.module";
import { ViewAllRestaurantComponent } from "./view-all-restaurant.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { SidebarResComponent } from "./sidebar-res/sidebar-res.component";

@NgModule({
  declarations: [ViewAllRestaurantComponent, SidebarResComponent],
  imports: [
    CommonModule,
    ViewAllRestaurantRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
  ],
  exports: [SidebarResComponent],
})
export class ViewAllRestaurantModule {}
