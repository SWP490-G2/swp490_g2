import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestOpenListRoutingModule } from "./request-open-list-routing.module";
import { RequestOpenListComponent } from "./request-open-list.component";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [RequestOpenListComponent],
  imports: [
    CommonModule,
    RequestOpenListRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
  ],
})
export class RequestOpenListModule {}
