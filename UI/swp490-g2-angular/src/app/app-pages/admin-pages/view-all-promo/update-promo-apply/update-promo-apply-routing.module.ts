import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdatePromoApplyComponent } from "./update-promo-apply.component";

const routes: Routes = [{ path: "", component: UpdatePromoApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePromoApplyRoutingModule { }
