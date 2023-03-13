import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreatePromoApplyComponent } from "./create-promo-apply.component";

const routes: Routes = [{ path: "", component: CreatePromoApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePromoApplyRoutingModule { }
