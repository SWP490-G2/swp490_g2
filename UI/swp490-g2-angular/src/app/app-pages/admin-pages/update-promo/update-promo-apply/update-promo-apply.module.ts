import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdatePromoApplyRoutingModule } from "./update-promo-apply-routing.module";
import { UpdatePromoApplyComponent } from "./update-promo-apply.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [UpdatePromoApplyComponent],
  imports: [
    CommonModule,
    UpdatePromoApplyRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
  ],
})
export class UpdatePromoApplyModule {}
