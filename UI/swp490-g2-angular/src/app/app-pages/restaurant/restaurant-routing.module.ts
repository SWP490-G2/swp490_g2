import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestaurantComponent } from "./restaurant.component";

const routes: Routes = [{ path: ":id", component: RestaurantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
