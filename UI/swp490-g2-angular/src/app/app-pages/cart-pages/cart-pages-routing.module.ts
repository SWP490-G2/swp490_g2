import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartPagesComponent } from "./cart-pages.component";

const routes: Routes = [{ path: "", component: CartPagesComponent }
  ,
  {
  path: 'order-information', loadChildren: () => import('./order-information/order-information.module').then(m => m.OrderInformationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPagesRoutingModule { }
