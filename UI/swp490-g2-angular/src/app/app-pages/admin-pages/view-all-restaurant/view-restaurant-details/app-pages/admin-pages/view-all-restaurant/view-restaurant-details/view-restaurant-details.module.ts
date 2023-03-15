import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewRestaurantDetailsRoutingModule } from "./view-restaurant-details-routing.module";
import { ViewRestaurantDetailsComponent } from "./view-restaurant-details.component";


@NgModule({
  declarations: [
    ViewRestaurantDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewRestaurantDetailsRoutingModule
  ]
})
export class ViewRestaurantDetailsModule { }
