import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPagesComponent } from "./admin-pages.component";

const routes: Routes = [{ path: "", component: AdminPagesComponent },

{ path: "request-open-list", loadChildren: () => import("./request-open-list/request-open-list.module").then(m => m.RequestOpenListModule) },

{ path: "view-all-user", loadChildren: () => import("./view-all-user/view-all-user.module").then(m => m.ViewAllUserModule) },

{ path: "view-all-restaurant", loadChildren: () => import("./view-all-restaurant/view-all-restaurant.module").then(m => m.ViewAllRestaurantModule) },

{ path: "ban-user", loadChildren: () => import("./ban-user/ban-user.module").then(m => m.BanUserModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }