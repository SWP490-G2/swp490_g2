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

@NgModule({
  declarations: [RestaurantsComponent],
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
  ],
})
export class RestaurantsModule {}