import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllRestaurantComponent } from "./view-all-restaurant.component";

const routes: Routes = [
  { path: "", component: ViewAllRestaurantComponent },
  {
    path: "view-restaurant-details",
    loadChildren: () =>
      import(
        "./view-restaurant-details/app-pages/admin-pages/view-all-restaurant/view-restaurant-details/view-restaurant-details.module"
      ).then((m) => m.ViewRestaurantDetailsModule),
  },
  {
    path: "update-restaurant-info-apply",
    loadChildren: () =>
      import(
        "../view-all-restaurant/update-restaurant-info-apply/update-restaurant-info-apply.module"
      ).then((m) => m.UpdateRestaurantInfoApplyModule),
  },
  {
    path: "ban-restaurant-apply",
    loadChildren: () =>
      import(
        "../view-all-restaurant/ban-restaurant-apply/ban-restaurant-apply.module"
      ).then((m) => m.BanRestaurantApplyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllRestaurantRoutingModule {}
