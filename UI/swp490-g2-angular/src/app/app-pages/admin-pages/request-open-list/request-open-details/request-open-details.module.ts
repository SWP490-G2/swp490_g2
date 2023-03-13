import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestOpenDetailsRoutingModule } from "./request-open-details-routing.module";
import { RequestOpenDetailsComponent } from "./request-open-details.component";
import { TagModule } from "primeng/tag";
import { TabMenuModule } from "primeng/tabmenu";
import { MenuItem } from "primeng/api";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [RequestOpenDetailsComponent],
  imports: [
    CommonModule,
    RequestOpenDetailsRoutingModule,
    TagModule,
    TabMenuModule,
    FormsModule,
    ButtonModule,
  ],
})
export class RequestOpenDetailsModule {}
