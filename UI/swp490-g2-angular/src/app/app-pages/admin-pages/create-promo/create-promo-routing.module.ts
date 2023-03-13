import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreatePromoComponent } from "./create-promo.component";

const routes: Routes = [
  { path: "", component: CreatePromoComponent },

  {
    path: "create-promo-apply",
    loadChildren: () =>
      import("./create-promo-apply/create-promo-apply.module").then(
        (m) => m.CreatePromoApplyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePromoRoutingModule {}
