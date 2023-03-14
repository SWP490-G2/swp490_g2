import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateUserRoleRoutingModule } from "./update-user-role-routing.module";
import { UpdateUserRoleComponent } from "./update-user-role.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [UpdateUserRoleComponent],
  imports: [
    CommonModule,
    UpdateUserRoleRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
  ],
})
export class UpdateUserRoleModule {}
