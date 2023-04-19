import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RestaurantsRoutingModule } from "./restaurants-routing.module";
import { RestaurantsComponent } from "./restaurants.component";
import { FormsModule } from "@angular/forms";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";
import { MultiSelectModule } from "primeng/multiselect";
import { RippleModule } from "primeng/ripple";
import { StyleClassModule } from "primeng/styleclass";
import { ToggleButtonModule } from "primeng/togglebutton";
import { GoogleMapsModule } from "@angular/google-maps";
import { ImageAttachmentModule } from "src/app/shared/image-attachment/image-attachment.module";
import { RestaurantCardComponent } from "./restaurant-card/restaurant-card.component";
import { PaginatorModule } from "primeng/paginator";
import { TagModule } from "primeng/tag";
import { OpenClosedTimeModule } from "../restaurant/open-closed-time/open-closed-time.module";

@NgModule({
  declarations: [RestaurantsComponent, RestaurantCardComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule,
    ButtonModule,
    StyleClassModule,
    RippleModule,
    DropdownModule,
    MenuModule,
    BadgeModule,
    ToggleButtonModule,
    InputTextModule,
    MultiSelectModule,
    CheckboxModule,
    InputNumberModule,
    DividerModule,
    GoogleMapsModule,
    ImageAttachmentModule,
    PaginatorModule,
    TagModule,
    OpenClosedTimeModule
  ],
  exports: [RestaurantsComponent, RestaurantCardComponent],
})
export class RestaurantsModule {}
