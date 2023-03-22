import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BanUserApplyRoutingModule } from "./ban-user-apply-routing.module";
import { BanUserApplyComponent } from "./ban-user-apply.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [BanUserApplyComponent],
  imports: [
    CommonModule,
    BanUserApplyRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class BanUserApplyModule {}
