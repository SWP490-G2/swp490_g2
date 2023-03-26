import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllPromoComponent } from "./view-all-promo.component";

const routes: Routes = [
  { path: "", component: ViewAllPromoComponent },
  {
    path: "view-promo-details",
    loadChildren: () =>
      import("./view-promo-details/view-promo-details.module").then(
        (m) => m.ViewPromoDetailsModule
      ),
  },
  {
    path: "update-promo-apply",
    loadChildren: () =>
      import(
        "../view-all-promo/update-promo-apply/update-promo-apply.module"
      ).then((m) => m.UpdatePromoApplyModule),
  },
  {
    path: "create-promo-apply",
    loadChildren: () =>
      import(
        "../view-all-promo/create-promo-apply/create-promo-apply.module"
      ).then((m) => m.CreatePromoApplyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllPromoRoutingModule {}
