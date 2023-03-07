import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestOpenPageRoutingModule } from "./request-open-page-routing.module";
import { RequestOpenPageComponent } from "./request-open-page.component";


@NgModule({
  declarations: [
    RequestOpenPageComponent
  ],
  imports: [
    CommonModule,
    RequestOpenPageRoutingModule
  ]
})
export class RequestOpenPageModule { }
