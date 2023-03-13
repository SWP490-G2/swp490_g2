import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminPagesRoutingModule } from "./admin-pages-routing.module";
import { AdminPagesComponent } from "./admin-pages.component";

@NgModule({
  declarations: [AdminPagesComponent],
  imports: [CommonModule, AdminPagesRoutingModule],
})
export class AdminPagesModule {}
