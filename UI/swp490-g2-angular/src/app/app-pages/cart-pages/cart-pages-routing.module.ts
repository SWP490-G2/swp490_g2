import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartPagesComponent } from "./cart-pages.component";

const routes: Routes = [{ path: "", component: CartPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPagesRoutingModule {}
