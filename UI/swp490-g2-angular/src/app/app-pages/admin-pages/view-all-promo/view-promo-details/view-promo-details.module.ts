import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewPromoDetailsRoutingModule } from "./view-promo-details-routing.module";
import { ViewPromoDetailsComponent } from "./view-promo-details.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TagModule } from "primeng/tag";

@NgModule({
  declarations: [ViewPromoDetailsComponent],
  imports: [
    CommonModule,
    ViewPromoDetailsRoutingModule,
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
export class ViewPromoDetailsModule {}
