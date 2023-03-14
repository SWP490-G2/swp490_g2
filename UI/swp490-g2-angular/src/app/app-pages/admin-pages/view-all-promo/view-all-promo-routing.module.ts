import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllPromoComponent } from "./view-all-promo.component";

const routes: Routes = [{ path: "", component: ViewAllPromoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllPromoRoutingModule { }
