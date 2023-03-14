import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreatePromoRoutingModule } from "./create-promo-routing.module";
import { CreatePromoComponent } from "./create-promo.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [CreatePromoComponent],
  imports: [
    CommonModule,
    CreatePromoRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
  ],
})
export class CreatePromoModule {}
