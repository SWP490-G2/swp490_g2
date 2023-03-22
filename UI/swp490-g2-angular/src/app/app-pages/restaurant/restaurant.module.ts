import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RestaurantRoutingModule } from "./restaurant-routing.module";
import { RestaurantComponent } from "./restaurant.component";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";
import { RippleModule } from "primeng/ripple";
import { StyleClassModule } from "primeng/styleclass";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { ToggleButtonModule } from "primeng/togglebutton";
import { SliderModule } from "primeng/slider";
import { AccordionModule } from "primeng/accordion";
import { InputNumberModule } from "primeng/inputnumber";
import { ChipModule } from "primeng/chip";
import { GalleriaModule } from "primeng/galleria";
import { ImageAttachmentModule } from "src/app/shared/image-attachment/image-attachment.module";
import { ToastModule } from "primeng/toast";
import { ProductListComponent } from "./product-list/product-list.component";
import { RestaurantNameComponent } from './restaurant-name/restaurant-name.component';
import { SortByComponent } from "./sort-by/sort-by.component";
import { RadioButtonModule } from "primeng/radiobutton";

@NgModule({
  declarations: [RestaurantComponent, ProductListComponent, RestaurantNameComponent, SortByComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    InputTextModule,
    BadgeModule,
    StyleClassModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    DropdownModule,
    ChipModule,
    SliderModule,
    CheckboxModule,
    DividerModule,
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    InputNumberModule,
    MultiSelectModule,
    GalleriaModule,
    ImageAttachmentModule,
    ToastModule,
    RadioButtonModule,
  ],
})
export class RestaurantModule {}
