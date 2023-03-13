import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BanRestaurantComponent } from "./ban-restaurant.component";

const routes: Routes = [{ path: "", component: BanRestaurantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanRestaurantRoutingModule {}
