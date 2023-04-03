import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChangeRoleRoutingModule } from "./change-role-routing.module";
import { ChangeRoleComponent } from "./change-role.component";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [ChangeRoleComponent],
  imports: [
    CommonModule,
    ChangeRoleRoutingModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule,
  ],
})
export class ChangeRoleModule {}
