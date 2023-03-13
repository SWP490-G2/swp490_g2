import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateRestaurantInfoComponent } from "./update-restaurant-info.component";

const routes: Routes = [{ path: "", component: UpdateRestaurantInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRestaurantInfoRoutingModule { }
