import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateUserInfoRoutingModule } from "./update-user-info-routing.module";
import { UpdateUserInfoComponent } from "./update-user-info.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [UpdateUserInfoComponent],
  imports: [
    CommonModule,
    UpdateUserInfoRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ],
})
export class UpdateUserInfoModule {}
