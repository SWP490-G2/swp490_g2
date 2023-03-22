import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreatePromoRoutingModule } from "./create-promo-routing.module";
import { CreatePromoComponent } from "./create-promo.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [CreatePromoComponent],
  imports: [
    CommonModule,
    CreatePromoRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ],
})
export class CreatePromoModule {}
