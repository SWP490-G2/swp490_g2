import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdatePromoComponent } from "./update-promo.component";

const routes: Routes = [
  { path: "", component: UpdatePromoComponent },
  {
    path: "update-promo-apply",
    loadChildren: () =>
      import("./update-promo-apply/update-promo-apply.module").then(
        (m) => m.UpdatePromoApplyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePromoRoutingModule {}
