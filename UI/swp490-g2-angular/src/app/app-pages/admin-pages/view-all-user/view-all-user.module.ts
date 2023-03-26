import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewAllUserRoutingModule } from "./view-all-user-routing.module";
import { ViewAllUserComponent } from "./view-all-user.component";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [ViewAllUserComponent],
  imports: [
    CommonModule,
    ViewAllUserRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
  ],
})
export class ViewAllUserModule {}
