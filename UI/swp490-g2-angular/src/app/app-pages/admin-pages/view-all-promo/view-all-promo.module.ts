import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewAllPromoRoutingModule } from "./view-all-promo-routing.module";
import { ViewAllPromoComponent } from "./view-all-promo.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [ViewAllPromoComponent],
  imports: [
    CommonModule,
    ViewAllPromoRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
  ],
})
export class ViewAllPromoModule {}
