import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdatePromoRoutingModule } from "./update-promo-routing.module";
import { UpdatePromoComponent } from "./update-promo.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [UpdatePromoComponent],
  imports: [
    CommonModule,
    UpdatePromoRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ],
})
export class UpdatePromoModule {}
