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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllPromoRoutingModule {}
