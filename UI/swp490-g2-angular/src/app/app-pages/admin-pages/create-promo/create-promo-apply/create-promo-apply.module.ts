import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreatePromoApplyRoutingModule } from "./create-promo-apply-routing.module";
import { CreatePromoApplyComponent } from "./create-promo-apply.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [CreatePromoApplyComponent],
  imports: [
    CommonModule,
    CreatePromoApplyRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
  ],
})
export class CreatePromoApplyModule {}
