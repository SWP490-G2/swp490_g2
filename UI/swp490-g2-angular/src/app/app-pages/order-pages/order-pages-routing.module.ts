import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderPagesComponent } from "./order-pages.component";

const routes: Routes = [{ path: "", component: OrderPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPagesRoutingModule { }
