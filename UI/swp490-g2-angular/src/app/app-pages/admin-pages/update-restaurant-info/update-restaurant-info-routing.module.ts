import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateRestaurantInfoComponent } from "./update-restaurant-info.component";

const routes: Routes = [
  { path: "", component: UpdateRestaurantInfoComponent },
  {
    path: "update-restaurant-info-apply",
    loadChildren: () =>
      import(
        "./update-restaurant-info-apply/update-restaurant-info-apply.module"
      ).then((m) => m.UpdateRestaurantInfoApplyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRestaurantInfoRoutingModule {}
