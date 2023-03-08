import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestOpenListRoutingModule } from "./request-open-list-routing.module";
import { RequestOpenListComponent } from "./request-open-list.component";


@NgModule({
  declarations: [
    RequestOpenListComponent
  ],
  imports: [
    CommonModule,
    RequestOpenListRoutingModule
  ]
})
export class RequestOpenListModule { }
