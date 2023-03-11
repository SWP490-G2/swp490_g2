import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BanUserRoutingModule } from "./ban-user-routing.module";
import { BanUserComponent } from "./ban-user.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [BanUserComponent],
  imports: [
    CommonModule,
    BanUserRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule
  ],
})
export class BanUserModule {}
