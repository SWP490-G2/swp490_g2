import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewPromoDetailsComponent } from "./view-promo-details.component";

const routes: Routes = [{ path: "", component: ViewPromoDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPromoDetailsRoutingModule { }
