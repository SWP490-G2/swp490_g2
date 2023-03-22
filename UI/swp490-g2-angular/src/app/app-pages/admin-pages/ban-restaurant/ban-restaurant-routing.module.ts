import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BanRestaurantComponent } from "./ban-restaurant.component";

const routes: Routes = [
  { path: "", component: BanRestaurantComponent },
  {
    path: "ban-restaurant-apply",
    loadChildren: () =>
      import("./ban-restaurant-apply/ban-restaurant-apply.module").then(
        (m) => m.BanRestaurantApplyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanRestaurantRoutingModule {}
