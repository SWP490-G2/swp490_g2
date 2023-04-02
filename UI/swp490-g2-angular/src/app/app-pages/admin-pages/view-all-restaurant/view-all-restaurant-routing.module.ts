import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllRestaurantComponent } from "./view-all-restaurant.component";

const routes: Routes = [
  { path: "", component: ViewAllRestaurantComponent },
  {
    path: "view-restaurant-details",
    loadChildren: () =>
      import("./view-restaurant-details/view-restaurant-details.module").then(
        (m) => m.ViewRestaurantDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllRestaurantRoutingModule {}
