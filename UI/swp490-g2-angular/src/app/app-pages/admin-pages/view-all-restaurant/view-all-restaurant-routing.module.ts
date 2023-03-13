import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllRestaurantComponent } from "./view-all-restaurant.component";

const routes: Routes = [{ path: "", component: ViewAllRestaurantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllRestaurantRoutingModule { }
