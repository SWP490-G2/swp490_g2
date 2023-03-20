import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChangeAvatarCoverRoutingModule } from "./change-avatar-cover-routing.module";
import { ChangeAvatarCoverComponent } from "./change-avatar-cover.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [ChangeAvatarCoverComponent],
  imports: [
    CommonModule,
    ChangeAvatarCoverRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ],
})
export class ChangeAvatarCoverModule {}
