import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminPagesRoutingModule } from "./admin-pages-routing.module";
import { AdminPagesComponent } from "./admin-pages.component";
import { RequestOpenListModule } from "./request-open-list/request-open-list.module";

@NgModule({
  declarations: [AdminPagesComponent],
  imports: [CommonModule, AdminPagesRoutingModule, RequestOpenListModule],
})
export class AdminPagesModule {}
