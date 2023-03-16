import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestOpenDetailsRoutingModule } from "./request-open-details-routing.module";
import { RequestOpenDetailsComponent } from "./request-open-details.component";
import { TagModule } from "primeng/tag";
import { TabMenuModule } from "primeng/tabmenu";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CheckboxModule } from "primeng/checkbox";

@NgModule({
  declarations: [RequestOpenDetailsComponent],
  imports: [
    CommonModule,
    RequestOpenDetailsRoutingModule,
    TagModule,
    TabMenuModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
  ],
})
export class RequestOpenDetailsModule {}
